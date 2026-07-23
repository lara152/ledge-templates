# Ledge Site Factory — what we built & how

> A plain-language overview of the website engine we built: what it is, how it works, the five
> "looks" it ships, how an operator turns it into a client site, and a walk-through of the first
> **real** case (The Green Dream / Landscape SEO). Companion to the authoritative plan in
> [`BRD_LEDGE_SITE_FACTORY.md`](BRD_LEDGE_SITE_FACTORY.md).
>
> **Repo:** https://github.com/lara152/ledge-templates

---

## 1. The idea, in one line

**One website engine, many "looks," and each client is just a data file.** We pre-build a polished,
fast website for a prospect, then swap in their real content — without ever forking code. Fix or
improve the engine once and **every** client on that look benefits.

---

## 2. What exists today

- **One repo, one engine.** A single Next.js app (`apps/sitebuilder`) renders every site as static
  HTML (no server), ready to deploy to Cloudflare.
- **Five selectable looks**, chosen with one line of config: `"template": "..."`.
- **A client is a folder:** `clients/<slug>/site.config.json` holds that business's data. The engine
  code never changes per client.
- **Everything derives from the config:** copy, colors, fonts, SEO tags, and images all come from
  `site.config.json`.

```
ledge-templates/
├── apps/sitebuilder/            ← THE engine (Next.js)
│   ├── app/                     ← routes (home, services, portfolio, pricing, areas, contact, …)
│   ├── components/              ← shared "Lego" components + one folder per look
│   │   ├── ImageSlot / Gallery / Lightbox / BeforeAfter   (shared image system)
│   │   ├── meridian/  greenleaf/  studio/  summit/         (per-look components)
│   │   └── BrandStyle.tsx       (per-look palette + fonts)
│   ├── lib/                     ← config loader + helpers + SEO generators
│   └── clients/<slug>/site.config.json   ← each client's data
├── packages/ui/                 ← source of the shared components (vendored into the engine)
└── _reference/                  ← the original Vite apps, kept only as design reference
```

---

## 3. The five looks

| Look | Who it's for | Style | Signature pages |
|------|--------------|-------|-----------------|
| **classic** | Clean service business (e.g. HVAC) | Minimal, trustworthy, text-first | Home, Services, About, Contact |
| **studio** | Landscaping design studio | Warm cream, serif, image-forward | Home, Services, About, Contact |
| **meridian** | High-end / luxury landscaping | Cinematic charcoal + gold, serif | Home, **Portfolio → case studies**, Services, Process, About, Contact |
| **greenleaf** | Affordable / high-volume landscaping | Bright green + amber, conversion-first | Home, **per-service landings**, **Pricing**, **per-city pages**, Reviews, Before/After, Contact |
| **summit** | A coach/agency that **sells to** landscapers | Bold dark + emerald, results-first | Home (results/program/podcast), About, Contact (book-a-call) |

All five build cleanly and share the same engine. Adding a new market = adding a new look, without
touching the others.

---

## 4. How it's built (the mechanics)

- **The `template` selector.** Each page checks the active look and renders that look's version. The
  header, footer, palette, and fonts all switch off the same one setting.
- **Per-look identity, shared components.** `BrandStyle.tsx` holds a small palette per look (colors,
  fonts, corner radius) mapped to CSS variables. The shared components read those variables — so the
  same button/card/gallery adopts each look's identity without any per-look code.
- **Shared image system.** `ImageSlot` (lazy-loading, fixed aspect-ratio so nothing jumps, and a
  labeled placeholder when empty), plus `Gallery` + `Lightbox` and a `BeforeAfter` slider. Used by
  every image-forward look.
- **The config is the single source of truth.** `site.config.json` carries business info, services,
  projects, pricing, reviews, areas, podcast, stats, images, colors — all optional, each look reads
  what it needs. A malformed config **fails the build loudly** (a validator with teeth).
- **Look-specific pages** (Meridian case studies, GreenLeaf pricing/city pages) are real routes,
  generated only when that look and its data are present.
- **Static export.** Every route is pre-rendered to plain HTML — fast, cheap to host, great for SEO.

**The property that matters:** because the code lives once and each client is only data, a fix or a
design upgrade reaches every client on that look at once. No divergent copies to chase.

