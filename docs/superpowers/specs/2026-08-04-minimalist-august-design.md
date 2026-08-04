# Minimalist August — landing page design

**Branch:** `design/minimalist-august` (from `main`)
**Date:** 2026-08-04
**Status:** Approved

A fourth parallel design exploration alongside `design/baseline`,
`design/broadsheet-side-nav`, and `design/broadsheet-top-nav`. Where the
broadsheet directions go 1920s newspaper, this one goes stark and modern:
Montserrat throughout, ivory and ink, photography as the only color.

## Goals

- Four sections, top to bottom: Intro, Coffees, About, Inquiry. No nav.
  The lineup sits directly under the Intro so "Shop here" lands on product
  immediately, rather than after two sections of preamble.
- Show the real product lineup — 11 coffees with size/price variants —
  without a cart, since there is no store yet.
- Establish a variant pattern (product with 1–3 size/price rows) the repo
  does not currently have.
- Route all inbound contact through one form with a two-step inquiry
  taxonomy.

## Non-goals

- No shopping cart, checkout, or store integration.
- No wholesale tier pricing on the page (it exists in the spreadsheet but
  stays private).
- No backend. The form validates client-side only; see Inquiry below.
- No changes to the shared token files that other design branches read.

## Design language

### Typography

Montserrat only. Spectral is dropped on this branch — the mockup sets body
copy in Montserrat, and introducing a serif is precisely what would break the
minimalism. Weights 400–900 are already imported via `@fontsource`, so this
removes an import rather than adding one.

| Role | Weight | Size | Tracking | Case |
|---|---|---|---|---|
| Section headline | 800 | 46 px | -0.03em | Sentence, terminal period |
| Small label | 700 | 14 px | 0 | Sentence |
| Mood title | 700 | 14 px | 0.04em | Uppercase |
| Body | 400 | 17 px | 0 | Sentence |
| Body large (pitch) | 400 | 20 px | 0 | Sentence |
| Button | 700 | 13 px | 0.08em | Uppercase |
| Field label | 700 | 13 px | 0 | Sentence |
| Footer / fine print | 400 | 13 px | 0 | Sentence |

Body line-height 1.65; headline line-height 1.05.

Three sizes sit outside this scale on purpose: the Coffees mood blurb at
15 px (secondary card copy, deliberately below body), the coffee-name row
label at 17 px/700 (a label, not body), and the Inquiry success heading at
28 px/800.

### Color

Two colors carry the page:

- Ivory `#FBF8F1` — page background (existing `--paper-100`)
- Ink `#1A1A1A` — all text, all buttons (existing `--ink-900`)

Plus neutral support: `#6B635B` secondary text, `#D8D2C6` hairlines and input
borders, `#FFFFFF` input fills.

Cherry, gold, pastel blue, and mulberry go unused. On a page this bare the
photographs supply all the color, which is what makes the reference mockup
work. Introducing a brand accent would fight them.

Implemented as `src/tokens/palette-minimal.css`, appended as the last
`@import` in `src/styles.css` so it overrides the existing token files. The
shared token files themselves are not edited, so the other design branches are
unaffected.

### Shape

- Pill (`border-radius: 999px`) — navigational buttons ("Shop here")
- Rounded rect (`6px`) — form inputs and Submit
- Photo frame (`14px`) — all imagery

The two button shapes encode different jobs: a pill moves you around the
page, a rect commits something.

### Section rhythm

Every section sits on the same ivory, separated by a single `1px` hairline at
low contrast. Vertical padding 96 px desktop / 64 px mobile. The Intro is the
exception: it occupies `75vh` with its contents centered vertically, so the
wordmark holds the opening screen and the coffee lineup crests into view just
below the fold. Content max-width 1120 px, centered.

Inquiry is the final section and carries `last`, suppressing its bottom
hairline because the Footer supplies its own top border.

Two-column sections alternate which side holds text: About is text-left /
photo-right, Inquiry is form-left / pitch-right. Both collapse to a single
column below 860 px.

## Sections

### 0. Sticky masthead

Not a section — a fixed bar that keeps the wordmark on screen everywhere.

