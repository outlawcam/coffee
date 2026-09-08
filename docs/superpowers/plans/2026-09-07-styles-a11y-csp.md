# Styles, Accessibility, and CSP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move every inline style in the landing page into CSS classes, fix six accessibility defects, and ship a Content-Security-Policy that the extraction makes possible.

**Architecture:** Three strictly ordered phases on `design/minimalist-august`. Phase 1 extracts inline styles into plain global stylesheets under a new `src/styles/`, leaving `src/tokens/` as variables-only. Phase 2 applies accessibility fixes that are only expressible once rules live in CSS. Phase 3 externalizes the GTM bootstrap and adds a Report-Only CSP. Each phase depends on the one before it.

**Tech Stack:** Vite 5, React 18, plain global CSS with custom properties. No new dependencies. No test framework — see Verification Model.

**Spec:** `docs/superpowers/specs/2026-09-07-styles-a11y-csp-design.md`

## Global Constraints

- Branch: `design/minimalist-august`. Do not switch branches; `worker/index.js` on `design/broadsheet-side-nav` is unpushed and a checkout could disturb it.
- **No visual changes** except the control border in Task 11. If a task changes how the page looks, the extraction is wrong — revert and redo.
- **No new dependencies.** `package.json` must be untouched.
- Class naming: BEM-ish. Block `.mood-card`, element `.mood-card__title`, modifier `.mood-card--dim` or state `.is-stuck`.
- `src/tokens/` holds CSS custom properties ONLY. `src/styles/` holds rules ONLY.
- `palette-minimal.css` stays LAST among the token imports so it keeps overriding `colors.css` and `palette-botanical.css`.
- Do not modify `src/tokens/palette-botanical.css`, `flavors.css`, `fonts.css`, `typography.css`, or `layout.css` (the token file) — other branches read them.
- Do not modify `src/vendor/*`. The DS bundle file stays on disk; only its import is removed.
- Control border value, verbatim: `--border-control: #8F8574`.
- **Do not push.** Task 16 is a human verification gate. Task 17 is the only task that pushes, and it runs only after a human says the page looks right.

## Verification Model

This repo has no test framework and the spec declines to add one. Each task's red/green cycle is a mechanical check instead:

- **Red:** run the check, record the non-zero count.
- **Green:** run the same check, it returns 0.
- **Regression guard:** `npm run build` must exit 0 after every task.

The canonical check, used throughout:

```bash
grep -c "style={{" <file>        # per-file count
grep -rn "style={{" src | wc -l  # whole-tree count, must reach 0
```

Starting whole-tree count: **47**.

---

## Phase 1 — Extraction

### Task 1: Stylesheet scaffolding, base rules out of index.html

**Files:**
- Create: `src/styles/base.css`
- Create: `src/styles/layout.css`
- Create: `src/styles/components.css`
- Modify: `src/styles.css`
- Modify: `index.html:36-52` (the `<style>` block), `index.html:51` (noscript iframe)

**Interfaces:**
- Consumes: nothing.
- Produces: `src/styles/{base,layout,components}.css` exist and are imported. Class `.gtm-noscript`. Later tasks add rules to `layout.css` and `components.css`.

This task is a **pure move**. Rules are copied verbatim. The reduced-motion gating comes later in Task 12 — do not add it here, so this task's diff stays reviewable as "nothing changed."

- [ ] **Step 1: Create `src/styles/base.css`**

Copy the rules out of `index.html`'s `<style>` block verbatim, plus one new class for the noscript iframe:

```css
/* Document-level defaults. Lifted verbatim from index.html's <style> block
 * so that style-src can drop 'unsafe-inline' (see Phase 3). */

/* scroll-padding-top clears the fixed masthead (~53px) so an anchor target
   lands below it instead of underneath it. */
html { scroll-behavior: smooth; scroll-padding-top: 68px; }
html, body { margin: 0; background: var(--paper-100); color: var(--ink-900); }
a { color: var(--accent); }
a:hover { color: var(--accent-hover); }
::selection { background: var(--ink-900); color: var(--paper-100); }

img { max-width: 100%; }
/* min-width:0 lets controls shrink inside grid/flex tracks instead of
   imposing their default intrinsic width (which forced overflow). */
input, select, textarea, button { box-sizing: border-box; min-width: 0; }
image-slot { display: block; width: 100%; height: 100%; }

/* GTM's noscript iframe. Was an inline style attribute in index.html. */
.gtm-noscript { display: none; visibility: hidden; }
```

- [ ] **Step 2: Create empty `src/styles/layout.css` and `src/styles/components.css`**

```css
/* Stancraft Coffee — layout rules. Grids, shells, section rhythm.
 * Variables live in src/tokens/; this file holds rules only. */
```

```css
/* Stancraft Coffee — component rules. One block per UI component.
 * Variables live in src/tokens/; this file holds rules only. */
```

- [ ] **Step 3: Import them from `src/styles.css`**

Append after the existing token imports, so rules always follow variables:

```css
/* Rules. Must come after tokens — these consume the custom properties above. */
@import url("./styles/base.css");
@import url("./styles/layout.css");
@import url("./styles/components.css");
```

- [ ] **Step 4: Delete the `<style>` block from `index.html` and reclass the iframe**

Remove lines 36–52 (`<style>` through `</style>`) entirely. Change the noscript iframe from:

```html
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFVLV9L8"
height="0" width="0" style="display:none;visibility:hidden"></iframe>
```

to:

```html
<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KFVLV9L8"
height="0" width="0" class="gtm-noscript"></iframe>
```

- [ ] **Step 5: Verify**

```bash
grep -c "<style>" index.html      # expect 0
grep -c 'style="' index.html      # expect 0
npm run build                     # expect exit 0
```

Then `npm run dev` and confirm the page is visually unchanged — same background, same link colors, same smooth scroll.

- [ ] **Step 6: Commit**

```bash
git add src/styles/ src/styles.css index.html
git commit -m "Move document-level rules out of index.html into src/styles/base.css"
```

---

### Task 2: Rules out of palette-minimal.css

**Files:**
- Modify: `src/tokens/palette-minimal.css:45-102`
- Modify: `src/styles/layout.css`, `src/styles/components.css`

