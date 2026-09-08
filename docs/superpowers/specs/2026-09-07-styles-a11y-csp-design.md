# Styles, accessibility, and CSP — landing page hardening

**Branch:** `design/minimalist-august`
**Date:** 2026-09-07
**Status:** Approved

Three passes over the existing minimalist landing page, in one dependent
sequence: move every inline style into CSS classes, fix the accessibility
defects that only become fixable once the styles are in CSS, then ship a
Content-Security-Policy that the extraction has made possible.

No new features, no layout changes, and — apart from one deliberate
contrast fix — no visual changes.

## Goals

- **Design-system integrity.** Component rules stop living inside a
  swappable palette file. `src/tokens/` holds variables; a new
  `src/styles/` holds rules.
- **Accessibility.** Fix six confirmed defects, four of which are
  invisible in the browser and only appear in the accessibility tree or
  under a media query.
- **CSP.** Ship `style-src 'self'` with no `'unsafe-inline'`, which
  requires that zero inline styles remain.
- **Readable JSX.** Sections become scannable structure rather than
  30-line style objects.

All four were named as drivers. CSP is the strictest: it is the reason
the extraction must be total rather than selective.

## Non-goals

- No visual redesign. The one intended visual change is the control
  border (see Accessibility #1).
- No test framework. The repo has none and this work does not justify
  introducing one; see Verification.
- No CSS Modules, no utility framework, no build changes.
- No changes to `src/tokens/palette-botanical.css` or the espresso
  tokens other branches read.
- Not the inquiry form backend — that is issue #6 and independent of
  this work.

## Approach

Plain global stylesheets with semantic class names, rejected
alternatives noted.

**CSS Modules was the serious alternative and was rejected on
integration grounds, not simplicity.** This repo's landing sections get
pushed *into* the Stancraft Coffee Design System project's
`ui_kits/landing/`, where the runtime is global React with Babel and no
ESM. CSS Modules' build-time scoping does not survive that trip; plain
global classes do. Scoping would also buy little on a six-section page.

Utility-first CSS was not considered seriously — it would fight the
existing token system, which is the thing this work is trying to
strengthen.

### The DS bundle

`src/main.jsx` imports `src/vendor/_ds_bundle.js` (4,840 lines). Its
components are themselves built on inline styles, so under a strict
`style-src` they would break the moment anything rendered one.

Nothing renders them. No section references the
`StancraftCoffeeDesignSystem_65aedf` global; `Section`, `Field`, and
`Figure` are all local. The bundle currently loads, registers nine
components on `window`, and does nothing.

**Decision: drop the import from `main.jsx`. Keep the file.** The page
becomes self-contained, the JS bundle shrinks, and all four drivers
become reachable. If the storefront work later needs it, re-add it then
— by which point the DS may have moved off inline styles itself.

`src/vendor/image-slot.js` stays imported. `base.css` still styles that
element, and unpicking two vendor threads at once is unnecessary risk.

## File layout

```
src/tokens/                  variables ONLY
  colors.css, fonts.css, typography.css, layout.css,
  flavors.css, palette-minimal.css, palette-botanical.css

src/styles/                  rules (new)
  base.css                   lifted from index.html's <style> block
  layout.css                 .section, .shell, .split-2, .moods
  components.css             .btn-pill, .control, .field, .mood-card,
                             .coffee-row, .sticky-head, .figure, .seg

src/styles.css               entry point: imports tokens/ then styles/
```

`.split-2`, `.moods`, `.sect-headline`, `.sticky-head`, and the
`:focus-visible` block move out of `palette-minimal.css` into
`src/styles/`. That file returns to being what its name promises, so
swapping palettes no longer takes the layout with it.

Import order in `styles.css` matters: tokens first, rules second, and
`palette-minimal.css` stays last among the tokens so it keeps
overriding `colors.css` and `palette-botanical.css` as it does today.

## Class inventory

47 inline style blocks across 11 files collapse to roughly 30 classes.

| File | Classes |
|---|---|
| `components/Section.jsx` | `.section`, `.section--last`, `.shell` |
| `components/Field.jsx` | `.field`, `.field__label`, `.control` |
| `components/Figure.jsx` | `.figure`, `.figure__img`, `.figure__fpo` |
| `sections/Intro.jsx` | `.intro`, `.intro__mark`, `.btn-pill` |
| `sections/Coffees.jsx` | `.mood-card`, `.mood-card__title`, `.mood-card__blurb`, `.mood-card__photo`, `.mood-group`, `.mood-group__title`, `.coffee-list`, `.coffee-row`, `.coffee-row__name`, `.coffee-row__process`, `.sizes`, `.sizes__item`, `.sect-headline` |
| `sections/Inquiry.jsx` | `.btn-block`, `.seg`, `.seg__item` |
| `sections/Footer.jsx` | `.site-footer`, `.site-footer__text` |
| `sections/App.jsx` | `.app` |

### Three cases that need more than a rename

**1. `CONTROL_STYLE` is an exported style object.** `Field.jsx` exports
it and the four Inquiry controls import and spread it. It becomes a
`.control` class and the export disappears — the cleanest single
simplification in the refactor.

**2. State-driven styles become modifier classes.** `StickyHeader`
computes `opacity`, `transform`, and `visibility` from `stuck`;
`Coffees` computes `opacity` from `dim`.

```
.sticky-head            { opacity: 0; visibility: hidden;
                          transform: translateY(-100%); }
.sticky-head.is-stuck   { opacity: 1; visibility: visible;
                          transform: translateY(0); }
.sticky-head img        { transform: scale(1.3); }
.sticky-head.is-stuck img { transform: scale(1); }
.mood-card__photo--dim  { opacity: 0.35; }
```

`is-stuck` is *already applied in the JSX* but has no rule behind it —
the inline styles have been overriding it since the header was written.
This finishes something already started.

**3. `Coffees.jsx:93` has `transition: 'opacity 200ms ease'` inline.**
This is exactly the bug `palette-minimal.css:86-88` warns about in a
comment: an inline `transition` beats any stylesheet rule, so the
existing `prefers-reduced-motion` block cannot neutralize it. Extracting
it fixes a live accessibility defect.

### Also removed

- `Section`'s `style` passthrough prop — no caller uses it.
- The `_ds_bundle.js` import (above).
- The `<style>` block in `index.html`, moved to `base.css`.
- The `style="display:none;visibility:hidden"` attribute on the GTM
  `noscript` iframe, replaced by a class.

Nothing stays inline. Every remaining value is enumerable state, so
`style-src` can drop `'unsafe-inline'` with no exceptions.

## Accessibility

Six confirmed defects.

### 1. Control borders fail contrast

`--ink-200` (`#D8D2C6`) is documented as "hairlines, input borders" and
measures **1.42:1** against `--paper-100`. WCAG 1.4.11 requires 3:1 for
UI components. Decorative hairlines between sections are exempt;
interactive control borders are not.

**Fix:** add `--border-control: #8F8574` to `palette-minimal.css`,
alongside the existing `--border-hairline` alias — 3.64:1 on the white input
fill, 3.43:1 on paper. This is the lightest value that clears 3:1 with
margin. Decorative hairlines keep `--ink-200` and stay visually
unchanged.

This is the one intended visual change in this work: input, select, and
textarea borders become visibly darker.

### 2. `Figure`'s label leaks into accessible names

`Figure` uses a single `label` prop for both the FPO placeholder caption
and the `img` alt. `Coffees.jsx:94` passes `m.photo`, so each mood
button currently announces as:

> "Something mellow, A flavorful and smooth cup, enjoyed by all., Mellow
> — portrait, toggle button"

**Fix:** split the prop into `alt` and `fpoLabel`. Placeholders get
`alt=""`. The existing photo (`About.jsx`) keeps its real alt text.

### 3. No `<main>`, no skip link

`App.jsx` renders a bare `<div>`. `<header>`, `<footer>`, and
`<section>` landmarks exist, but there is no `<main>` and no way to skip
the masthead.

**Fix:** wrap the sections in `<main id="main">` and add a skip link as
the first focusable element, visible on focus, styled in `base.css`.

### 4. `scroll-behavior: smooth` is ungated

`index.html:38` sets it unconditionally. Smooth scrolling is a
vestibular trigger with no opt-out.

**Fix:** in `base.css`, gate it behind
`@media (prefers-reduced-motion: no-preference)`.

### 5. The mood filter is silent

Clicking a mood card rewrites the coffee list below it with no
announcement. Sighted users see the change; screen reader users get
nothing.

**Fix:** `aria-live="polite"` on the results region.

### 6. The `sent` state swap is silent

Submitting replaces the form with a thank-you panel. Focus stays on the
now-removed submit button and nothing is announced.

**Fix:** move focus to the thank-you heading with `tabIndex={-1}`.

### Checked and deliberately left alone

- `aria-pressed` on the mood buttons is correct — they are toggles, not
  radios.
- `StickyHeader`'s `aria-hidden` is redundant with `visibility: hidden`,
  but harmless. Removing it would be churn.
- Heading order is correct. `Coffees.jsx:37`'s `<h3>` appears before the
  `<h2>` in *source* order only; `MoodGroup` renders after it in the DOM.
- `--ink-900` (16.41:1) and `--ink-500` (5.56:1) both pass comfortably,
  including `--ink-500` on the FPO fill (4.83:1).

## Content-Security-Policy

### GTM does not need to be inline

The container snippet ships as inline `<script>` by convention, not
requirement. Moving the bootstrap into a same-origin file
(`src/gtm.js`, imported from `main.jsx`) means `script-src 'self'`
covers it: no nonce, no hash to keep in sync, and **no dependency on the
Worker from issue #6**. This ships with the branch.

Per Google's CSP guidance, GTM needs `'unsafe-eval'` only for Custom
JavaScript Variables (avoidable via Custom Templates), and Google
domains in `style-src` only for Preview Mode.

### Delivery

A static `public/_headers`, which Cloudflare's asset serving honors:

```
/*
  Content-Security-Policy-Report-Only: default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self'; img-src 'self' data: https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com; frame-src https://www.googletagmanager.com; base-uri 'none'; form-action 'self'; object-src 'none'; frame-ancestors 'none'
```

**Report-Only first, deliberately.** Whatever tags are configured inside
container `GTM-KFVLV9L8` may reach domains this policy does not list,
and the container is not visible from the repo. Report-Only surfaces
violations in the console without breaking analytics on a live site.
Flip the header name to `Content-Security-Policy` once it is quiet.

### Known trade-offs

- **GTM Preview Mode will break** under `style-src 'self'` — it needs
  `tagmanager.google.com` and `fonts.googleapis.com`. This is a
  deliberate trade. If Tyler uses Preview, add a second policy rather
  than weakening this one.
- **Local development is unaffected.** `_headers` applies to deployed
  assets only; `vite dev` injects inline styles for HMR and never sees
  this policy.
- `form-action 'self'` is correct today (the form makes no network call)
  and will still be correct when issue #6 posts to a same-origin
  `/api/inquiry`.

## Sequencing

Strictly ordered — each phase depends on the previous one.

1. **Extraction.** Classes, file layout, DS bundle import removed. The
   greps below must return zero before phase 3 is possible.
2. **Accessibility.** The six fixes. Several are only expressible now
   that rules live in CSS.
3. **CSP.** `src/gtm.js`, `public/_headers`, Report-Only.

## Verification

The repo has no test framework and this work does not justify adding
one. The checks are mechanical where they can be and manual where they
must be.

| Check | Method | Pass condition |
|---|---|---|
| No inline styles in JSX | `grep -rn "style={{" src \| wc -l` | `0` |
| No inline style attrs in HTML | `grep -n 'style="' index.html` | empty |
| No inline `<style>` block | `grep -c "<style>" index.html` | `0` |
| Build succeeds | `npm run build` | exit 0, CSS asset emitted |
| Bundle shrank | compare `dist/assets/index-*.js` to 238 KB | smaller |
| No CSP violations | preview + console, Report-Only on | console quiet |
| Accessible name fixed | screen reader spot-check a mood button | no "Mellow — portrait" |
| Keyboard pass | Tab from page load | skip link first; focus ring visible on every control |
| Reduced motion | OS setting on, scroll and toggle a mood | no smooth scroll, no fade |
| Contrast | already computed | 3.64:1 / 3.43:1 |
| Automated a11y | axe via Chrome DevTools | no new violations |

The first three greps are the gate between phase 1 and phase 3: the CSP
cannot tighten until they pass.

## File changes

**New**
- `src/styles/base.css`
- `src/styles/layout.css`
- `src/styles/components.css`
- `src/gtm.js`
- `public/_headers`

**Modified**
- `src/styles.css` — import `styles/`
- `src/tokens/palette-minimal.css` — rules move out, variables stay, add
  `--border-control`
- `src/main.jsx` — drop `_ds_bundle.js`, add `gtm.js`
- `index.html` — `<style>` block and GTM snippet out, noscript class in
- `src/sections/App.jsx` — `<main id="main">`, skip link
- `src/components/Section.jsx` — classes, drop `style` prop
- `src/components/Field.jsx` — classes, drop `CONTROL_STYLE` export
- `src/components/Figure.jsx` — classes, split `label` into `alt` + `fpoLabel`
- `src/sections/Intro.jsx`, `Coffees.jsx`, `About.jsx`, `Inquiry.jsx`,
  `Footer.jsx`, `StickyHeader.jsx` — classes, plus the a11y fixes above

**Unchanged**
- `src/vendor/*` — bundle stays on disk, just unimported
- `src/data/coffees-2026-07.js`
- `src/tokens/palette-botanical.css`, `flavors.css`, `fonts.css`,
  `typography.css`, `layout.css`
