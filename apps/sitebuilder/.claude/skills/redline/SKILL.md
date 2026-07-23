---
name: redline
description: Agentic design-quality review of the RENDERED sitebuilder template — builds the static export, drives a headless browser, forces states, screenshots at 390 + 1440, opens every disclosure, grades each page against the sitebuilder's OWN design system (not another repo's), and produces before/after redlines with real renders. Use for a deliberate quality pass ("redline the home page", "the design feels off", "polish before we mark it a template"). Complements the config validator + build gate (correctness) — this one judges QUALITY.
---

# /redline — design-quality review for the sitebuilder template

> The config validator + `next build` answer "does it BUILD and validate?".
> Lighthouse answers "is it fast/accessible/SEO-clean?". `/redline` answers
> "does it read like a FINISHED, PREMIUM product?" — typography, hierarchy,
> density, affordance, consistency, copy altitude. A static code read can't feel
> a cramped section or a weak hierarchy; those only show up drawn.
>
> This is adapted from Ledge's `/redline` (written for the desk/GTM app). The
> METHOD is kept; everything app-specific is retargeted to the sitebuilder. Judge
> ONLY against the sitebuilder's design language — never drift toward another
> repo's tokens/fonts/rules.

## When to run

- A deliberate quality pass on a page ("redline Home", "why does Contact feel off?").
- After a design change to a component, before considering it done.
- Before marking the repo a GitHub template (one polished baseline benefits every clone).
- NOT a pre-commit gate — that's `npm run build` (validate + type-check + export) and Lighthouse.

## The design language you judge against (the anchor — do not drift)

Every proposal must be expressible in the sitebuilder's EXISTING system:

- **Type:** Space Grotesk = display/headings (`font-display`), Inter = body (`font-sans`).
  Headings inherit section color (light sections → `--ink`, dark bands → light). No third family.
- **Color/tokens:** semantic Tailwind tokens (`primary`, `accent`, `ink`, `surface`, `line`)
  that resolve to the config-driven CSS variables in `app/globals.css` + `components/BrandStyle.tsx`.
  **Never** hardcode a hex in a component; **never** invent a new color token.
- **Buttons:** the `.btn` family in `globals.css` — `.btn-primary` (brand fill),
  `.btn-outline`, `.btn-on-dark`, `.btn-accent`. A control doing button work must read as one of these.
- **Radius/spacing/shadow:** `--radius` (via `rounded-card`/`rounded-control`), the shadow tokens
  (`shadow-soft`/`shadow-lift`), the container (`container-page`) and section rhythm (`.section`).
- Out of scope (flag as a decision, never redline in): new tokens, a new type scale, adopting a
  UI-kit's defaults, or anything that only works for one client's brand colors.

## Hard rules

1. **Read-only.** Navigate, click to reveal states, screenshot. Never submit the contact form.
2. **Propose inside the sitebuilder's language** (section above). AI review drifts generic —
   this rule is the anchor.
3. **Config-driven + theme-agnostic.** Every finding/fix must stay config-driven: no client
   content hardcoded into a component, and the fix must hold for ANY brand (verify against the
   default sample config AND at least one alternate — e.g. swap `brand.colors` + `primaryCTA`,
   rebuild, re-check). A fix that only looks right for teal is not a fix.
4. **Both widths, phone first.** 390×844 and 1440×900. Phone findings outrank desktop.
5. **Every finding cites its rule** (a line in `CONVENTIONS.md` / `CLAUDE.md` / the design language
   above, with file:line) OR is explicitly labeled **[taste]** (a judgment call, vetoable). Never
   dress taste as a rule.
6. **Redlines are real renders, never freehand HTML** — a before/after pair produced by the
   mechanic below, using the real tokens.
7. **Nothing self-executes.** Accepted fixes are chosen from options you present.

## Coverage ledger — "never reviewed" ≠ "reviewed and clean"

Update the row (date + one-line note) at the end of every run. A `--sweep` walks every page,
one at a time, at 390 + 1440, opening every disclosure.

| Page / surface | Last redlined | Notes |
|---|---|---|
| / (Home) | — | hero, services overview, proof, FAQ, CTA band |
| /services | — | full services grid |
| /about | — | who-we-serve, credentials, stats panel |
| /contact | — | contact methods, map, form |
| Header + Footer (global) | — | nav, mobile menu, NAP, links |

## Setup (the sitebuilder mechanic — no auth, no DB)

1. `npm run build` (validates config + type-checks + exports to `out/`).
2. Serve `out/` locally with a tiny static server that maps clean URLs
   (`/about/` → `about/index.html`) — e.g. a Node `http` server on a spare port.
3. Drive **headless Chrome** for shots and DOM probes:
   `chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1440,<h> --screenshot=<file> <url>`
   and `--window-size=390,<h>` for phone. For overflow/spacing probes, launch with
   `--remote-debugging-port` and drive via the DevTools protocol (`Emulation.setDeviceMetricsOverride`
   to force a true 360/390 viewport, then `Runtime.evaluate` `getBoundingClientRect()`).
4. Shots land in `docs/audits/<yyyy-mm-dd>-redline-<page>/shots/` (committed with the report).

## Forcing states (a page is NOT reviewed until its states are seen)

> **HARD RULE — open every disclosure.** Before writing a finding, list each disclosure on the page
> and confirm you opened + shot it. A collapsed FAQ item graded by its header is not a review.

