# Ledge Sitebuilder

A **reusable, config-driven, answer-engine-ready marketing website engine**. **One repo, many clients:** each client is a folder under `clients/<slug>/` holding their own `site.config.json`. Select a client, and deploy a fast, premium, SEO/AEO-optimized static site to Cloudflare Pages. Fix the code once and **every** client benefits — no per-client copies to keep in sync.

- **Vertical-agnostic** — works for trades, restaurants, clinics, local services, B2B, and more. Nothing about a specific business is hard-coded.
- **One source of truth** — every component, theme token, meta tag, JSON-LD block, and `llms.txt` fact is generated from `site.config.json`. **You never edit component code per client.**
- **Answer-engine-ready** — valid JSON-LD (LocalBusiness / Service / FAQPage / Breadcrumb), `llms.txt`, `sitemap.xml`, `robots.txt`, per-page intent-shaped titles + meta, Open Graph + Twitter cards, and answer-first semantic HTML — all out of the box.

---

## Quick start — spin up a new client site

1. **Add the client as a folder.** Copy an existing client as a starting point:
   ```bash
   cp -r clients/sage-and-stone clients/<new-client-slug>   # studio (image-forward) look
   # or: cp -r clients/northline-hvac clients/<new-client-slug>   # classic look
   ```
2. **Edit that client's `clients/<slug>/site.config.json`** — and *only* that file. Fill in the business, contact, services, proof, brand, and deploy sections (full reference below). Choose the `template` (`"classic"` or `"studio"`). Add the client's logo to `public/` and point `brand.logoPath` at it.
3. **Select the client, install, preview:**
   ```bash
   npm install            # first time only
   npm run use <slug>     # makes this client the active build target
   npm run dev            # http://localhost:3000
   ```
   Run `npm run clients` any time to list every client and see which one is active.
4. **Validate + build:**
   ```bash
   npm run validate       # checks the active site.config.json (also runs in the build)
   npm run build          # static export → ./out
   ```
5. **Deploy to Cloudflare Pages** (settings below) — each client gets their own Pages project + domain.

That's it. No component edits, no CSS edits, no per-client forks — **one repo, so a fix reaches every client.**

---

## Cloudflare Pages settings

Connect the new client repo to Cloudflare Pages with **exactly** these settings:

| Setting | Value |
|---|---|
| **Framework preset** | Next.js (Static HTML Export) — or "None" |
| **Build command** | `next build` |
| **Build output directory** | `out` |
| **Node version** | 18 or newer (set `NODE_VERSION=20` as an env var if needed) |

The build validates `site.config.json` first (a malformed config fails the build loudly), then exports static HTML to `out/`. No server, no SSR — just fast static files on Cloudflare's edge.

> **Custom domain:** set `deploy.domain` in `site.config.json` to the client's real domain (it drives canonical URLs, `sitemap.xml`, and Open Graph tags), then add the domain in the Cloudflare Pages project under **Custom domains**. Use `deploy.subdomainFallback` for the `*.pages.dev` URL before the domain is live.

---

## The config file — `site.config.json`

Everything the site renders comes from here. Fields marked _optional_ have sensible defaults; a config with only the required fields still produces a complete, good-looking site. A JSON Schema (`site.config.schema.json`) is included for editor autocomplete and inline validation.

```jsonc
{
  "business": {
    "name": "",                 // required — drives titles, header, schema
    "tagline": "",              // short value proposition (hero subhead)
    "oneLineDescription": "",   // one sentence: what you do, for whom (meta + llms.txt)
    "yearEstablished": "",
    "type": "LocalBusiness"     // schema.org type/subtype: "Restaurant", "HVACBusiness", "Dentist", ...
  },
  "contact": {
    "phone": "", "email": "",
    "address": { "street": "", "city": "", "region": "", "postalCode": "", "country": "" },
    "serviceArea": "", "hours": "",
    "googleBusinessProfileUrl": "",
    "social": [],               // array of profile URLs
    "formEndpoint": ""          // optional — a Formspree URL for the contact form (see "Contact form")
  },
  "goal": { "primaryCTA": "call" }, // call | book | form | purchase | credibility — drives the main button
  "audience": {
    "customerDescription": "",
    "topQuestions": [           // becomes the visible FAQ AND the FAQPage schema
      { "question": "", "answer": "" }
    ]
  },
  "services": [ { "name": "", "description": "", "priceInfo": "" } ],
  "proof": {
    "testimonials": [ { "quote": "", "author": "", "detail": "" } ],
    "reviewCount": "", "credentials": [], "notableClients": []
  },
  "brand": {
    "logoPath": "",             // optional — path under /public; empty → auto monogram + wordmark
    "colors": { "primary": "", "secondary": "", "accent": "" },
    "radius": "14px",           // optional — corner radius token
    "fonts": { "display": "", "body": "" } // optional — CSS font-family overrides
  },
  "deploy": { "domain": "", "subdomainFallback": "", "host": "cloudflare-pages" },
  "meta": { "lastUpdated": "" } // ISO date shown as the visible "Last updated"; defaults to build date
}
```

