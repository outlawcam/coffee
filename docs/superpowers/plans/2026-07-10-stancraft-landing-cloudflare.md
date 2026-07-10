# Stancraft Landing Site on Cloudflare Pages — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Stancraft design system's `landing` UI kit as a production Vite static build, deployed to Cloudflare Pages via GitHub (`outlawcam/coffee`).

**Architecture:** A Vite project at the repo root bundles a pinned production React, self-hosted fonts (@fontsource) and icons (lucide), the design system's prebuilt component bundle, and the landing section components. The design's global-based runtime shape is preserved (components read `window.React`, `window.STANCRAFT_COFFEES`, `window.StancraftCoffeeDesignSystem_65aedf`, and a `<image-slot>` custom element) rather than refactored to ES imports, so the rendered output matches the approved design. Output is a single hashed static `dist/` with zero runtime CDN dependency.

**Tech Stack:** Vite 5 (esbuild JSX, **no** `@vitejs/plugin-react`), React 18.3.1, `@fontsource/montserrat` + `@fontsource/spectral`, `lucide`, Cloudflare Pages Git integration.

**Design source:** claude.ai/design project `65aedf1a-7157-41a0-8886-6df81070c2ac`, read via the `DesignSync` tool (`get_file` per path). All "import X" steps mean: `DesignSync get_file` that path, then write it locally.

## Global Constraints

- **Landing kit only.** Do not import or build the storefront kit.
- **No runtime third-party requests.** The built site must not fetch from `unpkg.com`, `fonts.googleapis.com`, `fonts.gstatic.com`, or load `@babel/standalone`. All deps bundled/self-hosted.
- **React pinned to 18.3.1**, react-dom 18.3.1 (matches the design bundle).
- **Do NOT use `@vitejs/plugin-react`** — its Fast-Refresh transform corrupts the precompiled `_ds_bundle.js` IIFE. Use esbuild JSX (`esbuild: { jsx: 'automatic' }`).
- **`window.React` must be assigned before the app's first render** so `_ds_bundle.js`'s bare `React` reference resolves.
- **Preserve design content verbatim**, including the design's own content placeholders (`href="#"` café/social links, `orders@stancraft.co`). These are tracked as content follow-ups in Task 6, not fixed here.
- **Project lives at repo root** of `/Users/cbeck/dev/coffee`. Branch: `feat/landing-cloudflare` (already checked out).
- **Node 20** for the Cloudflare build (`.nvmrc`).
- **Asset paths served from `/assets/...`** (from `public/assets/`).

## File Structure

```
coffee/
  index.html                      # Vite entry HTML (mounts #root, global <style>)
  package.json
  vite.config.js
  .nvmrc                          # "20"
  .gitignore                      # node_modules, dist, .DS_Store
  src/
    main.jsx                      # entry: vendor wiring, globals, fonts, mount
    styles.css                    # imported (design entry; @imports tokens)
    tokens/
      fonts.css                   # EDITED: Google @import removed
      colors.css flavors.css typography.css layout.css   # verbatim
    vendor/
      react-global.js             # sets window.React / window.ReactDOM
      _ds_bundle.js               # verbatim design bundle (IIFE → window namespace)
      image-slot.js               # AUTHORED production custom element (replaces design's)
    data/
      coffees.js                  # verbatim (sets window.STANCRAFT_COFFEES)
    sections/
      App.jsx                     # AUTHORED: Nav + Hero + App (migrated from landing index.html)
      Products.jsx Craft.jsx WhereToBuy.jsx Wholesale.jsx MegaFooter.jsx   # imported + light edits
  public/
    assets/
      logo-stancraft.svg logo-stancraft-white.svg favicon.svg
      bean-placeholder-50.png sca-member-white.png
  docs/superpowers/               # existing specs + this plan (retained)
```

---

### Task 1: Scaffold the Vite project

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `.nvmrc`, `.gitignore`, `src/main.jsx`

**Interfaces:**
- Produces: an `npm run build` script emitting `dist/`, and `#root` mount point consumed by every later task.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "stancraft-landing",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview --port 4173"
  },
  "dependencies": {
    "react": "18.3.1",
    "react-dom": "18.3.1",
    "lucide": "^0.460.0",
    "@fontsource/montserrat": "^5.0.0",
    "@fontsource/spectral": "^5.0.0"
  },
  "devDependencies": {
    "vite": "^5.4.0"
  }
}
```

- [ ] **Step 2: Create `vite.config.js`**

```js
import { defineConfig } from 'vite';

