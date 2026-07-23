# Sitebuilder — Plan Review, Council Findings & Open Questions

> **What this is:** the consolidated output of the architecture review. Part 1 is the feedback on the original plan and the revised decisions with their reasoning. Part 2 summarizes the expert review board's assessment by discipline. Part 3 carries the conversation forward — the questions still open, framed so the next working session can answer them.
>
> **Context:** the objective is a self-serve intake engine that spins up client websites from minimal input (their old site, Google Business Profile, uploads), offered free to first-time signups as a lead magnet for Ledge. Realistic volume: under 20 sites in the first 6 months. Builder: effectively one person, working AI-assisted.

---

## Part 1 — Feedback on the Original Plan & Revised Decisions

### 1.1 Repos: kill the template-button model

The original plan inherited GitHub's "Use this template" flow — an independent repo per client. That model exists for sharing code with strangers; we operate every site ourselves, and independent repos create the plan's worst unaddressed problem: **template drift**. Fix a bug once and there is no mechanism to propagate it to N divergent copies.

**Decision: one repo, many configs.** Template code lives once; each client is a folder (`clients/name/`) holding only their `site.config.json` and image references. A build script publishes any client to their own Cloudflare Pages project. *Why:* drift disappears, the codebase stays reviewable in one place, and "a folder of configs" migrates naturally to "a row in a database" when multi-tenant eventually makes sense. Nothing built now is thrown away.

### 1.2 The real ceilings are not the ones the doc named

The original doc crowned Cloudflare's 100-project cap "the ceiling." Earlier constraints bite first: **template drift** (solved above), and the **500 builds/month account-wide quota with 1 concurrent build** — one template fix rolled out to 20 sites is 20 serialized builds. *Mitigation:* build in our own CI and deploy via direct upload (`wrangler pages deploy`), which bypasses Pages build minutes entirely. Also flagged: Cloudflare is steering new work toward Workers with static assets; the deploy script should be the only code that knows we use Pages, so a later move is a script change.

### 1.3 Hosting & ownership: client owns the domain, Ledge owns the hosting

*Why:* at this scale hosting costs ~$0/month (Pages, R2, and Resend free tiers all cover 20 clients), and control is the point — if the site lives on the client's own host we can't push fixes, the contact function may not run there, and the ongoing relationship the free site exists to create ends at handoff. The client keeps the asset that matters to them (the domain); onboarding needs one CNAME record.

### 1.4 Intake: multi-source, self-serve front, scripted back

Intake asks "where does your business live online?" — **old website + Google Business Profile + phone upload at launch; Instagram/Facebook via OAuth in phase 2** (scraping is off the table; the Graph API path also yields captions, which feed project descriptions). Every added source raises pre-fill quality, and pre-fill quality is the wow moment of the product. Behind the self-serve front, provisioning stays a human running a script — at this volume that human pass is a quality gate and the first relationship touchpoint, not a bottleneck.

### 1.5 Customization: knobs, not templates

Cap the gallery at 3–5 designs; perceived customization comes from watching the site react to your choices, not from the number of choices. Curated palettes (including "pulled from your logo"), font pairings, and a layout toggle yield 150+ distinct-feeling outcomes from config values. A **live preview populated with the client's real data** is worth more than five new templates. A bounded AI step drafts their copy (tagline, about, services) from business info and reviews — text is where small businesses feel seen, and generation can't break the design there.

### 1.6 Images: bytes in R2, meaning in Supabase

Skip the "commit to repo first" phase — photos arrive programmatically (Places API fetches must be copied anyway; uploads land directly). R2 holds files (`sites/client/hero.jpg`, served via a custom domain — `r2.dev` is rate-limited); **Supabase holds structure**: a `projects` table (client, name, description, date) so galleries render as organized work rather than a photo dump, and an `images` table (R2 key, client, project, **source** — tracked for rights reasons — caption, tags, alt text). Enrichment at intake (auto-tags, captions, alt text) means the flow doesn't just copy photos, it organizes the client's portfolio — and the resulting structured media library is a compounding asset for Ledge itself.

### 1.7 Leads: a database row first, then the email

The original plan's email-only delivery means the email *is* the record — a bounce or a mistyped config address loses the lead silently. **Every lead writes to a Supabase table, then sends via Resend.** *Why this matters, in ascending order:* (1) **durability** — a bounced email becomes a recoverable incident instead of a silent failure; (2) **proof of value** — "your free site generated 14 leads this month" is the single most persuasive sentence in the entire funnel, and without the table it cannot be said; (3) **the upsell path** — the table *is* the future leads dashboard, the paid tier this funnel feeds. Protection: Cloudflare Turnstile on every form, verified server-side, so bots don't burn the shared sender domain's reputation or fill the table.

### 1.8 Consent: two grants, at intake, from client #1

