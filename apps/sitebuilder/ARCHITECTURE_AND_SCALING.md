# Sitebuilder — Architecture & Scaling FAQ

> **Purpose:** Answer the operational questions that come up when running this template as a
> product across many clients: where each client's data lives, how to input it, where images
> live, how the contact form delivers, and the real platform limits at scale.
>
> **Limits verified:** 2026-07-22 (GitHub + Cloudflare docs — see Sources). Re-check before
> committing to the architecture at 100-client scale; provider limits change.

---

> **⚠ SUPERSEDED (2026-07-22) — the repo model in §1 is out of date.** We adopted **one repo, many
> clients** (each client is `clients/<slug>/site.config.json`, selected with `npm run use <slug>`) per
> [`PLAN_REVIEW_COUNCIL_FINDINGS.md`](PLAN_REVIEW_COUNCIL_FINDINGS.md) §1.1 — **not** a separate GitHub
> repo per client (that model causes template drift: a fix can't propagate to N copies). §1 below is
> kept for its tradeoff reasoning. §§2–4 (limits, images, form) still hold, but the council doc has the
> sharper calls: the real ceiling is Cloudflare's **500 builds/month**, images go to **R2 + a Supabase
> structure** from day one, and every lead writes a **Supabase row before the email**.

## 1. The "Use this template" button & the platform vision

**Where the button is today.** It lives on the repo's GitHub page (`github.com/ledgebuild/sitebuilder`),
top-right — **but only if the repo is flagged as a "Template repository"** in *Settings → General →
"Template repository."* Clicking it creates a **brand-new, independent repo** (a clean copy, no shared
history). That new repo is where a single client's data goes.

**How it works today (honest state): fully manual, one design.**

- Someone clicks "Use this template," names the repo per client, fills that client's `site.config.json`,
  and deploys.
- "Which client has which site" is tracked by hand (repo name / a spreadsheet). There is no catalog and
  no self-serve.
- Important: there is currently **one look**, re-themed per client via color/font. The idea of clients
  "browsing all the options we offer" implies **multiple distinct designs** — which do not exist yet.
  A gallery would mean building 3–5 template designs.

**The platform you're imagining** (a Ledge site where a client browses options, picks one, submits their
info, and a site is provisioned) is a **separate product** — a multi-tenant SaaS. It's a real fork:

| | **Today — internal tool** | **Future — self-serve platform** |
|---|---|---|
| Who builds the site | Us, manually | The client picks & requests; auto-provisioned |
| Designs | 1 look, re-themed | Gallery of several designs |
| Database | Not needed | Yes — to store each client, their config, which template |
| Effort | Already done | Significant build (app + GitHub/Cloudflare API automation) |

**Recommendation:** stay manual for the first clients (it works now); once the model is proven, build the
platform on top. At that point reuse **Ledge's existing Supabase** — do **not** add Firebase (Ledge already
migrated off Firebase).

---

## 2. Real limits + do we need Supabase / Firebase?

Verified 2026-07-22:

| Platform | Limit | Impact at 100 clients |
|---|---|---|
| **GitHub — repos per account** | **100,000** repos | None. 100 clients = 100 repos. Not a constraint. |
| **Cloudflare Pages — projects per account** | **100 projects** (soft cap, "not routinely increased") | **This is the ceiling.** At 100 clients you are exactly at the limit. |
| Cloudflare Pages — builds/month | 500 builds/mo, 1 concurrent build | Watch this if you redeploy often. |
| Cloudflare Pages — files/site | 20,000 files, 25 MiB per file | Fine for web images. |
| Cloudflare Pages — custom domains/project | 100 | Fine (1 per client). |

