# Inquiry form email — Resend on a Cloudflare Worker

**Branch:** `design/minimalist-august`
**Date:** 2026-10-03
**Status:** Draft — awaiting review
**Implements:** issue #6

The form in `src/sections/Inquiry.jsx` fakes submission: `submit()` calls
`preventDefault()` and sets `sent`, with no network call. A visitor fills it
out, reads "Your note is with us. We'll be in touch within two business days,"
and the note goes nowhere.

This gives it a real backend — two emails per submission, sent from a
Cloudflare Worker via Resend, gated by Turnstile.

Issue #6 already settled the provider (Resend over Cloudflare Email Sending,
which is still Beta) and the hosting shape (a Worker on this project, not a
separate service). This spec does not revisit either. It covers what #6 left
open: the second email, the failure semantics between the two, and the
configuration split.

## Goals

- **The lead reaches Tyler.** An inquiry that the visitor believes was sent
  must actually arrive, or the visitor must be told it did not.
- **The submitter gets a confirmation** carrying what they wrote, so they have
  a record and know the form worked.
- **Replies route to a human on both sides** without either party seeing a
  dead-end sender.
- **The endpoint is not a spam relay.** It emails an address supplied by an
  anonymous caller, from a verified domain. That is an abuse vector and is
  gated accordingly.

## Non-goals

- No change to the four inquiry categories or the sixteen reasons.
- No persistence. Email is the record; there is no database and no admin view.
- No visual redesign of the form. The success panel stays exactly as it is.
- No test framework. The repo has none and this does not justify introducing
  one; see Verification.
- Not Cloudflare Email Routing — see DNS, below. This is load-bearing.

## Architecture

### Routing

`wrangler.jsonc` gains `main` and an assets binding:

```jsonc
"main": "worker/index.js",
"assets": { "directory": "./dist", "binding": "ASSETS" }
```

Static assets are matched **first** by default; only paths with no matching
asset reach the Worker. So `/` and `/assets/*` are served without invoking
code, and only `POST /api/inquiry` actually executes. No `run_worker_first`
needed. This confirms the note in #6.

This is the one structural change: the project stops being a pure
static-assets deploy. `README.md` currently documents `main` as deliberately
omitted and must be updated in the same change.

### Endpoint

`POST /api/inquiry`, accepting the contract the form already uses plus a
Turnstile token:

```
{ name, email, category, inquiry, details, token }
```

Validation: `name` and `details` non-empty, `email` matching the existing
`EMAIL_RE`, `category` one of the four known ids, `inquiry` required only when
the chosen category has options (General has none). Unknown fields ignored.

Responses are the existing shape — `{ ok: true }` or `{ ok: false, error }`
with 400 / 405 / 502.

### Two sends, sequential

| | To | From | Reply-To |
|---|---|---|---|
| Notification | `INQUIRY_TO` | `INQUIRY_FROM` | the submitter |
| Confirmation | the submitter | `INQUIRY_FROM` | `INQUIRY_TO` |

Tyler hits reply and reaches the customer; the customer hits reply and reaches
Tyler. Neither sees `INQUIRY_FROM` behave as a dead end.

**Two separate POSTs, not Resend's batch endpoint.** Batch is atomic: a
confirmation that fails validation would take the notification down with it,
inverting which email matters. Sequential lets the two fail independently:

- **Notification fails** → `502`, visitor sees an error and can retry. A lead
  is never lost silently.
- **Notification succeeds, confirmation fails** → still `{ ok: true }`, with
  the failure logged. The note *did* reach Tyler; reporting failure would be
  false and would prompt a duplicate submission.

The confirmation is best-effort by design. This asymmetry is the main reason
this spec exists rather than being an implementation detail.

### Email content

Both sent as text and HTML. Subjects:

- Notification — `Inquiry — <category>: <reason>`, falling back to
  `Inquiry — General` when the category has no reason.
- Confirmation — `We got your note — Stancraft Coffee Co.`

The notification is a plain field dump (name, email, category, reason, then
details) optimised for Tyler scanning it on a phone. The confirmation restates
what the visitor submitted beneath a short acknowledgement.

**Confirmation copy needs Tyler's voice, not mine.** The About section is
written in first person and the lineup descriptions are conversational; an
automated email in neutral corporate register would read as a different
company. Implementation will draft it in that voice for him to amend, and the
draft is explicitly a placeholder for his wording — the two-business-days
promise the form already makes should be restated there, since it is a
commitment he has to keep.

All interpolated values are HTML-escaped on the way into the HTML part. The
existing `esc()` helper in `worker/index.js` carries over.

### Spam gating

Turnstile: a POST to
`challenges.cloudflare.com/turnstile/v0/siteverify` with the token and the
caller's `CF-Connecting-IP`.

Written fresh rather than lifted from `worker/index.js` on
`design/broadsheet-side-nav`. That file was the earlier reference, but the
broadsheet direction is abandoned and the verify call is a short, documented
API request — carrying a dead branch forward as a dependency costs more than
rewriting fifteen lines. Nothing in this work now depends on that branch.

Without a gate, any caller can make Resend send mail to an arbitrary address
with Stancraft's domain in the From. The cost of that is domain reputation,
which is slow to detect and slow to repair.

### No new dependency

Resend is one `fetch` to `https://api.resend.com/emails` with
`Authorization: Bearer ${env.RESEND_API_KEY}`. No SDK, no `nodejs_compat`.
The SES implementation needed `aws4fetch`; this needs nothing.

