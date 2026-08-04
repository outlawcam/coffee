# Minimalist August Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a four-section minimalist landing page — Intro, About, Inquiry, Coffees — set entirely in Montserrat on ivory and ink, showing the real 11-coffee lineup with size/price variants.

**Architecture:** A React 18 SPA with no router and no state library. `App.jsx` composes five presentational section components top to bottom. Styling is inline `style` objects reading CSS custom properties, matching the existing repo convention; a new last-loaded token file overrides the botanical palette down to two colors. The coffee lineup is a plain ES module array consumed only by `Coffees.jsx`.

**Tech Stack:** React 18.3.1 (global via `src/vendor/react-global.js`), Vite 5, `@fontsource/montserrat`, CSS custom properties. No new dependencies.

## Global Constraints

- **Branch:** `design/minimalist-august`. Do not merge to `main`.
- **Source of truth for the design:** `docs/superpowers/specs/2026-08-04-minimalist-august-design.md`.
- **Font:** Montserrat only. Spectral is removed. Do not add a serif anywhere.
- **Colors — these five, and nothing else:** ivory `#FBF8F1`, ink `#1A1A1A`, secondary text `#6B635B`, hairline `#D8D2C6`, input fill `#FFFFFF`. Photo placeholder fill `#EDE8DD`. No cherry, gold, blue, or mulberry.
- **Radii:** pill `999px` (navigational buttons), field `6px` (inputs, Submit), photo `14px` (all imagery).
- **Type scale:** headline 800/46px/`-0.03em`; small label 700/14px; mood title 700/14px/`0.04em`/uppercase; body 400/17px/`1.65`; body-large 400/20px; button 700/13px/`0.08em`/uppercase; field label 700/13px; fine print 400/13px.
- **Layout:** content max-width `1120px` centered; section padding `96px` vertical desktop, `64px` mobile.
- **Breakpoints:** two-column sections collapse at `860px`; mood cards stack at `700px`.
- **No new npm dependencies.** No backend calls.
- **Wholesale tier pricing must never render.** Only the RETAIL sheet's prices appear.
- **Do not edit** `src/tokens/colors.css`, `palette-botanical.css`, `flavors.css`, `typography.css`, `layout.css`, or `fonts.css` — other design branches read them.
- **Copy is verbatim from the spec.** Do not reword the bio, the partnership pitch, or the three mood blurbs.
- **Commit after every task.**

### Disclosed addition beyond the spec

The spec's component table omits a section shell. All five sections need the
same wrapper (max-width, centering, vertical padding, bottom hairline), so this
plan adds **`src/components/Section.jsx`** rather than repeating that style
object five times. This is the only file in the plan not named in the spec.

---

### Task 1: Clean slate — palette, fonts, and a rendering Intro

Strips the branch down to the new design language and gets one real section on
screen. The old broadsheet sections are deleted here rather than later so the
app never sits in a half-migrated state.

**Files:**
- Create: `src/tokens/palette-minimal.css`
- Create: `src/components/Section.jsx`
- Create: `src/sections/Intro.jsx`
- Create: `src/sections/Footer.jsx`
- Modify: `src/styles.css` (append one `@import`)
- Modify: `src/main.jsx` (drop 5 Spectral imports, drop the coffees side-effect import)
- Rewrite: `src/sections/App.jsx`
- Delete: `src/sections/Products.jsx`, `src/sections/Craft.jsx`, `src/sections/WhereToBuy.jsx`, `src/sections/Wholesale.jsx`, `src/sections/MegaFooter.jsx`, `src/data/coffees.js`

**Interfaces:**
- Consumes: nothing.
- Produces: `<Section id children last>` from `components/Section.jsx` — `id` is the anchor string, `last` is a boolean suppressing the bottom hairline. `<Intro />` and `<Footer />` take no props. CSS custom properties `--radius-pill`, `--radius-field`, `--radius-photo`, `--shell-max`, `--sect-pad-y`, `--sect-pad-x` become available to all later tasks.

- [ ] **Step 1: Create the palette override**

`src/tokens/palette-minimal.css`:

```css
/* Stancraft Coffee — Minimalist August.
 * Loaded LAST from styles.css so it overrides colors.css and
 * palette-botanical.css. Two colors carry the page: ivory and ink. Cherry,
 * gold, blue, and mulberry are deliberately unused — on a page this bare the
 * photography supplies all the color, and a brand accent would fight it. */

:root {
  /* Ink & paper — the whole palette */
  --ink-900: #1A1A1A;   /* all text, all buttons */
  --ink-500: #6B635B;   /* secondary text, fine print */
  --ink-200: #D8D2C6;   /* hairlines, input borders */
  --paper-000: #FFFFFF; /* input fills */
  --paper-100: #FBF8F1; /* page */
  --photo-fpo: #EDE8DD; /* FPO placeholder fill */

  /* Montserrat everywhere — Spectral is gone on this branch */
  --font-display: 'Montserrat', system-ui, sans-serif;
  --font-body: 'Montserrat', system-ui, sans-serif;

  /* Shape — pill navigates, rect commits */
  --radius-pill: 999px;
  --radius-field: 6px;
  --radius-photo: 14px;

  /* Layout */
  --shell-max: 1120px;
  --sect-pad-y: 96px;
  --sect-pad-x: 40px;

  /* Semantic aliases the rest of the sheet may still reference */
  --bg-page: var(--paper-100);
  --text-strong: var(--ink-900);
  --text-body: var(--ink-900);
  --text-muted: var(--ink-500);
  --border-hairline: var(--ink-200);
  --accent: var(--ink-900);
  --focus-ring: var(--ink-900);
}

@media (max-width: 860px) {
  :root { --sect-pad-y: 64px; --sect-pad-x: 22px; }
}
```