**Interfaces:**
- Consumes: `src/styles/{layout,components}.css` from Task 1.
- Produces: `.split-2`, `.moods`, `.sect-headline`, `.sticky-head`, and the `:focus-visible` block now live in `src/styles/`. `palette-minimal.css` contains variables only.

This is the fix for the core structural problem: layout rules sitting inside a swappable palette file, next to `palette-botanical.css`. Another **pure move** — no rule changes.

- [ ] **Step 1: Move the grid rules into `src/styles/layout.css`**

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

- [ ] **Step 2: Move the rest into `src/styles/components.css`**

```css
/* Section headline — sized here rather than inline so the breakpoint can win. */
.sect-headline { font-size: 46px; }

@media (max-width: 700px) {
  .sect-headline { font-size: 34px; }
}

/* Visible focus for keyboard users. */
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
button:focus-visible,
a:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Sticky masthead reveal. Transitions live here, not inline, so the
   reduced-motion query can neutralize them. */
.sticky-head {
  transition: opacity 240ms ease, transform 240ms ease, visibility 240ms;
}

.sticky-head img {
  transition: transform 240ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .sticky-head,
  .sticky-head img {
    transition: none;
  }
}
```

- [ ] **Step 3: Delete lines 45–102 from `src/tokens/palette-minimal.css`**

Everything from the `/* Two-column section split */` comment to end of file. Keep the `:root` block and the `@media (max-width: 860px) { :root { ... } }` variable override — those are variables and belong here.

- [ ] **Step 4: Verify**

```bash
grep -c "^\." src/tokens/palette-minimal.css   # expect 0 — no rules left
npm run build                                  # expect exit 0
```

In the browser: resize past 860px and 700px, confirm the split and mood grid still collapse. Scroll down and confirm the sticky masthead still slides in.

- [ ] **Step 5: Commit**

```bash
git add src/tokens/palette-minimal.css src/styles/
git commit -m "Move layout and component rules out of the palette file"
```

---

### Task 3: Shared components — Section, Field, Figure

**Files:**
- Modify: `src/components/Section.jsx`, `src/components/Field.jsx`, `src/components/Figure.jsx`
- Modify: `src/styles/layout.css`, `src/styles/components.css`
- Modify: `src/sections/Inquiry.jsx` (drop the `CONTROL_STYLE` import)

**Interfaces:**
- Consumes: `src/styles/` from Tasks 1–2.
- Produces: `.section`, `.section--last`, `.shell`, `.field`, `.field__label`, `.control`, `.figure`, `.figure__img`, `.figure__fpo`. **`CONTROL_STYLE` is deleted** — Task 8 must not import it.

Red: `grep -c "style={{" src/components/*.jsx` → `Section 2, Field 2, Figure 3`.

- [ ] **Step 1: Add the rules**

To `src/styles/layout.css`:

```css
/* Section wrapper — vertical rhythm and the hairline between sections. */
.section {
  padding: var(--sect-pad-y) var(--sect-pad-x);
  border-bottom: 1px solid var(--border-hairline);
}

/* Last section before the footer, which supplies its own top border. */
.section--last { border-bottom: none; }

/* Max-width shell, centered. */
.shell { max-width: var(--shell-max); margin: 0 auto; }
```

To `src/styles/components.css`:

```css
/* Form field: label above control. */
.field { margin-bottom: 18px; }

.field__label {
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 7px;
  color: var(--ink-900);
}

/* Shared control styling for input, select, and textarea. Replaces the
   CONTROL_STYLE object that Field.jsx used to export. */
.control {
  width: 100%;
  box-sizing: border-box;
  font-family: var(--font-body);
  font-size: 16px;
  color: var(--ink-900);
  background: var(--paper-000);
  border: 1px solid var(--border-hairline);
  border-radius: var(--radius-field);
  padding: 11px 13px;
  min-width: 0;
}

.control--textarea { resize: vertical; }

/* Photo frame. Holds either an image or a labeled FPO placeholder. */
.figure {
  display: flex;
  width: 100%;
  border-radius: var(--radius-photo);
  overflow: hidden;
  background: var(--photo-fpo);
  align-items: center;
  justify-content: center;
}

.figure__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.figure__fpo {
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-500);
  text-align: center;
  padding: 0 18px;
  line-height: 1.6;
}
```

- [ ] **Step 2: Rewrite `src/components/Section.jsx`**

The `style` passthrough prop is dropped — no caller uses it.

```jsx
// Shared section wrapper: max-width shell, vertical rhythm, bottom hairline.
import React from 'react';

export function Section({ id, children, last = false }) {
  return (
    <section id={id} className={last ? 'section section--last' : 'section'}>
      <div className="shell">{children}</div>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/Field.jsx`**

`CONTROL_STYLE` disappears entirely.

```jsx
// Form field label. The control styling itself is the .control class in
// styles/components.css, applied by the caller.
import React from 'react';

export function Field({ label, htmlFor, children }) {
  return (
    <div className="field">
      <label htmlFor={htmlFor} className="field__label">{label}</label>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `src/components/Figure.jsx`**

`aspectRatio` is the one value that stays dynamic — it is a per-caller argument, not enumerable state. It moves to a CSS custom property, which is a class-driven mechanism and does not require `style-src 'unsafe-inline'`… **except that setting it via `style={{}}` would.** Instead, take the two ratios the codebase actually uses as modifier classes.

```jsx
// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
import React from 'react';

export function Figure({ src, label, ratio = '3 / 4' }) {
  const ratioClass = ratio === '4 / 5' ? 'figure--4x5' : 'figure--3x4';
  return (
    <span className={`figure ${ratioClass}`}>
      {src ? (
        <img src={src} alt={label} className="figure__img" />
      ) : (
        <span className="figure__fpo">{label}</span>
      )}
    </span>
  );
}
```

Add to `src/styles/components.css`:

```css
.figure--3x4 { aspect-ratio: 3 / 4; }
.figure--4x5 { aspect-ratio: 4 / 5; }
```

- [ ] **Step 5: Update the two Inquiry control call sites that import CONTROL_STYLE**

In `src/sections/Inquiry.jsx`, change the import line from:

```jsx
import { Field, CONTROL_STYLE } from '../components/Field.jsx';
```

to:

```jsx
import { Field } from '../components/Field.jsx';
```

Then replace each `style={CONTROL_STYLE}` with `className="control"`, and the textarea's `style={{ ...CONTROL_STYLE, resize: 'vertical' }}` with `className="control control--textarea"`. Four controls total: `#f-name`, `#f-email`, the `<select>`, and `#f-details`.

