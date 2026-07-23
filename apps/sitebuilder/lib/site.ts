import { config } from './config';
import type {
  AboutSection,
  Area,
  BeforeAfterItem,
  Hero,
  MediaItem,
  NormalizedFaq,
  Plan,
  PodcastEpisode,
  PrimaryCTA,
  ProcessStep,
  Project,
  Review,
  ServicePhase,
  Stat,
  TeamMember,
  Template,
  Trust,
} from './types';

const PLACEHOLDER_HOST = 'example.com';

/** Bare host for the live site, e.g. "northlinehvac.com". Prefers domain, then subdomain fallback. */
export function siteHost(): string {
  const d = config.deploy?.domain?.trim();
  const f = config.deploy?.subdomainFallback?.trim();
  const host = (d || f || PLACEHOLDER_HOST).replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return host;
}

/** Absolute origin, e.g. "https://northlinehvac.com" (no trailing slash). */
export function siteUrl(): string {
  return `https://${siteHost()}`;
}

/** Join a path onto the site origin for canonical / OG / sitemap URLs. */
export function absoluteUrl(path = '/'): string {
  const p = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl()}${p}`;
}

/** Digits-only tel: href, preserving a leading +. */
export function telHref(phone?: string): string | null {
  if (!phone) return null;
  const cleaned = phone.trim().replace(/[^\d+]/g, '');
  return cleaned ? `tel:${cleaned}` : null;
}

export function mailtoHref(email?: string): string | null {
  if (!email?.trim()) return null;
  return `mailto:${email.trim()}`;
}

/** Only answered FAQ entries survive — guarantees visible text === FAQPage schema. */
export function getFaqs(): NormalizedFaq[] {
  const raw = config.audience?.topQuestions ?? [];
  const out: NormalizedFaq[] = [];
  for (const item of raw) {
    if (typeof item === 'string') continue; // bare question, no answer → dropped
    if (item && item.question?.trim() && item.answer?.trim()) {
      out.push({ question: item.question.trim(), answer: item.answer.trim() });
    }
  }
  return out;
}

export function services() {
  return (config.services ?? []).filter((s) => s?.name?.trim());
}

export function testimonials() {
  return (config.proof?.testimonials ?? []).filter((t) => t?.quote?.trim());
}

export function credentials() {
  return (config.proof?.credentials ?? []).filter((c) => c?.trim());
}

export function notableClients() {
  return (config.proof?.notableClients ?? []).filter((c) => c?.trim());
}

export function socialLinks() {
  return (config.contact?.social ?? []).filter((s) => s?.trim());
}

/** Single-line formatted postal address, or null if there's nothing to show. */
export function formattedAddress(): string | null {
  const a = config.contact?.address;
  if (!a) return null;
  const line1 = a.street?.trim();
  const cityRegion = [a.city?.trim(), a.region?.trim()].filter(Boolean).join(', ');
  const line2 = [cityRegion, a.postalCode?.trim()].filter(Boolean).join(' ');
  const full = [line1, line2].filter(Boolean).join(', ');
  return full || null;
}

/** ISO + human "last updated" date, falling back to the build date. */
export function lastUpdated(): { iso: string; display: string } {
  const raw = config.meta?.lastUpdated?.trim();
  const date = raw && !Number.isNaN(Date.parse(raw)) ? new Date(raw) : new Date();
  return {
    iso: date.toISOString().slice(0, 10),
    display: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  };
}

export type ResolvedCta = {
  kind: PrimaryCTA;
  label: string;
  shortLabel: string;
  href: string;
  external: boolean;
};

/**
 * Resolve config.goal.primaryCTA into a concrete button.
 * `call` uses a live tel: link when a phone exists; everything else routes to a
 * page/anchor that always exists in the static export.
 */
export function primaryCta(): ResolvedCta {
  const kind = config.goal?.primaryCTA ?? 'call';
  const phone = config.contact?.phone?.trim();
  const tel = telHref(phone);

  switch (kind) {
    case 'call':
      if (tel) {
        return { kind, label: `Call ${phone}`, shortLabel: 'Call now', href: tel, external: false };
      }
      return { kind, label: 'Contact us', shortLabel: 'Contact', href: '/contact/', external: false };
    case 'book':
      return { kind, label: 'Book an appointment', shortLabel: 'Book now', href: '/contact/#contact-form', external: false };
    case 'form':
      return { kind, label: 'Request a quote', shortLabel: 'Get a quote', href: '/contact/#contact-form', external: false };
    case 'purchase':
      return { kind, label: 'Order online', shortLabel: 'Order now', href: '/contact/#contact-form', external: false };
    case 'credibility':
      return { kind, label: 'See why clients trust us', shortLabel: 'Learn more', href: '/about/', external: false };
    default:
      return { kind: 'call', label: 'Contact us', shortLabel: 'Contact', href: '/contact/', external: false };
  }
}

export type NavItem = { label: string; href: string };

/** Nav is derived: a page only appears if it has something to show. */
export function navItems(): NavItem[] {
  const items: NavItem[] = [];
  if (services().length > 0) items.push({ label: 'Services', href: '/services/' });
  items.push({ label: 'About', href: '/about/' });
  if (getFaqs().length > 0) items.push({ label: 'FAQ', href: '/#faq' });
  items.push({ label: 'Contact', href: '/contact/' });
  return items;
}

/** Google Maps embed URL from the address — no API key required. */
export function mapEmbedUrl(): string | null {
  const addr = formattedAddress();
  if (!addr) return null;
  const q = encodeURIComponent(`${config.business.name}, ${addr}`);
  return `https://www.google.com/maps?q=${q}&output=embed`;
}

