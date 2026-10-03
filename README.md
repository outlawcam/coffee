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

## Content follow-ups (remaining placeholders)

- `src/sections/WhereToBuy.jsx` — real café names + shop URLs, and the
  farmer's-market info link (still `href="#"`). The order-by-email address is
  set (`tyler@stancraftcoffee.com`).
- Per-coffee photos: the coffee cards currently share the bean placeholder;
  drop real per-card photos by setting `src` on each `land-<coffeeId>` slot.

Done: hero + Our Craft photos, email (`tyler@stancraftcoffee.com`), and the
Facebook/Instagram links.
