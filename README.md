# Ledge Site Factory

Internal tool to **pre-build polished websites for landscape prospects** ("feedback partners"), from
content they already publish, before we contact them. The site is the outreach gift. **Not self-serve**
— no client accounts/logins/dashboards (one consent page at go-live is the only exception).

> **Source of truth:** [`BRD_LEDGE_SITE_FACTORY.md`](BRD_LEDGE_SITE_FACTORY.md) (Edgar, v1.0) +
> [`CONVENTIONS.md`](CONVENTIONS.md). This BRD **supersedes all prior strategy/architecture docs**
> (the templates write-up, earlier plans). Decisions get recorded against the BRD.

## The model (from the BRD)

- **One engine — Next.js static export** (`apps/sitebuilder`). A **client is a data folder**
  (`clients/<slug>/site.config.json`), never a code copy. Customization is **config-only, no forks ever**
  → fix the engine once, every client benefits.
- **Four looks, selectable by one config line** (`"template": "..."`):
  - `classic`, `studio` — already built into the engine.
  - `meridian` (was the "highend" Vite app), `greenleaf` (was "lowcost") — **being rewritten as looks**
    (M1). Their old standalone Vite apps are kept in [`_reference/`](_reference/) as design reference only.
- **Deploy target: Cloudflare Workers (static assets)** — not Pages, not Vercel. One Worker per site.
- **Data:** Supabase (registry, leads, consent) + Cloudflare R2 (images). One central lead Worker.
- **Build cadence:** an operator runs `new-draft <slug>` from a worksheet + a `photos/` folder + a logo.
  Manual first; the scraper is deferred (see BRD §5).

## Structure

```
ledge-site-factory/
├── BRD_LEDGE_SITE_FACTORY.md   ← source of truth
├── CONVENTIONS.md              ← engineering conventions (point every AI session here first)
├── apps/
│   └── sitebuilder/            ← THE engine (Next.js). Looks + clients/<slug>/ live here.
├── packages/
│   └── ui/                     ← @ledge/ui — components being vendored into the engine (Gallery, Lightbox, BeforeAfter)
└── _reference/                 ← retired standalone Vite apps (highend, lowcost) — DESIGN REFERENCE ONLY, not built
```

## Run

```bash
npm install
npm run dev        # the engine → http://localhost:3000
npm run clients    # list client data folders + which is active
npm run use <slug> # pick which client to build
npm run build      # static export
```

## Status — Milestone M1 (Engine)

Rewriting `meridian` + `greenleaf` as engine looks so all four render from sample configs at visual
parity (gallery / lightbox / before-after working). Then M2 (send), M3 (go-live path), M4 (operate).
See the BRD §6 for the full milestone plan.