- [ ] **Step 6: Update the two comments that referenced CONTROL_STYLE**

Deleting `CONTROL_STYLE` strands two comments that name it. Both live in
`src/styles/` and were moved verbatim in Tasks 1-2 precisely so this edit
would happen here, in the task that causes the staleness.

In `src/styles/base.css`, the `input, select, textarea, button` comment ends:

```
   imposing their default intrinsic width (which forced overflow). Kept from
   the broadsheet work — it is the same defence as Field.jsx's minWidth. */
```

Change the last clause to point at where that defence now lives:

```
   imposing their default intrinsic width (which forced overflow). Kept from
   the broadsheet work — it is the same defence as .control's min-width. */
```

In `src/styles/components.css`, the focus-visible comment reads:

```
/* Visible focus for keyboard users. CONTROL_STYLE no longer kills the outline;
   this makes the ring intentional rather than UA-default. */
```

Change it to:

```
/* Visible focus for keyboard users. Nothing suppresses the outline any more;
   this makes the ring intentional rather than UA-default. */
```

Leave the `.sticky-head` comment about inline `transition` alone — it is
still true and still the reason this plan exists.

- [ ] **Step 7: Verify**

```bash
grep -rn "CONTROL_STYLE" src | wc -l   # expect 0
grep -c "style={{" src/components/Section.jsx src/components/Field.jsx src/components/Figure.jsx
                                        # expect 0 for each
npm run build                           # expect exit 0
```

In the browser: the About photo still fills a 4:5 frame, the Coffees placeholders are 3:4, and all four form controls look unchanged.

- [ ] **Step 8: Commit**

```bash
git add src/components/ src/styles/ src/sections/Inquiry.jsx
git commit -m "Extract Section, Field, and Figure styles into classes"
```

---

### Task 4: Intro, About, and Footer

**Files:**
- Modify: `src/sections/Intro.jsx`, `src/sections/About.jsx`, `src/sections/Footer.jsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `src/styles/components.css`.
- Produces: `.intro`, `.intro__title`, `.intro__mark`, `.btn-pill`, `.about__title`, `.about__body`, `.site-footer`, `.site-footer__text`, `.site-footer__link`.

Red: Intro 4, About 2, Footer 3.

> **Note:** About was missing from the spec's class inventory. It is folded in
> here because it is the same shape of work as Intro and Footer — a couple of
> type-only elements. Without it the Task 8 gate cannot reach zero.

- [ ] **Step 1: Add the rules**

```css
/* Intro — 75vh centered hero. This section IS the header; there is no nav. */
.intro {
  /* min-height, not height: a short viewport or a zoomed-in browser lets
     content push the section taller instead of clipping it. */
  min-height: 75vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px var(--sect-pad-x);
  text-align: center;
  border-bottom: 1px solid var(--border-hairline);
}

.intro__title { margin: 0; }

.intro__mark {
  width: min(440px, 82vw);
  height: auto;
  display: block;
  margin: 0 auto;
}

/* Pill CTA — pill navigates, rect commits. */
.btn-pill {
  display: inline-block;
  margin-top: 56px;
  background: var(--ink-900);
  color: var(--paper-100);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 15px 32px;
  border-radius: var(--radius-pill);
}

/* About — bio copy left, portrait right. */
.about__title {
  font-weight: 700;
  font-size: 14px;
  margin: 0 0 14px;
  color: var(--ink-900);
}

.about__body {
  font-size: 17px;
  line-height: 1.65;
  margin: 0;
  max-width: 46ch;
  color: var(--ink-900);
}

/* Footer — one hairline and the contact line. */
.site-footer {
  border-top: 1px solid var(--border-hairline);
  padding: 44px var(--sect-pad-x);
  text-align: center;
}

.site-footer__text {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--ink-500);
}

.site-footer__link {
  color: var(--ink-900);
  text-decoration: none;
}
```

- [ ] **Step 2: Rewrite `src/sections/Intro.jsx`**

```jsx
// Intro — wordmark and a single pill CTA. No nav; this section IS the header.
import React from 'react';

export function Intro() {
  return (
    <section id="top" className="intro">
      {/* id is the IntersectionObserver target for StickyHeader — when this
          scrolls out of view the compact masthead takes over. */}
      <h1 id="intro-logo" className="intro__title">
        <img
          src="/assets/logo-stancraft.svg"
          alt="Stancraft Coffee Co."
          className="intro__mark"
        />
      </h1>
      <a href="#coffees" className="btn-pill">Shop here</a>
    </section>
  );
}
```

- [ ] **Step 3: Rewrite `src/sections/About.jsx`**

Leave the `<Figure>` line exactly as it is — Task 9 changes its props.

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
          <h2 className="about__title">About us</h2>
          <p className="about__body">
            I'm Tyler, the owner and operator of the family-owned, Stancraft Coffee Company. This started
            about 5 years ago as a hobby of mine and quickly became a passion project. I fell in love with
            the art and nuance of roasting and delighted in serving guests my freshly-roasted coffee, all
            for the glory of God.
          </p>
        </div>
        <Figure src="/assets/tyler.jpg" label="Tyler logging a roast at the roaster" ratio="4 / 5" />
      </div>
    </Section>
  );
}
```

- [ ] **Step 4: Rewrite `src/sections/Footer.jsx`**

```jsx
// Footer — one hairline and the contact line. Deliberately minimal.
import React from 'react';

export function Footer() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Stancraft Coffee Co. · Lufkin, TX
        <br />
        <a href="mailto:tyler@stancraftcoffee.com" className="site-footer__link">
          tyler@stancraftcoffee.com
        </a>
      </p>
    </footer>
  );
}
```

- [ ] **Step 5: Verify**

```bash
grep -c "style={{" src/sections/Intro.jsx src/sections/About.jsx src/sections/Footer.jsx
                                    # expect 0 for each of the three
npm run build                       # expect exit 0
```

In the browser: hero is still 75vh and centered, "Shop here" is still a dark pill, the About copy still wraps at the same measure beside the photo, footer text is still centered and muted.

- [ ] **Step 6: Commit**

