# Stancraft Coffee Co — Landing Site

Temporary one-page site (pre-Shopify), built from the Stancraft design system.
Vite + React, deployed to Cloudflare Pages from `main`.

## Develop

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the built dist/
```

## Deploy — Cloudflare Pages (GitHub integration)

Every push to `main` on `github.com/outlawcam/coffee` builds and deploys; pull
requests get preview URLs. **One-time setup (manual, in the Cloudflare
dashboard — cannot be scripted):**

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git**. Authorize Cloudflare's GitHub app for the `outlawcam`
   account and select the `coffee` repository.
2. Build settings:
   - **Framework preset:** Vite (or None)
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Production branch:** `main`
   - Node version is pinned by `.nvmrc` (20).
3. Save & deploy. Add a custom domain later under the project's **Custom
   domains** tab if desired.

## Content follow-ups (placeholders from the design)

- `src/sections/WhereToBuy.jsx` — real café names + shop URLs; market/email links.
- `src/sections/MegaFooter.jsx` — real Facebook & Instagram URLs.
- Image slots (hero background, Our Craft photo, per-coffee photos) ship as
  placeholders; drop real photography by setting `src` on the `<image-slot>`s.
- Confirm `orders@stancraft.co` / `wholesale@stancraft.co` are live addresses.