// No @vitejs/plugin-react: its Fast-Refresh transform corrupts the precompiled
// _ds_bundle.js IIFE. esbuild handles JSX in .jsx files directly.
export default defineConfig({
  esbuild: { jsx: 'automatic' },
  build: { outDir: 'dist', emptyOutDir: true },
});
```

- [ ] **Step 3: Create `index.html`** (root). The global `<style>` is migrated verbatim from the design's `ui_kits/landing/index.html` head.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>Stancraft Coffee Co</title>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg" />
<style>
  html { scroll-behavior: smooth; }
  html, body { margin: 0; background: var(--paper-100); }
  a { color: var(--accent); }
  a:hover { color: var(--accent-hover); }
  .navlink { position: relative; }
  .navlink::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px; background: var(--accent); transform: scaleX(0); transform-origin: left; transition: transform var(--dur) var(--ease-standard); }
  .navlink:hover::after { transform: scaleX(1); }
</style>
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 4: Create `.nvmrc`**

```
20
```

- [ ] **Step 5: Create `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 6: Create a temporary `src/main.jsx` smoke entry**

```jsx
import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40, fontFamily: 'sans-serif' }}>Scaffold OK</div>
);
```

- [ ] **Step 7: Install and build**

Run: `cd /Users/cbeck/dev/coffee && npm install && npm run build`
Expected: install succeeds; build writes `dist/index.html` and a hashed JS asset; no errors.

- [ ] **Step 8: Commit**

```bash
cd /Users/cbeck/dev/coffee
git add package.json package-lock.json vite.config.js index.html .nvmrc .gitignore src/main.jsx
git commit -m "Scaffold Vite project for Stancraft landing site"
```

---

### Task 2: Import design tokens, styles, fonts, and assets

**Files:**
- Create: `src/styles.css`, `src/tokens/{fonts,colors,flavors,typography,layout}.css`
- Create: `public/assets/{logo-stancraft.svg,logo-stancraft-white.svg,favicon.svg,bean-placeholder-50.png,sca-member-white.png}`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `#root` and the entry from Task 1.
- Produces: design CSS variables (`--paper-100`, `--accent`, `--font-display`, etc.) available globally; self-hosted Montserrat/Spectral; assets served at `/assets/...`.

- [ ] **Step 1: Import CSS from the design project** — `DesignSync get_file` each of these and write to the matching local path:
  - `styles.css` → `src/styles.css`
  - `tokens/fonts.css` → `src/tokens/fonts.css`
  - `tokens/colors.css` → `src/tokens/colors.css`
  - `tokens/flavors.css` → `src/tokens/flavors.css`
  - `tokens/typography.css` → `src/tokens/typography.css`
  - `tokens/layout.css` → `src/tokens/layout.css`

- [ ] **Step 2: Edit `src/tokens/fonts.css`** — remove the Google Fonts `@import` line (fonts are bundled via @fontsource in the entry). Replace the whole file with:

```css
/* Stancraft Coffee — Webfonts.
 * Montserrat (headlines, CTAs, labels) + Spectral (body serif).
 * Self-hosted via @fontsource, imported in src/main.jsx — do NOT re-add the
 * Google Fonts @import (keeps the build free of runtime CDN requests).
 */
```

- [ ] **Step 3: Verify token family names** — confirm `src/tokens/typography.css` sets `--font-display` to a `Montserrat` family and `--font-body` to a `Spectral` family. `@fontsource/montserrat` and `@fontsource/spectral` register those exact family names, so the variables resolve. If the family strings differ, adjust the @fontsource import or add matching `@font-face` — but they are expected to match.

- [ ] **Step 4: Import assets from the design project** — `DesignSync get_file` each and write to `public/assets/`:
  - `assets/logo-stancraft.svg` (text)
  - `assets/logo-stancraft-white.svg` (text)
  - `assets/favicon.svg` (text)
  - `assets/bean-placeholder-50.png` (binary; response has `isBase64: true` — decode base64 to bytes, e.g. `printf %s "<data>" | base64 -d > public/assets/bean-placeholder-50.png`)
  - `assets/sca-member-white.png` (binary; same base64 handling)

- [ ] **Step 5: Wire styles + fonts into `src/main.jsx`** (replace file contents)