| Page | States to force |
|---|---|
| / (Home) | hero at both widths; each service card; testimonials; **every FAQ `<details>` open**; CTA band |
| /services | full grid; a card's price pill; CTA band |
| /about | who-we-serve; credentials list; the stats aside |
| /contact | contact methods; map iframe loaded; the form empty (never submit) |
| Header/Footer | desktop nav; **mobile menu OPEN** (390); footer NAP + social + links |
| Config edge | rebuild once with a SPARSE config (empty tagline, no testimonials, no logo, `primaryCTA: form`) to see empty/fallback states and the monogram logo path; **revert to the sample config before committing** |

## The catch catalog (grade every shot against ALL of these)

**A. Typography**
- Headings in `font-display` (Space Grotesk); body/prose in `font-sans` (Inter). No mono for prose;
  no third family. Reading measure ≤ ~75ch for body (`max-w-prose`).
- One display face doing display work; no condensed/expanded misuse.

**B. Hierarchy & scanability**
- The section's/ card's anchor (business name in the hero, service name in a card) is the
  first-scanned element; meta/pills/prices weigh less. Two elements fighting for first glance = finding.
- One reading order per card: title → meta → body → action.

**C. Density & noise**
- Spacing on Tailwind's scale + the `.section` rhythm; no ad-hoc margins breaking sibling rhythm.
- **Adjacent-control spacing INSIDE a card:** walk each card's direct children top-to-bottom; any
  pair with 0px computed gap (probe `getBoundingClientRect().bottom` vs next `.top`) where neither is
  a visual continuation is a finding. Measure it, don't eyeball (form fields ↔ button ↔ hint especially).
- Badge/pill piles: ≥4 in one cluster → demote.

**D. Affordance & controls**
- Every control doing button work reads as one of the `.btn` tiers (border/fill + hover). Bare text
  or a borderless control doing an action = finding.
- Text links read as links (underline or clearly non-body color); dead-styled links = finding.
- Icon-only controls (mobile menu, chevrons) have a real hit target (≥40px phone) and an accessible name.
- Native controls (select, file input, checkbox) styled to match, not left OS-default beside styled ones.
- Touch targets ≥ ~40px on phone.

**E. Action hierarchy**
- ONE primary CTA per viewport, driven by `config.goal.primaryCTA`. Secondary actions demoted
  (`.btn-outline`). No two orange/primary buttons competing above the fold.

**F. Cross-page consistency**
- Same concept renders the same on all 4 pages: card shape, pill styling, section header rhythm,
  breadcrumb, CTA band, footer. Diff a page against its siblings — same element, different treatment = finding.
- Display comes from config/helpers (`lib/site.ts`), not a hardcoded variant that drifts.

**G. Copy altitude**
- Answer-first: each section opens with the direct answer, no filler intro (a product requirement).
- No dev/jargon in visible copy; hints are one sentence.

**H. States present**
- Empty state renders gracefully when a config field is absent (section hidden or sensible fallback,
  never a blank slab or a dangling label). A possible-empty section rendering an empty shell = P0.
- The monogram logo path (no `logoPath`) looks intentional.

**I. Accessibility**
- One `<h1>` per page; landmark elements; visible `:focus-visible`; WCAG-AA contrast on tints/pills
  and on dark bands (headings on dark must be light — the known trap); descriptive `alt`; `aria-*` on
  icon-only controls. (Lighthouse A11y should stay 100.)

**J. Rendering correctness**
- No horizontal overflow: at 360/390, `document.documentElement.scrollWidth === clientWidth`
  (probe it). No clipping/truncation/overlap at either width.

**K. Config fidelity**
- The page reflects the config faithfully and degrades gracefully: re-theming (colors/radius/fonts)
  and re-populating (different services/FAQ/CTA) both look finished — verify with the alternate config
  from rule 3.

## Before/after mechanic (the redline output)

Top 3–5 findings per run (attention is the budget):

- **Light path — captured-DOM restyle:** save the rendered DOM of the state, link the real
  `globals.css`, apply class/structure nudges, re-shoot. For pure visual/typographic proposals.
- **Real path — component edit:** edit the actual `.tsx` / `globals.css` / `tailwind.config.js` in a
  branch, `npm run build`, re-shoot the same state/width. If accepted, the diff IS the implementation.

Label each after-shot with exactly what changed (classes/props/tokens touched) so accepting it is informed.

## Report — docs/audits/<yyyy-mm-dd>-redline-<page>/REPORT.md

```
# Redline — <page> — <date>
Shots: <n> states × 2 widths → ./shots/
Verdict: <one paragraph — what keeps this page from feeling finished>

| # | Finding | Category | Rule cited / [taste] | Severity | Before | After |
|---|---------|----------|----------------------|----------|--------|-------|

Severity: P0 broken/blank/unreadable · P1 undermines trust or scanability · P2 polish.
Not proposed (needs a decision): <new token / new section / IA change>
```

## Routing (redline never self-executes)

- Accepted P0/P1 → edit the component/`globals.css`/`tailwind.config.js`. Because the template is
  config-driven, **one fix benefits every clone** — that's the point.
- Anything needing a NEW token, type-scale change, or a new section/page → a template decision:
  present options, record the choice, then implement for all clients.
- A finding-class recurring across ≥2 pages → add a line to `CONVENTIONS.md` so it dies at authoring time.

## Boundaries

- Judges and proposes; never submits the form, never edits per-client content, never breaks the
  config-driven / theme-agnostic contract.
- No new visual tokens, no framework restyles, no drift toward another repo's design system.
- One page per run; depth over coverage.