## Configuration

| Name | Kind | Where | Value |
|---|---|---|---|
| `RESEND_API_KEY` | secret | dashboard / `.dev.vars` | Tyler's key |
| `TURNSTILE_SECRET_KEY` | secret | dashboard / `.dev.vars` | — |
| `INQUIRY_FROM` | var | `wrangler.jsonc` | `Stancraft Coffee Co. <hello@stancraftcoffee.com>` |
| `INQUIRY_TO` | var | `wrangler.jsonc` | `tyler@stancraftcoffee.com` |
| Turnstile site key | public | inlined in client | — |

### The vars must live in the config file

**`wrangler deploy` deletes all vars before applying those in the config
file.** The Cloudflare build command is `npx wrangler deploy`, so any
plain-text variable set in the dashboard is wiped on the next push to `main` —
for any reason, related or not. Secrets are never deleted by deployments.

So the split is not stylistic: the two secrets *must* be dashboard-side and
survive; the two vars *must* be in `wrangler.jsonc` or they silently vanish.
`keep_vars: true` would preserve dashboard vars but hides live config from the
repo, which is worse on a project where Tyler cannot see the dashboard.

### `.dev.vars` is not gitignored

`.gitignore` does not cover it. The first commit of this work adds it, before
any file containing a real key exists.

### The deploying account is not the local one

The `coffee` Worker runs on Cloudflare account `16bd82b3…`. The local
`wrangler` is authenticated as `cbeck@insite.net` and can reach only
`a8b6e143…` and `f608a6b7…`; `wrangler secret list` fails with
`Worker "coffee" not found`.

Production deploys are unaffected — they run from the GitHub integration, not
this machine. But `wrangler dev` against real secrets, and any verification of
secret *names*, needs `wrangler login` against the deploying account first. A
misspelled `RESEND_API_KEY` is indistinguishable from a missing one at
runtime, so this is worth closing before debugging anything.

## DNS

Both of these can break mail that currently works. Carried from issue #6.

- **Do NOT enable Cloudflare Email _Routing_ on `stancraftcoffee.com`.** MX
  points at Google Workspace; Routing takes over MX and would break company
  email. Email _Sending_ is a different product, needs only SPF/DKIM, and is
  safe.
- **Leave the root SPF record alone.** Issue #6 says SPF must be edited rather
  than added, since a domain may have only one SPF record. True, but the rule
  is per *hostname* and Resend places SPF on a `send.` subdomain — so
  `stancraftcoffee.com`'s `v=spf1 include:_spf.google.com ~all` stays as it
  is and Resend's lands on `send.stancraftcoffee.com`. Editing the Google
  record would be needless risk to working mail.
- **The `send.` MX record Resend asks for is not a conflict.** Google
  Workspace holds the **root** MX; Resend's is on a subdomain. Different
  hostnames, both valid at once. This is why the Email Routing warning above
  is specifically about Routing, which takes the root.
- **`hello@` needs a Google Workspace alias**, not Cloudflare forwarding —
  same reason. Resend only needs the domain verified to *send* as `hello@`,
  but without an alias the address is a hole if anyone writes to it directly.
- **Tyler's Resend account needs its own DKIM records.** Verification does not
  transfer between accounts. His key is what production uses, so his records
  are what must exist — a separately verified copy on another account does not
  help production.

## Client changes

`src/sections/Inquiry.jsx`:

- `submit()` becomes async: POST, await, branch.
- Two new states — `sending` and `error`. The component currently has only
  `sent`.
- Submit button disabled while `sending`, with its label reflecting that.
- An error path that keeps the entered values, so a failed send never costs
  the visitor their typing.
- A Turnstile widget, and its token in the payload.
- The existing success panel and its focus management are untouched.

`index.html` gains the Turnstile script, which has a CSP consequence: the
Report-Only policy added in PR #7 needs `challenges.cloudflare.com` in
`script-src` and `frame-src`. Shipping without that would generate violation
reports for our own feature.

## Verification

No test framework, consistent with prior work on this repo.

- `npm run build` clean.
- `wrangler dev` locally, with a real key in `.dev.vars`, submitting the form
  and confirming **both** emails arrive and that reply-to routes correctly in
  each.
- The asymmetric failure path exercised deliberately: break the confirmation
  send, confirm the visitor still sees success and the notification still
  lands.
- Validation rejections: missing name, malformed email, absent Turnstile
  token.
- Deploy to a preview before `main`. The `main` + assets config has never run
  in this project's CI, and `README.md` notes the project deliberately routes
  around wrangler's Vite auto-config because Vite is pinned at 5.

## Risks

- **The deploy model change is unproven here.** Mitigated by a preview deploy
  before merge.
- ~~`worker/index.js` is only on a local branch~~ — **resolved, not a
  blocker.** Issue #6 lists this as the blocker to clear first, on the
  assumption that file would be reused. The broadsheet direction is abandoned
  and the Turnstile call is written fresh instead, so nothing here depends on
  `design/broadsheet-side-nav` and it can be deleted with the other losing
  branches. Issue #6 and `DESIGN-BRANCHES.md` both still describe it as
  blocking and should be corrected.
- **Tyler controls the Resend account but not this repo.** Any config he
  rotates must be communicated, since the repo cannot read it.