```jsx
import './styles.css';

// Self-hosted fonts (weights used by the design tokens).
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/600-italic.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/spectral/300.css';
import '@fontsource/spectral/400.css';
import '@fontsource/spectral/400-italic.css';
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';

import { createRoot } from 'react-dom/client';
createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40, fontFamily: 'var(--font-body)', background: 'var(--paper-100)' }}>
    Tokens + fonts OK
  </div>
);
```

- [ ] **Step 6: Build and verify no external font requests**

Run: `cd /Users/cbeck/dev/coffee && npm run build && grep -rER "fonts.googleapis|fonts.gstatic|unpkg.com" dist || echo "NO EXTERNAL REFS"`
Expected: build succeeds; grep prints `NO EXTERNAL REFS`.

- [ ] **Step 7: Commit**

```bash
git add src/styles.css src/tokens public/assets src/main.jsx
git commit -m "Import Stancraft tokens, styles, self-hosted fonts, and assets"
```

---

### Task 3: Vendor the component bundle, wire the React global, and add the image-slot shim

**Files:**
- Create: `src/vendor/react-global.js`, `src/vendor/_ds_bundle.js`, `src/vendor/image-slot.js`, `src/data/coffees.js`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: `react`, `react-dom` (Task 1).
- Produces: `window.React`, `window.ReactDOM`; `window.StancraftCoffeeDesignSystem_65aedf.{Button,Input,Select,...}`; `window.STANCRAFT_COFFEES`; a registered `<image-slot>` custom element.

- [ ] **Step 1: Create `src/vendor/react-global.js`**

```js
// _ds_bundle.js references a bare global `React`. Expose the bundled React on
// window BEFORE the bundle is imported so that reference resolves.
import React from 'react';
import * as ReactDOM from 'react-dom';
window.React = React;
window.ReactDOM = ReactDOM;
```

- [ ] **Step 2: Import the component bundle** — `DesignSync get_file` `_ds_bundle.js` → `src/vendor/_ds_bundle.js` (verbatim; it is an IIFE that assigns `window.StancraftCoffeeDesignSystem_65aedf`).

- [ ] **Step 3: Import the catalog** — `DesignSync get_file` `ui_kits/landing/coffees.js` → `src/data/coffees.js` (verbatim; sets `window.STANCRAFT_COFFEES`).

- [ ] **Step 4: Create `src/vendor/image-slot.js`** — a lean production replacement for the design tool's authoring element. Same tag name and attributes (`src`, `fit`, `shape`, `radius`), but no drag/persistence: renders the `src` image if present, else an empty transparent box.

```js
// Production <image-slot>: renders its `src` (honoring `fit`), else nothing.
// The design tool's drag-to-fill/persistence is inert outside that runtime,
// so this ships graceful placeholders (real photos = set a `src` later).
if (!customElements.get('image-slot')) {
  customElements.define('image-slot', class extends HTMLElement {
    connectedCallback() { this.render(); }
    static get observedAttributes() { return ['src', 'fit']; }
    attributeChangedCallback() { if (this.isConnected) this.render(); }
    render() {
      const src = this.getAttribute('src');
      const fit = this.getAttribute('fit') || 'cover';
      this.style.display = 'block';
      this.style.width = '100%';
      this.style.height = '100%';
      this.innerHTML = '';
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = this.getAttribute('placeholder') || '';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = fit;
        img.style.display = 'block';
        this.appendChild(img);
      }
    }
  });
}
```

- [ ] **Step 5: Wire vendor imports into `src/main.jsx`** — insert these imports **above** the fonts/styles imports so the namespace exists before any component module runs. The file now starts:

```jsx
import './vendor/react-global.js';
import './vendor/_ds_bundle.js';
import './data/coffees.js';
import './vendor/image-slot.js';

import './styles.css';
// ...(the @fontsource imports from Task 2 remain here)...
```

- [ ] **Step 6: Smoke-test the bundle renders** — temporarily replace the render call in `src/main.jsx` with a Button from the namespace:

```jsx
import { createRoot } from 'react-dom/client';
const { Button } = window.StancraftCoffeeDesignSystem_65aedf;
createRoot(document.getElementById('root')).render(
  <div style={{ padding: 40 }}>
    <Button variant="primary">Add to cart</Button>
    <image-slot style={{ display: 'block', width: 200, height: 200 }} src="/assets/bean-placeholder-50.png" fit="contain"></image-slot>
  </div>
);
```