- [ ] **Step 2: Load it last**

Append to `src/styles.css` — it must be the final `@import` so it wins:

```css
@import url("./tokens/palette-minimal.css");
```

- [ ] **Step 3: Drop Spectral and the old data import from `src/main.jsx`**

Delete these six lines:

```js
import './data/coffees.js';
import '@fontsource/spectral/300.css';
import '@fontsource/spectral/400.css';
import '@fontsource/spectral/400-italic.css';
import '@fontsource/spectral/500.css';
import '@fontsource/spectral/600.css';
```

Leave every Montserrat import and the three `window.__resources` entries alone.

- [ ] **Step 4: Create the section shell**

`src/components/Section.jsx`:

```jsx
// Shared section wrapper: max-width shell, vertical rhythm, bottom hairline.
import React from 'react';

export function Section({ id, children, last = false, style }) {
  return (
    <section
      id={id}
      style={{
        padding: 'var(--sect-pad-y) var(--sect-pad-x)',
        borderBottom: last ? 'none' : '1px solid var(--border-hairline)',
        scrollMarginTop: 0,
        ...style,
      }}
    >
      <div style={{ maxWidth: 'var(--shell-max)', margin: '0 auto' }}>{children}</div>
    </section>
  );
}
```

- [ ] **Step 5: Create the Intro**

`src/sections/Intro.jsx`:

```jsx
// Intro — wordmark and a single pill CTA. No nav; this section IS the header.
import React from 'react';

export function Intro() {
  return (
    <section
      id="top"
      style={{
        padding: '150px var(--sect-pad-x) 96px',
        textAlign: 'center',
        borderBottom: '1px solid var(--border-hairline)',
      }}
    >
      <img
        src="/assets/logo-stancraft.svg"
        alt="Stancraft Coffee Co."
        style={{ width: 'min(440px, 82vw)', height: 'auto', display: 'block', margin: '0 auto' }}
      />
      <a
        href="#coffees"
        style={{
          display: 'inline-block',
          marginTop: 56,
          background: 'var(--ink-900)',
          color: 'var(--paper-100)',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textDecoration: 'none',
          padding: '15px 32px',
          borderRadius: 'var(--radius-pill)',
        }}
      >
        Shop here
      </a>
    </section>
  );
}
```

- [ ] **Step 6: Create the Footer**

`src/sections/Footer.jsx`:

```jsx
// Footer — one hairline and the contact line. Deliberately minimal.
import React from 'react';

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-hairline)', padding: '44px var(--sect-pad-x)', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: 13, lineHeight: 1.8, color: 'var(--ink-500)' }}>
        Stancraft Coffee Co. · Lufkin, TX
        <br />
        <a href="mailto:tyler@stancraftcoffee.com" style={{ color: 'var(--ink-900)', textDecoration: 'none' }}>
          tyler@stancraftcoffee.com
        </a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 7: Rewrite `src/sections/App.jsx`**

Sections 2–4 are added in later tasks; this is the full final shape with the
not-yet-built imports commented out so the app runs now.

```jsx
import React from 'react';
import { Intro } from './Intro.jsx';
import { Footer } from './Footer.jsx';
// import { About } from './About.jsx';       // Task 4
// import { Inquiry } from './Inquiry.jsx';   // Task 5
// import { Coffees } from './Coffees.jsx';   // Task 6

export function App() {
  return (
    <div style={{ fontFamily: 'var(--font-body)', background: 'var(--paper-100)', color: 'var(--ink-900)' }}>
      <Intro />
      {/* <About /> */}
      {/* <Inquiry /> */}
      {/* <Coffees /> */}
      <Footer />
    </div>
  );
}
```

Note: the old `App.jsx` called lucide's `createIcons()`. This design uses no
icons, so that goes away. The `lucide` dependency stays in `package.json`
unused — removing it would churn the lockfile for no gain on a design branch.

- [ ] **Step 8: Delete the broadsheet sections**

```bash
git rm src/sections/Products.jsx src/sections/Craft.jsx \
       src/sections/WhereToBuy.jsx src/sections/Wholesale.jsx \
       src/sections/MegaFooter.jsx src/data/coffees.js
```

All six remain on `main`, so this is recoverable.

- [ ] **Step 9: Verify the build and the page**

```bash
npm run build
```

Expected: exits 0, no "failed to resolve import" errors.

```bash
npm run dev
```

Then confirm at `http://localhost:5173`:
- Background is ivory `#FBF8F1`, not the old cream.
- The wordmark renders as one wide black line, centered.
- A black pill reading "SHOP HERE" sits below it; clicking scrolls to the
  bottom of the page (nothing has `id="coffees"` yet — this is expected until
  Task 6).
- The footer hairline and contact line render.
- Browser console is clean.
- DevTools → Computed on `<body>`: `font-family` resolves to Montserrat.

