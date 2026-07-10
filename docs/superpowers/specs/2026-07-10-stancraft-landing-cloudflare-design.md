# Stancraft Landing Site → Cloudflare Pages Design

Date: 2026-07-10

## Context

The "Stancraft Coffee Co" design system lives as a claude.ai/design project
(`65aedf1a-7157-41a0-8886-6df81070c2ac`). It contains design tokens, a prebuilt
component bundle, and two UI kits: an interactive **storefront** prototype
(Home/Shop/PDP/Cart) and a one-page **landing** site explicitly authored as a
"temporary pre-Shopify site." Separately, this repo (`coffee`) already holds a
design doc for a future Shopify theme (`2026-07-07-shopify-scaffolding-design.md`).

This design covers standing up the **landing site as a real, production static
build deployed to Cloudflare Pages** via a GitHub → CF Pages pipeline. It is the
public site that runs while the Shopify store is being built. The storefront kit
is a design prototype and is out of scope here.

## Decisions

- **Scope: landing page only** (`ui_kits/landing`). The storefront kit has no
  real backend/checkout and is not deployed.
- **Build: Vite production build.** JSX is precompiled at build time; a pinned
  production React and all other dependencies (fonts, icons) are self-hosted and
  bundled. No runtime CDN dependency, no in-browser Babel.
- **Repo: `coffee`**, pushed to `github.com/outlawcam/coffee` (already exists,
  public, empty). Local repo currently has no remote.
- **Layout: repo root.** The Vite project lives at the repository root; the
  existing `docs/` tree is retained.