- [ ] **Step 7: Build and preview**

Run: `cd /Users/cbeck/dev/coffee && npm run build && npm run preview &` then `sleep 2 && curl -s localhost:4173 | grep -q root && echo SERVED; kill %1`
Expected: build succeeds; page served. (Visual button/image check happens in Task 5.)

- [ ] **Step 8: Commit**

```bash
git add src/vendor src/data/coffees.js src/main.jsx
git commit -m "Vendor DS bundle, wire React global, add image-slot production shim"
```

---

### Task 4: Import and modularize the landing section components

**Files:**
- Create: `src/sections/{Products,Craft,WhereToBuy,Wholesale,MegaFooter}.jsx`

**Interfaces:**
- Consumes: `window.React`, `window.STANCRAFT_COFFEES`, `window.StancraftCoffeeDesignSystem_65aedf` (Task 3).
- Produces: named exports `Products`, `Craft`, `WhereToBuy`, `Wholesale`, `MegaFooter` consumed by `App.jsx` (Task 5).

For each file: `DesignSync get_file` `ui_kits/landing/<Name>.jsx` → `src/sections/<Name>.jsx`, then apply the edits below. The component bodies (styles/markup) are otherwise unchanged.

- [ ] **Step 1: `Products.jsx`** — prepend `import React from 'react';`; change the top-level `function Products()` to `export function Products()`; and normalize the one asset path — change `src="../../assets/bean-placeholder-50.png"` to `src="/assets/bean-placeholder-50.png"`. (Helper functions `CoffeeCard`/`CoffeeGroup` stay module-private.)

- [ ] **Step 2: `Craft.jsx`** — prepend `import React from 'react';`; change `function Craft()` to `export function Craft()`.

- [ ] **Step 3: `WhereToBuy.jsx`** — prepend `import React from 'react';`; change `function WhereToBuy()` to `export function WhereToBuy()`.

- [ ] **Step 4: `Wholesale.jsx`** — prepend `import React from 'react';`; **remove** the module-level line `const { Button: WButton, Input: WInput, Select: WSelect, Badge: WBadge } = window.StancraftCoffeeDesignSystem_65aedf;` and instead put that destructure as the **first line inside** `function Wholesale()` (so it runs at render, never at import — removes any import-order fragility). Change `function Wholesale()` to `export function Wholesale()`.

  The function's first lines become:
```jsx
export function Wholesale() {
  const { Button: WButton, Input: WInput, Select: WSelect, Badge: WBadge } = window.StancraftCoffeeDesignSystem_65aedf;
  const [sent, setSent] = React.useState(false);
  // ...rest unchanged...
```

- [ ] **Step 5: `MegaFooter.jsx`** — prepend `import React from 'react';`; change `function MegaFooter()` to `export function MegaFooter()`. (The module-level `SOCIAL_ICONS` object contains JSX; keep it — esbuild compiles it, and `React` is imported.)

- [ ] **Step 6: Type-check the imports compile** — build with a throwaway import in `main.jsx` is deferred to Task 5; here just confirm no syntax errors by building.

Run: `cd /Users/cbeck/dev/coffee && npm run build`
Expected: build succeeds (unused modules are tree-shaken; this verifies each file parses/transforms).

- [ ] **Step 7: Commit**

```bash
git add src/sections
git commit -m "Import and modularize landing section components"
```

---

### Task 5: Build the App shell, mount the full site, and verify

**Files:**
- Create: `src/sections/App.jsx`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: the five section exports (Task 4); `window.__resources`; `lucide` (npm); the DS `Button`.
- Produces: the mounted landing page (`App`), the deliverable of this plan.

- [ ] **Step 1: Create `src/sections/App.jsx`** — Nav + Hero + App migrated from the design's `ui_kits/landing/index.html` inline script. Lucide comes from the npm package; icons used across the page are `flame, sprout, bean, tent, coffee, mail, arrow-up-right, check` plus the DS `Button`.