**Key finding:** the current model — *one Cloudflare Pages project per client* — **caps out around 100
clients** on the free plan. Beyond that you must either (a) ask Cloudflare support for an increase (docs
say it's *not routinely* granted, so unreliable), (b) move to paid plans / multiple accounts, or (c)
**switch to a multi-tenant architecture** (one app serving many sites from stored configs). Note that (c)
is the *same* rearchitecture the self-serve platform (§1) would need — the platform vision and breaking
the 100-project ceiling point at the same redesign.

**Supabase / Firebase?**

- **For the websites: neither is needed.** They are **static** sites — no database, no backend, no login.
  That is the whole point (fast, cheap, on Cloudflare's edge).
- **For the contact form: not needed either** (solved without a DB — see §4).
- **For images: you don't need a database, you need object *storage*** (a different thing — see §3).
- **For the platform (if built): yes, a DB — and we reuse Ledge's existing Supabase.** No Firebase.

---

## 3. Where do the images live? (100 clients × ~50 photos each)

They must **not** live on anyone's computer. Two models:

**Option A — inside each client's repo** (`public/images/` of that client's repo).

- ✅ Simple, no new infrastructure; deploys automatically with Cloudflare.
- ❌ At ~50 photos per site, Git repos bloat over time (Git handles binaries poorly); across 100 clients
  this gets heavy to maintain. Fine to start, bad at scale.

**Option B — a central storage bucket** (photos live in the cloud; the site references them by URL).
Recommended at scale.

- **Cloudflare R2** is the natural fit: same ecosystem as the hosting, 10 GB free, **no egress fees**.
  100 clients × 50 photos × ~300 KB ≈ 1.5 GB → comfortably within the free tier.
- Organize per folder (`r2://sites/clientX/hero.jpg`) and put the URL in the config. Photos no longer
  live on a laptop and don't bloat the repos.
- (Ledge's Supabase Storage also works, but since hosting is Cloudflare, R2 is cleaner.)

**Recommendation:** start with **A** (fastest for the first sites), but build the template's image support
to **accept URLs** — so migrating to **R2** later is just changing where the URLs come from, with no
rework.

---

## 4. Automating the contact form without a per-client account

Goal: **no per-client Formspree account, and no need for the client's admin email.** There is a better model.

**Build delivery once, with an account Ledge owns.**

- Wire the existing Pages Function (`functions/api/contact.ts`) **one time** to **Resend** (email delivery),
  using **a single account + API key that Ledge controls.**
- Per client, the only thing you configure is **which email address the leads go to** — in that client's
  `site.config.json` (e.g. `"leadsTo": "juan@theirbusiness.com"`).
- Resend **sends from a Ledge domain** (e.g. `leads@ledge.build`) **to the client's normal inbox**, with
  reply-to set to whoever submitted the form.

**The key point:** you do **not** need the client's account or admin email. You only need **an email address
where they already receive mail** (their everyday Gmail, whatever). You create nothing for them — you just
ask "what email should your leads go to?" and put it in the config. Zero per-client accounts, zero foreign
logins.

> Formspree is fine to test **one** site quickly, but for 100 clients the "Ledge-owned Resend + per-client
> destination email" model is the correct one: a single account you own, automated, and the client only has
> to give you an email address.

---

## Summary — the 3 architecture decisions this raises

1. **Scale ceiling.** "1 repo + 1 Cloudflare Pages project per client" works to ~100 clients. Past that =
   multi-tenant architecture (which is also what the self-serve platform needs). Not urgent, but on the radar.
2. **Images.** Start by committing them to the repo, but design the template to accept URLs → migrate to
   **Cloudflare R2** when it gets heavy. Never on a laptop.
3. **Contact form.** One **Ledge-owned Resend** account + a per-client destination email in the config. No
   per-client accounts.

**Suggested build order:** (a) image support in the template (most visible) → (b) real form delivery via
Resend → and in parallel, decide if/when to build the self-serve platform (the big fork).

---

## Sources

- [Cloudflare Pages — Limits (official)](https://developers.cloudflare.com/pages/platform/limits/index.md)
- [Cloudflare Community — Pages project limit (free plan)](https://community.cloudflare.com/t/request-to-increase-pages-project-limit-free-plan/934688)
- [GitHub Changelog — Repository ownership limits (100,000)](https://github.blog/changelog/2025-03-27-repository-ownership-limits/)
- [GitHub Docs — Repository limits](https://docs.github.com/en/repositories/creating-and-managing-repositories/repository-limits)