```bash
git add src/sections/Intro.jsx src/sections/About.jsx src/sections/Footer.jsx src/styles/components.css
git commit -m "Extract Intro, About, and Footer styles into classes"
```

---

### Task 5: StickyHeader — state-driven styles become modifier classes

**Files:**
- Modify: `src/sections/StickyHeader.jsx:35-78`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: the `.sticky-head` transition rules moved in Task 2.
- Produces: `.sticky-head`, `.sticky-head.is-stuck`, `.sticky-head__link`, `.sticky-head__mark`.

Red: 3. This is the first task where extraction changes *mechanism*, not just location. `is-stuck` is already applied in the JSX but has never had a rule behind it — the inline styles have been overriding it since the header was written.

- [ ] **Step 1: Extend the `.sticky-head` rules in `src/styles/components.css`**

Add to the existing `.sticky-head` block from Task 2 (do not duplicate the selector — merge into it):

```css
/* Sticky masthead. position:fixed rather than sticky on purpose: the page
   scrolls behind an opaque bar, and the header claims no space in the
   Intro's 75vh. */
.sticky-head {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  justify-content: center;
  padding: 14px var(--sect-pad-x);
  background: var(--paper-100);
  border-bottom: 1px solid var(--border-hairline);
  /* Hidden resting state. visibility (not pointer-events) so the link leaves
     the tab order while hidden; it still animates, since visibility is
     discretely animatable and flips to visible at the start of the reveal. */
  opacity: 0;
  visibility: hidden;
  transform: translateY(-100%);
  transition: opacity 240ms ease, transform 240ms ease, visibility 240ms;
}

.sticky-head.is-stuck {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.sticky-head__link { display: flex; }

/* Settles from slightly oversized down to its resting size, so the handoff
   from the hero mark reads as a shrink rather than a swap. */
.sticky-head__mark {
  height: 24px;
  width: auto;
  display: block;
  transform: scale(1.3);
  transition: transform 240ms ease;
}

.sticky-head.is-stuck .sticky-head__mark { transform: scale(1); }

@media (prefers-reduced-motion: reduce) {
  .sticky-head,
  .sticky-head__mark {
    transition: none;
  }
}
```

Delete the older `.sticky-head img` selectors from Task 2 — they are superseded by `.sticky-head__mark`.

- [ ] **Step 2: Rewrite the returned JSX in `src/sections/StickyHeader.jsx`**

Leave the `useEffect` and IntersectionObserver logic above untouched. Replace only the `return (...)`:

```jsx
  return (
    <header
      className={stuck ? 'sticky-head is-stuck' : 'sticky-head'}
      aria-hidden={!stuck}
    >
      <a
        href="#top"
        aria-label="Stancraft Coffee Co. — back to top"
        className="sticky-head__link"
      >
        {/* alt="" — the anchor's aria-label names this link, and the Intro's
            <h1> already carries the wordmark's accessible name. */}
        <img
          src="/assets/logo-stancraft.svg"
          alt=""
          className="sticky-head__mark"
        />
      </a>
    </header>
  );
```

- [ ] **Step 3: Verify**

```bash
grep -c "style={{" src/sections/StickyHeader.jsx   # expect 0
npm run build                                       # expect exit 0
```

In the browser this needs a real check, because the mechanism changed:
1. At the top of the page the masthead is invisible and **cannot be tabbed to**.
2. Scroll past the hero wordmark — it slides down and the logo settles from slightly large to normal.
3. Scroll back up — it slides away.
4. Turn on OS reduce-motion and repeat: it should appear and disappear with no transition.

- [ ] **Step 4: Commit**

```bash
git add src/sections/StickyHeader.jsx src/styles/components.css
git commit -m "Drive the sticky masthead from is-stuck instead of inline styles"
```

---

### Task 6: Coffees

**Files:**
- Modify: `src/sections/Coffees.jsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `.sect-headline` (Task 2), `.moods` (Task 2), `Figure` (Task 3).
- Produces: `.mood-card`, `.mood-card__title`, `.mood-card__blurb`, `.mood-card__photo`, `.mood-card__photo--dim`, `.mood-group`, `.mood-group__title`, `.coffee-list`, `.coffee-row`, `.coffee-row__head`, `.coffee-row__name`, `.coffee-row__process`, `.sizes`, `.sizes__item`, `.sizes__label`.

Red: 15 — the largest single file.

- [ ] **Step 1: Add the rules**

```css
/* Mood card — a whole filter button, image included. */
.mood-card {
  display: block;
  text-align: left;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-family: var(--font-body);
}

.mood-card__title {
  display: block;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--ink-900);
  margin-bottom: 6px;
}

.mood-card__blurb {
  display: block;
  font-size: 15px;
  line-height: 1.5;
  color: var(--ink-900);
  margin-bottom: 18px;
}

/* Transition lives here, not inline, so prefers-reduced-motion can win. */
.mood-card__photo {
  display: block;
  opacity: 1;
  transition: opacity 200ms ease;
}

.mood-card__photo--dim { opacity: 0.35; }

@media (prefers-reduced-motion: reduce) {
  .mood-card__photo { transition: none; }
}

/* Mood group — one heading plus its coffees. */
.mood-group { margin-top: 48px; }

.mood-group__title {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-500);
  margin: 0 0 4px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-hairline);
}

.coffee-list { list-style: none; margin: 0; padding: 0; }

.coffee-row {
  padding: 18px 0;
  border-bottom: 1px solid var(--border-hairline);
}

.coffee-row__head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 0 12px;
}

.coffee-row__name { font-weight: 700; font-size: 17px; color: var(--ink-900); }
.coffee-row__process { font-size: 14px; color: var(--ink-500); }

/* Size/price ladder. */
.sizes {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  margin-top: 6px;
}

.sizes__item { font-size: 15px; color: var(--ink-500); white-space: nowrap; }
.sizes__label { font-weight: 700; color: var(--ink-900); }
```

- [ ] **Step 2: Rewrite the three components in `src/sections/Coffees.jsx`**

Leave the `MOODS` array and the `COFFEES` import untouched.

```jsx
function SizeLadder({ sizes }) {
  return (
    <div className="sizes">
      {sizes.map((s) => (
        <span key={s.label} className="sizes__item">
          <span className="sizes__label">{s.label}</span>
          {' '}${s.price}
        </span>
      ))}
    </div>
  );
}