export const business = config.business;
export const contact = config.contact ?? {};
export const brand = config.brand ?? {};

/* ---- Image-forward template helpers (used by the "studio" template) ---------- */

/** Which design renders. Defaults to "classic". */
export const template: Template = config.template ?? 'classic';

/** Hero content for image-forward templates, falling back to the business fields. */
export function heroContent(): { image?: string; imageAlt?: string; headline: string; subhead?: string } {
  const h: Hero = config.hero ?? {};
  return {
    image: h.image?.trim() || undefined,
    imageAlt: h.imageAlt?.trim() || `${business.name} project`,
    headline: h.headline?.trim() || business.tagline?.trim() || business.name,
    subhead: h.subhead?.trim() || business.oneLineDescription?.trim() || undefined,
  };
}

/** Portfolio/gallery items that actually have an image. */
export function galleryItems(): MediaItem[] {
  return (config.gallery?.items ?? []).filter((i): i is MediaItem => Boolean(i?.image?.trim()));
}

/** "How it works" steps that have a title. */
export function processSteps(): ProcessStep[] {
  return (config.process?.steps ?? []).filter((s) => s?.title?.trim());
}

/** The About-page narrative block (studio template). */
export function aboutSection(): AboutSection {
  return config.about ?? {};
}

/* ---- "meridian" look helpers -------------------------------------------------- */

/** Portfolio projects with at least a slug, name, and a cover object (image may be a placeholder). */
export function projects(): Project[] {
  return (config.projects ?? []).filter((p) => Boolean(p?.slug?.trim() && p?.name?.trim() && p?.cover));
}

/** The first N projects, shown full-bleed on the meridian home. */
export function featuredProjects(n = 3): Project[] {
  return projects().slice(0, n);
}

export function projectBySlug(slug: string): Project | undefined {
  return projects().find((p) => p.slug === slug);
}

/** Design-build narrative phases (meridian Services). */
export function servicePhases(): ServicePhase[] {
  return (config.servicePhases ?? []).filter((p) => p?.title?.trim());
}

/** Trust signals (awards / certifications / press). */
export function trust(): Trust {
  return config.trust ?? {};
}

/** Studio team members with a name. */
export function team(): TeamMember[] {
  return (config.team ?? []).filter((m) => m?.name?.trim());
}

/* ---- "greenleaf" look helpers ------------------------------------------------- */

export function serviceBySlug(slug: string) {
  return services().find((s) => s.slug === slug);
}

export function plans(): Plan[] {
  return (config.plans ?? []).filter((p) => p?.name?.trim());
}

export function customQuote(): { title?: string; blurb?: string } {
  return config.customQuote ?? {};
}

export function beforeAfterItems(): BeforeAfterItem[] {
  return (config.beforeAfter ?? []).filter((b) => Boolean(b?.before && b?.after));
}

export function reviews(): Review[] {
  return (config.reviews ?? []).filter((r) => r?.text?.trim());
}

export function reviewsSummary(): { rating?: string; count?: string } {
  return config.reviewsSummary ?? {};
}

export function areas(): Area[] {
  return (config.areas ?? []).filter((a) => Boolean(a?.slug?.trim() && a?.city?.trim()));
}

export function areaBySlug(slug: string) {
  return areas().find((a) => a.slug === slug);
}

export function urgency(): { banner?: string; hero?: string } {
  return config.urgency ?? {};
}

export function heroPoints(): string[] {
  return (config.hero?.points ?? []).filter((p) => p?.trim());
}

/* ---- "summit" look helpers (coach / agency for the trade) --------------------- */

export function stats(): Stat[] {
  return (config.stats ?? []).filter((s) => Boolean(s?.value?.trim() && s?.label?.trim()));
}

export function podcast(): { title?: string; url?: string; blurb?: string; episodes?: PodcastEpisode[] } {
  return config.podcast ?? {};
}

export function episodes(): PodcastEpisode[] {
  return (config.podcast?.episodes ?? []).filter((e) => e?.title?.trim());
}

/** Where the "book a call" CTA points: an external booking link if set, else /contact/. */
export function bookHref(): string {
  return config.contact?.bookingUrl?.trim() || '/contact/';
}
