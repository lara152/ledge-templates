# Handoff → ledgebuild/sitebuilder (converging the two engine builds)

> **Decision (2026-07-23):** the two parallel engine builds converge on **`ledgebuild/sitebuilder`**
> (Edgar's `v1-engine` roadmap) as the single source of truth. This repo (`lara152/ledge-templates`)
> becomes **reference/input**, not a second shipping engine, and is retired once the items below are
> folded into `sitebuilder`.
>
> **Why this doc:** `ledge-templates` independently built three looks (Meridian, GreenLeaf, **Summit**)
> + the shared media components + a lot of config schema — i.e. much of `sitebuilder`'s planned phases
> 05/06/07, plus one look that isn't on that roadmap at all. This is the map so Edgar can integrate it
> **his way** (generated schema from phase 00, look-dispatch lookup from phase 05) instead of copying
> our patterns.

---

## 1. What `ledge-templates` has that maps onto the v1-engine roadmap

| sitebuilder phase | What we already built (reuse as reference/input) |
|---|---|
| **05 — Shared media components** | Working `ImageSlot` (lazy + fixed aspect-ratio + labeled placeholder), `Gallery` + `Lightbox`, `BeforeAfter` (clip-path slider). All typed to a `MediaItem` `{ image, alt, caption, location }`. Drop-in reference for phase 05's real components. |
| **06 — Meridian look** | Fully built + build-verified: home (full-bleed hero + featured), Portfolio grid, **case-study pages** (`/portfolio/[slug]`, gallery+lightbox), Services (design-build narrative), Process + trust signals, About/Team, Contact. Charcoal/gold, Cormorant serif. |
| **07 — GreenLeaf look** | Fully built + build-verified: home (hero + short form + trust strip + services + before/after + reviews + areas), per-service landings (`/services/[slug]`), **Pricing**, **per-city SEO pages** (`/areas/[slug]`), Reviews, before/after Portfolio, short Contact. Green/amber, Plus Jakarta, tappable phone + urgency bar. |

**Important:** our looks were wired with the **binary/n-ary `template === 'x' ? … : …` branch pattern**
across `app/*` — exactly the pattern D4/phase-05 replaces with a look-dispatch lookup. **Do not copy the
branches.** Port the look *components* + *config* into the phase-05 lookup. The designs and the config
shapes are the reusable part; the dispatch wiring is not.

## 2. What's NET-NEW (not on the v1-engine roadmap): the **Summit** look

`ledge-templates` also built a **5th look, `summit`**, for a *different market than the roadmap covers*:
businesses that **sell to** landscapers (coach / agency), not landscapers themselves. First real
prospect: **Landscape SEO / "The Green Dream"** podcast (https://pod.co/the-green-dream) — no website.

- Bold dark look (emerald/lime, Plus Jakarta), **results-first**: revenue hero, stats band
  (250+ landscapers, seven-figure), a program (Diagnose→Position→Systemize→Scale), a **podcast** section,
  landscaper testimonials, and a single **"Book a call"** CTA (→ `contact.bookingUrl`, e.g. Calendly).
- Pages: Home (rich single-page), About, Contact.
- **Recommendation:** add a phase (e.g. `phase-09-summit-look`) — it's a real prospect and a distinct
  vertical, so it earns its own line rather than being squeezed into the landscaper looks.

## 3. Config schema additions to fold into `lib/types.ts` (then regenerate the schema)

All optional, additive; each look reads what it needs. These belong in `sitebuilder`'s `lib/types.ts`
so phase-00's `npm run schema:generate` picks them up (do NOT hand-edit the schema):

- **Shared:** `MediaItem { image; alt?; title?; location?; caption? }`; `Hero.points?: string[]`;
  `Service.slug?`, `Service.includes?: string[]`, `Service.gallery?: MediaItem[]`;
  `Contact.bookingUrl?: string`; `Template` union extended → `'classic'|'studio'|'meridian'|'greenleaf'|'summit'`.
- **Meridian:** `Project { slug; name; neighborhood?; year?; budget?; scope?[]; summary?; cover: MediaItem; gallery?: MediaItem[] }`;
  `ServicePhase { title; body?; image? }`; `Trust { awards?; certifications?; press? }`; `TeamMember { name; role?; image? }`.
  SiteConfig: `projects?`, `servicePhases?`, `trust?`, `team?`.
- **GreenLeaf:** `Plan { name; price?; cadence?; blurb?; features?[]; highlighted? }`;
  `BeforeAfterItem { city?; scope?; duration?; before: MediaItem; after: MediaItem }`;
  `Review { name; city?; rating?; text; source? }`; `Area { slug; city; blurb?; neighborhoods?[] }`.
  SiteConfig: `plans?`, `customQuote?`, `beforeAfter?`, `reviews?`, `reviewsSummary?`, `areas?`, `urgency?`.
- **Summit:** `Stat { value; label }`; `PodcastEpisode { title; url?; blurb? }`.
  SiteConfig: `stats?`, `podcast? { title?; url?; blurb?; episodes?: PodcastEpisode[] }`.

Also: the validator (`validate-config.cjs`) `ALLOWED_TEMPLATES` must include the new look ids.

## 4. Ready-made sample client configs (hand these over as fixtures)

In `ledge-templates` at `apps/sitebuilder/clients/`:
- `meridian-demo/` (Meridian) · `greenleaf-demo/` (GreenLeaf) · `green-dream-demo/` (Summit — the real prospect)
- (plus `northline-hvac/` classic + `sage-and-stone/` studio, already the sitebuilder's own)

All use empty-string image slots → `ImageSlot` placeholders; go-live = swap URLs. These are good phase-06/07/09 fixtures for the visual-parity exit checks.

## 5. Things `ledge-templates` does NOT have (they're yours; we adopt them by converging)

- Phase-00 **generated schema** (`schema:generate`) — ours is hand-authored. Yours wins.
- Phase-01 **draft status / noindex / preview ribbon / privacy+terms** — we never built these. Yours wins.
- Fleet model, `new-draft`, Workers deploy — not started either side.

## 6. Suggested integration order (fits the existing roadmap)

1. Land phases **02–05** as planned (fleet model, `new-draft`, Workers, shared media + look-dispatch).
   Use our `ImageSlot`/`Gallery`/`Lightbox`/`BeforeAfter` as the phase-05 reference implementation.
2. **Phase 06 (Meridian)** and **07 (GreenLeaf)**: port our components into the phase-05 lookup + add the
   config fields (§3) to `lib/types.ts`; reuse our demo configs (§4) as the parity fixtures.
3. Add **phase 09 (Summit)** for the coach/agency market + The Green Dream prospect.
4. Retire `lara152/ledge-templates` (archive or delete) once 06/07/09 land — one engine, one repo.

## 7. Where to look

Our code is pushed at **https://github.com/lara152/ledge-templates** — the looks live under
`apps/sitebuilder/components/{meridian,greenleaf,summit}/`, shared media under
`apps/sitebuilder/components/{ImageSlot,Gallery,Lightbox,BeforeAfter}.tsx`, schema in
`apps/sitebuilder/lib/types.ts`, per-look palettes in `apps/sitebuilder/components/BrandStyle.tsx`.
Overview: [`WHAT_WE_BUILT.md`](WHAT_WE_BUILT.md).