function MoodGroup({ mood }) {
  const list = COFFEES.filter((c) => c.profile === mood.id);
  return (
    <div className="mood-group">
      <h3 className="mood-group__title">{mood.title}</h3>
      <ul className="coffee-list">
        {list.map((c) => (
          <li key={c.id} className="coffee-row">
            <div className="coffee-row__head">
              <span className="coffee-row__name">{c.name}</span>
              <span className="coffee-row__process">{c.process}</span>
            </div>
            <SizeLadder sizes={c.sizes} />
          </li>
        ))}
      </ul>
    </div>
  );
}
```

And the mood button inside `Coffees()`:

```jsx
            <button
              key={m.id}
              type="button"
              aria-pressed={on}
              onClick={() => setActiveMood(on ? null : m.id)}
              className="mood-card"
            >
              <span className="mood-card__title">{m.title}</span>
              <span className="mood-card__blurb">{m.blurb}</span>
              <span className={dim ? 'mood-card__photo mood-card__photo--dim' : 'mood-card__photo'}>
                <Figure label={m.photo} ratio="3 / 4" />
              </span>
            </button>
```

The `<h2>` keeps `className="sect-headline"` but loses its `style` prop. Move those four declarations into the `.sect-headline` rule in `components.css`:

```css
.sect-headline {
  font-size: 46px;
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 44px;
}
```

- [ ] **Step 3: Verify**

```bash
grep -c "style={{" src/sections/Coffees.jsx   # expect 0
npm run build                                  # expect exit 0
```

In the browser: all 11 coffees list under three headings. Click a mood — the other two dim to 35% and the list narrows. Click it again — everything returns. With OS reduce-motion on, the dim is instant rather than faded. **That last check is a new capability**; it did not work before this task.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Coffees.jsx src/styles/components.css
git commit -m "Extract Coffees styles into classes"
```

---

### Task 7: Inquiry

**Files:**
- Modify: `src/sections/Inquiry.jsx`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `.control` (Task 3), `.split-2` (Task 2).
- Produces: `.split-2--top`, `.sent`, `.sent__title`, `.sent__body`, `.btn-outline`, `.btn-block`, `.seg`, `.seg__label`, `.seg__list`, `.seg__item`, `.seg__item--on`, `.pitch`, `.pitch__title`, `.pitch__body`.

Red: 12. Task 3 already converted the four controls; this task handles the rest.

- [ ] **Step 1: Add the rules**

```css
/* Inquiry's split aligns to the top rather than centering. */
.split-2--top { align-items: start; }

/* Post-submit confirmation panel. */
.sent__title {
  font-weight: 800;
  font-size: 28px;
  letter-spacing: -0.02em;
  margin: 0 0 12px;
}

.sent__body {
  font-size: 17px;
  line-height: 1.65;
  margin: 0 0 24px;
  color: var(--ink-500);
}

/* Outline button — secondary to .btn-pill and .btn-block. */
.btn-outline {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-900);
  background: none;
  border: 1px solid var(--ink-900);
  border-radius: var(--radius-field);
  padding: 13px 26px;
  cursor: pointer;
}

/* Full-width submit. Rect commits. */
.btn-block {
  width: 100%;
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--paper-100);
  background: var(--ink-900);
  border: none;
  border-radius: var(--radius-field);
  padding: 15px 20px;
  cursor: pointer;
  margin-top: 4px;
}

/* Segmented category selector. */
.seg { margin-bottom: 18px; }

.seg__label {
  display: block;
  font-weight: 700;
  font-size: 13px;
  margin-bottom: 9px;
  color: var(--ink-900);
}

.seg__list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 14px;
}

.seg__item {
  font-family: var(--font-body);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-500);
  background: none;
  border: none;
  padding: 0 0 5px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
}

.seg__item--on {
  color: var(--ink-900);
  border-bottom-color: var(--ink-900);
}

/* Partnership pitch, right column. */
.pitch__title {
  font-weight: 700;
  font-size: 14px;
  margin: 0 0 16px;
  color: var(--ink-900);
}

.pitch__body {
  font-size: 20px;
  line-height: 1.55;
  margin: 0;
  max-width: 30ch;
  color: var(--ink-900);
}
```

- [ ] **Step 2: Apply the classes in `src/sections/Inquiry.jsx`**

Replace each inline style with its class. The mapping, in source order:

| Line (original) | Replace with |
|---|---|
| `<div className="split-2" style={{ alignItems: 'start' }}>` | `<div className="split-2 split-2--top">` |
| `<h2 style={{ fontWeight: 800, ... }}>` (sent) | `<h2 className="sent__title">` |
| `<p style={{ fontSize: 17, ... }}>` (sent) | `<p className="sent__body">` |
| "Send another" `<button style={{...}}>` | `<button type="button" className="btn-outline">` |
| `<div style={{ marginBottom: 18 }}>` (category) | `<div className="seg">` |
| `<span style={{ display: 'block', fontWeight: 700, ... }}>Inquiry</span>` | `<span className="seg__label">` |
| `<div role="group" ... style={{ display: 'flex', ... }}>` | `<div role="group" aria-label="Inquiry category" className="seg__list">` |
| category `<button style={{...}}>` | `className={on ? 'seg__item seg__item--on' : 'seg__item'}` |
| submit `<button style={{ width: '100%', ... }}>` | `<button type="submit" className="btn-block">` |
| `<h2 style={{ fontWeight: 700, fontSize: 14, ... }}>` (pitch) | `<h2 className="pitch__title">` |
| `<p style={{ fontSize: 20, ... }}>` (pitch) | `<p className="pitch__body">` |

- [ ] **Step 3: Verify**

```bash
grep -c "style={{" src/sections/Inquiry.jsx   # expect 0
npm run build                                  # expect exit 0
```

