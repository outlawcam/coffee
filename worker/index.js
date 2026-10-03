// Cloudflare Worker: serves the static build via the ASSETS binding and
// handles the inquiry API.
//
// Routing is asset-first by default — Cloudflare matches a static asset
// before invoking this script — so `/` and `/assets/*` never reach here.
// Only paths with no matching asset do, which in practice is /api/inquiry
// plus anything mistyped.

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

// Strip CR/LF from anything destined for a header (Subject, display names).
// A newline in `name` would otherwise inject real headers.
const oneLine = (s) => String(s).replace(/[\r\n]+/g, ' ').trim();

const esc = (s) =>
  String(s).replace(/[<>&"]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/inquiry') {
      if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
      return handleInquiry(request, env);
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
  // content-length can be absent or lie; check the real thing too.
  if (raw.length > MAX_BODY) return { error: 'too_large' };

  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return { error: 'invalid' };
  }
  if (!body || typeof body !== 'object') return { error: 'invalid' };

  const f = (k) => String(body[k] ?? '').trim().slice(0, MAX_FIELD);
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

async function verifyTurnstile(token, ip, env) {
  if (!token) return false;
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY || '',
      response: token,
      remoteip: ip || '',
    }),
  }).catch(() => null);
  if (!res) return false;
  const out = await res.json().catch(() => ({ success: false }));
  return out.success === true;
}

async function handleInquiry(request, env) {
  const { data, error } = await readInquiry(request);
  if (error) return json({ ok: false, error }, error === 'too_large' ? 413 : 400);

  const ok = await verifyTurnstile(data.token, request.headers.get('CF-Connecting-IP'), env);
  if (!ok) return json({ ok: false, error: 'turnstile' }, 400);

  return json({ ok: false, error: 'unimplemented' }, 501);
}
