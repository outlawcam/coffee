# Shopify Scaffolding Design

Date: 2026-07-07

## Context

Setting up the initial project scaffolding for a local coffee roaster's Shopify
site. The roaster will eventually sell through three channels: direct-to-consumer
products, subscriptions, and wholesale/B2B (local coffee shops, plus bulk buyers
like Azure Standard). No business name exists yet, so a placeholder is used
throughout.

This design covers only the **basics**: a working theme repo, a GitHub-based
deploy pipeline, and Claude Code configuration for this repo. It intentionally
does not cover subscription app selection, wholesale quote/intake/fulfillment
process design, or Shopify Plus/B2B — those are deferred to their own future
design passes (see "Deferred" below).

## Decisions

- **Build type: standard Shopify theme (Liquid)**, not a custom Hydrogen
  storefront. A theme covers everything needed for direct sales, subscriptions,
  and a wholesale/informational section without the ongoing engineering
  overhead of a fully custom storefront.
- **No Shopify Plus.** At $2,500/mo it's out of range for a startup. This means
  no built-in B2B module (net terms, PO checkout, company accounts). Wholesale
  order handling will instead go through a lighter-weight process (quote
  request, manual/app-assisted invoicing) to be designed separately.
- **Placeholder name: `coffee`**, matching the existing working directory. Used
  for the repo, theme name, and dev store name. Renaming later is a
  straightforward find-and-replace once a business name exists.
- **Theme base: Dawn** (Shopify's free, actively-maintained reference theme).
  Chosen over a premium theme because this involves real custom development
  work — Dawn provides a clean, current, unopinionated starting point that
  subscription/wholesale apps are built and tested against first.

## Scope for this pass

**In scope:**
1. Git repo (already initialized, `main` as default branch)
2. Theme scaffold forked from Dawn via Shopify CLI
3. GitHub Actions pipeline: PR validation + deploy-on-merge
4. CLAUDE.md and Claude Code project configuration

**Out of scope / deferred:**
- Creating the actual Shopify Partner account and development store — this
  requires a human to sign up (email verification, business details) and
  can't be done from the CLI/agent. Handoff instructions are provided instead.
- Choosing a subscriptions app (e.g. Shopify's native Subscriptions app vs.
  Recharge/Skio/etc.)
- Designing the wholesale quote/intake/fulfillment flow (no Plus B2B module
  available, so this needs its own design covering forms, pricing tiers,
  invoicing, and fulfillment handoff)
- The real business name and branding

## Repo structure

Standard Shopify Online Store 2.0 layout, produced by `shopify theme init`:

```
coffee/
  assets/
  config/
  layout/
  locales/
  sections/
  snippets/
  templates/
  blocks/
  .theme-check.yml
  .github/
    workflows/
      theme-check.yml
      deploy.yml
  CLAUDE.md
  docs/
    superpowers/
      specs/
```

## GitHub Actions pipeline

Two workflows:

1. **`theme-check.yml`** — runs on every pull request. Executes
   `shopify theme check` (the Liquid/theme linter) as a required status check.
   Catches schema errors, deprecated Liquid, and accessibility issues before
   merge.
2. **`deploy.yml`** — runs on push to `main`. Executes
   `shopify theme push --live` to deploy directly to the published theme on
   the connected store.

Authentication uses a **Theme Access** app token (scoped to theme files only,
not full Admin API access), stored as the `SHOPIFY_CLI_THEME_TOKEN` GitHub
Actions secret. This points at the development store initially; switching to
the real store later only requires updating the secret and store domain — no
pipeline changes.

## Store setup (manual handoff)

Since no Shopify store exists yet, and account creation can't be automated,
the following steps need to happen outside this repo before the pipeline can
actually deploy anywhere:

1. Create a Shopify Partner account (partners.shopify.com)
2. Create a development store from the Partner dashboard (placeholder name
   `coffee`)
3. Generate a Theme Access token for that store
4. Add the store domain and token as GitHub Actions secrets on this repo

These steps will be handed off as explicit instructions once the repo
scaffold is in place.

## CLAUDE.md / Claude Code configuration

A CLAUDE.md at the repo root documenting:
- Business context: direct sales, subscriptions, and (future) wholesale to
  local shops and bulk buyers; no Shopify Plus/B2B module
- Theme structure and where things live (sections, blocks, templates)
- How the deploy pipeline works (PR → theme check; merge to main → live)
- Pointers to the relevant `shopify-plugin` skills (Liquid, custom data,
  onboarding-dev) so future Claude Code sessions in this repo reach for them

No custom subagents are being defined yet — the existing shopify-plugin
skills cover theme/Liquid development well. This can be revisited if a
repeatable, project-specific task emerges (e.g. bulk content population).

## Testing / validation

- `shopify theme check` in CI catches most theme-level errors automatically.
- Manual verification: after scaffolding, run `shopify theme dev` locally
  against the dev store (once created) to confirm the theme serves correctly
  before relying on the pipeline.
