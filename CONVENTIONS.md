# Conventions — Ledge Sitebuilder

The small set of rules that keep this template config-driven, accessible, and answer-engine-ready.
Each names a failure it prevents and a quick way to check for it. (A new convention is *earned* from
a real problem — don't invent speculative ones.)

---

## 1. Semantic tokens only — no hardcoded colors in components

**Problem:** a hardcoded hex in a component breaks the "re-theme from config alone" contract — that
client's color won't follow `brand.colors`.

**Rule:** components use Tailwind semantic tokens (`primary`, `accent`, `ink`, `surface`, `line`, …)
which resolve to the config-driven CSS variables, or `var(--brand-*)` directly. The only place raw
hex belongs is a default fallback in `components/BrandStyle.tsx` / `app/globals.css` and static asset
files (`app/icon.svg`, `public/logo.svg`).

**Check:** `grep -rnE "#[0-9a-fA-F]{3,8}" components app --include=*.tsx` → every hit should be in
BrandStyle, or an intentional token fallback.

## 2. No per-client edits outside `site.config.json`

**Problem:** hard-coding a business's name/copy/color into a component forks the template and breaks
the next clone.

**Rule:** everything client-specific comes from `site.config.json` via `lib/`. If the config can't
express something a client needs, add a config field + the code that consumes it (a *template*
change for all clients) — never inline the business.

**Check:** `git grep -i "<the client's name>" -- ':!site.config.json'` on a clone should return
nothing.

## 3. Answer-first, semantic HTML — exactly one `<h1>` per page

**Problem:** filler intros and heading soup hurt both humans and answer engines.

**Rule:** one `<h1>` per page; logical heading order; landmarks (`header`/`main`/`footer`/`section`
/`nav`); each section opens with the direct answer, then elaborates.

**Check:** view any page in `out/` — count `<h1`; it must be 1. (The build-time HTML check in
`scripts` / CI can assert this.)

## 4. Visible content must match structured data

**Problem:** schema-only hidden content (esp. FAQ) is a rich-results violation and erodes trust.

**Rule:** JSON-LD is generated from the same config the page renders. The FAQ (`FAQPage`) and the
visible FAQ share `audience.topQuestions`. Never emit schema facts that aren't visible.

**Check:** every `FAQPage` question/answer in the HTML's JSON-LD appears in the visible DOM.

## 5. Accessibility is a requirement

**Problem:** invisible focus, low contrast, mouse-only controls, missing alt — real users are locked
out and it fails the SEO/Best-Practices bar.

**Rule:** visible `:focus-visible` styles, WCAG-AA contrast (brand foreground colors are computed for
this), full keyboard operability, descriptive `alt` on every image, `aria-*` on interactive controls.

**Check:** keyboard-tab the whole page; run Lighthouse Accessibility (target 100).

## 6. Minimal JavaScript

**Problem:** unnecessary client JS slows the site and undercuts the "fast static" promise.

**Rule:** prefer server components and native HTML (`<details>` for disclosure). Add a client
component only when interactivity genuinely requires it (currently only the mobile nav).

**Check:** `grep -rn "'use client'" app components` — the list should be tiny and justified.

## 7. Generated artifacts are never hand-edited

**Problem:** a hand-edited `sitemap.xml` / `llms.txt` / JSON-LD drifts from config the moment config
changes.

**Rule:** fix the generator, not the output. `out/` is disposable and git-ignored.