```jsx
import React from 'react';
import { createIcons, Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check } from 'lucide';
import { Products } from './Products.jsx';
import { Craft } from './Craft.jsx';
import { WhereToBuy } from './WhereToBuy.jsx';
import { Wholesale } from './Wholesale.jsx';
import { MegaFooter } from './MegaFooter.jsx';

const { useEffect } = React;
const LUCIDE_ICONS = { Flame, Sprout, Bean, Tent, Coffee, Mail, ArrowUpRight, Check };

function Nav() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  const links = [['#products', 'Products'], ['#craft', 'Our Craft'], ['#where', 'Where to Buy']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 40px', background: 'var(--paper-100)', borderBottom: '1px solid var(--border-hairline)' }}>
      <a href="#top" style={{ display: 'flex' }}>
        <img src={(window.__resources && window.__resources.logoDark) || "/assets/logo-stancraft.svg"} alt="Stancraft Coffee Co" style={{ height: 31 }} />
      </a>
      <nav style={{ display: 'flex', gap: 34, alignItems: 'center' }}>
        {links.map(([href, label]) => (
          <a key={href} href={href} className="navlink" style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-900)', textDecoration: 'none' }}>{label}</a>
        ))}
        <NavButton as="a" href="#wholesale" variant="primary" size="sm">Wholesale inquiry</NavButton>
      </nav>
    </header>
  );
}

function Hero() {
  const { Button: NavButton } = window.StancraftCoffeeDesignSystem_65aedf;
  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', background: 'var(--espresso-900)', padding: '116px 40px 108px', borderBottom: '1px solid rgba(255,255,255,0.10)' }}>
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <image-slot id="land-hero-bg" shape="rect" fit="cover" placeholder="Hero background — drop a dark, full-bleed photo"></image-slot>
      </div>
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'linear-gradient(90deg, rgba(26,20,15,0.90) 0%, rgba(26,20,15,0.72) 44%, rgba(26,20,15,0.38) 100%)' }}></div>
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 1200, margin: '0 auto', pointerEvents: 'none' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'var(--ink-300)', margin: '0 0 22px' }}>The full shop is brewing</p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 62, lineHeight: 1.0, letterSpacing: '-0.025em', color: 'var(--paper-100)', margin: 0, maxWidth: '18ch' }}>
          Good coffee, while the store catches up.
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 20, lineHeight: 1.55, color: 'var(--paper-200)', maxWidth: '54ch', margin: '26px 0 34px' }}>
          We're standing up our online store. Until then, here's the whole lineup, the way we work, and how to pour Stancraft at your café. Whole bean, roasted to order.
        </p>
        <div style={{ display: 'flex', gap: 14, pointerEvents: 'auto' }}>
          <NavButton as="a" href="#products" variant="primary" size="lg">See the coffee</NavButton>
          <NavButton as="a" href="#craft" variant="outline" size="lg" style={{ color: 'var(--paper-100)', borderColor: 'var(--paper-100)' }}>Our craft</NavButton>
        </div>
      </div>
    </section>
  );
}

export function App() {
  useEffect(() => { createIcons({ icons: LUCIDE_ICONS }); });
  return (
    <div style={{ fontFamily: 'var(--font-body)' }}>
      <Nav />
      <Hero />
      <Products />
      <Craft />
      <WhereToBuy />
      <Wholesale />
      <MegaFooter />
    </div>
  );
}
```

- [ ] **Step 2: Finalize `src/main.jsx`** — set `window.__resources`, import `App`, and render it. Full file:

```jsx
import './vendor/react-global.js';
import './vendor/_ds_bundle.js';
import './data/coffees.js';
import './vendor/image-slot.js';

import './styles.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/600-italic.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/montserrat/800.css';
import '@fontsource/montserrat/900.css';
import '@fontsource/spectral/300.css';
import '@fontsource/spectral/400.css';
import '@fontsource/spectral/400-italic.css';
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';

import { createRoot } from 'react-dom/client';
import { App } from './sections/App.jsx';

window.__resources = {
  logoDark: '/assets/logo-stancraft.svg',
  logoWhite: '/assets/logo-stancraft-white.svg',
  scaLogo: '/assets/sca-member-white.png',
};

createRoot(document.getElementById('root')).render(<App />);
```

- [ ] **Step 3: Build**

Run: `cd /Users/cbeck/dev/coffee && npm run build`
Expected: build succeeds; `dist/` contains `index.html`, hashed JS/CSS, and font files under `dist/assets`.

- [ ] **Step 4: Verify zero external runtime references in the build**

Run: `cd /Users/cbeck/dev/coffee && grep -rER "unpkg.com|fonts.googleapis|fonts.gstatic|@babel/standalone|babel.min.js" dist && echo "FOUND — FAIL" || echo "CLEAN"`
Expected: `CLEAN`.

