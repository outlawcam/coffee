# Inquiry Form Email Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the inquiry form actually send — a notification to Tyler and a confirmation to the submitter — from a Cloudflare Worker via Resend, gated by Turnstile.

**Architecture:** `wrangler.jsonc` gains `main` and an assets binding, turning a static-assets deploy into a Worker that serves those assets. Static paths are matched first, so only `POST /api/inquiry` executes code. The handler validates, verifies Turnstile, then makes two sequential POSTs to the Resend REST API — the owner notification authoritative, the confirmation best-effort.

**Tech Stack:** Cloudflare Workers (no `nodejs_compat`), Resend REST API over plain `fetch` (no SDK), Cloudflare Turnstile, React 18, Vite 5.

**Spec:** `docs/superpowers/specs/2026-10-03-inquiry-email-design.md`

## Global Constraints

- **No new npm dependencies.** Resend is one `fetch`; the SDK is not used.
- **No test framework.** This repo has none and the spec declines to add one. Verification is executable `curl` against `wrangler dev`, not unit tests. Every "verify" step below is a real command with a real expected output.
- **Vite is pinned at 5.4.x.** Do not upgrade it; the deploy deliberately routes around wrangler's Vite auto-config, which requires Vite ≥ 6.
- **Node 22** (`.nvmrc`), matching Cloudflare's build.
- `INQUIRY_FROM` = `Stancraft Coffee Co. <hello@stancraftcoffee.com>`
- `INQUIRY_TO` = `tyler@stancraftcoffee.com`
- Secrets are `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY`. They live in the Cloudflare dashboard (production) and `.dev.vars` (local). **Never** in `wrangler.jsonc`.
- Vars live in `wrangler.jsonc`, **never** the dashboard — `wrangler deploy` deletes dashboard vars.
- Existing response shape is kept: `{ ok: true }` or `{ ok: false, error: "<code>" }`.
- Commit after every task. Branch is `design/minimalist-august`; merge to `main` by PR.

## Prerequisites (owner-side, not code)

None of this is in a task because none of it is in the repo — but Task 4 onward cannot be verified until it is done, and Task 7 will fail without it.

1. **Tyler's Resend account verifies `stancraftcoffee.com`.** Verification does not transfer between accounts; a verified copy on anyone else's account does not help production. His account's DKIM records must exist on the domain.
2. **Leave the root SPF record alone.** Issue #6 warns that SPF must be edited rather than added, because a domain may have only one SPF record. That rule is per *hostname*, and Resend places its SPF on a `send.` subdomain — so `stancraftcoffee.com`'s `v=spf1 include:_spf.google.com ~all` is untouched and Resend's SPF lands on `send.stancraftcoffee.com`. No conflict, no edit. Editing the Google record here would be needless risk.
3. **Do NOT enable Cloudflare Email _Routing_ on the domain.** MX points at Google Workspace and Routing takes over the **root** MX, which would break company email. Note this is distinct from the `send.` MX record Resend asks for — that is a different hostname and does not disturb Google's. Email _Sending_ is a different product and is safe.
4. **`hello@stancraftcoffee.com` needs a Google Workspace alias.** Resend only needs the domain verified to *send* as `hello@`, and `reply_to` keeps replies flowing to the right humans — but without an alias the address is a hole if anyone writes to it directly. Not Cloudflare forwarding, for reason 3.
5. **A Turnstile widget exists**, giving a **site key** (public, goes in `index.html` at Task 6 Step 3) and a **secret key** (goes in `.dev.vars` and the Cloudflare dashboard).

## Review Focus

Five failure modes the spec implies but which no task's happy path exercises. Each has a test pinned to the task that owns the code.

1. **Email header injection via `name`.** A newline in the name field lands in the Subject and the owner notification body. Unchecked, `Tyler\nBcc: victim@…` becomes a real header. → Task 3.
2. **Oversized body.** Nothing caps request size; a 5 MB paste in `details` is read into memory and forwarded to Resend. → Task 3.
3. **Resend rate limit / 4xx.** The free tier is 100/day. A 429 or 422 from Resend must surface as a clean 502, not an unhandled throw. → Task 4.
4. **Double submit.** Double-clicking Submit before the first response fires two sends — two emails to Tyler, two to the visitor. → Task 6.
5. **Unicode in name and details.** Accented characters and emoji must survive into both the text and HTML parts without mojibake. → Task 5.