### `primaryCTA` — how each value behaves

| Value | Button label | Where it points |
|---|---|---|
| `call` | "Call {phone}" | `tel:` link (requires `contact.phone`) |
| `book` | "Book an appointment" | contact form anchor |
| `form` | "Request a quote" | contact form anchor |
| `purchase` | "Order online" | contact form anchor |
| `credibility` | "See why clients trust us" | the About page |

### FAQ (`audience.topQuestions`)

Each entry is `{ "question": "...", "answer": "..." }`. The **same objects** render the visible FAQ *and* the `FAQPage` JSON-LD, so the structured data always matches the page exactly (a requirement for valid FAQ rich results). Entries without an answer are dropped from both.

---

## Re-theming (brand)

All color, radius, and typography are CSS variables sourced from `config.brand`:

- **Colors** — set `brand.colors.primary/secondary/accent` to any hex. Contrast-safe foreground colors and soft/hover shades are computed automatically. Leave them empty to use the premium default palette.
- **Radius** — `brand.radius` (e.g. `"8px"` for sharp, `"22px"` for soft).
- **Fonts** — the template ships a premium **Space Grotesk + Inter** pairing (self-hosted, no external requests). Override the CSS font stacks with `brand.fonts.display` / `brand.fonts.body` if a client needs something specific.

Changing these values in `site.config.json` re-skins the entire site — **no component or CSS edits.**

---

## SEO / AEO — what's built in

Everything below generates from `site.config.json`:

- **Per-page `<title>` + meta description**, shaped around what each page answers.
- **JSON-LD** injected per page: `LocalBusiness` (or the configured type) with consistent NAP, one `Service` per service, `FAQPage`, `WebSite`, and `BreadcrumbList`. Visible FAQ text matches the schema exactly.
- **`/llms.txt`** — a plain-Markdown, answer-first summary of the business, services, FAQs, and key pages, at the site root.
- **`/sitemap.xml`** and **`/robots.txt`** (crawling allowed).
- **Answer-first semantic HTML** — one `<h1>` per page, logical heading order, landmark elements, each section opening with the direct answer.
- **Visible "Last updated" date** from `meta.lastUpdated`.
- **Open Graph + Twitter cards**, including a branded share image generated from config.
- **Descriptive alt text** and accessible, keyboard-navigable, WCAG-AA-contrast UI.

---

## Contact form

The form works with **zero JavaScript** (a plain HTML POST). Two ways to wire delivery:

1. **Formspree (simplest):** set `contact.formEndpoint` to your Formspree URL. Done.
2. **Cloudflare Pages Function:** leave `formEndpoint` empty and the form posts to `/api/contact`, handled by `functions/api/contact.ts`. As shipped it's a safe placeholder — add delivery (MailChannels, Resend, a CRM webhook) before launch. See the comments in that file.

---

## Local development

```bash
npm run dev       # dev server at http://localhost:3000
npm run build     # validate config + static export to ./out
npm run validate  # validate site.config.json only
npm run lint      # Next.js lint
```

## Project structure

```
clients/<slug>/site.config.json ← each client's data — THE files you edit (one folder per client)
site.config.json                ← the ACTIVE client (generated by `npm run use`; don't hand-edit)
site.config.schema.json         ← JSON Schema for editor autocomplete/validation
scripts/use-client.mjs          ← selects which client is the active build target
scripts/validate-config.cjs     ← config validator (runs in the build)
app/                            ← pages (Home, Services, About, Contact) + sitemap/robots/llms/OG image
components/                     ← config-driven UI; components/studio/ is the image-forward template
lib/                            ← config loader, derived helpers, JSON-LD + llms.txt builders, color math
functions/api/contact.ts        ← Cloudflare Pages Function form fallback
public/                         ← static assets (logos, template images, etc.)
.claude/skills/new-client/      ← the codified "add a new client" procedure for the internal agent
```

## Fixed stack

- **Next.js (App Router) with static export** — `output: 'export'` in `next.config.js`.
- **`images: { unoptimized: true }`** — required for static export.
- **React + Tailwind CSS.**
- **Deploy target: Cloudflare Pages** — build `next build`, output `out`.

These are intentional and load-bearing; don't change them.

---

_This template's workflow conventions (config-as-single-source-of-truth, derived-not-hand-maintained artifacts, the codified new-client procedure) are adapted from the Ledge "Dev Orchestration" kit. See [CLAUDE.md](CLAUDE.md) for the operating rules and what was adopted vs. skipped._
