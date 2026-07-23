---
name: new-client
description: Use when spinning up a new client website — add a client folder under clients/<slug>/, fill its site.config.json section by section, validate, build cleanly, and deploy to Cloudflare Pages. The codified per-client procedure so every client site is produced the same, repeatable way (one repo, many clients).
---

# /new-client — spin up a client site from the sitebuilder template

> **The whole job is editing one client's `clients/<slug>/site.config.json`.** You do not edit
> component code, CSS, or the SEO generators to serve one client. If the config can't express what the
> client needs, that's an *engine* change (a new field + the code that consumes it, for all clients) —
> surface it, don't fork the code. See CLAUDE.md "Template Invariants".

## Step 0 — Create the client folder

One repo, many clients: each client is a folder under `clients/<slug>/` holding their own
`site.config.json`. Start by copying an existing client as a base:

```bash
cp -r clients/sage-and-stone clients/<new-slug>      # studio (image-forward) look
# or: cp -r clients/northline-hvac clients/<new-slug>   # classic look
npm install                                          # first time only
```

Pick a short, url-safe `<slug>` (the client's name, kebab-case). From here you edit **only**
`clients/<slug>/site.config.json` — never the code, and never the root `site.config.json` (that's a
generated copy of whichever client is active).

## Step 1 — Turn the client brief into config answers (ask only what you can't settle)

Read whatever the client gave you (intake form, website, Google Business Profile, notes). Map it onto
the config sections below. Use the **Settled / Ask** discipline: if the brief or the client's existing
web presence settles a field, fill it and move on; only ask the client about genuine gaps or forks.
The highest-leverage question is almost always **`goal.primaryCTA`** — what is the ONE action this
site should drive?

| primaryCTA | Choose when the business wants visitors to… |
|---|---|
| `call` | phone them (most trades/home services) — needs `contact.phone` |
| `book` | book an appointment/table/consult |
| `form` | request a quote / send an inquiry |
| `purchase` | order/buy |
| `credibility` | mainly establish trust (referral-driven, B2B) |

## Step 2 — Fill `clients/<slug>/site.config.json`, section by section

Fill it top to bottom. Quality bar per section:

- **template** — `"classic"` (clean service-business default) or `"studio"` (image-forward, for visual trades like landscaping — full-bleed hero photo, portfolio gallery, per-service images).
- **business** — `name` is required. `oneLineDescription` should answer *what you do + for whom* in one
  sentence (it feeds meta descriptions and `llms.txt`). Set `type` to the closest schema.org type
  (`Restaurant`, `HVACBusiness`, `Dentist`, `Plumber`, `Attorney`, … or `LocalBusiness`).
- **contact** — real NAP, `serviceArea`, `hours`. `social` is an array of profile URLs.
- **goal.primaryCTA** — from Step 1.
- **audience.topQuestions** — the FAQ. **Each entry needs a real `answer`** (`{ question, answer }`);
  entries without an answer are dropped from both the visible FAQ and the FAQPage schema. Write
  **answer-first** answers (lead with the direct answer, then detail) — this is what wins answer-engine
  and rich-result placement. 3–6 is a good range.
- **services** — each needs a `name`; `description` and `priceInfo` are strongly recommended.
- **proof** — testimonials (`quote` + optional `author`/`detail`), `reviewCount`, `credentials`,
  `notableClients`. Use only true, client-provided claims — never invent reviews or credentials.
- **brand** — `colors.primary/secondary/accent` (any hex; contrast-safe text + shades are computed).
  Optional `radius` and `fonts`. Leave `logoPath` empty to get an auto monogram + wordmark, or add the
  client's logo file to `public/` and point `logoPath` at it (e.g. `/logo.svg`).
- **deploy** — `domain` (the real custom domain; drives canonical/sitemap/OG), `subdomainFallback`
  (the `*.pages.dev` URL for before the domain is live), `host: "cloudflare-pages"`.
- **meta.lastUpdated** — today's date (ISO `YYYY-MM-DD`).

## Step 3 — Select the client, then validate

```bash
npm run use <slug>   # makes this client the active build target (copies its config to the root)
npm run validate
```
Fix **every error** (they fail the build). Read the **warnings** and resolve the ones that matter
(empty tagline, missing FAQ answers, no domain set, etc.). Run `npm run clients` any time to see all
clients and which one is active.

## Step 4 — Build cleanly

```bash
npm run build
```
Must finish with no errors and produce `out/`. Confirm the artifacts exist:
`out/index.html`, `out/services/`, `out/about/`, `out/contact/`, `out/llms.txt`, `out/sitemap.xml`,
`out/robots.txt`, and `out/opengraph-image` (a PNG).

## Step 5 — Verify (this is yours — don't skip it, don't delegate the judgment)

A clean build is necessary, not sufficient. Actually look:

- `npm run dev` and open the site. Read the hero, services, proof, FAQ, contact. Does the copy read
  like this business, not a template? Is the primary CTA the right one and does it work
  (`tel:` dials; form/book routes to the form)?
- Spot-check the generated HTML: unique intent-shaped `<title>` per page, exactly one `<h1>`, JSON-LD
  present and matching the visible FAQ, `llms.txt` reads accurately.
- Check the theme: colors and radius reflect `brand`. Check mobile layout and keyboard focus.

## Step 6 — Deploy to Cloudflare Pages

Connect the client repo to Cloudflare Pages:

- **Build command:** `next build`
- **Output directory:** `out`
- **Node version:** 18+ (`NODE_VERSION=20` env var if needed)

Add the custom domain under **Custom domains** and confirm `deploy.domain` matches.

## Step 7 — Contact form delivery

Decide how the form delivers before launch:
- Set `contact.formEndpoint` to a Formspree URL (simplest), **or**
- Implement delivery in `functions/api/contact.ts` (MailChannels/Resend/CRM webhook) and add any
  secrets as Pages environment variables.

## Step 8 — Hand off

Report: the live URL, the primaryCTA chosen, how the form delivers, and any config warnings you left
unresolved (with why). Done.