- [ ] **Step 10: Commit**

Stage explicit paths. Do **not** use `git add -A` — the working tree has
untracked files (the price spreadsheet, `src/fonts/`) that must not be
committed.

```bash
git add src/tokens/palette-minimal.css src/components/Section.jsx \
        src/sections/Intro.jsx src/sections/Footer.jsx \
        src/sections/App.jsx src/styles.css src/main.jsx
git commit -m "Minimalist August: palette, Intro, Footer; drop broadsheet sections

Two-color ivory/ink override loaded last from styles.css, Montserrat
everywhere, Spectral dropped. The five broadsheet sections and the old
coffees data are removed; they remain on main."
```

---

### Task 2: Rebuild the coffee data from the price sheet

**Files:**
- Create: `src/data/coffees-2026-07.js`

**Interfaces:**
- Consumes: nothing.
- Produces: named export `COFFEES` — an array of 11 objects, each
  `{ id: string, name: string, origin: string, process: string, profile: 'mellow' | 'curious' | 'funky', sizes: Array<{ label: string, price: number }> }`.
  `sizes` has length 3 for nine coffees and length 1 for the two co-ferments.
  Task 6 consumes `COFFEES`, filters on `profile`, and renders `sizes`.

- [ ] **Step 1: Write the data file**

Transcribed from the RETAIL sheet of
`docs/Stancraft_Coffee_Co._Prices_July_2026.xlsx`. Gram weights map to labels:
227 g → 8 oz, 340 g → 12 oz, 907 g → 2 lb, 2268 g → 5 lb.

`src/data/coffees-2026-07.js`:

```js
// Stancraft Coffee — current offerings, transcribed from the RETAIL sheet of
// docs/Stancraft_Coffee_Co._Prices_July_2026.xlsx (July 2026).
//
// `profile` is the sheet's own "Flavor Profile" column — mellow / curious /
// funky — which is what the Coffees section filters on.
//
// `sizes` is the variant ladder. Nine coffees ship in three sizes; the two
// co-ferments ship only as an 8 oz "ULTRA". Retail prices only — the sheet's
// three wholesale tiers are private and must never render.
//
// Size labels: 227 g = 8 oz, 340 g = 12 oz, 907 g = 2 lb, 2268 g = 5 lb.

const THREE = (a, b, c) => [
  { label: '12 oz', price: a },
  { label: '2 lb', price: b },
  { label: '5 lb', price: c },
];

const ULTRA = [{ label: '8 oz', price: 28 }];

export const COFFEES = [
  // --- Mellow ---
  { id: 'alta-mogiana', name: 'Brazilian Alta Mogiana', origin: 'Brazil',
    process: 'Natural', profile: 'mellow', sizes: THREE(16, 36, 82) },
  { id: 'huehuetenango', name: 'Guatemala Huehuetenango', origin: 'Guatemala',
    process: 'Washed', profile: 'mellow', sizes: THREE(20, 40, 92) },

  // --- Curious ---
  { id: 'colombia-washed', name: 'Colombia', origin: 'Colombia',
    process: 'Washed', profile: 'curious', sizes: THREE(18, 38, 88) },
  { id: 'chechele', name: 'Ethiopia Yirgacheffe (Chechele)', origin: 'Ethiopia',
    process: 'Natural', profile: 'curious', sizes: THREE(22, 44, 100) },
  { id: 'chelbessa', name: 'Ethiopia Yirgacheffe (Chelbessa)', origin: 'Ethiopia',
    process: 'Washed', profile: 'curious', sizes: THREE(22, 44, 100) },
  { id: 'nyeri', name: 'Kenya Nyeri', origin: 'Kenya',
    process: 'Washed', profile: 'curious', sizes: THREE(23, 46, 104) },
  // Process not given in the sheet; carried over from the previous data file.
  { id: 'haraz', name: 'Yemen Sharqui Haraz', origin: 'Yemen',
    process: 'Natural', profile: 'curious', sizes: THREE(32, 68, 148) },

  // --- Funky ---
  { id: 'koke', name: 'Ethiopia Yirgacheffe (Koke)', origin: 'Ethiopia',
    process: 'Honey', profile: 'funky', sizes: THREE(24, 48, 108) },
  { id: 'mundo-maya', name: 'Mexico Mundo Maya', origin: 'Mexico',
    process: 'Natural', profile: 'funky', sizes: THREE(25, 52, 116) },
  { id: 'banana', name: 'Colombia Pink Bourbon Cake Banana', origin: 'Colombia',
    process: 'Co-Ferment', profile: 'funky', sizes: ULTRA },
  { id: 'strawberry', name: 'Colombia Juicy Strawberry', origin: 'Colombia',
    process: 'Co-Ferment', profile: 'funky', sizes: ULTRA },
];
```

- [ ] **Step 2: Run the data assertions and watch them pass**

This checks the transcription against the sheet — counts per profile, unique
ids, the co-ferment special case, and one spot-checked price row.

