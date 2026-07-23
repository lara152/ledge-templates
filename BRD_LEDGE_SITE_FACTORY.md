# BRD — Ledge Site Factory

**Version:** 1.0 · 2026-07-23 · **Owner:** Edgar Galindo · **Audience:** implementing developer

**How to read this document:** every requirement passed one filter — *is this necessary to (1) produce 5 good drafts a week easily, (2) get consent and go live, and (3) get clients engaging with Ledge as feedback partners?* There is **no subscription requirement** — the ask is a sit-down to review what Ledge can do and give feedback. Everything that didn't pass the filter lives in §5 (Deferred) with the trigger that revives it. Build the builder, start sending, add machinery only when reality demands it.

---

## 1. What we're building and why

Ledge (ledge.build) is a landscape-management app being built out with direct input from working contractors. We're recruiting ~25 design-build landscape shops as **feedback partners**. The Site Factory is an internal tool that pre-builds a polished website for a target prospect from content they already publish, before we ever contact them. The site is the outreach hook and the gift.

**The ask, plainly:** sit down with us, see what Ledge does, tell us what would actually help your business. That's it. The site goes live for them either way — free site, free hosting, they own their domain. It is framed honestly: *"we're building this app for people like you and we want your input — and we built you this site because we think you'll like what we make."*

**And let's be clear internally: feedback partners are prospects.** This is step 1 of a selling motion. The site earns the meeting; the meeting builds the relationship and shapes the product around their real workflows; the goal is that these ~25 shops become Ledge's first active users and reference customers as the app matures. The ask is genuinely just feedback — we don't gate the gift on anything — but everything downstream (the Ledge-branded lead emails, the ongoing hosting relationship, the check-ins) is designed to convert goodwill into usage when the product is ready.

Why the gift keeps working after go-live: every lead their site generates arrives as a Ledge-branded email. The site keeps Ledge in front of them between conversations.

If either side ever wants out: they get a full static export of their site plus a CSV of their leads. Their domain, their data, no hard feelings.

Nothing here is client-facing tooling — no accounts, no logins, no dashboards. The one exception is a single consent page (R4).

## 2. Success metrics — three numbers

1. **≤ ~30 minutes of operator time per draft in manual mode** (photo and fact collection included), dropping to **≤ 15 minutes** once the scraper is built. Prospecting and qualification time is separate; the first drafts baseline both.
2. **5 drafts sent per week** at steady state.
3. **Sends → feedback meetings booked**, tracked in the registry (a column, not a system). Review at 10 sends; if fewer than 2 meetings, pause and rework the pitch before continuing.

The number that ultimately matters — **partners who become active Ledge users** — is also a registry column from day one. It won't move for a while; it's why everything above exists.

Costs: stay on free tiers where possible, glance at the bill monthly, optimize later. The one known cost decision is flagged in §3 (Supabase).

## 3. Platform decisions

