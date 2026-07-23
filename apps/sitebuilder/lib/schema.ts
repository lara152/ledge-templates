import { config } from './config';
import { absoluteUrl, formattedAddress, getFaqs, services, siteUrl, socialLinks } from './site';

/**
 * JSON-LD builders — all generated from site.config.json so the structured data
 * can never drift from the visible content. We deliberately DON'T emit an
 * AggregateRating (it requires a real ratingValue; a review count alone would be
 * invalid/misleading) and we skip openingHours unless it can be expressed validly.
 */

const BUSINESS_ID = `${siteUrl()}/#business`;
const WEBSITE_ID = `${siteUrl()}/#website`;

function postalAddress() {
  const a = config.contact?.address;
  if (!a) return undefined;
  const node: Record<string, string> = { '@type': 'PostalAddress' };
  if (a.street?.trim()) node.streetAddress = a.street.trim();
  if (a.city?.trim()) node.addressLocality = a.city.trim();
  if (a.region?.trim()) node.addressRegion = a.region.trim();
  if (a.postalCode?.trim()) node.postalCode = a.postalCode.trim();
  if (a.country?.trim()) node.addressCountry = a.country.trim();
  return Object.keys(node).length > 1 ? node : undefined;
}

/** Organization / LocalBusiness node with consistent NAP. */
export function businessSchema() {
  const b = config.business;
  const c = config.contact ?? {};
  const sameAs = [...socialLinks()];
  if (c.googleBusinessProfileUrl?.trim()) sameAs.push(c.googleBusinessProfileUrl.trim());

  const node: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': b.type?.trim() || 'LocalBusiness',
    '@id': BUSINESS_ID,
    name: b.name,
    url: siteUrl(),
  };
  if (b.oneLineDescription?.trim()) node.description = b.oneLineDescription.trim();
  if (b.yearEstablished?.trim()) node.foundingDate = b.yearEstablished.trim();
  if (c.phone?.trim()) node.telephone = c.phone.trim();
  if (c.email?.trim()) node.email = c.email.trim();
  if (config.brand?.logoPath?.trim()) {
    node.logo = absoluteUrl(config.brand.logoPath.trim());
    node.image = absoluteUrl(config.brand.logoPath.trim());
  }
  const address = postalAddress();
  if (address) node.address = address;
  if (c.serviceArea?.trim()) node.areaServed = c.serviceArea.trim();
  if (sameAs.length) node.sameAs = sameAs;
  return node;
}

/** WebSite node — helps answer engines resolve the canonical site + name. */
export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: siteUrl(),
    name: config.business.name,
    publisher: { '@id': BUSINESS_ID },
  };
}

/** One Service node per configured service. */
export function serviceSchemas() {
  const areaServed = config.contact?.serviceArea?.trim();
  return services().map((s) => {
    const node: Record<string, unknown> = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: s.name,
      provider: { '@id': BUSINESS_ID },
    };
    if (s.description?.trim()) node.description = s.description.trim();
    if (areaServed) node.areaServed = areaServed;
    if (s.priceInfo?.trim()) {
      node.offers = { '@type': 'Offer', description: s.priceInfo.trim() };
    }
    return node;
  });
}

/** FAQPage built from the same answered questions the FAQ section renders. */
export function faqSchema() {
  const faqs = getFaqs();
  if (faqs.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}
