// Cloudflare Worker: serves the static build via the ASSETS binding and
// handles the inquiry API.
//
// Routing is asset-first by default — Cloudflare matches a static asset
// before invoking this script — so `/` and `/assets/*` never reach here.
// Only paths with no matching asset do, which in practice is /api/inquiry
// plus anything mistyped.

// `oneLine` strips CR/LF from anything destined for a header (Subject,
// display names) — a newline in `name` would otherwise inject real headers.
// It lives with the templates because that is what it protects.
import { confirmation, notification, oneLine } from './emails.js';

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const MAX_BODY = 16 * 1024; // 16 KB. The form's longest field is a textarea.
const MAX_FIELD = 4000;

const CATEGORIES = ['general', 'wholesale', 'support', 'product'];

// Categories other than `general` render a dropdown, so a reason is required
// for them and meaningless for general. Mirrors CATEGORIES in Inquiry.jsx.
const NEEDS_REASON = new Set(['wholesale', 'support', 'product']);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === '/api/inquiry') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return handleInquiry(request, env, ctx);
    }

    return env.ASSETS.fetch(request);
  },
};

async function readInquiry(request) {
  const len = Number(request.headers.get('content-length') || 0);
  if (len > MAX_BODY) return { error: 'too_large' };

  let raw;
  try {
    raw = await request.text();
  } catch {
    return { error: 'invalid' };
  }
  // content-length can be absent or lie; check the real thing too. Bytes, not
  // UTF-16 units — multi-byte text would otherwise pass at ~3x the cap.
  if (new TextEncoder().encode(raw).length > MAX_BODY) return { error: 'too_large' };

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return { error: 'invalid' };
  }
  if (!body || typeof body !== 'object') return { error: 'invalid' };

  // Reject an over-long field rather than shortening it. Quietly dropping the
  // tail of `details` would hand Tyler half a lead while telling the visitor
  // it sent whole, which breaks the spec's first goal. It also risks splitting
  // a surrogate pair on the way out.
  for (const k of ['name', 'email', 'category', 'inquiry', 'details']) {
    if (String(body[k] ?? '').length > MAX_FIELD) return { error: 'too_large' };
  }

  const f = (k) => String(body[k] ?? '').trim();
  const data = {
    name: oneLine(f('name')),
    email: oneLine(f('email')),
    category: f('category'),
    inquiry: oneLine(f('inquiry')),
    details: f('details'),
    token: f('token'),
  };

  if (!data.name) return { error: 'invalid' };
  if (!EMAIL_RE.test(data.email)) return { error: 'invalid' };
  if (!CATEGORIES.includes(data.category)) return { error: 'invalid' };
  if (NEEDS_REASON.has(data.category) && !data.inquiry) return { error: 'invalid' };
  if (!data.details) return { error: 'invalid' };

  return { data };
}

async function verifyTurnstile(token, env) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // remoteip is optional and deliberately omitted. Cloudflare documents no
    // behaviour for a mismatch, and it is one more thing that can disagree —
    // a visitor solving over IPv6 while the Worker reports IPv4, say. The
    // token alone is the proof of work.
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY || '',
      response: token,
    }),
    signal: AbortSignal.timeout(10_000),
  }).catch(() => null);
  if (!res) {
    console.error('turnstile siteverify unreachable');
    return false;
  }
  const out = await res.json().catch(() => ({ success: false }));
  if (out.success !== true) {
    // Log why. Without this a rejection is indistinguishable from any other,
    // and the codes are the only thing that separates a key mismatch
    // (invalid-input-secret) from an expired or reused token
    // (timeout-or-duplicate) from a bad token (invalid-input-response).
    // These codes name configuration state, not user data — safe to log.
    console.error('turnstile rejected:', JSON.stringify(out['error-codes'] || out));
  }
  return out.success === true;
}

// One POST to Resend. No SDK: a single endpoint does not justify a
// dependency, and avoiding it keeps nodejs_compat off.
async function sendEmail(env, payload) {
  let res;
  try {
    res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${env.RESEND_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
  } catch (err) {
    return { ok: false, status: 0, detail: String(err && err.message) };
  }
  if (!res.ok) {
    // 422 = unverified domain or bad address; 429 = rate limit (free tier
    // is 100/day). Both must surface as a clean failure, never a throw.
    const detail = await res.text().catch(() => '');
    return { ok: false, status: res.status, detail };
  }
  return { ok: true };
}

async function handleInquiry(request, env, ctx) {
  const { data, error } = await readInquiry(request);
  if (error) return json({ ok: false, error }, error === 'too_large' ? 413 : 400);

  const ok = await verifyTurnstile(data.token, env);
  if (!ok) return json({ ok: false, error: 'turnstile' }, 400);

  const owner = await sendEmail(env, notification(env, data));
  if (!owner.ok) {
    console.error('owner send failed', owner.status, owner.detail);
    return json({ ok: false, error: 'send' }, 502);
  }

  // Best-effort, deliberately. The owner notification already landed, so the
  // inquiry is not lost. Reporting failure here would be false and would
  // prompt the visitor to submit again. Two sequential sends rather than
  // Resend's batch endpoint for exactly this reason: batch is atomic, so a
  // confirmation that fails validation would take the notification with it.
  // Dispatched with waitUntil so it runs AFTER the response is sent. Awaiting
  // it would let a hung confirmation hold the authoritative reply hostage: the
  // browser would eventually show a send failure for an inquiry that already
  // reached Tyler, and the visitor would submit again — the duplicate this
  // asymmetry exists to prevent.
  const deliverConfirmation = sendEmail(env, confirmation(env, data)).then((reply) => {
    if (!reply.ok) console.error('confirmation send failed', reply.status, reply.detail);
  });
  if (ctx && typeof ctx.waitUntil === 'function') ctx.waitUntil(deliverConfirmation);

  return json({ ok: true });
}
