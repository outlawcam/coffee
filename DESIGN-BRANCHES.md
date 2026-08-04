# Design exploration branches

We are exploring the Stancraft landing page in parallel directions and
will pick a winner before merging to `main`. This file is the map so we
don't lose context when switching branches.

## Branches

| Branch | Role |
|---|---|
| `main` | Trunk. Currently equals the botanical-palette landing. Winner merges here. |
| `design/baseline` | **Safe point.** Snapshot of the botanical landing, frozen. Do not work here — return to it if a direction goes wrong. |
| `design/broadsheet-side-nav` | 1920s broadsheet / newspaper look with a **collapsible left (side) nav** on desktop. |
| `design/broadsheet-top-nav` | 1920s broadsheet / newspaper look with a **top nav**. |
| `design/minimalist-august` | Stark modern take — Montserrat throughout, ivory and ink, no nav. Four sections; photography is the only color. |

The two broadsheet directions share the same 1920s newspaper aesthetic and
differ only in navigation placement. `design/minimalist-august` is a separate
direction entirely.

## Working style

- **Switch in place** (single working directory), e.g. `git switch design/broadsheet-top-nav`.
- Commit or stash before switching — uncommitted changes otherwise block the switch or follow you across branches.
- Dev server: `npm run dev` (hot-reloads whatever branch is checked out).

## When we decide

- Merge the winning branch into `main`.
- Delete the losing direction branch, `design/baseline`, and the stale `feat/landing-cloudflare`.