While the Intro's wordmark is visible the bar is hidden. Once that wordmark
scrolls out of view, the bar slides down from `translateY(-100%)` and stays,
carrying a 24 px-tall logo on an opaque ivory ground with a bottom hairline.
The logo settles from `scale(1.3)` to `scale(1)` as it arrives, so the handoff
from the big hero mark reads as a shrink rather than a swap.

`position: fixed`, not `sticky`: the page scrolls behind an opaque bar, and the
header claims no space inside the Intro's 75vh.

The trigger is an `IntersectionObserver` on the Intro's `<h1 id="intro-logo">`
rather than a scroll listener — no work per scroll frame, and the trigger point
is defined by the hero mark itself, so changing the hero's height needs no
matching change in the header.

The bar carries `visibility: hidden` while hidden, so its link leaves the tab
order; `aria-hidden` keeps it out of the accessibility tree. Its logo has
`alt=""` because the anchor's `aria-label` names the link and the Intro's `<h1>`
already supplies the wordmark's accessible name — otherwise the mark is
announced twice. Transitions live in `palette-minimal.css`, not inline, so
`prefers-reduced-motion: reduce` can neutralize them; an inline `transition`
would beat any stylesheet rule.

Because the bar is opaque and fixed, `index.html` sets
`scroll-padding-top: 68px` so anchor targets land below it rather than beneath
it.

### 1. Intro

Centered `logo-stancraft.svg` at ~440 px wide, then a black pill button
reading "Shop here". The section is `min-height: 75vh` with its contents
centered on both axes — `min-height` rather than `height` so a short viewport
grows the section instead of clipping the button.

The button targets `#coffees` — an in-page scroll, not an outbound link,
because there is no store yet and the coffees section is the closest thing to
a shop.

Note: the SVG is a single-line horizontal lockup (viewBox `0 0 101.38 27.1`,
aspect ≈ 3.7:1). The reference mockup stacks "STANCRAFT / COFFEE CO." on two
lines. Using the supplied asset means one wide line. Accepted.

### 2. Coffees

Headline "A coffee for everyone.", then three mood cards in a row: title,
one-line description, photo below. Copy verbatim:

- **Something mellow** — A flavorful and smooth cup, enjoyed by all.
- **Something curious** — Need something a bit more dynamic? This is your bag.
- **Something funky** — Be ready for an other-worldly cup of coffee.

Each card is a real `<button>` with `aria-pressed`. Three photos are FPO
placeholders.

**Interaction.** Default state shows all 11 coffees grouped under all three
mood headings, so the section informs before anyone clicks. Selecting a mood
narrows the list to that mood and dims the other two cards to 35% opacity.
Selecting the active mood again clears back to showing everything. The three
cards collapse to a single stacked column below 700 px.

**Each coffee renders as one row:** name, process, then its size ladder as a
row of spaced flex entries (`12 oz $16`, `2 lb $36`, `5 lb $82`), each its own
flex child with a gap between them rather than a single middot-joined string.
This lets the ladder wrap cleanly, entry by entry, on narrow screens instead
of breaking mid-string. This is the repo's first variant pattern — a product
carries 1–3 size/price pairs rather than a single `price` number.

Wholesale tier pricing is never rendered.

### 3. About

Text left, portrait right. Copy verbatim from the mockup:

> **About us**
>
> I'm Tyler, the owner and operator of the family-owned, Stancraft Coffee
> Company. This started about 5 years ago as a hobby of mine and quickly
> became a passion project. I fell in love with the art and nuance of
> roasting and delighted in serving guests my freshly-roasted coffee, all for
> the glory of God.

The portrait is an FPO placeholder labeled "Photo of Tyler". `public/assets`
has no photo of him, and an obvious gap is better than substituting
`craft.jpg` and having a placeholder read as a finished choice.

### 4. Inquiry

Form left, partnership pitch right. Pitch copy verbatim:

> **Interested in partnering with Stancraft?**
>
> Whether it be for your café, your restaurant, or your startup coffee cart,
> we'd love to provide you with some of the highest quality coffee to serve
> to your guests.

The section keeps its partnership framing as the headline even though the
form now serves all inbound contact — partnership is the highest-value
inquiry, and the selector quietly routes everyone else.

