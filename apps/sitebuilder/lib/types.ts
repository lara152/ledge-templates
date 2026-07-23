/**
 * Types for site.config.json — the single source of truth for a client site.
 *
 * The required shape matches the sitebuilder brief exactly. A few fields are
 * OPTIONAL extensions (marked below) that let a client re-theme or wire a form
 * without touching component code; every one has a sensible default, so a config
 * containing only the required fields renders a complete, good-looking site.
 */

export type PrimaryCTA = 'call' | 'book' | 'form' | 'purchase' | 'credibility';

export type Address = {
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
};

export type Business = {
  name: string;
  tagline?: string;
  oneLineDescription?: string;
  yearEstablished?: string;
  /** schema.org LocalBusiness type or subtype, e.g. "LocalBusiness", "HVACBusiness", "Restaurant". */
  type?: string;
};

export type Contact = {
  phone?: string;
  email?: string;
  address?: Address;
  serviceArea?: string;
  hours?: string;
  googleBusinessProfileUrl?: string;
  social?: string[];
  /** OPTIONAL extension: a Formspree (or compatible) endpoint the contact form POSTs to. Falls back to the Cloudflare Pages Function at /api/contact. */
  formEndpoint?: string;
};

export type Goal = { primaryCTA: PrimaryCTA };

/** A FAQ entry. A bare string (question only) is tolerated but dropped from the FAQ + schema. */
export type FaqEntry = string | { question: string; answer: string };

export type Audience = {
  customerDescription?: string;
  topQuestions?: FaqEntry[];
};

export type Service = {
  name: string;
  description?: string;
  priceInfo?: string;
  /** OPTIONAL (image-forward templates): a photo under /public or a URL. */
  image?: string;
};

/** A photo with optional captions — used by image-forward templates (galleries, heroes). */
export type MediaItem = {
  /** Path under /public (e.g. "/studio/gallery-1.jpg") or an absolute URL. */
  image: string;
  alt?: string;
  title?: string;
  location?: string;
  caption?: string;
};

/** Hero overrides for image-forward templates. Falls back to business.tagline/oneLineDescription. */
export type Hero = {
  image?: string;
  imageAlt?: string;
  headline?: string;
  subhead?: string;
};

export type ProcessStep = { title: string; description?: string };
export type Process = { heading?: string; subhead?: string; steps?: ProcessStep[] };

export type Gallery = { heading?: string; subhead?: string; items?: MediaItem[] };

export type AboutSection = { image?: string; imageAlt?: string; heading?: string; body?: string };

export type Testimonial = {
  quote: string;
  author?: string;
  detail?: string;
};

export type Proof = {
  testimonials?: Testimonial[];
  reviewCount?: string;
  credentials?: string[];
  notableClients?: string[];
};

export type BrandColors = {
  primary?: string;
  secondary?: string;
  accent?: string;
};

export type Brand = {
  logoPath?: string;
  colors?: BrandColors;
  /** OPTIONAL extension: CSS radius token (e.g. "14px"). Defaults to a premium 14px. */
  radius?: string;
  /** OPTIONAL extension: font-family stack overrides. Defaults to the shipped Fraunces + Inter pairing. */
  fonts?: { display?: string; body?: string };
};

export type Deploy = {
  domain?: string;
  subdomainFallback?: string;
  host?: string;
};

export type Meta = { lastUpdated?: string };

/** Which design the site renders. Defaults to "classic". "studio" is the image-forward look. */
export type Template = 'classic' | 'studio';

export type SiteConfig = {
  /** Design template. Defaults to "classic" when omitted. */
  template?: Template;
  business: Business;
  contact?: Contact;
  goal: Goal;
  audience?: Audience;
  services?: Service[];
  proof?: Proof;
  brand?: Brand;
  deploy?: Deploy;
  meta?: Meta;
  /** Image-forward template content (used by "studio"; ignored by "classic"). */
  hero?: Hero;
  process?: Process;
  gallery?: Gallery;
  about?: AboutSection;
};

/** A FAQ item after normalization — only complete (answered) items survive. */
export type NormalizedFaq = { question: string; answer: string };