In the browser: switch between all four categories — the underline follows and the dropdown appears for the three that have options and vanishes for General. Submit the form and confirm the thank-you panel and "Send another" both look unchanged.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Inquiry.jsx src/styles/components.css
git commit -m "Extract Inquiry styles into classes"
```

---

### Task 8: App shell, drop the DS bundle, close out Phase 1

**Files:**
- Modify: `src/sections/App.jsx`, `src/main.jsx`
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: everything above.
- Produces: `.app`. The whole-tree inline-style count reaches **0**, which is the gate for Phase 3.

- [ ] **Step 1: Add the `.app` rule to `src/styles/base.css`**

```css
/* App shell. */
.app {
  font-family: var(--font-body);
  background: var(--paper-100);
  color: var(--ink-900);
}
```

- [ ] **Step 2: Rewrite `src/sections/App.jsx`**

Landmarks come in Task 10 — this task only removes the inline style.

```jsx
export function App() {
  return (
    <div className="app">
      <StickyHeader />
      <Intro />
      <Coffees />
      <About />
      <Inquiry />
      <Footer />
    </div>
  );
}
```

- [ ] **Step 3: Drop the DS bundle import from `src/main.jsx`**

Delete the `./vendor/_ds_bundle.js` import line. **The file itself stays on
disk** — only the import goes, so it can be re-added if the storefront work
later needs it.

Before:

```jsx
import './vendor/react-global.js';
import './vendor/image-slot.js';   // register OUR shim first
import './vendor/_ds_bundle.js';   // its guarded image-slot registration now no-ops
```

After:

```jsx
import './vendor/react-global.js';
import './vendor/image-slot.js';
```

Confirm nothing depended on it:

```bash
grep -rn "_ds_bundle\|StancraftCoffeeDesignSystem" src --include="*.jsx" | grep -v "^src/vendor/"
```

Expected: no output. If anything matches, a section is rendering a DS
component and this task must stop — see the spec's "The DS bundle" section.

The "register OUR shim first" comment on the `image-slot` line referred to the
bundle's own guarded registration and no longer applies, so it is dropped in
the After block above.

- [ ] **Step 4: Verify — this is the Phase 1 gate**

```bash
grep -rn "style={{" src | wc -l    # MUST be 0
grep -c 'style="' index.html       # MUST be 0
grep -c "<style>" index.html       # MUST be 0
npm run build                      # expect exit 0
```

Compare the built JS to the pre-work baseline of 238 KB — it must be smaller, since 4,840 lines of DS bundle no longer ship:

```bash
ls -la dist/assets/index-*.js
```

Full page pass in the browser: every section renders, nothing has moved, nothing has changed color.

**If the tree count is not 0, do not proceed to Phase 3.** Find the stragglers with `grep -rn "style={{" src`.

- [ ] **Step 5: Commit**

```bash
git add src/sections/App.jsx src/main.jsx src/styles/base.css
git commit -m "Extract App shell styles and drop the unused DS bundle import"
```

---

## Phase 2 — Accessibility

### Task 9: Split Figure's label into alt and fpoLabel

**Files:**
- Modify: `src/components/Figure.jsx`, `src/sections/About.jsx:19`, `src/sections/Coffees.jsx`

**Interfaces:**
- Consumes: `.figure*` classes from Task 3.
- Produces: `Figure({ src, alt, fpoLabel, ratio })`. **The `label` prop no longer exists.** Every call site must be updated in this task.

Spec defect #2. Today each mood button announces as *"Something mellow, A flavorful and smooth cup, enjoyed by all., Mellow — portrait, toggle button"* — the FPO caption leaks into the accessible name because one prop does two jobs.

- [ ] **Step 1: Rewrite `src/components/Figure.jsx`**

```jsx
// Photo frame. Renders `src` when given, else a labeled FPO placeholder so an
// intentionally-empty slot reads as a gap rather than a finished choice.
//
// `alt` and `fpoLabel` are separate on purpose. A placeholder's caption is
// visual scaffolding, not a description of a photo — feeding it to alt put
// "Mellow — portrait" into the accessible name of every mood button.
// A placeholder is decorative: alt="".
import React from 'react';

export function Figure({ src, alt = '', fpoLabel, ratio = '3 / 4' }) {
  const ratioClass = ratio === '4 / 5' ? 'figure--4x5' : 'figure--3x4';
  return (
    <span className={`figure ${ratioClass}`}>
      {src ? (
        <img src={src} alt={alt} className="figure__img" />
      ) : (
        <span className="figure__fpo">{fpoLabel}</span>
      )}
    </span>
  );
}
```

- [ ] **Step 2: Update `src/sections/About.jsx:19`**

```jsx
        <Figure src="/assets/tyler.jpg" alt="Tyler logging a roast at the roaster" ratio="4 / 5" />
```

- [ ] **Step 3: Update the placeholder call in `src/sections/Coffees.jsx`**

```jsx
                <Figure fpoLabel={m.photo} ratio="3 / 4" />
```

- [ ] **Step 4: Verify**

```bash
grep -rn "label=" src/sections/ | grep Figure | wc -l   # expect 0 — no stale prop
npm run build                                            # expect exit 0
```

In the browser, inspect a mood card's placeholder: the `<img>` is absent (placeholders render a span), and the button's accessible name in DevTools' Accessibility pane reads "Something mellow A flavorful and smooth cup, enjoyed by all." with **no** trailing "Mellow — portrait". Check the About photo still has its real alt.

- [ ] **Step 5: Commit**

```bash
git add src/components/Figure.jsx src/sections/About.jsx src/sections/Coffees.jsx
git commit -m "Split Figure's label into alt and fpoLabel"
```

---

### Task 10: Add the main landmark and a skip link

**Files:**
- Modify: `src/sections/App.jsx`
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: `.app` from Task 8.
- Produces: `.skip-link`, and `<main id="main">` as the skip target.

Spec defect #3.

- [ ] **Step 1: Add the skip-link rule to `src/styles/base.css`**

```css
/* Skip link — offscreen until focused, then pinned top-left. */
.skip-link {
  position: absolute;
  left: -9999px;
  top: 0;
  z-index: 100;
  background: var(--ink-900);
  color: var(--paper-100);
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 13px 20px;
}

