# Ledge Templates — current status, how they work, and questions for Edgar

> **Purpose:** bring Edgar up to speed on how the website templates are built today, explain the
> difference between the two "families" that exist, and — most importantly — **ask him to challenge
> the approach**: Is this well thought out? How do we scale it without tripping over ourselves? Is it
> worth building a self-serve platform now, where a client picks a template and gets provisioned
> automatically?
>
> **Repo:** https://github.com/lara152/ledge-templates (monorepo, npm workspaces).
> **Attribution of opinions:** sections marked **[Claude]** are my analysis; sections marked
> **[For Edgar]** are open questions where we want your pushback.

---

## 1. The 4 templates today

| # | Template | Family | Where it lives | Stack | Status |
|---|----------|--------|----------------|-------|--------|
| 1 | **classic** | A — sitebuilder | `apps/sitebuilder` (a *look*) | Next.js | ✅ Done + on GitHub |
| 2 | **studio** | A — sitebuilder | `apps/sitebuilder` (a *look*) | Next.js | ✅ Done + on GitHub |
| 3 | **highend** (Meridian) | B — Vite | `apps/highend` (its own app) | Vite + React Router | ✅ Done · missing multi-client |
| 4 | **lowcost** (GreenLeaf) | B — Vite | `apps/lowcost` (its own app) | Vite + React Router | ✅ Done · missing multi-client |

They all share a base component package, `@ledge/ui` (only the Vite apps use it today).

---

## 2. The key difference: there are TWO families, two architectures

This is the thing to understand before anything else. The 4 are not the same kind of thing.

### Family A — the **sitebuilder** (classic + studio)
- **What it is:** ONE Next.js application that is an "engine." `classic` and `studio` are **not separate
  apps**: they are **two styles** of the same engine. You pick the style with one line of config
  (`"template": "classic"` or `"studio"`).
- **Multi-client: ALREADY solved.** Each client is a folder `apps/sitebuilder/clients/<client>/site.config.json`
  with THEIR data. One command (`npm run use <client>`) picks which one to build. The engine's code is a single copy.
- **What it's for:** producing **many** client sites **fast**, by editing one config file. It ships automatic
  SEO/answer-engine artifacts (JSON-LD, sitemap, llms.txt). Deploys to **Cloudflare Pages**.
- **Analogy:** a **coffee machine with 2 buttons**. You put in a client's data, press a button (style), out comes their site.

### Family B — the **Vite templates** (highend + lowcost)
- **What it is:** each one is **its own independent app**, hand-built, with rich pages (gallery, lightbox,
  before/after, routing with React Router).
