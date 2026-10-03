# Design exploration branches

**The exploration is over.** `design/minimalist-august` won and is merged to
`main`. This file is now a record of how `main` got its current shape, kept
because the history is confusing without it.

## Current state

| Branch | State |
|---|---|
| `main` | Trunk. The minimalist landing. |
| `design/minimalist-august` | The winning direction. Still the working branch — each change lands here and merges to `main` by PR. |
| `design/baseline` | Local-only pointer at `708b617`, the botanical landing before any redesign. That commit is in `main`'s history, so this is a convenience, not the only copy. |
| `design/broadsheet-side-nav` | Abandoned. Remote deleted 2026-10-03. A local branch lingers at `139c387` holding unmerged commits. |
| `design/broadsheet-top-nav` | Abandoned. Local-only at `5054a2a`, unmerged. |

Deleted: `feat/landing-cloudflare` (was `b6b03f9`, fully merged).

## History — `main` changed direction twice

`main` started as the botanical-palette landing. `design/broadsheet-side-nav`
merged into it via PRs #1 and #2, making `main` the 1920s-broadsheet site. PR
#3 then merged `design/minimalist-august` on top, replacing it.

That second merge was not additive — the two designs are mutually exclusive
layouts of one page, so it deleted the broadsheet sections (`Products`,
`Craft`, `WhereToBuy`, `Wholesale`, `MegaFooter`, `Club`, `Contact`, `Logo`,
`Seal`, `TexasStamp`, `LocationStamp`) along with `palette-broadsheet.css` and
the Flapjack font files. All of it remains in `main`'s history at `d54264f`.

The broadsheet work that was **not** design-specific was carried forward: the
SEO/social head (meta description, `og:*`, `twitter:*`), the `og.png` and
`logo-new.*` assets, and two generic CSS hardening rules.

PRs #4, #5, #7 and #8 then built on the minimalist direction — reordering
sections, real photography, a styles/accessibility/CSP pass, and the
bag-label coffee cards.

## The SES worker is no longer a blocker

An earlier version of this file said the broadsheet branches could not be
deleted until the Turnstile + Amazon SES wholesale worker (`worker/index.js`,
only on `design/broadsheet-side-nav`) had a home.

That no longer holds. The inquiry backend uses **Resend**, not SES, so the
delivery half was never going to be reused; and the Turnstile half is a short,
documented API call that is cheaper to rewrite than to keep a dead branch
alive for. See `docs/superpowers/specs/2026-10-03-inquiry-email-design.md`.

The two local broadsheet branches are therefore free to delete. They survive
only because `git branch -d` refuses branches with unmerged commits.

## Working style

- **Switch in place** (single working directory), e.g. `git switch main`.
- Commit or stash before switching.
- Dev server: `npm run dev`.
