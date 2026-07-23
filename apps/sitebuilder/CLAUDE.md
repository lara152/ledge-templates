# Development Guidelines — Ledge Sitebuilder

> **Purpose:** Hard rules and context for anyone (human or agent) working in this repo.
> This is the always-read operating doc. The new-client runbook is in [README.md](README.md)
> and codified in [`.claude/skills/new-client/SKILL.md`](.claude/skills/new-client/SKILL.md).

## What this repo is

A **single, reusable, vertical-agnostic marketing-website engine** for Ledge's prospects.
**One repo, many clients:** each client is a folder under `clients/<slug>/` holding their own
`site.config.json`; `npm run use <slug>` selects one and the same code builds it. An internal agent
produces a finished site by editing that client's config only. It builds to static HTML and deploys
to Cloudflare Pages (one project per client). The product's whole selling point is that the output is
fast, premium, and **answer-engine-ready** (rich SEO/AEO artifacts), so those artifacts are
first-class, not afterthoughts — and because there is **one codebase**, a fix reaches every client
(no divergent per-client copies to keep in sync).

## Template Invariants (non-negotiable)

These are the always-loaded rules. Everything else is detail.

1. **Config is the single source of truth.** Everything that varies per client lives in that client's
   `clients/<slug>/site.config.json`. Components, theme tokens, meta tags, JSON-LD, `llms.txt`,
   `sitemap.xml`, and the OG image all **derive** from it. A new client site is produced by adding a
   folder under `clients/` and editing config only. (The root `site.config.json` is a generated copy
   of the *active* client — written by `npm run use`; never hand-edit it, edit the client folder.)
2. **One repo, many clients — never fork the code for one client.** If a client needs something the
   config can't express, that's a change to the *engine* (new config field + the code that consumes
   it), applied for **all** clients — not a per-client fork. This is the whole point of one repo: fix
   once, everyone benefits. Surface it as an engine change; don't hard-code a business into a
   component. (See "Persisting strategy" below — point at the mechanism, don't weld a business name
   into a leaf.)
3. **SEO/AEO artifacts are derived, never hand-maintained.** JSON-LD, `llms.txt`, `sitemap.xml`,
   `robots.txt`, and meta tags are generated from config at build time. Do not hand-write or
   hand-edit any of them per client — fix the generator (`lib/schema.ts`, `lib/llms.ts`,
   `app/sitemap.ts`, `app/robots.ts`, layout/page `metadata`) so every client benefits.
4. **Visible content and structured data must match.** The FAQ is the canonical example: the visible
   FAQ and the `FAQPage` JSON-LD render from the same `audience.topQuestions`. Never add
   schema-only hidden content or let the two drift.
5. **The config validator has teeth.** `scripts/validate-config.cjs` runs inside `next build`
   (via `next.config.js`). A structurally invalid config **fails the build**. Extend the validator
   when you add a required field — don't let a bad config ship a broken site silently.
6. **The fixed stack is load-bearing.** `output: 'export'` and `images.unoptimized: true` in
   `next.config.js`, Next App Router, React + Tailwind, Cloudflare Pages (`next build` → `out`). These
   are constraints, not preferences — static export breaks if you remove them.

## Design principles (why the above works — adapted from the Dev Orchestration kit)

- **One source of truth + cite-don't-restate.** Every fact has exactly one home (`site.config.json`);
  everything else reads from it. A value copied into two places rots the moment one changes.
- **Derived, not hand-maintained.** If an artifact must be hand-edited to stay true, it will
  eventually lie. Generate it. (This is why all SEO artifacts are computed from config.)
- **Proportionality.** This is a static marketing template, not a multi-module app. It deliberately
  does **not** carry the full Dev Orchestration spine (roadmaps, phases, contract machinery, DB/API
  rules) — that ceremony solves coordination problems this repo doesn't have. Keep it light.
- **The mechanism test.** Before writing "never do X," ask whether a real constraint makes it always
  true. If yes, name the constraint (e.g. "static export has no server, so no runtime data fetching").
  If no, it's intent — point at the real capability and leave the judgment to the next person.

## Persisting strategy: point at the mechanism, hand over the judgment

When you write config fields, the validator, the README, or the `/new-client` skill, you're
translating intent for someone who won't have had this conversation. Name the real mechanism (the
config field, the generator, the token) and let the consumer decide — don't weld a door shut with a
blanket prohibition, and don't bake a specific business into a component "just for now."

## Code conventions

- **Components** `PascalCase.tsx`; **utils/helpers** `camelCase.ts`; **types** `type PascalCase`.
- **Semantic tokens only** — never hardcode a hex/color in a component. Use the Tailwind tokens
  (`primary`, `ink`, `surface`, …) which map to the config-driven CSS variables. (See
  [CONVENTIONS.md](CONVENTIONS.md).)
- **Accessibility is a requirement, not a nicety** — one `<h1>` per page, semantic landmarks, visible
  focus states, keyboard-navigable, WCAG-AA contrast, descriptive `alt`.
- **Minimal JS** — prefer server components and native HTML (`<details>` for FAQ). The only client
  component is the mobile nav.
- Run `npm run build` (validates config + type-checks + exports) before considering a change done.

## Branch & push policy

- **Work on a branch; PR to `main`.** Don't push to `main` unless explicitly told to.
- **Main-only (process) files** — change these on `main`, not feature branches:
  `CLAUDE.md`, `CONVENTIONS.md`, `.claude/**`.
- Branch naming: `feature/<slug>`, `fix/<slug>`, `chore/<slug>`.

## Commit convention

```
type(scope): brief description

- Detail 1
- Detail 2

Co-Authored-By: Claude Opus 4.8 (1M context) <noreply@anthropic.com>
```
Types: `feat`, `fix`, `refactor`, `docs`, `style`, `test`, `chore`

---

## Provenance — Dev Orchestration adoption

Set up from the Ledge **Dev Orchestration** kit (extracted from LedgeBuild `main`, 2026-07-07) on
2026-07-20. The kit is a portable dev-operating-system for Claude Code; per its own **proportionality**
guidance ("don't cargo-cult it into simple repos"; archetype C = marketing/content site), this
engine adopts only the parts that make a **one-repo-many-clients website engine** genuinely repeatable:

**Adopted:** this `CLAUDE.md` (Layer 0 operating doc) · the design principles above (single source of
truth, derived-not-hand-maintained, proportionality, mechanism test) · a codified new-client procedure
(`.claude/skills/new-client/`) · a config validator with teeth · [CONVENTIONS.md](CONVENTIONS.md) ·
the commit convention.

**Skipped (intentionally):** the full `/orient → /pm → /execute → /code-review → /doc-review` spine,
shared-rails contract machinery + charters, data-layer/backend/integration/migration rules (no DB, API,
or backend here), the PITFALLS incident catalog, capabilities index, and the ux-ui plan/execute
wireframe workflow (this template ships one baked-in design, not per-client wireframes). These solve
problems a static template doesn't have; add them only if this repo ever grows into active
multi-workstream development.