---

## 5. How images work (all looks)

Every image lives in the client's config as `{ image, alt, caption }`. Today they're **placeholders**
(elegant labeled slots that say what photo goes where). To go live you replace the empty `image` with
a real URL — no code touched. At scale, images move to a storage bucket (Cloudflare R2) referenced by
the same URLs. `classic` is deliberately the one text-first look with no photo slots beyond the logo;
the other four are photo-driven.

---

## 6. How you offer this to a client (the operator process)

1. **Show the looks.** Preview each locally (or from public demo links) so a prospect can react.
   *(Per the plan, the stronger move is often to pick the look that fits them and pre-build their site
   as the pitch — the gift earns the meeting.)*
2. **Pick the look** that fits their business.
3. **Create their folder:** copy a demo → `clients/<their-slug>/`.
4. **Personalize — config only.** Edit their `site.config.json`: name, phone, services, pricing,
   projects/reviews, and images (swap the URLs). Optionally set brand colors. No code.
5. **Preview:** `npm run use <slug>` → `npm run dev`.
6. **Build & deploy:** `npm run build` → static site → their own Cloudflare project + domain.

Today this is manual (correct for the first clients). The BRD's roadmap automates it: a `new-draft`
command, a scraper to pre-fill content, an image pipeline, a deploy script, and lead handling.

---

## 7. The first real case — The Green Dream / Landscape SEO

**The prospect:** a coach who helps landscapers sell more and break seven figures. Brand: *Landscape
SEO*; podcast: *The Green Dream* (https://pod.co/the-green-dream); tagline: *"Sell more 📈."* He has
**no website.**

**Why it needed a brand-new look.** Our first four looks are all for landscapers *themselves*
(services, portfolios, service areas, before/after yards). This prospect is different — he **sells to**
landscapers. He needs results and authority, not a service menu: a bold headline about revenue, proof
(250+ landscapers, seven figures), his podcast, and one clear call to action: **book a call.** None of
the four fit, so we built a fifth look: **`summit`.**

**What `summit` gives that market:**
- A results-first hero — *"Break seven figures. Profitably."* — with a single **Book a call** CTA.
- A **stats band** (250+ landscapers · $1M+ milestones · #1 podcast).
- A **"who it's for"** section and a **program** laid out in steps (Diagnose → Position → Systemize → Scale).
- A **podcast** section (The Green Dream, with episodes).
- **Testimonials** from landscapers who grew, and a closing book-a-call band.
- Bold dark design with emerald accents — deliberately unlike the landscaper looks.

**How we made it — same engine, new look.** We didn't build a new site; we taught the engine a new
look. That meant: a small palette preset (dark + emerald + a bold sans), a few new config fields
(`stats`, `podcast`, `contact.bookingUrl`), the `summit` components (home, about, contact), and a demo
client config. The other four looks were untouched and still build green — proof the "one engine, many
looks" model holds as we add markets.

**What it takes to make it his live site.** It's already built as a demo with placeholders. To go
live: drop his real headshot/brand into the config's image slots, confirm the copy, paste his
booking link into `contact.bookingUrl` (so "Book a call" points at his calendar), then build and
deploy to his domain. That's a config edit — no engineering.

> This is exactly the intended motion: a real prospect with no site, a look tailored to his market,
> pre-built so it becomes the reason for a first conversation.

---

## 8. Status & what's next

- ✅ **Five looks, all building green**, all config-driven, all sharing one engine. *(This is the BRD's
  M1 "engine" milestone — and then some, with summit added for a new market.)*
- **Next (BRD M2/M3):** the `new-draft` command (fill content from a worksheet + photos), a Supabase
  registry of clients/leads, the Cloudflare Workers deploy script, and the lead-handling Worker (so a
  site's contact form actually delivers).

## 9. Quick command reference

```bash
npm run clients            # list all client data folders + which is active
npm run use <slug>         # pick which client to build/preview
npm run dev                # preview at http://localhost:3000
npm run build              # static export → apps/sitebuilder/out
```

Client slugs today: `northline-hvac` (classic), `sage-and-stone` (studio), `meridian-demo`,
`greenleaf-demo`, `green-dream-demo` (summit).