.skip-link:focus {
  left: 0;
}
```

`left: -9999px` rather than `display: none` — a hidden element cannot receive focus.

- [ ] **Step 2: Rewrite `src/sections/App.jsx`**

```jsx
export function App() {
  return (
    <div className="app">
      <a href="#main" className="skip-link">Skip to content</a>
      <StickyHeader />
      <main id="main">
        <Intro />
        <Coffees />
        <About />
        <Inquiry />
      </main>
      <Footer />
    </div>
  );
}
```

`StickyHeader` (a `<header>`) and `Footer` (a `<footer>`) stay outside `<main>` — they are page-level landmarks, not content.

- [ ] **Step 3: Verify**

```bash
npm run build   # expect exit 0
```

In the browser: load the page and press Tab once. "Skip to content" must appear top-left. Press Enter — focus lands past the masthead. Tab again from a fresh load without pressing Enter and confirm the link disappears when focus moves on.

- [ ] **Step 4: Commit**

```bash
git add src/sections/App.jsx src/styles/base.css
git commit -m "Add main landmark and skip link"
```

---

### Task 11: Control border contrast

**Files:**
- Modify: `src/tokens/palette-minimal.css`
- Modify: `src/styles/components.css`

**Interfaces:**
- Consumes: `.control` from Task 3.
- Produces: `--border-control`.

Spec defect #1, and **the only intended visual change in this plan.** `--ink-200` (`#D8D2C6`) measures 1.42:1 against the page; WCAG 1.4.11 requires 3:1 for UI components.

- [ ] **Step 1: Add the token to `src/tokens/palette-minimal.css`**

Next to the existing `--border-hairline` alias in the `:root` block:

```css
  /* Interactive control borders. --ink-200 measures 1.42:1 against paper and
     fails WCAG 1.4.11 (3:1 for UI components). This is the lightest value
     that clears it: 3.64:1 on the white input fill, 3.43:1 on paper.
     Decorative section hairlines keep --ink-200 and are exempt. */
  --border-control: #8F8574;
```

Do NOT put this in `colors.css` — the botanical palette reads that file and would inherit a value tuned for ivory paper.

- [ ] **Step 2: Point `.control` at it in `src/styles/components.css`**

Change the one declaration:

```css
  border: 1px solid var(--border-control);
```

- [ ] **Step 3: Verify**

```bash
grep -rn "border-control" src/tokens/palette-minimal.css src/styles/components.css | wc -l  # expect 2
npm run build   # expect exit 0
```

In the browser: the four Inquiry controls have visibly darker borders. The hairlines between sections and under coffee rows are **unchanged** — if those darkened too, the wrong token was edited.

- [ ] **Step 4: Commit**

```bash
git add src/tokens/palette-minimal.css src/styles/components.css
git commit -m "Raise control border contrast to meet WCAG 1.4.11"
```

---

### Task 12: Gate smooth scrolling behind reduced-motion

**Files:**
- Modify: `src/styles/base.css`

**Interfaces:**
- Consumes: `base.css` from Task 1.
- Produces: nothing new.

Spec defect #4. Smooth scrolling is a vestibular trigger and is currently unconditional.

- [ ] **Step 1: Split the rule**

Replace:

```css
html { scroll-behavior: smooth; scroll-padding-top: 68px; }
```

with:

```css
/* scroll-padding-top clears the fixed masthead (~53px) so an anchor target
   lands below it instead of underneath it. Applies regardless of motion
   preference — it is layout, not animation. */
html { scroll-padding-top: 68px; }

@media (prefers-reduced-motion: no-preference) {
  html { scroll-behavior: smooth; }
}
```

- [ ] **Step 2: Verify**

```bash
npm run build   # expect exit 0
```

In the browser with OS reduce-motion **on**: click "Shop here" — the jump to Coffees must be instant, and must still land below the masthead rather than underneath it. With reduce-motion **off**: it scrolls smoothly as before.

- [ ] **Step 3: Commit**

```bash
git add src/styles/base.css
git commit -m "Gate smooth scrolling behind prefers-reduced-motion"
```

---

### Task 13: Announce the mood filter and the submit confirmation

**Files:**
- Modify: `src/sections/Coffees.jsx`, `src/sections/Inquiry.jsx`

**Interfaces:**
- Consumes: `.mood-group` (Task 6), `.sent__title` (Task 7).
- Produces: nothing new.

Spec defects #5 and #6. Both are the same class of problem — content changes with no announcement — so they share a task.

- [ ] **Step 1: Wrap the mood results in a live region in `src/sections/Coffees.jsx`**

Replace the bare `{shown.map(...)}` at the end of `Coffees()`:

```jsx
      <div aria-live="polite">
        {shown.map((m) => <MoodGroup key={m.id} mood={m} />)}
      </div>
```

`polite` rather than `assertive` — the change is user-initiated, so it should queue rather than interrupt.

- [ ] **Step 2: Move focus to the confirmation heading in `src/sections/Inquiry.jsx`**

Add a ref near the existing state declarations:

```jsx
  const sentRef = React.useRef(null);

  React.useEffect(() => {
    if (sent && sentRef.current) sentRef.current.focus();
  }, [sent]);
```

Then attach it to the confirmation heading:

```jsx
              <h2 className="sent__title" ref={sentRef} tabIndex={-1}>
                Thanks{form.name ? `, ${form.name.split(' ')[0]}` : ''}.
              </h2>
```

`tabIndex={-1}` makes it programmatically focusable without adding it to the tab order.

- [ ] **Step 3: Verify**

```bash
npm run build   # expect exit 0
```

Keyboard check: fill the form, submit with Enter, and confirm focus lands on "Thanks" — the focus ring should be visible on the heading. Screen reader check: click a mood and confirm the narrowed list is announced.

- [ ] **Step 4: Commit**

```bash
git add src/sections/Coffees.jsx src/sections/Inquiry.jsx
git commit -m "Announce filter changes and move focus on submit"
```

---

## Phase 3 — CSP

**Gate:** `grep -rn "style={{" src | wc -l` must return **0** before starting. If it does not, Phase 1 is incomplete.

### Task 14: Move the GTM bootstrap out of index.html