A checkbox now beats chasing retroactive signatures later. **Grant 1 (required):** Ledge may store, process, and serve the client's content to build and host *their* site, including derivatives (resized images, generated tags/captions/alt text). **Grant 2 (optional, unchecked by default):** Ledge may feature their site in Ledge's marketing — real client work is the best possible gallery content for the intake page itself. The client warrants they own what they upload; on churn, the marketing grant survives only for already-published content. Log timestamp and terms version per acceptance. (Structure is sound; wording needs a legal pass before client #1.)

---

## Part 2 — Council Findings (by discipline)

**Product:** The architecture review quietly grew the product — seven build steps before client #1, some serving the roadmap rather than the first twenty clients. The unvalidated core is the funnel itself: does a free site convert anyone into a Ledge customer? No amount of schema answers that. *Verdict: cut the build to templates + intake + manual deploy; ship and learn.*

**Architecture:** One-repo-many-configs is right and reversible in both directions — backward to manual, forward to multi-tenant. Two requirements: isolate all Pages knowledge inside the deploy script, and ship the images schema with the first upload even if enrichment waits — retrofitting metadata onto a flat bucket is the migration nobody does. *Verdict: build the skeleton now, ornaments later.*

**Data:** The leads table is the best decision in the plan — the funnel's only instrumentation. But nothing else is measured: no intake started/abandoned events, no record of which sources pre-filled what. If pre-fill is the wow moment, we need to know when it fails (e.g., Places returns three grainy photos). *Verdict: build now, plus ~5 cheap intake events.*

**Design:** The risk isn't the happy path with rich Google data — it's the client who connects nothing and uploads nothing, staring at an empty template. The empty-state path is the product for the least-online clients, who are exactly whom a free offer attracts. Also: exposed axes (5 palettes × 3 fonts) is combinatorics, not design — curate whole pairings. *Verdict: prototype the intake flow on a phone with a real business before building it.*

**User voice:** The client cares about three things: it looks good on their phone, leads reach them, and they never need a password (keep it that way). The consent checkboxes are right, but a legalese marketing opt-in gets zero checks — one plain sentence with an example site. *Verdict: the plan over-serves the client, which is the correct direction.*

**Delivery:** The build order reads like a four-person team; for one person, "two more template designs" alone is a month. Instagram OAuth plus Meta app review is a phase-2 label hiding phase-3 cost. The human-in-the-loop deploy is the QA department — keep it as long as possible. *Verdict: build half — templates, intake, script, form; everything else is a backlog.*

**Quality & reliability:** Three silent failure modes: a mistyped leads email (the leads table catches it), a partially-failed photo fetch shipping a site with broken images, and a half-published deploy with no rollback. Every deploy gets a post-publish health check: site up, form posts, images load. Turnstile must be verified server-side or it's decoration. *Verdict: build now, with a ~20-line health check appended to the script.*

**AI-assisted engineering practices:** AI-accelerated building makes conventions more valuable, not less — the model replicates whatever patterns exist, including bad ones. Day-zero kit (~2 days total): (1) a `CONVENTIONS.md` in the repo — design tokens (the knobs *are* the token system; components reference tokens, never raw hex), naming, structure — pointed at in every AI session; (2) tests only where they pay: config schema validation (protects every client at once), the contact function (Turnstile, lead row, email — mocked), and the post-deploy health check, each landing in the same session as its feature; (3) review = reading everything line-by-line, preceded by a second AI pass briefed to find dead code, duplication, and token violations; (4) a standing dead-code bounty — end each session by deleting what it replaced, with `knip`/`ts-prune` failing CI on unused exports (dead code in a template ships to every client site); (5) one CI pipeline from client #1: lint, schema check, tests, dead-code check, deploy. No formal process beyond that — one branch, read everything, delete relentlessly. *Verdict: build as day zero, not step eight.*

**Collective recommendation:** Build now — half of it. The architecture decisions (one repo, R2 + schema, leads table, consent at intake, conventions file) survived every seat. The build order did not: the converged launch scope is **conventions + CI skeleton → templates → intake with consent → deploy script with health check → contact form with lead logging.** Everything else — enrichment, Instagram, dashboards — is a backlog with a trigger, not a plan.

**Dissent worth taking seriously:** the empty-state client (no Google photos, no Instagram, nothing to upload) is plausibly the most common *actual* first user, and nothing is designed for them.

**Biggest unvalidated assumption:** that a free website converts its recipient into a Ledge customer at all.

**Next action:** before writing more code, hand-build one free site for one real business using the intake questions as a script, and watch what they ask for — the design prototype and the funnel validation in a single afternoon.

---

## Part 3 — Open Questions (carrying the conversation)

**Funnel & business**
1. What does "converted" mean for this funnel — a paid Ledge engagement, a hosting upsell, a referral? Without defining it, "14 leads this month" is the client's win but not measurably ours.
2. What's the trigger that ends the free offer or changes its terms — a client count, a cost threshold, a conversion rate?
3. When a free client churns, what exactly do they leave with — the config? the images? a static export? (This shapes both the terms and the goodwill story.)

**Product & design**
4. What is the empty-state intake experience — stock imagery by trade? An AI-drafted site from just name + trade + city? A "text us 5 photos" fallback? (The Council's strongest dissent; needs a real answer before launch.)
5. Which single trade/vertical do the first 3 templates target? Designing for "small business" generally is designing for no one.
6. How does a client request a change post-launch — email us? A magic-link edit page (contradicts "no passwords" how)? This is the #1 predictable support burden and it's undesigned.

**Technical**
7. What are the 5 intake analytics events worth logging from day one? (Proposed: intake started, source connected, pre-fill completed %, preview rendered, submitted/abandoned.)
8. Does the health check auto-rollback on failure, or page a human? (At this volume, paging a human is probably correct — confirm.)
9. Where does the AI copy-drafting step run — at intake time in the browser, or in the review pass before deploy? (Cost, latency, and quality-control implications differ.)

**Validation (do first)**
10. Which real business gets the hand-built site this week — and what, specifically, are we watching for during the walkthrough?