- **Multi-client: NOT YET.** Today each app has a **single** `content.ts` (the demo's data). There is no clean
  way to put multiple clients into the same template. This is the gap to close.
- **What it's for:** premium/differentiated sites where design matters more than production speed. They deploy to **Vercel**.
- **Analogy:** two **finished cakes**. Each is its own thing; there's no "button" to pick.

### Side by side

| | Family A (sitebuilder) | Family B (Vite: highend/lowcost) |
|---|---|---|
| What is a "template"? | A *style* inside an engine | A full *app* |
| How is it chosen? | Config: `"template": "..."` | It's the folder itself (`apps/highend`) |
| Multi-client | ✅ `clients/<slug>/` + selector | ❌ doesn't exist yet |
| Client data | `clients/<slug>/site.config.json` | Today: a single `content.ts` |
| Deploy | Cloudflare Pages | Vercel |
| Automatic SEO | Yes (JSON-LD, sitemap, llms.txt) | Basic (hand-built) |
| Strength | Volume, speed, config-driven | Bespoke design, interactivity |

---

## 3. How the repo is organized (so Edgar can orient himself)

```
ledge-templates/
├── packages/ui/            @ledge/ui — "Lego" components + tokens (Button, Card, ImageSlot,
│                           Gallery, Lightbox, BeforeAfter). Used by the Vite templates.
└── apps/
    ├── highend/            Vite — its own app (luxury residential)     [single content.ts]
    ├── lowcost/            Vite — its own app (conversion / volume)    [single content.ts]
    └── sitebuilder/        Next.js — config-driven engine
        └── clients/
            ├── northline-hvac/   → "classic" look
            └── sage-and-stone/   → "studio" look
```

- **`@ledge/ui` is shared via an alias** (a single copy of the code; fix it there → improves in all the Vite apps).
- **The sitebuilder is self-contained** (it has its own components; it does not use `@ledge/ui`).
- **Images:** today they're placeholders. Each template centralizes its images in a data file
  (`content.ts` / `site.config.json`) with the shape `{ src, alt, caption, neighborhood }`. You swap them by
  replacing URLs. (At scale, photos should live in a bucket like Cloudflare R2, not in the repo.)

---

## 4. What we DO love and want to keep: "fix one → fix them all"

This property comes from **separating the template's code from the client's data**:
- The **code** lives once (the template / `@ledge/ui`). If you fix a bug or improve the design, **it reaches
  every client on that template at once.**
- Each client's **data** lives separately, isolated.

Today this **already works in Family A** (sitebuilder). In **Family B (Vite) it does not yet**, because they lack
the multi-client layer. **Our proposed next step is to give it to them**, so all 4 work the same way.

---

## 5. [Claude] The vision: a self-serve platform

**Lara's idea (to present to Edgar):** a client lands on a Ledge site, sees a **gallery of all the templates**
(with live preview), picks the one they like, fills out a form with their info and photos, hits "apply for this
template," **and the data reaches us and their folder/site gets created automatically.**

### [Claude] How to get there — my recommendation: in stages, NOT all at once

The classic mistake would be to build the whole platform first. Better to validate cheaply and go up one step at a time:

- **Stage 0 — foundation (now):** give highend/lowcost the **multi-client** layer (same `clients/` + selector
  pattern the sitebuilder already has). Without this, nothing scales. Do it now, whether or not the platform happens.

- **Stage 1 — manual but fast intake:** a simple form (a page, or even Typeform/Formspree) where the prospect
  **picks a template + sends their info and photos**. It lands in a **Supabase** table (Ledge already has Supabase)
  + the photos in **Cloudflare R2**. A human at Ledge reviews and runs a script that builds the client folder and
  deploys. *At low volume (<20 sites in 6 months), the human step is a quality gate, not a bottleneck.*

- **Stage 2 — semi-automated provisioning:** a command `new-client <template> <submission-id>` that pulls the data
  from Supabase + photos from R2, generates the client's `content.ts`/config, commits, and triggers the deploy
  (Vercel/Cloudflare API). A human still presses the button, but it's 1 command.

- **Stage 3 — full self-serve:** the Ledge app: gallery + **live preview with THEIR data** + "apply" → creates
  everything on its own (folder via the GitHub API, deploy via the Vercel/Cloudflare API, domain). This is the real
  SaaS. **Only build it once Stage 1 proves the funnel converts.**

### [Claude] Where the data lives in this model
- **Business info + which template + status** → a table in **Supabase** (reuse Ledge's; no Firebase).
- **Photos** → **Cloudflare R2** (or Supabase Storage), one folder per client.
- **Generated site** → its own deploy + domain (isolated per client).
- **Template code** → the monorepo (shared, fixed once).

---

## 6. [Claude] How to make it as scalable as possible (without tripping, without "revisiting")

Principles that sustain the "fix one → fix all" property and avoid redoing work:

1. **Separate CODE from DATA.** The template's code is shared; each client is just data. **Never** clone the
   template per client (that causes *drift*: you fix one and the rest stay old).
2. **One source of truth per fact.** Each client's info in ONE place (their file / their DB row). Nothing copied in
   two spots that can fall out of sync.
3. **Derived, not hand-maintained.** SEO, sitemaps, previews → generated from the data, not hand-edited.
4. **Disciplined shared primitives.** `@ledge/ui` is the Lego layer: new templates reuse it and improvements
   propagate. Rule: reusable stuff goes in the package; whatever gives identity lives in each template.
5. **Provision with code, not by hand.** Onboarding = a repeatable script/pipeline. That's what lets you scale
   without human error.
6. **A client registry** (one table: who has which template, which domain, what status). The "control panel."
7. **Consistency across templates.** Every template should handle clients the same way (same `clients/` pattern),
   so you don't relearn per template. (That's why it matters to align highend/lowcost with the sitebuilder's model.)
8. **Keep the hosting limits in mind.** We already measured: Cloudflare Pages caps at ~100 projects/account and
   500 builds/month; Vercel has its own. At real scale a **multi-tenant** model may win (a single deployed app that
   serves many clients from the DB, routing by domain) instead of one deploy per client. **← this is a big question
   for Edgar (below).**

---

## 7. [For Edgar] Questions — please **CHALLENGE US**

We want honest pushback. If you think something is over-engineered, badly framed, or that there's a simpler path, say so bluntly.

### On the two families
1. Is it a mistake to have **two architectures** (config-driven engine vs app-per-template)? Should we unify on a single one? Which one, and what do we lose?
2. Two stacks (Next.js/Cloudflare + Vite/Vercel) in one repo, two deploy targets. Is that a maintenance trap? Should we standardize?

### On multi-client for the Vite templates
3. Is "a `clients/` folder per template + selector" the right model, or should client data live in a **database/CMS from day one** (so a non-dev can edit without touching the repo)?
4. At what point does "each client is a folder in the repo" break down? (repo size, build times, the Cloudflare/Vercel project caps)

### On the self-serve platform
5. Is building the platform **premature**? What's the **cheapest** way to validate that a free template site **converts** a prospect into a paying Ledge customer, BEFORE building it?
6. **Build vs. buy:** should we use something that already exists (Webflow, Framer, a headless CMS) instead of hand-building all of this? What do we gain/lose by owning the code?
7. If we build it: what's the **minimum viable** provisioning pipeline? GitHub API + Vercel API? Or better **multi-tenant** (a single app that renders any client from the DB, routing by domain) — zero per-client repos/deploys?

### On scale and architecture
8. The "fix one → fix all": does it hold up when a client wants **customization**? If a client wants something the template can't express, do we fork (drift) or extend the template (and risk breaking the others)? Where do we draw that line?
9. **Multi-tenant vs. deploy-per-client:** a single deployed app per template, serving all its clients from a DB, routing by domain? That would dodge the deploy caps. Real tradeoffs?
10. **Images at scale:** R2 vs Supabase Storage vs an image CDN with resizing? What would you pick for hundreds of clients × dozens of photos?

### On business / operations
11. Is "free site as a lead magnet" the right funnel? What converts better: free, or a paid template + setup fee?
12. Who **maintains** the sites after launch (edits, support)? That's the hidden cost nobody plans for.

### The meta question
13. Are we **over-engineering**? Should we hand-build the first ~5 real client sites and **learn**, before systematizing any of this?
14. Is a **monorepo** even the right call, or would separate repos + a shared published npm package be cleaner at scale?

---

## 8. Pending decisions / next steps

- **Immediate (independent of everything):** give highend/lowcost the multi-client layer (Stage 0). Agreed?
- **To decide with Edgar:** do we unify the families? multi-tenant vs deploy-per-client? build vs buy? when (or whether) do we build the self-serve platform?
- **To validate before investing in the platform:** does a free site convert? (build 1–2 by hand with real clients and measure).

> **Note:** this document lives in the `ledge-templates` repo (root). Decisions coming out of the talk with
> Edgar should be recorded right here so we don't re-litigate them later.