```bash
node --input-type=module -e "
import { COFFEES } from './src/data/coffees-2026-07.js';
const fail = (m) => { console.error('FAIL: ' + m); process.exit(1); };
const by = (p) => COFFEES.filter(c => c.profile === p);
if (COFFEES.length !== 11) fail('expected 11 coffees, got ' + COFFEES.length);
if (by('mellow').length !== 2) fail('expected 2 mellow, got ' + by('mellow').length);
if (by('curious').length !== 5) fail('expected 5 curious, got ' + by('curious').length);
if (by('funky').length !== 4) fail('expected 4 funky, got ' + by('funky').length);
if (new Set(COFFEES.map(c => c.id)).size !== 11) fail('ids are not unique');
const single = COFFEES.filter(c => c.sizes.length === 1);
if (single.length !== 2) fail('expected 2 single-size coffees, got ' + single.length);
if (!single.every(c => c.sizes[0].label === '8 oz' && c.sizes[0].price === 28)) fail('co-ferments must be 8 oz / 28');
if (!COFFEES.filter(c => c.sizes.length === 3).every(c => c.sizes.map(s => s.label).join(',') === '12 oz,2 lb,5 lb')) fail('three-size ladders must read 12 oz, 2 lb, 5 lb');
const haraz = COFFEES.find(c => c.id === 'haraz');
if (haraz.sizes.map(s => s.price).join(',') !== '32,68,148') fail('Haraz prices must be 32,68,148');
if (COFFEES.some(c => !c.name || !c.origin || !c.process)) fail('every coffee needs name, origin, process');
console.log('OK - 11 coffees; 2/5/4 by profile; ladders and spot-checked prices match the RETAIL sheet');
"
```

Expected: `OK - 11 coffees; 2/5/4 by profile; ladders and spot-checked prices match the RETAIL sheet`

If it fails, fix the data file — not the assertions. The assertions encode the
spreadsheet.

- [ ] **Step 3: Cross-check every price by eye**

Open the spec's data table
(`docs/superpowers/specs/2026-08-04-minimalist-august-design.md`, "Data"
section) beside the file and confirm all 29 prices match (9 coffees × 3 sizes,
plus 2 co-ferments × 1 size). The assertions only
spot-check one row; this catches a transposed digit anywhere else.

- [ ] **Step 4: Commit**

```bash
git add src/data/coffees-2026-07.js
git commit -m "Add July 2026 coffee lineup with size/price variants

Transcribed from the RETAIL sheet. Carries the sheet's own Flavor Profile
column (mellow/curious/funky) and a 1-3 entry size ladder per coffee, which
is the variant pattern this repo lacked. Wholesale tiers deliberately omitted."
```

---

### Task 3: Shared presentational primitives

Two small components the remaining three sections all need.

**Files:**
- Create: `src/components/Figure.jsx`
- Create: `src/components/Field.jsx`

**Interfaces:**
- Consumes: CSS properties from Task 1.
- Produces:
  - `<Figure src label ratio />` — `src` optional; when absent renders a
    labeled FPO block. `label` is required and doubles as the `alt` text.
    `ratio` is a CSS `aspect-ratio` string, default `'3 / 4'`.
  - `<Field label htmlFor children />` — label above a control.
  - `CONTROL_STYLE` — a style object for `<input>`, `<select>`, `<textarea>`.
    Tasks 5 spreads it onto all four controls.

- [ ] **Step 1: Create `Figure`**

`src/vendor/image-slot.js` renders *nothing* without a `src`, which is wrong
for a design review where four images are intentionally FPO. This shows a
labeled block naming the intended subject so gaps read as gaps.

`src/components/Figure.jsx`:

```jsx
// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
import React from 'react';

export function Figure({ src, label, ratio = '3 / 4' }) {
  return (
    <div
      style={{
        width: '100%',
        aspectRatio: ratio,
        borderRadius: 'var(--radius-photo)',
        overflow: 'hidden',
        background: 'var(--photo-fpo)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {src ? (
        <img src={src} alt={label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      ) : (
        <span
          style={{
            fontWeight: 700,
            fontSize: 12,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink-500)',
            textAlign: 'center',
            padding: '0 18px',
            lineHeight: 1.6,
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `Field` and `CONTROL_STYLE`**

`src/components/Field.jsx`:

```jsx
// Form field label + the shared control styling, so the four controls in the
// Inquiry section don't each restate their borders and type.
import React from 'react';

export const CONTROL_STYLE = {
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'var(--font-body)',
  fontSize: 16,
  color: 'var(--ink-900)',
  background: 'var(--paper-000)',
  border: '1px solid var(--border-hairline)',
  borderRadius: 'var(--radius-field)',
  padding: '11px 13px',
  outline: 'none',
};

export function Field({ label, htmlFor, children }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label
        htmlFor={htmlFor}
        style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 7, color: 'var(--ink-900)' }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}
```

- [ ] **Step 3: Verify the build**

```bash
npm run build
```

Expected: exits 0. Nothing imports these yet, so there is no visual change —
this task only has to compile.

- [ ] **Step 4: Commit**

```bash
git add src/components/Figure.jsx src/components/Field.jsx
git commit -m "Add Figure and Field primitives

Figure shows a labeled placeholder when it has no src, which the vendored
image-slot cannot do. Field carries the shared control styling."
```

---

### Task 4: About section

**Files:**
- Create: `src/sections/About.jsx`
- Modify: `src/sections/App.jsx` (uncomment the `About` import and element)

**Interfaces:**
- Consumes: `Section` (Task 1), `Figure` (Task 3).
- Produces: `<About />`, no props.

- [ ] **Step 1: Create the section**

Copy is verbatim from the spec — do not reword it. The portrait is FPO because
`public/assets` has no photo of Tyler.

`src/sections/About.jsx`:

```jsx
// About — bio copy left, portrait right. Collapses to one column at 860px.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Figure } from '../components/Figure.jsx';

