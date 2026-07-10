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

This is a **static-assets deploy**: `wrangler.jsonc` declares `assets.directory:
./dist` with no server-side Worker (`main` is intentionally omitted), so
`wrangler deploy` uploads the built `dist/` directly. This is what the connected
Cloudflare project runs as its deploy command. (An explicit `wrangler.jsonc` is
required — without it, `wrangler deploy` tries to auto-configure the Cloudflare
Vite plugin, which needs Vite ≥ 6; we pin Vite 5, so we route it to a plain
static-assets deploy instead.)

**One-time setup (manual, in the Cloudflare dashboard — cannot be scripted):**

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a
   repository**. Authorize Cloudflare's GitHub app for the `outlawcam` account
   and select the `coffee` repository.
2. Build settings:
   - **Build command:** `npm run build`
   - **Deploy command:** `npx wrangler deploy` (reads `wrangler.jsonc`)
   - Node version is pinned by `.nvmrc` (20).
3. Save & deploy. Add a custom domain later under the project's **Domains &
   Routes** (Settings) tab if desired.

## Content follow-ups (placeholders from the design)

- `src/sections/WhereToBuy.jsx` — real café names + shop URLs; market/email links.
- `src/sections/MegaFooter.jsx` — real Facebook & Instagram URLs.
- Image slots (hero background, Our Craft photo, per-coffee photos) ship as
  placeholders; drop real photography by setting `src` on the `<image-slot>`s.
- Confirm `orders@stancraft.co` / `wholesale@stancraft.co` are live addresses.