---

### Task 1: Secrets hygiene

Must be first. The moment a `.dev.vars` exists holding a real key, an unguarded `git add -A` commits it.

**Files:**
- Modify: `.gitignore`
- Create: `.dev.vars.example`

- [ ] **Step 1: Ignore `.dev.vars`**

Append to `.gitignore`:

```
# Local Worker secrets — wrangler dev reads this. Never commit it.
# The committed template is .dev.vars.example.
.dev.vars
```

- [ ] **Step 2: Add the committed template**

Create `.dev.vars.example`:

```
# Copy to .dev.vars and fill in. .dev.vars is gitignored; this file is not.
# Production values live in the Cloudflare dashboard on the deploying
# account (16bd82b3...), NOT here and NOT in wrangler.jsonc.

# Resend API key, from the account that owns the verified sending domain.
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxx

# Turnstile secret key, paired with the site key inlined in index.html.
TURNSTILE_SECRET_KEY=0x4xxxxxxxxxxxxxxxxxxxxxxxxx
```

- [ ] **Step 3: Verify the ignore works**

Run:
```bash
printf 'RESEND_API_KEY=re_realkey\n' > .dev.vars
git status --porcelain | grep -c '\.dev\.vars$' || true
```
Expected: `0` — `.dev.vars` does not appear. `.dev.vars.example` does appear as untracked.

- [ ] **Step 4: Commit**

```bash
git add .gitignore .dev.vars.example
git commit -m "Ignore .dev.vars; add committed template for Worker secrets"
```

---

### Task 2: Worker skeleton, routing, and config

**Files:**
- Create: `worker/index.js`
- Modify: `wrangler.jsonc`
- Modify: `README.md`

**Interfaces:**
- Produces: `export default { fetch(request, env) }`; helper `json(obj, status)` used by every later task.

- [ ] **Step 1: Create the Worker**

Create `worker/index.js`:

```js
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

async function handleInquiry(request, env) {
  return json({ ok: false, error: 'unimplemented' }, 501);
}
```

- [ ] **Step 2: Point wrangler at it**

Replace `wrangler.jsonc` entirely:

```jsonc
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "coffee",
  "compatibility_date": "2026-07-10",
  "main": "worker/index.js",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS"
  },
  // Non-secret config. These MUST live here, not in the dashboard:
  // `wrangler deploy` deletes all vars before applying the ones in this
  // file, so a dashboard-set var is wiped by the next push to main.
  //
  // Secrets (NOT here): RESEND_API_KEY, TURNSTILE_SECRET_KEY
  //   local -> .dev.vars ; prod -> Cloudflare dashboard (account 16bd82b3...)
  // Secrets are never deleted by a deploy.
  "vars": {
    "INQUIRY_FROM": "Stancraft Coffee Co. <hello@stancraftcoffee.com>",
    "INQUIRY_TO": "tyler@stancraftcoffee.com"
  }
}
```

- [ ] **Step 3: Correct the README**

In `README.md`, the Deploy section says `main` is intentionally omitted. Replace that paragraph with:

```markdown
This deploy serves static assets **through a Worker**: `wrangler.jsonc`
declares `main: worker/index.js` plus `assets.directory: ./dist` with an
`ASSETS` binding, so `wrangler deploy` uploads both. Routing is asset-first
— static files are served without invoking the Worker, and only
`/api/inquiry` executes code. (An explicit `wrangler.jsonc` is still
required: without it, `wrangler deploy` tries to auto-configure the
Cloudflare Vite plugin, which needs Vite ≥ 6, and we pin Vite 5.)

Secrets for the inquiry endpoint (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`)
are set in the Cloudflare dashboard. Copy `.dev.vars.example` to `.dev.vars`
for local development.
```

- [ ] **Step 4: Build, then run the Worker**

```bash
npm run build
npx wrangler dev --port 8788
```

- [ ] **Step 5: Verify asset-first routing and the endpoint**

In a second shell:

```bash
curl -s -o /dev/null -w 'root: %{http_code}\n' http://localhost:8788/
curl -s -X POST -w '\npost: %{http_code}\n' http://localhost:8788/api/inquiry
curl -s -X GET  -w '\nget:  %{http_code}\n' http://localhost:8788/api/inquiry
```

Expected:
```
root: 200
{"ok":false,"error":"unimplemented"}
post: 501
{"ok":false,"error":"method"}
get:  405
```

The `root: 200` confirms the ASSETS binding serves the built site.

- [ ] **Step 6: Commit**

```bash
git add worker/index.js wrangler.jsonc README.md
git commit -m "Add Worker with ASSETS binding and the inquiry endpoint skeleton"
```

---

### Task 3: Request guard — size cap, validation, Turnstile

Covers Review Focus #1 (header injection) and #2 (oversized body).

**Files:**
- Modify: `worker/index.js`

**Interfaces:**
- Consumes: `json()` from Task 2.
- Produces: `readInquiry(request)` returning `{ data }` or `{ error }`; `verifyTurnstile(token, ip, env)` returning boolean. Validated fields reach Task 4 as `{ name, email, category, inquiry, details }`, all trimmed strings.

- [ ] **Step 1: Add constants and the field guard**

Insert above `export default` in `worker/index.js`:

```js
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
```

- [ ] **Step 2: Add `readInquiry`**

```js
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
```

- [ ] **Step 3: Add `verifyTurnstile`**

```js
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
```

- [ ] **Step 4: Wire them into the handler**

Replace `handleInquiry` with:

```js
async function handleInquiry(request, env) {
  const { data, error } = await readInquiry(request);
  if (error) return json({ ok: false, error }, error === 'too_large' ? 413 : 400);

  const ok = await verifyTurnstile(data.token, request.headers.get('CF-Connecting-IP'), env);
  if (!ok) return json({ ok: false, error: 'turnstile' }, 400);

  return json({ ok: false, error: 'unimplemented' }, 501);
}
```

- [ ] **Step 5: Verify validation and injection stripping**

With `npx wrangler dev --port 8788` running:

```bash
post() { curl -s -X POST -H 'content-type: application/json' -d "$1" http://localhost:8788/api/inquiry; echo; }

post '{"name":"","email":"a@b.co","category":"general","details":"hi"}'
post '{"name":"Cam","email":"notanemail","category":"general","details":"hi"}'
post '{"name":"Cam","email":"a@b.co","category":"bogus","details":"hi"}'
post '{"name":"Cam","email":"a@b.co","category":"wholesale","details":"hi"}'
post '{"name":"Cam","email":"a@b.co","category":"general","details":"hi"}'
```

Expected — the first four `{"ok":false,"error":"invalid"}`, the fifth `{"ok":false,"error":"turnstile"}` (valid fields, no token):

```
{"ok":false,"error":"invalid"}
{"ok":false,"error":"invalid"}
{"ok":false,"error":"invalid"}
{"ok":false,"error":"invalid"}
{"ok":false,"error":"turnstile"}
```

- [ ] **Step 6: Verify the size cap (Review Focus #2)**

```bash
python3 -c "import json;print(json.dumps({'name':'Cam','email':'a@b.co','category':'general','details':'x'*20000}))" > /tmp/big.json
curl -s -X POST -H 'content-type: application/json' --data @/tmp/big.json -w '\n%{http_code}\n' http://localhost:8788/api/inquiry
```

Expected:
```
{"ok":false,"error":"too_large"}
413
```

- [ ] **Step 7: Verify header-injection stripping (Review Focus #1)**

Temporarily add `console.log(JSON.stringify(data))` as the first line after `readInquiry` returns, then:

```bash
post '{"name":"Cam\nBcc: evil@example.com","email":"a@b.co","category":"general","details":"hi"}'
```

Expected in the `wrangler dev` log: the logged `name` is `Cam Bcc: evil@example.com` on **one line** — the newline replaced by a space. Remove the `console.log` afterward.

- [ ] **Step 8: Commit**

```bash
git add worker/index.js
git commit -m "Guard the inquiry endpoint: size cap, field validation, Turnstile"
```

---

### Task 4: Owner notification via Resend

Covers Review Focus #3 (Resend 4xx/429).

**Files:**
- Modify: `worker/index.js`

**Interfaces:**
- Consumes: validated `data` from Task 3; `esc`, `oneLine`, `json`.
- Produces: `sendEmail(env, payload)` returning `{ ok: true }` or `{ ok: false, status, detail }`. Task 5 reuses it unchanged.

- [ ] **Step 1: Add the Resend client**

```js
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
```

- [ ] **Step 2: Add the notification builder**

```js
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
```

- [ ] **Step 3: Send it from the handler**

Replace the `unimplemented` line in `handleInquiry` with:

```js
  const owner = await sendEmail(env, notification(env, data));
  if (!owner.ok) {
    console.error('owner send failed', owner.status, owner.detail);
    return json({ ok: false, error: 'send' }, 502);
  }

  return json({ ok: true });
```

- [ ] **Step 4: Verify a real send**

Put a real `RESEND_API_KEY` in `.dev.vars`. Turnstile has documented test keys that always pass — set `TURNSTILE_SECRET_KEY=1x0000000000000000000000000000000AA` in `.dev.vars`, which accepts any token.

```bash
npx wrangler dev --port 8788
curl -s -X POST -H 'content-type: application/json' \
  -d '{"name":"Cam Beck","email":"YOUR_REAL_EMAIL","category":"wholesale","inquiry":"Café / Restaurant Partnerships","details":"Testing the owner notification.","token":"test"}' \
  http://localhost:8788/api/inquiry; echo
```

Expected: `{"ok":true}`, and an email at `INQUIRY_TO` with subject `Inquiry — Wholesale: Café / Restaurant Partnerships`. **Hit reply and confirm it addresses `YOUR_REAL_EMAIL`, not `hello@`.**

- [ ] **Step 5: Verify the Resend failure path (Review Focus #3)**

Temporarily set `RESEND_API_KEY=re_invalid` in `.dev.vars`, restart `wrangler dev`, and repeat the curl.

Expected: `{"ok":false,"error":"send"}` with HTTP 502, and a `owner send failed 401 …` line in the log — **not** an unhandled exception. Restore the real key.

- [ ] **Step 6: Commit**

```bash
git add worker/index.js
git commit -m "Send the owner notification via Resend"
```

---

### Task 5: Confirmation email and asymmetric failure

Covers Review Focus #5 (unicode).

**Files:**
- Modify: `worker/index.js`

**Interfaces:**
- Consumes: `sendEmail`, `LABELS`, `esc` from Task 4.
- Produces: nothing later tasks consume. This completes the Worker.

- [ ] **Step 1: Add the confirmation builder**

The copy below is a **placeholder for Tyler's wording**, not final. It restates the two-business-days promise the form already makes, because that is a commitment he has to keep.

```js
function confirmation(env, d) {
  const label = LABELS[d.category];
  const first = d.name.split(' ')[0];
  const subject = 'We got your note — Stancraft Coffee Co.';

  const text = [
    `Thanks, ${first}.`,
    '',
    "Your note is with us and we'll be in touch within two business days.",
    '',
    'Here’s what you sent:',
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
```

- [ ] **Step 2: Send it best-effort**

Replace the `return json({ ok: true })` at the end of `handleInquiry` with:

```js
  // Best-effort, deliberately. The owner notification already landed, so the
  // inquiry is not lost. Reporting failure here would be false and would
  // prompt the visitor to submit again. Two sequential sends rather than
  // Resend's batch endpoint for exactly this reason: batch is atomic, so a
  // confirmation that fails validation would take the notification with it.
  const reply = await sendEmail(env, confirmation(env, data));
  if (!reply.ok) console.error('confirmation send failed', reply.status, reply.detail);

  return json({ ok: true });
```

- [ ] **Step 3: Verify both arrive**

```bash
curl -s -X POST -H 'content-type: application/json' \
  -d '{"name":"Cam Beck","email":"YOUR_REAL_EMAIL","category":"product","inquiry":"Roast Profiles / Brewing Help","details":"Both emails please.","token":"test"}' \
  http://localhost:8788/api/inquiry; echo
```

Expected: `{"ok":true}`, **two** emails — the notification at `INQUIRY_TO`, the confirmation at `YOUR_REAL_EMAIL`. Reply to the confirmation and confirm it addresses `tyler@stancraftcoffee.com`.

- [ ] **Step 4: Verify the asymmetry**

Temporarily change the confirmation's `to` to `[d.email + '.invalid']` so Resend rejects it. Repeat the curl.

Expected: still `{"ok":true}` with HTTP 200, the notification still arrives, and `confirmation send failed 422 …` appears in the log. Revert the change.

- [ ] **Step 5: Verify unicode (Review Focus #5)**

```bash
curl -s -X POST -H 'content-type: application/json; charset=utf-8' \
  -d '{"name":"Zoë Müller","email":"YOUR_REAL_EMAIL","category":"general","details":"Café ☕ — naïve résumé test.","token":"test"}' \
  http://localhost:8788/api/inquiry; echo
```

Expected: `{"ok":true}`, and both emails render `Zoë Müller` and `Café ☕ — naïve résumé` correctly in text and HTML — no `Ã©` or `?`.

- [ ] **Step 6: Commit**

```bash
git add worker/index.js
git commit -m "Send the submitter confirmation, best-effort after the notification"
```

---

### Task 6: Client — async submit, Turnstile widget, CSP

Covers Review Focus #4 (double submit).

**Files:**
- Modify: `src/sections/Inquiry.jsx`
- Modify: `index.html`
- Modify: `public/_headers`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `POST /api/inquiry` from Tasks 2–5; the response shape `{ ok }`.

- [ ] **Step 1: Load Turnstile and allow it in CSP**

In `index.html`, before `</head>`:

```html
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
```

In `public/_headers`, add `https://challenges.cloudflare.com` to **both** `script-src` and `frame-src` (Turnstile renders in an iframe). The directive becomes:

```
script-src 'self' https://www.googletagmanager.com https://challenges.cloudflare.com; … frame-src https://www.googletagmanager.com https://challenges.cloudflare.com;
```

Add to the comment block at the top of that file:

```
#   script-src/frame-src …challenges.cloudflare.com — Turnstile widget + its iframe
```

- [ ] **Step 2: Replace the submit handler in `Inquiry.jsx`**

Replace the `const [sent, setSent]` line and the `submit` function with:

```jsx
  const [sent, setSent] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [error, setError] = React.useState('');
  const widgetRef = React.useRef(null);

  const submit = async (e) => {
    e.preventDefault();
    if (sending) return; // Guards double-click; the button is also disabled.
    setSending(true);
    setError('');

    // Turnstile writes its token into a hidden input it injects itself.
    const token = widgetRef.current?.querySelector('[name="cf-turnstile-response"]')?.value || '';

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...form, token }),
      });
      const body = await res.json().catch(() => ({ ok: false }));
      if (!body.ok) throw new Error(body.error || 'send');
      setSent(true);
    } catch (err) {
      setError(
        err.message === 'turnstile'
          ? "That verification didn't go through. Reload the page and try again."
          : "Something went wrong sending that. Try again, or email tyler@stancraftcoffee.com directly."
      );
      window.turnstile?.reset();
    } finally {
      setSending(false);
    }
  };
```

- [ ] **Step 3: Add the widget, error, and busy state to the form**

Immediately above the submit button in the JSX:

```jsx
              <div className="cf-turnstile" ref={widgetRef}
                   data-sitekey="REPLACE_WITH_TURNSTILE_SITE_KEY" />

              {error && (
                <p role="alert" className="form-error">{error}</p>
              )}
```

Replace the submit button with:

```jsx
              <button
                type="submit"
                className="btn-block"
                disabled={sending}
              >
                {sending ? 'Sending…' : 'Submit'}
              </button>
```

The site key is public and belongs in the client. Get it from the Turnstile dashboard; it pairs with `TURNSTILE_SECRET_KEY`.

Also add `required` to the Details textarea — the Worker rejects an empty `details` (Task 3), but the textarea currently has no `required` attribute, so the browser would let it through and the visitor would get a generic failure instead of the native "please fill out this field" prompt:

```jsx
                <textarea
                  id="f-details"
                  rows={4}
                  required
                  value={form.details}
                  onChange={set('details')}
                  className="control control--textarea"
                />
```

- [ ] **Step 4: Style the error**

Append to `src/styles/components.css`:

```css
/* Submit failure. Sits above the button so it is read before the retry. */
.form-error {
  margin: 0 0 14px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--ink-900);
  border-left: 2px solid var(--ink-900);
  padding-left: 12px;
}
```

- [ ] **Step 5: Verify the happy path in a browser**

```bash
npm run build && npx wrangler dev --port 8788
```

Open `http://localhost:8788/#inquiry`, fill the form, submit. Expected: the Turnstile widget renders, the button reads `Sending…` while in flight, the success panel appears, and both emails arrive.

- [ ] **Step 6: Verify double-submit is blocked (Review Focus #4)**

In DevTools, throttle to Slow 3G, then double-click Submit rapidly.

Expected: exactly **one** request to `/api/inquiry` in the Network tab, and exactly one pair of emails. The button is disabled after the first click and `sending` short-circuits the handler.

- [ ] **Step 7: Verify the error path keeps the typing**

Stop `wrangler dev`, then submit with the form filled.

Expected: the error paragraph appears, is announced (`role="alert"`), **the entered values are still in the fields**, and the button returns to `Submit`.

- [ ] **Step 8: Verify no CSP violations**

With `wrangler dev` running and DevTools console open, reload and submit.

Expected: no `Content-Security-Policy-Report-Only` violations mentioning `challenges.cloudflare.com`.

- [ ] **Step 9: Commit**

```bash
git add src/sections/Inquiry.jsx index.html public/_headers src/styles/components.css
git commit -m "Wire the inquiry form to the Worker, gated by Turnstile"
```

---

### Task 7: Preview deploy and end-to-end verification

The `main` + assets config has never run in this project's CI. Prove it on a preview before `main`.

**Files:** none — this is verification.

- [ ] **Step 1: Confirm production secrets exist**

The deploying account is `16bd82b3…`, which the local `wrangler` cannot reach. Either `npx wrangler login` against that account, or check the dashboard directly: **Workers → coffee → Settings → Variables and Secrets.**

Expected: `RESEND_API_KEY` and `TURNSTILE_SECRET_KEY` both present as **secrets** (encrypted), spelled exactly as above. A typo presents identically to a missing key at runtime.

- [ ] **Step 2: Confirm the vars are NOT relied on from the dashboard**

Expected: `INQUIRY_FROM` and `INQUIRY_TO` now come from `wrangler.jsonc`. Any dashboard copies are harmless duplicates and will be removed by the deploy — that is the designed behavior, not a problem.

- [ ] **Step 3: Push and open a PR**

```bash
git push origin design/minimalist-august
gh pr create --base main --head design/minimalist-august \
  --title "Wire the inquiry form to Resend on a Cloudflare Worker" \
  --body "Implements #6. Spec: docs/superpowers/specs/2026-10-03-inquiry-email-design.md"
```

- [ ] **Step 4: Verify the preview build**

```bash
gh pr checks --watch
```

Expected: the `Workers Builds: coffee` check passes. **If it fails, stop** — this is the unproven part of the change. Read the build log before touching anything else.

- [ ] **Step 5: Verify against the preview URL**

Find the preview URL in the Cloudflare build log. Submit a real inquiry through it.

Expected: both emails arrive, DKIM passes (check "show original" in Gmail — `DKIM: 'PASS'` for `stancraftcoffee.com`), and neither lands in spam.

- [ ] **Step 6: Merge**

```bash
gh pr merge --merge
```

- [ ] **Step 7: Verify production**

Submit one real inquiry on the live site. Expected: both emails arrive. Then close issue #6.
