import Link from 'next/link';
import { areas, business, contact, lastUpdated, plans, reviews, services } from '@/lib/site';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  if (!links.length) return null;
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-subtle">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-ink-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function GreenLeafFooter() {
  const [first, ...rest] = business.name.split(' ');
  const year = lastUpdated().iso.slice(0, 4);

  const serviceLinks = services()
    .filter((s) => s.slug)
    .map((s) => ({ label: s.name, href: `/services/${s.slug}/` }));
  const areaLinks = areas().map((a) => ({ label: a.city, href: `/areas/${a.slug}/` }));
  const companyLinks: { label: string; href: string }[] = [];
  if (plans().length) companyLinks.push({ label: 'Pricing', href: '/pricing/' });
  if (reviews().length) companyLinks.push({ label: 'Reviews', href: '/reviews/' });
  companyLinks.push({ label: 'Contact', href: '/contact/' });

  return (
    <footer>
      {/* Closing CTA band */}
      <section className="section bg-primary text-primary-fg !py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="max-w-2xl text-3xl sm:text-4xl" style={{ color: 'var(--brand-primary-fg)' }}>
            Ready for a greener yard?
          </h2>
          <p className="max-w-lg opacity-90">Free estimate within one business day. No contracts, no pressure.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <GreenLeafPhoneButton variant="solid" />
            <Link
              href="/contact/"
              className="inline-flex items-center rounded-control border-2 border-white/70 px-5 py-3 font-semibold text-primary-fg hover:bg-white/10"
            >
              Get a free estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Links */}
      <div className="border-t border-line bg-surface">
        <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-xl font-extrabold">
              <span className="text-primary">{first}</span>
              {rest.length ? <span className="text-ink"> {rest.join(' ')}</span> : null}
            </p>
            {business.tagline?.trim() ? (
              <p className="mt-3 max-w-xs text-sm text-ink-muted">
                {business.tagline.trim()}
                {contact.serviceArea?.trim() ? ` · Serving ${contact.serviceArea.trim()}` : ''}
              </p>
            ) : null}
            <p className="mt-5">
              <GreenLeafPhoneButton variant="inline" />
            </p>
            {contact.hours?.trim() ? <p className="mt-1 text-sm text-ink-muted">{contact.hours}</p> : null}
          </div>

          <FooterCol title="Services" links={serviceLinks} />
          <FooterCol title="Areas" links={areaLinks} />
          <FooterCol title="Company" links={companyLinks} />
        </div>

        <div className="container-page flex flex-col gap-2 border-t border-line py-6 text-xs text-ink-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <p>Licensed &amp; insured{contact.address?.city ? ` · ${contact.address.city}, ${contact.address.region ?? ''}` : ''}</p>
        </div>
      </div>
    </footer>
  );
}