**Fields:** Your name (required) · Email address (required, `type=email`) ·
Inquiry (selector + dependent dropdown) · Details (textarea, 4 rows).
Submit is full-width black.

**The Inquiry control is two steps.** A row of four unstyled text buttons
with an underline on the active one — no segmented-control borders. The
selection controls which dropdown options exist:

| Selector | Dropdown options |
|---|---|
| General | *none — the dropdown is not rendered* |
| Wholesale | Wholesale / Bulk Orders · Café / Restaurant Partnerships · Private Label / White Label · Collabs & Brand Partnerships · Events / Pop-Ups / Catering |
| Customer Support | Order Status / Tracking · Shipping & Delivery Issues · Returns / Refunds · Damaged or Incorrect Order · Retail Order Support · Subscription Questions |
| Product | Product Availability / Restock · Coffee Sourcing / Origin · Certifications (Organic, Fair Trade, etc.) · Roast Profiles / Brewing Help · Sustainability Practices |

This covers all 16 inquiry reasons the client supplied. General is a
catch-all: nothing to disambiguate, so the visitor writes it in Details and
no second dropdown appears. Default selector state is General, so the form
opens at its simplest.

Changing the selector resets any chosen dropdown value, so a stale
Wholesale option can never be submitted under a Product category.

**Submission.** Validates and swaps to an inline success state in place. No
network request — the Turnstile/SES worker lives on
`design/broadsheet-side-nav` and is not on this branch. The field contract is
fixed now so that worker can adopt it without rework:

```
{ name, email, category, inquiry, details }
```

`category` is one of `general` / `wholesale` / `support` / `product`.
`inquiry` is the empty string when category is `general`.

## Data

`src/data/coffees-2026-07.js` replaces `src/data/coffees.js`, rebuilt from
`docs/Stancraft_Coffee_Co._Prices_July_2026.xlsx` (RETAIL sheet). Exported as
an ES module array rather than assigned to `window`, since only `Coffees.jsx`
consumes it.

```js
{ id: 'alta-mogiana', name: 'Brazilian Alta Mogiana', origin: 'Brazil',
  process: 'Natural', profile: 'mellow',
  sizes: [{ label: '12 oz', price: 16 },
          { label: '2 lb',  price: 36 },
          { label: '5 lb',  price: 82 }] }
```

Gram weights map to labels: 227 g → 8 oz, 340 g → 12 oz, 907 g → 2 lb,
2268 g → 5 lb.

| Coffee | Origin | Process | Profile | Sizes |
|---|---|---|---|---|
| Brazilian Alta Mogiana | Brazil | Natural | mellow | 12 oz $16 · 2 lb $36 · 5 lb $82 |
| Guatemala Huehuetenango | Guatemala | Washed | mellow | 12 oz $20 · 2 lb $40 · 5 lb $92 |
| Colombia Huila Pitalito | Colombia | Washed | curious | 12 oz $18 · 2 lb $38 · 5 lb $88 |
| Ethiopia Yirgacheffe (Chechele) | Ethiopia | Natural | curious | 12 oz $22 · 2 lb $44 · 5 lb $100 |
| Ethiopia Yirgacheffe (Chelbessa) | Ethiopia | Washed | curious | 12 oz $22 · 2 lb $44 · 5 lb $100 |
| Kenya Nyeri | Kenya | Washed | curious | 12 oz $23 · 2 lb $46 · 5 lb $104 |
| Yemen Sharqui Haraz | Yemen | Natural | curious | 12 oz $32 · 2 lb $68 · 5 lb $148 |
| Ethiopia Yirgacheffe (Koke) | Ethiopia | Honey | funky | 12 oz $24 · 2 lb $48 · 5 lb $108 |
| Mexico Mundo Maya | Mexico | Natural | funky | 12 oz $25 · 2 lb $52 · 5 lb $116 |
| Colombia Pink Bourbon Cake Banana | Colombia | Co-Ferment | funky | 8 oz $28 |
| Colombia Juicy Strawberry | Colombia | Co-Ferment | funky | 8 oz $28 |

Counts: 2 mellow, 5 curious, 4 funky.

