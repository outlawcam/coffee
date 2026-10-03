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

const LABELS = {
  general: 'General',
  wholesale: 'Wholesale',
  support: 'Customer Support',
  product: 'Product',
};

function notification(env, d) {
  const label = LABELS[d.category];
  const subject = oneLine(d.inquiry ? `Inquiry — ${label}: ${d.inquiry}` : `Inquiry — ${label}`);

  const text = [
    `Name:     ${d.name}`,
    `Email:    ${d.email}`,
    `Category: ${label}`,
    `Reason:   ${d.inquiry || '—'}`,
    '',
    d.details,
  ].join('\n');

  const html =
    `<h2>${esc(subject)}</h2>` +
    `<p><strong>Name:</strong> ${esc(d.name)}<br>` +
    `<strong>Email:</strong> ${esc(d.email)}<br>` +
    `<strong>Category:</strong> ${esc(label)}<br>` +
    `<strong>Reason:</strong> ${esc(d.inquiry || '—')}</p>` +
    `<p style="white-space:pre-wrap">${esc(d.details)}</p>`;

  return {
    from: env.INQUIRY_FROM,
    to: [env.INQUIRY_TO],
    reply_to: [d.email], // Tyler hits reply, reaches the customer.
    subject,
    text,
    html,
  };
}

// Copy is a PLACEHOLDER for Tyler's wording, not final. It restates the
// two-business-days promise the form already makes, because that is a
// commitment he has to keep.
function confirmation(env, d) {
  const label = LABELS[d.category];
  const first = d.name.split(' ')[0];
  const subject = 'We got your note — Stancraft Coffee Co.';

  const text = [
    `Thanks, ${first}.`,
    '',
    "Your note is with us and we'll be in touch within two business days.",
    '',
    'Here\u2019s what you sent:',
    '',
    `Category: ${label}`,
    `Reason:   ${d.inquiry || '—'}`,
    '',
    d.details,
    '',
    '— Stancraft Coffee Co., Lufkin, TX',
  ].join('\n');

  const html =
    `<p>Thanks, ${esc(first)}.</p>` +
    `<p>Your note is with us and we&rsquo;ll be in touch within two business days.</p>` +
    `<p><strong>Here&rsquo;s what you sent:</strong></p>` +
    `<p><strong>Category:</strong> ${esc(label)}<br>` +
    `<strong>Reason:</strong> ${esc(d.inquiry || '—')}</p>` +
    `<p style="white-space:pre-wrap">${esc(d.details)}</p>` +
    `<p>— Stancraft Coffee Co., Lufkin, TX</p>`;

  return {
    from: env.INQUIRY_FROM,
    to: [d.email],
    reply_to: [env.INQUIRY_TO], // Customer hits reply, reaches Tyler.
    subject,
    text,
    html,
  };
}

async function handleInquiry(request, env) {
  const { data, error } = await readInquiry(request);
  if (error) return json({ ok: false, error }, error === 'too_large' ? 413 : 400);

  const ok = await verifyTurnstile(data.token, request.headers.get('CF-Connecting-IP'), env);
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
  const reply = await sendEmail(env, confirmation(env, data));
  if (!reply.ok) console.error('confirmation send failed', reply.status, reply.detail);

  return json({ ok: true });
}
