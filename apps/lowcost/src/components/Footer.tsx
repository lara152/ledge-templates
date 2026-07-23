import { Link } from 'react-router-dom';
import { Container, Section } from '@ledge/ui';
import { areas, nav, services, site, telHref } from '@/data/content';
import { PhoneButton } from './PhoneButton';

export function Footer() {
  return (
    <footer>
      {/* Banda CTA final */}
      <Section className="bg-brand text-brand-fg !py-16">
        <Container>
          <div className="flex flex-col items-center gap-6 text-center">
            <h2 className="max-w-2xl text-3xl sm:text-4xl" style={{ color: 'var(--color-brand-fg)' }}>
              Ready for a greener yard?
            </h2>
            <p className="max-w-lg opacity-90">
              Free estimate within one business day. No contracts, no pressure.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <PhoneButton variant="solid" />
              <Link
                to="/contact"
                className="inline-flex items-center rounded-control border-2 border-white/70 px-5 py-3 font-semibold text-brand-fg hover:bg-white/10"
              >
                Get a free estimate
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Enlaces */}
      <div className="border-t border-line bg-surface">
        <Container>
          <div className="grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <p className="text-xl font-extrabold">
                <span className="text-brand">Green</span>
                <span className="text-ink">Leaf</span>
              </p>
              <p className="mt-3 max-w-xs text-sm text-muted">
                {site.tagline}. Serving {site.serviceAreaShort}.
              </p>
              <p className="mt-5">
                <PhoneButton variant="inline" />
              </p>
              <p className="mt-1 text-sm text-muted">{site.hours}</p>
            </div>

            <FooterCol title="Services" links={services.map((s) => ({ label: s.name, to: `/services/${s.slug}` }))} />
            <FooterCol title="Areas" links={areas.map((a) => ({ label: a.city, to: `/areas/${a.slug}` }))} />
            <FooterCol title="Company" links={[...nav.filter((n) => n.to !== '/areas'), { label: 'Contact', to: '/contact' }]} />
          </div>

          <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>
              &copy; {2026} {site.fullName}. All rights reserved.
            </p>
            <p>Licensed &amp; insured · {site.city}</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; to: string }[] }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to + l.label}>
            <Link to={l.to} className="text-muted transition-colors hover:text-ink">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
