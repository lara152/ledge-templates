import { config } from './config';
import {
  credentials,
  formattedAddress,
  getFaqs,
  lastUpdated,
  notableClients,
  services,
  siteUrl,
} from './site';

/**
 * Generates /llms.txt — a plain-Markdown, answer-first summary of the business for
 * LLMs / answer engines. Everything is pulled from site.config.json so it stays in
 * sync with the site with zero hand-maintenance.
 */
export function buildLlmsTxt(): string {
  const b = config.business;
  const c = config.contact ?? {};
  const url = siteUrl();
  const updated = lastUpdated();
  const lines: string[] = [];

  lines.push(`# ${b.name}`);
  lines.push('');
  if (b.oneLineDescription?.trim()) lines.push(b.oneLineDescription.trim());
  else if (b.tagline?.trim()) lines.push(b.tagline.trim());
  lines.push('');
  lines.push(`> Website: ${url}`);
  lines.push(`> Last updated: ${updated.iso}`);
  lines.push('');

  // About
  lines.push('## About');
  if (b.tagline?.trim()) lines.push(`- Tagline: ${b.tagline.trim()}`);
  if (b.yearEstablished?.trim()) lines.push(`- Established: ${b.yearEstablished.trim()}`);
  if (b.type?.trim()) lines.push(`- Category: ${b.type.trim()}`);
  if (c.serviceArea?.trim()) lines.push(`- Service area: ${c.serviceArea.trim()}`);
  const customer = config.audience?.customerDescription?.trim();
  if (customer) {
    lines.push('');
    lines.push(customer);
  }
  lines.push('');

  // Contact
  lines.push('## Contact');
  if (c.phone?.trim()) lines.push(`- Phone: ${c.phone.trim()}`);
  if (c.email?.trim()) lines.push(`- Email: ${c.email.trim()}`);
  const address = formattedAddress();
  if (address) lines.push(`- Address: ${address}`);
  if (c.hours?.trim()) lines.push(`- Hours: ${c.hours.trim()}`);
  if (c.googleBusinessProfileUrl?.trim()) lines.push(`- Google Business Profile: ${c.googleBusinessProfileUrl.trim()}`);
  lines.push('');

  // Services
  const svc = services();
  if (svc.length) {
    lines.push('## Services');
    for (const s of svc) {
      const price = s.priceInfo?.trim() ? ` (${s.priceInfo.trim()})` : '';
      const desc = s.description?.trim() ? ` — ${s.description.trim()}` : '';
      lines.push(`- **${s.name}**${desc}${price}`);
    }
    lines.push('');
  }

  // FAQ
  const faqs = getFaqs();
  if (faqs.length) {
    lines.push('## Frequently asked questions');
    for (const f of faqs) {
      lines.push(`### ${f.question}`);
      lines.push(f.answer);
      lines.push('');
    }
  }

  // Proof
  const creds = credentials();
  const clients = notableClients();
  const reviewCount = config.proof?.reviewCount?.trim();
  if (reviewCount || creds.length || clients.length) {
    lines.push('## Credibility');
    if (reviewCount) lines.push(`- Customer reviews: ${reviewCount}`);
    if (creds.length) lines.push(`- Credentials: ${creds.join('; ')}`);
    if (clients.length) lines.push(`- Notable clients: ${clients.join('; ')}`);
    lines.push('');
  }

  // Key pages
  lines.push('## Key pages');
  lines.push(`- Home: ${url}/`);
  if (svc.length) lines.push(`- Services: ${url}/services/`);
  lines.push(`- About: ${url}/about/`);
  lines.push(`- Contact: ${url}/contact/`);
  lines.push('');

  return lines.join('\n');
}
