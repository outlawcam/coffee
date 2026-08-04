# Design exploration branches

We are exploring the Stancraft landing page in parallel directions and
will pick a winner before merging to `main`. This file is the map so we
don't lose context when switching branches.

## Branches

| Branch | Role |
|---|---|
| `main` | Trunk. **Now the minimalist direction** — see the history note below. |
| `design/baseline` | **Safe point.** Snapshot of the botanical landing, frozen. Do not work here — return to it if a direction goes wrong. |
| `design/broadsheet-side-nav` | 1920s broadsheet / newspaper look with a **collapsible left (side) nav** on desktop. Superseded. |
| `design/broadsheet-top-nav` | 1920s broadsheet / newspaper look with a **top nav**. Superseded. |
| `design/minimalist-august` | Stark modern take — Montserrat throughout, ivory and ink, no nav. Four sections; photography is the only color. **Current direction.** |

The two broadsheet directions share the same 1920s newspaper aesthetic and
differ only in navigation placement. `design/minimalist-august` is a separate
direction entirely.

### History — `main` changed direction twice

`main` started as the botanical-palette landing. `design/broadsheet-side-nav`
merged into it via PRs #1 and #2, making `main` the broadsheet site. PR #3 then
merged `design/minimalist-august` on top, replacing it.

That second merge was not additive — the two designs are mutually exclusive
layouts of one page, so it deleted the broadsheet sections (`Products`,
`Craft`, `WhereToBuy`, `Wholesale`, `MegaFooter`, `Club`, `Contact`, `Logo`,
`Seal`, `TexasStamp`, `LocationStamp`) along with `palette-broadsheet.css` and
the Flapjack font files. All of it remains recoverable from the broadsheet
branches and from `main`'s history at `d54264f`.

The broadsheet work that was **not** design-specific was carried forward: the
SEO/social head (meta description, `og:*`, `twitter:*`), the `og.png` and
`logo-new.*` assets, and two generic CSS hardening rules.

Still only on `design/broadsheet-side-nav`, never merged anywhere: the
Turnstile + Amazon SES wholesale-inquiry worker (`worker/index.js`). The
minimalist form is not wired to a backend, so that work is still pending
adoption — its field contract is `{ name, email, category, inquiry, details }`.

## Working style

- **Switch in place** (single working directory), e.g. `git switch design/broadsheet-top-nav`.
- Commit or stash before switching — uncommitted changes otherwise block the switch or follow you across branches.
- Dev server: `npm run dev` (hot-reloads whatever branch is checked out).

## When we decide

- Merge the winning branch into `main`.
- Delete the losing direction branches, `design/baseline`, and the stale
  `feat/landing-cloudflare` — but not before the SES worker above has a home,
  since deleting `design/broadsheet-side-nav` would take it with it.