**Files:**
- Create: `src/gtm.js`
- Modify: `index.html:5-11`, `src/main.jsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `src/gtm.js`, imported by `main.jsx`. No inline `<script>` remains in `index.html`.

The container snippet ships as inline `<script>` by convention, not requirement. Same-origin means `script-src 'self'` covers it — no nonce, no hash to keep in sync, and no dependency on the issue #6 Worker.

- [ ] **Step 1: Create `src/gtm.js`**

```js
// Google Tag Manager bootstrap. Lives in a same-origin module rather than an
// inline <script> so the CSP can use script-src 'self' with no nonce or hash.
// Behaviour is identical to the snippet it replaces.
(function (w, d, s, l, i) {
  w[l] = w[l] || [];
  w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
  const f = d.getElementsByTagName(s)[0];
  const j = d.createElement(s);
  const dl = l !== 'dataLayer' ? '&l=' + l : '';
  j.async = true;
  j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
  f.parentNode.insertBefore(j, f);
})(window, document, 'script', 'dataLayer', 'GTM-KFVLV9L8');
```

- [ ] **Step 2: Import it first in `src/main.jsx`**

GTM should initialize before the app renders, so this import goes at the top:

```jsx
import './gtm.js';
import './vendor/react-global.js';
import './vendor/image-slot.js';
```

- [ ] **Step 3: Delete the inline snippet from `index.html`**

Remove lines 5–11 — the `<!-- Google Tag Manager -->` comment through `<!-- End Google Tag Manager -->`. **Leave the `noscript` iframe in `<body>` alone**; it is markup, not script, and Task 1 already reclassed it.

- [ ] **Step 4: Verify**

```bash
grep -c "<script>" index.html                    # expect 0
grep -c "googletagmanager" index.html            # expect 1 — the noscript iframe only
npm run build                                    # expect exit 0
```

In the browser, open DevTools → Network, filter for `gtm.js`, reload. It must still load, and `window.dataLayer` must exist in the console.

- [ ] **Step 5: Commit**

```bash
git add src/gtm.js src/main.jsx index.html
git commit -m "Move the GTM bootstrap into a same-origin module"
```

---

### Task 15: Ship the Report-Only CSP

**Files:**
- Create: `public/_headers`

**Interfaces:**
- Consumes: zero inline styles (Task 8), zero inline scripts (Task 14).
- Produces: `public/_headers`, copied to `dist/` by Vite.

- [ ] **Step 1: Create `public/_headers`**

One header per policy, on a single line — `_headers` does not support line continuation.

```
/*
  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self'; img-src 'self' data: https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-src https://www.googletagmanager.com; base-uri 'none'; form-action 'self'; object-src 'none'; frame-ancestors 'none'
```

Report-Only deliberately: whatever tags are configured inside container `GTM-KFVLV9L8` are not visible from this repo and may reach domains this policy does not list. Report-Only surfaces them without breaking analytics on a live site.

`frame-src` is required for the GTM `noscript` iframe — without it, `default-src 'self'` blocks it.

- [ ] **Step 2: Verify it reaches the build**

```bash
npm run build
test -f dist/_headers && echo "_headers copied to dist"
```

- [ ] **Step 3: Verify the policy is actually satisfiable**

`vite dev` injects inline styles for HMR and never sees `_headers`, so dev proves nothing. Use the preview build:

```bash
npm run preview
```

`vite preview` does not serve `_headers` either, so apply the policy by hand for this check: open DevTools → Network → reload → click the document request → and confirm no `style-src` or `script-src` violations appear in the Console. Any violation here is a real bug to fix before pushing.

- [ ] **Step 4: Commit**

```bash
git add public/_headers
git commit -m "Add a Report-Only Content-Security-Policy"
```

---

## Task 16: Local verification checkpoint — STOP HERE

**Files:** none.

This is a human gate, requested explicitly: *"I want to see it locally before we push."*

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Run the full mechanical check**

```bash
grep -rn "style={{" src | wc -l     # 0
grep -c 'style="' index.html        # 0
grep -c "<style>" index.html        # 0
grep -c "<script>" index.html       # 0
npm run build                       # exit 0
ls -la dist/assets/index-*.js       # smaller than the 238 KB baseline
```

- [ ] **Step 3: Hand the checklist to the human**

Present these for them to confirm in their own browser:

| Check | Expected |
|---|---|
| Whole page | Nothing moved, nothing recolored — except… |
| Form control borders | Visibly darker (the one intended change) |
| Section hairlines | Unchanged, still light |
| Tab from page load | "Skip to content" appears first |
| Sticky masthead | Hidden at top, slides in past the hero, not tabbable while hidden |
| Mood filter | Dims other two, narrows the list, restores on second click |
| Form submit | Thank-you panel, focus lands on "Thanks" |
| Reduce-motion ON | No smooth scroll, no fade on mood dim, masthead appears instantly |
| Console | No errors |

- [ ] **Step 4: WAIT**

Do not proceed to Task 17 until the human confirms. If they report a problem, fix it, re-run Step 2, and present again.

---

## Task 17: Push and open a PR

**Files:** none.

Runs only after Task 16 is confirmed by a human.

- [ ] **Step 1: Confirm the git account**

Pushing to `outlawcam/coffee` requires the `outlawcam` account; `cbeckinsite` gets a 403.

```bash
gh auth status | grep -A1 "account outlawcam"
```

If it is not active: `gh auth switch --hostname github.com --user outlawcam`.

- [ ] **Step 2: Push**

```bash
git push origin design/minimalist-august
```

- [ ] **Step 3: Open the PR**

```bash
gh pr create --repo outlawcam/coffee --base main --head design/minimalist-august \
  --title "Extract inline styles, fix accessibility defects, add CSP" \
  --body "Implements docs/superpowers/specs/2026-09-07-styles-a11y-csp-design.md

Three dependent phases:
1. All 47 inline style blocks extracted into src/styles/. Component rules moved out of palette-minimal.css so a palette swap no longer takes the layout with it. Unused DS bundle import dropped.
2. Six accessibility fixes: control border contrast (1.42:1 → 3.64:1), Figure alt/fpoLabel split, main landmark + skip link, reduced-motion gating, live region on the mood filter, focus management on submit.
3. GTM bootstrap moved to a same-origin module; Report-Only CSP in public/_headers.

Verified locally. One intended visual change: form control borders are darker."
```

- [ ] **Step 4: Report the PR URL and STOP**

Do not merge. Merging is a separate decision.

---

## Post-merge follow-ups (not in this plan)

- Flip `Content-Security-Policy-Report-Only` to `Content-Security-Policy` once the console is quiet on the deployed site.
- GTM Preview Mode will fail under `style-src 'self'`. If Tyler needs it, add a second policy rather than weakening this one.
- Issue #6 (inquiry form backend) is unblocked by this work and independent of it.