- **Pipeline: Cloudflare Pages Git integration.** CF Pages connects to the
  GitHub repo and builds on every push (build command `npm run build`, output
  `dist`). No repo secrets and no GitHub Actions workflow. The one-time dashboard
  connect (authorizing Cloudflare's GitHub App) is a manual human handoff.

## Source material (imported from the design project)

Pulled locally from the design MCP into the repo:

- **Styles:** `styles.css` (entry, `@import`s the tokens) + `tokens/*.css`
  (`fonts.css`, `colors.css`, `flavors.css`, `typography.css`, `layout.css`).
- **Component bundle:** `_ds_bundle.js` — a prebuilt UMD exposing
  `window.StancraftCoffeeDesignSystem_65aedf.{Button, ...}`. Vendored as-is.
- **Landing kit** (`ui_kits/landing/`): `index.html` (contains inline
  `Nav`/`Hero`/`App`), the section components `Products.jsx`, `Craft.jsx`,
  `WhereToBuy.jsx`, `Wholesale.jsx`, `MegaFooter.jsx`, plus `coffees.js`
  (sets `window.STANCRAFT_COFFEES`, the 11-coffee catalog) and `image-slot.js`
  (the `<image-slot>` custom element).
- **Assets:** `logo-stancraft.svg`, `logo-stancraft-white.svg`, `favicon.svg`,
  `bean-placeholder-50.png`, `sca-member-white.png`, and any other assets the
  landing components reference. (The storefront-only assets are not imported.)

The exact reference list is verified against the components during
implementation; anything a landing component references that is missing is
pulled before the build is considered done.

## Runtime contract of the design files

The landing components are plain functions (not ES modules) that depend on
globals, matching the original in-browser-Babel setup:

- `React` (global) — used for hooks and JSX runtime.
- `window.STANCRAFT_COFFEES` — catalog data from `coffees.js`.
- `window.StancraftCoffeeDesignSystem_65aedf.Button` — the only DS component the
  landing kit consumes (raw elements are used elsewhere).
- `window.lucide` + `lucide.createIcons()` — icon rendering.
- `window.__resources.logoDark` — logo path (with a `../../assets` fallback).
- `<image-slot>` custom element — user-fillable image placeholder.

The build **preserves this global-based shape** rather than refactoring to
idiomatic imports, to avoid visual regressions against the approved design.

## Build architecture

A Vite (vanilla, React JSX) project at the repo root:

1. **Entry module** (`src/main.jsx` or similar):
   - `import React from 'react'` and `import ReactDOM from 'react-dom/client'`,
     then assign `window.React`/`window.ReactDOM` **before** importing
     `_ds_bundle.js`, so the vendored UMD bundle resolves React from the global
     (its exact React consumption is confirmed during implementation and the
     wiring adjusted if it differs).
   - Import `styles.css` (Vite bundles/hashes it and its token `@import`s).
   - Import the vendored `_ds_bundle.js`, `image-slot` shim, and `coffees.js`
     (side-effect imports that populate globals / register the custom element).
   - Import the section components and the `Nav`/`Hero`/`App` composition
     migrated out of `index.html`, then `createRoot(...).render(<App/>)`.
   - Call `lucide.createIcons()` after render (same as the original `useEffect`).
2. **JSX transform:** Vite/esbuild at build time. The `.jsx` section files are
   converted from global-script functions to modules that the entry imports;
   their bodies (styles, markup, hooks) are otherwise unchanged.
3. **Output:** `dist/` — a single `index.html` plus hashed JS/CSS/font/asset
   files. The page is one document with in-page hash anchors (`#products`,
   `#craft`, `#where`, `#wholesale`); no client router and no SPA redirect rule
   needed.

### Neutralizing design-tool-isms

- **Fonts:** replace the Google-Fonts `@import` in `tokens/fonts.css` with
  self-hosted `@fontsource/montserrat` and `@fontsource/spectral` (pinned,
  bundled). The weights/styles used by the tokens are covered.
- **Icons:** bundle the `lucide` npm package; keep the `<i data-lucide="...">`
  markup and the `createIcons()` call. Remove the `unpkg` script tag.
- **`<image-slot>`:** vendor a **trimmed production custom element** under the
  same tag name. Outside the design tool the drag-to-fill/persistence is inert,
  so the production element simply renders its `src` image (honoring the `fit`
  attribute) when present, and a neutral empty box otherwise — no authoring
  placeholder text/chrome. The section JSX is left untouched. Result: cards show
  the bean placeholder image; the hero shows its espresso background + scrim.
  Real photography is a later content drop-in (set `src`s), not a launch blocker.
- **Assets & paths:** assets are served from a stable `/assets/...` path (via
  `public/assets/` or Vite asset handling). `window.__resources` is set to point
  at `/assets/logo-stancraft.svg` (and white variant), and the `../../assets`
  relative references in the components are normalized to the served path.

## Repo structure (result)

```
coffee/
  index.html              # Vite entry HTML (mounts #root)
  package.json            # react, react-dom, vite, @fontsource/*, lucide
  vite.config.js
  .nvmrc                  # Node version for CF Pages build
  src/
    main.jsx              # entry: globals wiring + mount
    styles.css            # + tokens/ (imported)
    tokens/*.css
    vendor/_ds_bundle.js
    vendor/image-slot.js  # trimmed production custom element
    data/coffees.js
    sections/Products.jsx Craft.jsx WhereToBuy.jsx Wholesale.jsx MegaFooter.jsx
    sections/App.jsx      # Nav + Hero + App (migrated from index.html)
  public/
    assets/               # logos, favicon, placeholders, SCA mark
  docs/                   # existing specs (retained)
  .gitignore              # node_modules, dist
```

(Exact folder names finalized in the implementation plan; the shape is what
matters.)

## Deployment pipeline (CF Pages Git integration)

- Local `coffee` repo gets its remote set to `github.com/outlawcam/coffee`
  (the `outlawcam` GitHub account is the active `gh` auth) and the initial
  commit(s) pushed to `main`.
- **Manual human handoff (one-time):** in the Cloudflare dashboard, create a
  Pages project connected to `outlawcam/coffee` and authorize Cloudflare's
  GitHub App. This OAuth flow cannot be automated headless. Build settings:
  - Framework preset: none / Vite
  - Build command: `npm run build`
  - Build output directory: `dist`
  - Node version: pinned via `.nvmrc` (and/or `NODE_VERSION` env)
- After connection, pushes to `main` auto-deploy to production; PRs get preview
  deployments. No secrets stored in the repo.

Handoff instructions are written into the repo (README or a deploy doc) so the
dashboard steps are explicit, mirroring the Shopify handoff pattern.

## Testing / validation

- **Local build:** `npm run build` succeeds and `npm run preview` serves `dist`
  with no console errors and no outbound requests to `unpkg`/Google Fonts
  (verifies self-hosting).
- **Visual parity:** the rendered page matches the design project's landing kit
  — nav, hero, products grid with brew-method filter, Our Craft, Where to Buy,
  Wholesale form (with its client-side success state), and the mega footer.
- **Icons/fonts:** Lucide glyphs render; Montserrat/Spectral load from bundled
  files.
- **Post-deploy:** the CF Pages production URL serves the site and a PR produces
  a working preview URL (verified after the manual dashboard connect).

## Out of scope / deferred

- The **storefront** UI kit (design prototype; no deployment target here).
- Real **photography/content** for image slots (ships with placeholders).
- Wiring the **Wholesale inquiry form** to a real backend/email — it keeps its
  client-side success state for now.
- Anything **Shopify** (covered by the separate scaffolding design doc).
- A custom **domain** for the Pages project (can be added in the dashboard
  later).