- **Cloudflare Workers with static assets — not Pages.** Same effort today, and Pages is in maintenance mode; this avoids a forced migration later. One Worker per site, deployed by our script; drafts live at unguessable `*.workers.dev` hostnames with `noindex` headers. Cost note: static-asset requests on Workers are free and don't count against the account's daily Worker-invocation limit, so 25 brochure sites cost ~$0 to serve — the only billed invocations are form posts and view logging. (Vercel and Netlify were considered and rejected: per-site/per-seat pricing is wrong for a fleet of tiny sites, and Vercel's free tier prohibits commercial use outright.)
- **One site engine — Next.js static export, final.** It's what the existing looks are built in; porting momentum beats elegance at 25 sites, and CWV stays green via the sharp-at-ingest image pipeline (Next's image optimizer is bypassed with a custom loader pointing at the R2 variants). A client is a data folder (`clients/<slug>/site.config.json`), never a code copy. Four looks selectable by one config line; gallery, lightbox, and before/after slider ship with them.
- **This document is the source of truth, and it supersedes every directive before it** — prior strategy docs, the templates write-up, earlier architecture plans, all of it. That's a statement about authority, not about deleting code. In the repo it means: this BRD and `CONVENTIONS.md` sit at the root as the founding docs; superseded docs are marked as such (or removed from the active path); and the retired pieces — the standalone Vite apps as apps, the Pages/Vercel deploy configs, the self-serve staging plans — come off the active path. The working code carries forward: the sitebuilder engine is the base (client folders, config selector, SEO generation are proven), the needed `@ledge/ui` components (Gallery, Lightbox, BeforeAfter) get vendored into the engine's component layer, and `highend` (Meridian) and `lowcost` (GreenLeaf) get rewritten as looks. Decisions from here on are recorded against this document so nothing gets relitigated.
- **Palettes are derived from the prospect's logo.** The operator drops the logo file into the client folder (the scraper grabs it automatically once built); a color-extraction pass (node-vibrant/colorthief-class) pulls the dominant brand hue, and the engine generates accents with lightness clamped to guarantee contrast against each look's known backgrounds. Because colors are *generated*, not accepted as input, an unreadable site can't ship — no validation tooling needed — while every draft lands as "they used our colors." Operator can override to a preset palette when a logo doesn't cooperate.
- **One central lead Worker** (`forms.ledge.build`) handles every site's form and holds all secrets (Supabase, Resend, Turnstile). Site Workers stay pure static. This is the *simple* option, not the fancy one: one place to rotate keys, zero server code per site.
- **Supabase** (Ledge's existing project) for the registry, leads, and consent log. The alternative was considered: Cloudflare D1 is free, never auto-pauses, and binds natively to the lead Worker — a legitimately simpler choice in isolation. Supabase wins **because of the selling motion**: lead and partner data wants to live next to Ledge's own database, where "partner → active user" is a join, not an export. Known issue stands: free-tier projects auto-pause after inactivity — **move to the paid plan when the first site goes live**, not before.
- **Images:** collected originals resized to sane web variants at ingest (`sharp`) and stored in R2, served via a custom domain. AI upscaling (Replicate-class API, pennies per image) available for marginal photos.
- **No Google-sourced *creative* content, ever — but facts are prefilled, not hand-typed.** The distinction: photos and review text from Google are banned (Maps/Places ToS prohibits storing/republishing them, and GBP photos are often uploaded by *customers* the business can't license to us — and the anti-creep pitch "everything here, you already published yourself" must stay literally true). Business *facts* are different — facts aren't copyrightable — and the source is the prospect's own website: today the operator copies NAP (name, address, phone, hours, service area) into the worksheet from there; once the scraper exists, it prefills the same fields from their JSON-LD, footer, and contact page and the operator just confirms. GBP stays open in a tab for the odd missing field.

## 4. Requirements

### R1 — Engine & configs
1. Schema-validated config per client; an invalid config can't deploy. Customization happens **only** as config — if two clients want the same thing, extend the schema (optional, default off). No forks, ever. This rule is what keeps 5 sites/week easy.
2. SEO basics generated from config, never hand-edited: titles/meta, `LocalBusiness` JSON-LD from the worksheet NAP, sitemap, alt text on every image. Drafts are `noindex` until go-live.
3. **Every site ships a template-generated privacy policy and terms page** (business name/contact as config variables): what the form collects, that Ledge hosts the site and processes leads on the business's behalf, cookieless analytics, no sale of data, deletion on request. The form carries one line of microcopy ("by submitting, you agree to be contacted about your inquiry"). The template is versioned in the engine — updating it and running `redeploy-all` updates every site at once, which is the whole compliance-maintenance story.

### R2 — The builder (this is the product)
1. One command, `new-draft <slug>`, with a fixed **input contract**: a worksheet (business facts) + a `photos/` folder (+ the logo file). Everything downstream — upscale, variants to R2, config generation, build, deploy — is identical regardless of how the inputs were gathered. This is what makes the scraper optional: it's a filler of the input contract, not a part of the pipeline.
2. **For now, the contract is filled manually** (~10–20 extra minutes per prospect): the operator pulls photos and facts from the prospect's own website by hand. The bar is unchanged — ≥3 real-work photos, roughly ≥800px, no stock, no Google-sourced media — and fewer than 3 still means skip the prospect (marked in registry, no partial drafts). Manual mode doubles as the reality check: every draft teaches what the scraper must handle, and the saved inputs become its test cases. The scraper itself (Playwright headless render: photo candidates, logo, NAP prefill) is deferred to §5 with its trigger.
3. Drafts use the prospect's **real photos only** (min 3 approved), from their own site or material they send. No stock.
4. Every draft carries a slim **preview ribbon** — "Preview built for <Business> by Ledge — not live," with a contact link — driven by status, gone at go-live. It answers "what is this?" on a cold link and is the first defense against the gift reading as creepy.
5. Before sending, a 60-second operator check: all images render, no placeholder text, NAP matches the prefilled worksheet, looks right on a phone.
6. Draft Workers log a first-view timestamp and view count (a few lines of code, excludes our own checks) — "opened it" vs. "never opened it" is what times the follow-up.

### R3 — Leads & the value signal (built in M3 — live sites only; drafts don't need it)
1. Form POSTs to the central lead Worker: Turnstile check (fail **open** if the service is down, flag the row `unverified` — a lost lead costs more than filterable spam) → insert lead row → email the client via Resend, formatted as a **Ledge-branded lead card**. If the insert fails, send the email anyway and log it — the email *is* the delivery; the DB is our copy. Send from a dedicated subdomain (e.g. `mail.ledge.build`) with SPF/DKIM/DMARC set up once — automated mail must never be able to burn the root domain's reputation.
2. The visitor sees success if either the insert or the email worked; only if both fail do they see an error, which includes the business phone number so the lead still has a path.
3. A test flag routes a submission through everything except the client email — health checks must never spam clients with fake leads.
4. **Contact actions count as leads.** Form fills are the rarest lead type a contractor gets; calls dominate. Tap/click on `tel:`, `mailto:`, and "get directions" links fires a beacon to the lead Worker (a few lines of JS) and lands in a `contact_actions` count per site. These register within weeks, not months.
5. **Cloudflare Web Analytics on every live site** — free, cookieless, no consent banner required — for visits and top pages.
6. **The monthly site report is the retention hook, not lead emails.** A Ledge-branded email per client per month: visits, contact actions, form leads, one operator-written sentence. Generated by a script from the R5 tables + analytics; sent even when the numbers are small — *"your web presence is alive and we're tending it"* is the message. Form-lead emails, when they happen, are a bonus on top.

### R4 — Consent & go-live (per client, at first yes — nothing here is built or reviewed before then)
1. The draft phase needs none of this: a draft is an unguessable temp URL, `noindex`, sent only to the owner, auto-deleted in 30 days — their domain is untouched until they've talked to us. Consent exists for **go-live**, the moment their content sits on a real indexed domain under our hosting. The feedback session happens first — that's the ask. At or after it, they get a one-page consent link: a checkbox licensing us to publish and host their content, including enhanced photos, with their representation that they own it; an optional, unchecked box for featuring them in Ledge marketing. Logged with timestamp and terms version. **The same template allocates liability:** the client is responsible for their content and business claims; Ledge is responsible for hosting and for handling lead data on their behalf (no selling, deletion and export honored). Because every client signs the identical template, legal review is a single flat-fee pass — over this agreement *and* the R1.3 privacy/terms template together — before the first client accepts. Part of M3, not a prerequisite for building or sending. Most small contractors sit below state privacy-law thresholds, but that pass, plus the versioned template, is how we stay covered without ongoing counsel.
2. `leadsTo` is verified the easy way: send a test lead during the call and watch it arrive.
3. **DNS:** prefer delegating nameservers to Cloudflare (they keep registrar ownership; apex and www both just work). Confirm they can actually access their domain **during the call** — contractor domains are routinely trapped inside Wix/GoDaddy builders or held by defunct agencies. Last resort: new domain registered in *their* name.
4. **Existing traffic carries over — don't fumble it.** They keep their domain, so whatever traffic and rankings they have continue; the risk is old URLs 404ing after the swap. Harvest the old URL list at go-live (their sitemap, or a one-minute crawl) and generate a 301 redirect map into the site Worker. This is also the honest answer to attribution: we're not starting their traffic from zero, we're upgrading what lands on it.
5. Off-boarding (if ever): static export with the form swapped for a mailto/phone block (a static bundle has no Worker to POST to), plus their lead history as CSV.

### R5 — Data
1. Three tables in Supabase: `clients` (slug, look, domain, status, consent ref), `leads`, `images` (R2 key, source, rights note, alt). Sends/meetings tracked as registry columns.
2. Once the first site is live: weekly `pg_dump` to R2. Before that there's nothing worth backing up.

### R6 — Draft lifecycle (this stays even in lean mode)
1. Drafts expire 30 days after pitch, 45 days after creation if never pitched. The expiry date doubles as the follow-up hook: "your preview comes down on <date>."
2. Deletion is complete: Worker gone, all R2 assets gone, config archived. We keep no media of businesses that didn't consent. Any owner request → content down within 1 business day.

### R7 — Edits (internal policy, not a promised service)
We promise clients nothing here — they email or call, and we handle it manually, whenever. Internally, the discipline holds: implement only what's config-expressible (text, photos, hours, palette); out-of-scope requests are declined or become schema fields per R1.1. Keep an informal log of what gets asked — it's the roadmap for any future editor.

### R8 — Engineering, right-sized
1. `CONVENTIONS.md` at repo root (tokens, naming, structure); every AI-assisted session gets pointed at it first.
2. Config schema validation is the one hard gate. Post-deploy health check: site 200s, images load, and (once R3 exists) a test-mode form round-trip.
3. `redeploy-all` script for engine fixes: deploys **one site first**, operator eyeballs it, then the rest. That's the whole rollout system at this scale.
4. From the first live site: a daily cron pings each live site and runs a test-mode form submission; failures email the operator.

## 5. Deferred until it hurts — with the trigger that revives each

- **The scraper** (Playwright headless render filling the R2.1 input contract: photo candidates ≥ ~800px, logo, NAP prefill from JSON-LD/footer/contact page) → build it when manual collection is the slowest part of holding 5 drafts/week — realistically after ~10 drafts, with the saved input folders as its test suite. Honest estimate: a day or two for the happy path, closer to a week to be robust across Wix/GoDaddy/Squarespace.

- **Funnel instrumentation** (status history, outreach table, view analytics, `ledge_account_id` joins) → when sends exceed ~25 or outreach stalls and the registry columns can't tell you why.
- **Fleet machinery** (artifact-pinned rollback, batched health-gated rollout, canary CI) → past ~10 live sites, when "eyeball one site then redeploy" stops being safe.
- **Backup drills, bounce webhooks, fallback replay tooling** → the first time a lead goes missing or leads carry real commercial weight.
- **High-frequency lead-Worker monitoring, alert heartbeats** → same trigger as above.
- **SMS lead delivery** → known limitation (landscaping leads go cold in hours; email to a contractor in a truck can mean next-day replies). Revisit with partner feedback.
- **Arbitrary hex colors + contrast validation** → only if a client genuinely needs colors beyond their logo-derived palette and the presets.
- **Multi-tenant serving** → ~30–50 live sites.
- **Leads syncing into Ledge itself** → when the app is ready for it; the branded lead email is the bridge.
- Anything self-serve, forever, until this document says otherwise.

## 6. Milestones

1. **M1 — Engine (start now, this BRD at the repo root):** seed with the sitebuilder engine and vendored `@ledge/ui` components; `new-draft` scaffolding; registry. Look scope, honestly budgeted: `classic` and `studio` come along nearly free; **Meridian and GreenLeaf are rewrites, not ports** — they're standalone Vite/React Router apps today, so their pages become Next pages and every piece of content gets wired through the config schema. Done = all four looks render from sample configs at visual parity on desktop and mobile, with gallery/lightbox/before-after working. If the rewrites drag, ship M2 with two looks — two good looks and outreach beats four looks and silence.
2. **M2 — Send.** Outreach starts here. **Drafts don't need the lead pipeline, consent flow, or monitoring — don't wait for them.** The first ~5 manual drafts double as the reality check: photo availability, NAP extractability, honest per-prospect time. Adjust the ≥3-photo gate or the targeting if reality disagrees, and save every input folder — they're the scraper's future test cases.
3. **M3 — Go-live path, built when the first prospect says yes:** consent page, DNS runbook, lead Worker + form, daily cron. A yes gives you days of runway to ship this; don't build it speculatively.
4. **M4 — Operate:** ramp to 5/week; at 10 sends apply the §2 review. When manual collection becomes the slowest part of the cadence, build the scraper (§5).

## 7. Risks, honestly

- **The creep factor** is the strategy risk: "someone scraped my business" must land as delight. Controls: only content they already published, the preview ribbon, 1-day takedown, complete deletion on expiry. First real test is M2's early sends — watch replies closely.
- **Lead lag is real — manage the expectation, don't hide from it.** A low-traffic site won't produce form leads for months. The pitch and the meeting lead with what's provable immediately: before/after PageSpeed and mobile rendering of their old site vs. the draft (generate this comparison as part of `new-draft` — it's a screenshot pair and two scores, and it's the single most persuasive artifact in the meeting). After go-live, contact actions and the monthly report (R3.4–3.6) carry the value story until organic leads arrive. Never promise lead volume.
- **Photo availability:** some prospects' sites simply won't yield 3 usable photos. Manual mode surfaces this from draft one; skipping prospects is fine — the target pool is far bigger than 25. When the scraper is built, it's built against the saved real-world inputs, not guesses.
- **Pre-consent hosting:** a draft is technically reachable by anyone with the link, even though it's sent only to the owner, noindexed, and dies in 30 days. Accepted — the realistic worst case is "take this down," and the answer is "done, within a day." The formal consent (and its one flat-fee legal pass) belongs to go-live and is crossed at first yes (R4.1).
- **Supabase free-tier auto-pause** kills lead delivery silently — the paid switch at first live site is not optional.
- **Simplicity debt is deliberate.** §5 is the list of what we knowingly didn't build and the tripwires that tell us when that stops being smart.