- [ ] **Step 5: Visual parity check** — serve and inspect the running page against the design (use the `run`/`verify` skill or a manual browser open).

Run: `cd /Users/cbeck/dev/coffee && npm run preview`
Then open `http://localhost:4173` and confirm:
  - Sticky nav with wordmark + red "Wholesale inquiry" button; hover underline on links.
  - Hero on espresso background with scrim and two CTAs.
  - Products: two groups (Organic / Non-organic), 4-up grid, bean placeholder images, brew-method filter pills toggle and filter the grid.
  - Our Craft: espresso section, three principle rows with Lucide glyphs (flame/sprout/bean).
  - Where to Buy: three columns with tent/coffee/mail glyphs and arrow-up-right links.
  - Wholesale: pitch + form; submitting shows the "Inquiry received." success state; "Send another" resets.
  - Mega footer: white wordmark, blurb, Facebook/Instagram links, SCA/CVA trustmark, bottom bar.
  - Browser devtools Network tab shows no requests to unpkg/google font hosts; no console errors.

- [ ] **Step 6: Commit**

```bash
git add src/sections/App.jsx src/main.jsx
git commit -m "Assemble and mount full Stancraft landing page"
```

---

### Task 6: Push to GitHub and write the Cloudflare Pages deploy handoff

**Files:**
- Create: `README.md`

**Interfaces:**
- Consumes: the built, committed project (Tasks 1–5).
- Produces: `outlawcam/coffee` populated on GitHub; human handoff instructions for the one-time CF Pages dashboard connect.

- [ ] **Step 1: Create `README.md`** with build/run instructions, the deploy pipeline, the one-time Cloudflare dashboard connect, and the content follow-ups (the design's own placeholders).

````markdown
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
````

- [ ] **Step 2: Commit the README**

```bash
cd /Users/cbeck/dev/coffee
git add README.md
git commit -m "Add landing site README and Cloudflare Pages deploy handoff"
```

- [ ] **Step 3: Merge the feature branch to `main`** (CF Pages deploys from `main`)

```bash
cd /Users/cbeck/dev/coffee
git checkout main
git merge --no-ff feat/landing-cloudflare -m "Merge landing site (Vite + Cloudflare Pages)"
```

- [ ] **Step 4: Set the remote and push** (repo `outlawcam/coffee` already exists, empty; `gh` active account is `outlawcam`)

```bash
cd /Users/cbeck/dev/coffee
git remote add origin https://github.com/outlawcam/coffee.git
git push -u origin main
```

Expected: `main` appears on `github.com/outlawcam/coffee` with the full project.

- [ ] **Step 5: Hand off** — tell the user the code is pushed and give them the Cloudflare dashboard steps from the README (Step 1). The site goes live once they complete the one-time Git connect. Confirm the production URL and a PR preview after they connect (verification that can only happen post-connect).

---

## Self-Review

**Spec coverage:**
- Landing-only scope → Tasks import only landing files. ✓
- Vite production build, JSX precompiled → Tasks 1/4/5 (esbuild JSX, no CDN Babel). ✓
- Self-host React/fonts/icons, no runtime CDN → Task 1 deps, Task 2 fonts, Task 3 bundle/react-global, Task 5 lucide; verified Task 2 Step 6 + Task 5 Step 4. ✓
- Global-based runtime preserved → `react-global.js`, `window.__resources`, section edits keep globals. ✓
- `<image-slot>` production shim → Task 3 Step 4. ✓
- Repo root layout → File Structure + all paths. ✓
- Push to `outlawcam/coffee`, CF Pages Git integration, manual dashboard handoff → Task 6. ✓
- Image slots ship as placeholders; content follow-ups documented → image-slot shim + README. ✓

**Placeholder scan:** No plan-level TBD/TODO/"handle edge cases". The `href="#"`/email strings are the design's own content, imported verbatim and tracked in the README (intentional, per Global Constraints). ✓

**Type consistency:** Section exports (`Products`, `Craft`, `WhereToBuy`, `Wholesale`, `MegaFooter`, `App`) match their imports in `App.jsx`/`main.jsx`. `window.StancraftCoffeeDesignSystem_65aedf`, `window.__resources` (logoDark/logoWhite/scaLogo), `window.STANCRAFT_COFFEES`, and `<image-slot>` attributes (`src`/`fit`/`shape`/`placeholder`) are consistent across tasks. Lucide named imports match the `data-lucide` glyphs used in the sections. ✓