export function About() {
  return (
    <Section id="about">
      <div className="split-2">
        <div>
          <h2 style={{ fontWeight: 700, fontSize: 14, margin: '0 0 14px', color: 'var(--ink-900)' }}>About us</h2>
          <p style={{ fontSize: 17, lineHeight: 1.65, margin: 0, maxWidth: '46ch', color: 'var(--ink-900)' }}>
            I'm Tyler, the owner and operator of the family-owned, Stancraft Coffee Company. This started
            about 5 years ago as a hobby of mine and quickly became a passion project. I fell in love with
            the art and nuance of roasting and delighted in serving guests my freshly-roasted coffee, all
            for the glory of God.
          </p>
        </div>
        <Figure label="Photo of Tyler" ratio="4 / 5" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Add the shared two-column rule**

`className="split-2"` needs backing CSS. Append to
`src/tokens/palette-minimal.css` (it is this branch's own sheet, so layout
helpers for it belong here):

```css
/* Two-column section split — collapses below 860px. */
.split-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 860px) {
  .split-2 { grid-template-columns: 1fr; gap: 36px; }
}
```

- [ ] **Step 3: Wire it into `App.jsx`**

Replace the commented `About` lines with live ones:

```jsx
import { About } from './About.jsx';
```

and in the tree, replacing `{/* <About /> */}`:

```jsx
<About />
```

- [ ] **Step 4: Verify**

```bash
npm run build && npm run dev
```

Confirm at `http://localhost:5173`:
- "About us" in bold 14px above the bio paragraph.
- Bio text wraps at roughly 46 characters, not full width.
- To its right, a 4:5 rounded placeholder reading "PHOTO OF TYLER".
- Both columns are vertically centered against each other.
- Narrow the window below 860 px: the columns stack, text first.
- A hairline separates About from the Intro above it.

- [ ] **Step 5: Commit**

```bash
git add src/sections/About.jsx src/sections/App.jsx src/tokens/palette-minimal.css
git commit -m "Add About section with FPO portrait"
```

---

### Task 5: Inquiry section

The most intricate task: a two-step inquiry control where the selector
determines the dropdown's contents.

**Files:**
- Create: `src/sections/Inquiry.jsx`
- Modify: `src/sections/App.jsx`

**Interfaces:**
- Consumes: `Section` (Task 1), `Field` and `CONTROL_STYLE` (Task 3), and the
  `.split-2` CSS class created in Task 4 — build Task 4 first or this section
  renders as one column.
- Produces: `<Inquiry />`, no props. Internal submit payload shape — fixed now
  so the Turnstile/SES worker on `design/broadsheet-side-nav` can adopt it
  later without rework: `{ name, email, category, inquiry, details }` where
  `category` is one of `'general' | 'wholesale' | 'support' | 'product'` and
  `inquiry` is `''` when category is `'general'`.

- [ ] **Step 1: Create the section**

All 16 inquiry options are the client's own wording. `general` has an empty
options array, which is what suppresses the dropdown.

`src/sections/Inquiry.jsx`:

```jsx
// Inquiry — form left, partnership pitch right.
//
// The Inquiry control is two steps: a four-way selector decides which dropdown
// options exist. `general` has none, so no dropdown renders and the visitor
// just writes in Details. Covers all 16 inquiry reasons the client supplied.
//
// No network call on this branch. The payload shape is fixed so the
// Turnstile/SES worker can adopt it later: { name, email, category, inquiry, details }.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Field, CONTROL_STYLE } from '../components/Field.jsx';

const CATEGORIES = [
  { id: 'general', label: 'General', options: [] },
  { id: 'wholesale', label: 'Wholesale', options: [
    'Wholesale / Bulk Orders',
    'Café / Restaurant Partnerships',
    'Private Label / White Label',
    'Collabs & Brand Partnerships',
    'Events / Pop-Ups / Catering',
  ] },
  { id: 'support', label: 'Customer Support', options: [
    'Order Status / Tracking',
    'Shipping & Delivery Issues',
    'Returns / Refunds',
    'Damaged or Incorrect Order',
    'Retail Order Support',
    'Subscription Questions',
  ] },
  { id: 'product', label: 'Product', options: [
    'Product Availability / Restock',
    'Coffee Sourcing / Origin',
    'Certifications (Organic, Fair Trade, etc.)',
    'Roast Profiles / Brewing Help',
    'Sustainability Practices',
  ] },
];

const EMPTY = { name: '', email: '', category: 'general', inquiry: '', details: '' };

export function Inquiry() {
  const [form, setForm] = React.useState(EMPTY);
  const [sent, setSent] = React.useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  // Switching category clears any chosen option, so a stale Wholesale value
  // can never be submitted under Product.
  const pickCategory = (id) => () => setForm((f) => ({ ...f, category: id, inquiry: '' }));

  const active = CATEGORIES.find((c) => c.id === form.category);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Section id="inquiry">
      <div className="split-2" style={{ alignItems: 'start' }}>
        <div>
          {sent ? (
            <div>
              <h2 style={{ fontWeight: 800, fontSize: 28, letterSpacing: '-0.02em', margin: '0 0 12px' }}>
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
              </h2>
              <p style={{ fontSize: 17, lineHeight: 1.65, margin: '0 0 24px', color: 'var(--ink-500)' }}>
                Your note is with us. We'll be in touch within two business days.
              </p>
              <button
                type="button"
                onClick={() => { setForm(EMPTY); setSent(false); }}
                style={{
                  fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13, letterSpacing: '0.08em',
                  textTransform: 'uppercase', color: 'var(--ink-900)', background: 'none',
                  border: '1px solid var(--ink-900)', borderRadius: 'var(--radius-field)',
                  padding: '13px 26px', cursor: 'pointer',
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate={false}>
              <Field label="Your name" htmlFor="f-name">
                <input id="f-name" type="text" required value={form.name} onChange={set('name')} style={CONTROL_STYLE} />
              </Field>

              <Field label="Email address" htmlFor="f-email">
                <input id="f-email" type="email" required value={form.email} onChange={set('email')} style={CONTROL_STYLE} />
              </Field>

              <div style={{ marginBottom: 18 }}>
                <span style={{ display: 'block', fontWeight: 700, fontSize: 13, marginBottom: 9, color: 'var(--ink-900)' }}>
                  Inquiry
                </span>
                <div role="group" aria-label="Inquiry category" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 14 }}>
                  {CATEGORIES.map((c) => {
                    const on = c.id === form.category;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        aria-pressed={on}
                        onClick={pickCategory(c.id)}
                        style={{
                          fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12,
                          letterSpacing: '0.06em', textTransform: 'uppercase',
                          color: on ? 'var(--ink-900)' : 'var(--ink-500)',
                          background: 'none', border: 'none', padding: '0 0 5px', cursor: 'pointer',
                          borderBottom: on ? '2px solid var(--ink-900)' : '2px solid transparent',
                        }}
                      >
                        {c.label}
                      </button>
                    );
                  })}
                </div>
                {active.options.length > 0 && (
                  <select
                    aria-label="Inquiry reason"
                    value={form.inquiry}
                    onChange={set('inquiry')}
                    required
                    style={CONTROL_STYLE}
                  >
                    <option value="">Select one…</option>
                    {active.options.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                )}
              </div>

              <Field label="Details" htmlFor="f-details">
                <textarea
                  id="f-details"
                  rows={4}
                  value={form.details}
                  onChange={set('details')}
                  style={{ ...CONTROL_STYLE, resize: 'vertical' }}
                />
              </Field>

              <button
                type="submit"
                style={{
                  width: '100%', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                  letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--paper-100)',
                  background: 'var(--ink-900)', border: 'none', borderRadius: 'var(--radius-field)',
                  padding: '15px 20px', cursor: 'pointer', marginTop: 4,
                }}
              >
                Submit
              </button>
            </form>
          )}
        </div>

        <div>
          <h2 style={{ fontWeight: 700, fontSize: 14, margin: '0 0 16px', color: 'var(--ink-900)' }}>
            Interested in partnering with Stancraft?
          </h2>
          <p style={{ fontSize: 20, lineHeight: 1.55, margin: 0, maxWidth: '30ch', color: 'var(--ink-900)' }}>
            Whether it be for your café, your restaurant, or your startup coffee cart, we'd love to provide
            you with some of the highest quality coffee to serve to your guests.
          </p>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Wire it into `App.jsx`**

Replace the commented lines with:

```jsx
import { Inquiry } from './Inquiry.jsx';
```

and `<Inquiry />` in place of `{/* <Inquiry /> */}`.

- [ ] **Step 3: Verify the selector logic**

```bash
npm run build && npm run dev
```

Walk every branch of the two-step control:
- Default state is **General**, underlined, and **no dropdown is visible**.
- Click **Wholesale** → dropdown appears with exactly 5 options, starting
  "Wholesale / Bulk Orders".
- Click **Customer Support** → exactly 6 options, starting "Order Status /
  Tracking".
- Click **Product** → exactly 5 options, starting "Product Availability /
  Restock".
- Select an option under Product, then click **Wholesale**: the dropdown
  resets to "Select one…" rather than keeping the stale Product value.
- Click **General** → the dropdown disappears entirely.
- Only the active selector label is dark with an underline; the other three
  are grey.

- [ ] **Step 4: Verify validation and the success state**

- Submit with everything empty → the browser blocks it and focuses Your name.
- Fill a name, submit → blocked on Email address.
- Enter `notanemail` → blocked as invalid.
- Under Wholesale with no option chosen → blocked on the dropdown.
- Under **General**, fill name and a valid email, leave Details empty →
  submits, because Details is optional and General has no dropdown.
- Success state greets by first name and offers "Send another".
- "Send another" returns to an **empty** form reset to General.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Inquiry.jsx src/sections/App.jsx
git commit -m "Add Inquiry section with two-step category selector

A four-way selector (General/Wholesale/Customer Support/Product) decides
which dropdown options exist, covering all 16 client-supplied reasons.
General has none, so no dropdown renders. Switching category clears any
stale selection. Validates and shows an inline success state; no network
call, but the payload shape is fixed for the SES worker."
```

---

### Task 6: Coffees section

**Files:**
- Create: `src/sections/Coffees.jsx`
- Modify: `src/sections/App.jsx`

**Interfaces:**
- Consumes: `Section` (Task 1), `COFFEES` (Task 2), `Figure` (Task 3).
- Produces: `<Coffees />`, no props. Owns `id="coffees"`, which the Intro's
  "Shop here" pill from Task 1 targets.

- [ ] **Step 1: Create the section**

Default state shows all three moods so the section informs before anyone
clicks. Mood blurbs are verbatim from the spec.

`src/sections/Coffees.jsx`:

```jsx
// Coffees — three mood cards that filter the lineup below them.
//
// Default state lists all 11 coffees under all three moods, so the section is
// informative with no interaction. Clicking a mood narrows to it and dims the
// other two; clicking the active mood again clears back to everything.
import React from 'react';
import { Section } from '../components/Section.jsx';
import { Figure } from '../components/Figure.jsx';
import { COFFEES } from '../data/coffees-2026-07.js';

const MOODS = [
  { id: 'mellow', title: 'Something mellow', blurb: 'A flavorful and smooth cup, enjoyed by all.',
    photo: 'Mellow — portrait' },
  { id: 'curious', title: 'Something curious', blurb: 'Need something a bit more dynamic? This is your bag.',
    photo: 'Curious — portrait' },
  { id: 'funky', title: 'Something funky', blurb: 'Be ready for an other-worldly cup of coffee.',
    photo: 'Funky — portrait' },
];

function SizeLadder({ sizes }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 18px', marginTop: 6 }}>
      {sizes.map((s) => (
        <span key={s.label} style={{ fontSize: 15, color: 'var(--ink-500)', whiteSpace: 'nowrap' }}>
          <span style={{ fontWeight: 700, color: 'var(--ink-900)' }}>{s.label}</span>
          {' '}${s.price}
        </span>
      ))}
    </div>
  );
}

function MoodGroup({ mood }) {
  const list = COFFEES.filter((c) => c.profile === mood.id);
  return (
    <div style={{ marginTop: 48 }}>
      <h3 style={{
        fontWeight: 700, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase',
        color: 'var(--ink-500)', margin: '0 0 4px', paddingBottom: 12,
        borderBottom: '1px solid var(--border-hairline)',
      }}>
        {mood.title}
      </h3>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {list.map((c) => (
          <li key={c.id} style={{ padding: '18px 0', borderBottom: '1px solid var(--border-hairline)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0 12px' }}>
              <span style={{ fontWeight: 700, fontSize: 17, color: 'var(--ink-900)' }}>{c.name}</span>
              <span style={{ fontSize: 14, color: 'var(--ink-500)' }}>{c.process}</span>
            </div>
            <SizeLadder sizes={c.sizes} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Coffees() {
  const [activeMood, setActiveMood] = React.useState(null);
  const shown = activeMood ? MOODS.filter((m) => m.id === activeMood) : MOODS;

  return (
    <Section id="coffees" last>
      <h2 style={{ fontWeight: 800, fontSize: 46, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 44px' }}>
        A coffee for everyone.
      </h2>

      <div className="moods">
        {MOODS.map((m) => {
          const on = activeMood === m.id;
          const dim = activeMood !== null && !on;
          return (
            <button
              key={m.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveMood(on ? null : m.id)}
              style={{
                display: 'block', textAlign: 'left', background: 'none', border: 'none',
                padding: 0, cursor: 'pointer', fontFamily: 'var(--font-body)',
                opacity: dim ? 0.35 : 1, transition: 'opacity 200ms ease',
              }}
            >
              <span style={{
                display: 'block', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em',
                textTransform: 'uppercase', color: 'var(--ink-900)', marginBottom: 6,
              }}>
                {m.title}
              </span>
              <span style={{ display: 'block', fontSize: 15, lineHeight: 1.5, color: 'var(--ink-900)', marginBottom: 18 }}>
                {m.blurb}
              </span>
              <Figure label={m.photo} ratio="3 / 4" />
            </button>
          );
        })}
      </div>

      {shown.map((m) => <MoodGroup key={m.id} mood={m} />)}
    </Section>
  );
}
```

- [ ] **Step 2: Add the mood grid rule**

Append to `src/tokens/palette-minimal.css`:

```css
/* Three mood cards — stack below 700px. */
.moods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

@media (max-width: 700px) {
  .moods { grid-template-columns: 1fr; gap: 44px; }
}
```

- [ ] **Step 3: Wire it into `App.jsx`**

Replace the commented lines with:

```jsx
import { Coffees } from './Coffees.jsx';
```

and `<Coffees />` in place of `{/* <Coffees /> */}`.

- [ ] **Step 4: Verify the filter and the ladders**

```bash
npm run build && npm run dev
```

- Headline reads "A coffee for everyone." in heavy 46px type.
- Three mood cards side by side, each with title, blurb, and a 3:4 FPO
  placeholder.
- **Default:** all three mood groups render below, 11 coffees total — count
  them: 2 under mellow, 5 under curious, 4 under funky.
- Click **Something mellow** → only the mellow group remains (2 coffees); the
  curious and funky cards fade to 35%.
- Click **Something mellow** again → all three groups return, no card dimmed.
- Click **Something funky** → 4 coffees; the last two, "Colombia Pink Bourbon
  Cake Banana" and "Colombia Juicy Strawberry", each show a single `8 oz $28`.
- Every other coffee shows three prices reading `12 oz`, `2 lb`, `5 lb`.
- No wholesale prices appear anywhere on the page.
- Scroll to the top and click "SHOP HERE" → the page scrolls to this section.
- Tab through the mood cards: each is reachable and Enter toggles it.

- [ ] **Step 5: Commit**

```bash
git add src/sections/Coffees.jsx src/sections/App.jsx src/tokens/palette-minimal.css
git commit -m "Add Coffees section with mood filter and size ladders

Three mood cards filter the lineup; default shows all 11 grouped by mood.
Each coffee renders its 1-3 entry size ladder, which is the repo's first
product variant pattern."
```

---

### Task 7: Responsive pass, docs, and final verification

**Files:**
- Modify: `src/tokens/palette-minimal.css` (responsive type only, if needed)
- Modify: `DESIGN-BRANCHES.md`

**Interfaces:**
- Consumes: everything from Tasks 1–6.
- Produces: nothing new.

- [ ] **Step 1: Scale the headline down on small screens**

A 46px headline at 375px wide will crowd. Font size has to move out of the
inline style entirely to do this — an inline `style` always beats a media
query, so leaving `fontSize: 46` inline would make the breakpoint dead code.

Append to `src/tokens/palette-minimal.css`:

```css
/* Section headline — sized here rather than inline so the breakpoint can win. */
.sect-headline { font-size: 46px; }

@media (max-width: 700px) {
  .sect-headline { font-size: 34px; }
}
```

Then in `src/sections/Coffees.jsx`, add the class and **delete `fontSize: 46`**
from the inline style, leaving the other declarations:

```jsx
<h2 className="sect-headline" style={{ fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 44px' }}>
  A coffee for everyone.
</h2>
```

- [ ] **Step 2: Check every breakpoint**

```bash
npm run dev
```

At each of **1440**, **860**, **700**, and **375** px wide, confirm:
- No horizontal scrollbar anywhere on the page.
- Below 860: About and Inquiry each collapse to one column.
- Below 700: the three mood cards stack; the headline drops to 34px.
- At 375: the wordmark fits with margin (it is capped at `82vw`); the size
  ladder wraps rather than overflowing; form controls span the full width
  without spilling.
- The Intro's top padding does not leave the wordmark stranded on a phone.

- [ ] **Step 3: Confirm the design constraints held**

- Search the source for stragglers — this must return nothing:

```bash
grep -rniE 'spectral|serif|--red-|--yellow-|--blue-|--dark-|espresso|StancraftCoffeeDesignSystem' src/sections src/components src/data
```

Expected: no output. (`src/vendor/` and `src/tokens/colors.css` will still
contain these; that is fine — only our own new code must be clean.)

- Confirm no wholesale figure reached the page:

```bash
grep -rE '15\.2|17\.09|20\.9|14\.44|13\.71' src/data src/sections
```

Expected: no output.

- [ ] **Step 4: Add the branch to the map**

In `DESIGN-BRANCHES.md`, add a row to the Branches table after the
`design/broadsheet-top-nav` row:

```markdown
| `design/minimalist-august` | Stark modern take — Montserrat throughout, ivory and ink, no nav. Four sections; photography is the only color. |
```

And replace the sentence "Both broadsheet directions share the same 1920s
newspaper aesthetic; they differ only in navigation placement." with:

```markdown
The two broadsheet directions share the same 1920s newspaper aesthetic and
differ only in navigation placement. `design/minimalist-august` is a separate
direction entirely.
```

- [ ] **Step 5: Final build and a clean-tree check**

```bash
npm run build
git status --short
```

Expected: build exits 0. `git status` shows only
`src/tokens/palette-minimal.css`, `src/sections/Coffees.jsx`, and
`DESIGN-BRANCHES.md` as modified. The price spreadsheet may appear as
untracked — leave it that way.

- [ ] **Step 6: Commit**

Stage explicit paths; do **not** use `git add -A`.

```bash
git add src/tokens/palette-minimal.css src/sections/Coffees.jsx DESIGN-BRANCHES.md
git commit -m "Responsive pass and branch documentation

Headline scales to 34px below 700px. Adds design/minimalist-august to
DESIGN-BRANCHES.md."
```

- [ ] **Step 7: Hand the user a port to review**

```bash
npm run dev
```

Report the URL (`http://localhost:5173`) and stop. Do not push; the user
reviews first.

---

## Notes for the implementer

- **There is no test framework in this repo** — no vitest, no jest, no `test`
  script. Do not add one; this is a design-exploration branch. Verification is
  `npm run build` plus the enumerated visual checks. The one exception is
  Task 2, whose `node` assertion run is a genuine pass/fail gate.
- **Inline styles are the house style here**, not a compromise. Every existing
  section in this repo styles that way, reading CSS custom properties. Follow it.
- **`src/vendor/_ds_bundle.js` stays imported** in `main.jsx` even though no
  section uses its components — `image-slot` registration is entangled with it
  and removing the import breaks that custom element.
- **Four images are intentionally FPO.** The `Figure` placeholders are the
  deliverable, not an unfinished edge. Do not substitute `craft.jpg` or
  `hero.jpg` to fill them.
