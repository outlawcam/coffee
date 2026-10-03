# Stancraft Coffee Co — Landing Site

Temporary one-page site (pre-Shopify), built from the Stancraft design system.
Vite + React, deployed to Cloudflare (Workers static assets) from `main`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

## Deploy — Cloudflare (GitHub integration)

Every push to `main` on `github.com/outlawcam/coffee` builds and deploys.

This deploy serves static assets **through a Worker**: `wrangler.jsonc`
declares `main: worker/index.js` plus `assets.directory: ./dist` with an
`ASSETS` binding, so `wrangler deploy` uploads both. Routing is asset-first —
static files are served without invoking the Worker, and only `/api/inquiry`
executes code. (An explicit `wrangler.jsonc` is still required: without it,
`wrangler deploy` tries to auto-configure the Cloudflare Vite plugin, which
needs Vite ≥ 6, and we pin Vite 5.)

Secrets for the inquiry endpoint (`RESEND_API_KEY`, `TURNSTILE_SECRET_KEY`)
are set in the Cloudflare dashboard. Copy `.dev.vars.example` to `.dev.vars`
for local development.

**One-time setup (manual, in the Cloudflare dashboard — cannot be scripted):**

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
   repository**. Authorize Cloudflare's GitHub app for the `outlawcam` account
   and select the `coffee` repository.
2. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (reads `wrangler.jsonc`)
   - Node version is pinned by `.nvmrc` (**22** — current Wrangler requires Node ≥ 22).
3. Save & deploy. Add a custom domain later under the project's **Domains &
   Routes** (Settings) tab if desired.

## Content follow-ups

Owner input needed, in rough priority order:

- **Confirmation email copy** (`worker/index.js`, `confirmation()`). The
  current wording is a placeholder written to be replaced. It restates the
  two-business-days promise the form makes, which is a commitment Tyler has to
  keep — so the text should be his, not ours.
- **Ethiopia Guji Dambi Uddo has no process.** The supplied lineup omitted it,
  so the card's process tile falls back to "Single Origin". Correct it in
  `src/data/coffees.js` if the lot is washed, natural or honey.
- **Roaster's favourites.** Only Kenya Nyeri Gatomboya carries `roastersFav`,
  so that filter shows a single card. Add the flag to others if more qualify.
- **No social links.** The botanical and broadsheet designs carried
  Facebook/Instagram; this one has none. The footer is the address and the
  email only. Add them if wanted.

Per-coffee photography is no longer a placeholder — the cards use the ink
origin stamp (`src/components/LocationStamp.jsx`) by design, not a photo slot.