### Reconciling against the old data file

The spreadsheet is dated July 2026 and is treated as source of truth. It
disagrees with `src/data/coffees.js` in four ways, all resolved in the
spreadsheet's favor:

- **Added:** Brazilian Alta Mogiana, Kenya Nyeri.
- **Dropped:** Guji Quabballe, EA Decaf — not in the July sheet.
- **Renamed:** the sheet's "Colombia, Washed" row is under-named — the sheet
  was never updated. Tyler confirmed the coffee is **Colombia Huila Pitalito**,
  which is what renders. (The old data file called it "Huila Pitalito
  Supremo"; the confirmed name drops "Supremo".)
- **Spelling:** the sheet's "Sharqui Haraz" is used over the old file's
  "Sharqi Haraz".

One field is not in the sheet: it gives no process for Yemen Sharqui Haraz.
`Natural` is carried over from the old data file, which is the only source we
have for it. Worth confirming with Tyler.

Tasting notes and brew methods from the old file are not carried over. This
design shows process and price only; notes would crowd the row and the sheet
does not supply them for the two new coffees.

## Components

Each file has one job and can be read on its own.

| File | Responsibility |
|---|---|
| `sections/Intro.jsx` | Wordmark + shop pill |
| `sections/About.jsx` | Bio copy + portrait |
| `sections/Inquiry.jsx` | Form, two-step selector, success state |
| `sections/Coffees.jsx` | Headline, mood cards, filtered lineup |
| `sections/Footer.jsx` | Hairline + contact line |
| `components/Figure.jsx` | Photo frame; renders `src` or a labeled FPO block |
| `components/Field.jsx` | Label + input/select/textarea wrapper |
| `data/coffees-2026-07.js` | The 11 coffees |
| `tokens/palette-minimal.css` | Ivory/ink overrides |

`Figure` exists because `src/vendor/image-slot.js` renders *nothing* without a
`src`, which is wrong for a design review where four images are deliberately
FPO. `Figure` shows a labeled neutral block naming the intended subject.

`Field` exists so the four form controls share label typography and border
treatment without repeating it four times.

### Dropping the vendored design system

These sections do not use `window.StancraftCoffeeDesignSystem_65aedf`. Its
`Button`, `Input`, and `Select` are compiled against the botanical palette and
carry radius, shadow, and color assumptions that this design contradicts;
overriding them costs more than writing four bare elements. `_ds_bundle.js`
stays imported in `main.jsx` only because `image-slot` registration is
entangled with it.

## File changes

**Added:** `tokens/palette-minimal.css`, `components/Figure.jsx`,
`components/Field.jsx`, `sections/Intro.jsx`, `sections/About.jsx`,
`sections/Inquiry.jsx`, `sections/Coffees.jsx`, `sections/Footer.jsx`,
`data/coffees-2026-07.js`

**Rewritten:** `sections/App.jsx` (composes the five sections),
`main.jsx` (drops the five Spectral `@fontsource` imports),
`styles.css` (appends the `palette-minimal.css` import)

**Deleted:** `sections/Products.jsx`, `sections/Craft.jsx`,
`sections/WhereToBuy.jsx`, `sections/Wholesale.jsx`, `sections/MegaFooter.jsx`,
`data/coffees.js` — all present on `main`, so recoverable.

`DESIGN-BRANCHES.md` gains a row for this branch.

## Verification

No test framework exists in this repo, so verification is manual and visual:

1. `npm run dev` starts clean with no console errors.
2. Intro: wordmark renders; "Shop here" scrolls to the coffees section.
3. Inquiry: each of the four selector values shows the right dropdown
   options; General shows no dropdown; switching selectors clears the
   dropdown value; submitting with empty required fields is blocked;
   a valid submit shows the success state.
4. Coffees: default shows all 11 grouped by mood; each mood button narrows
   correctly and dims the others; re-clicking clears; the two co-ferments
   show one size, the other nine show three.
5. Prices on screen match the RETAIL sheet exactly.
6. Responsive: 1440 / 860 / 700 / 375 px — no horizontal scroll, both
   two-column sections collapse, the size ladder wraps.
7. `npm run build` succeeds.
