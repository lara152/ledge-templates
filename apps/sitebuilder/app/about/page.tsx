import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ContactBand } from '@/components/ContactBand';
import { JsonLd } from '@/components/JsonLd';
import { CheckIcon } from '@/components/icons';
import { StudioPageHeader } from '@/components/studio/StudioPageHeader';
import { StudioAbout } from '@/components/studio/StudioAbout';
import { StudioTestimonials } from '@/components/studio/StudioTestimonials';
import { StudioCta } from '@/components/studio/StudioCta';
import { MeridianAbout } from '@/components/meridian/MeridianAbout';
import { SummitAbout } from '@/components/summit/SummitAbout';
import { breadcrumbSchema } from '@/lib/schema';
import { config } from '@/lib/config';
import { business, contact, credentials, template } from '@/lib/site';

const established = business.yearEstablished?.trim();
const area = contact.serviceArea?.trim();

export const metadata: Metadata = {
  title: { absolute: `About ${business.name}${established ? ` — serving since ${established}` : ''}` },
  description:
    business.oneLineDescription?.trim() ||
    `Learn about ${business.name}${area ? `, serving ${area}` : ''}.`,
  // og:title/og:description are derived from title/description; OG image is inherited.
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  const creds = credentials();
  const customer = config.audience?.customerDescription?.trim();
  const reviewCount = config.proof?.reviewCount?.trim();

  const stats = [
    established ? { label: 'In business since', value: established } : null,
    reviewCount ? { label: 'Customers served', value: reviewCount } : null,
    area ? { label: 'Service area', value: area } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  const jsonLd = (
    <JsonLd
      data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about/' },
      ])}
    />
  );

  if (template === 'meridian') {
    return (
      <>
        {jsonLd}
        <MeridianAbout />
      </>
    );
  }

  if (template === 'summit') {
    return (
      <>
        {jsonLd}
        <SummitAbout />
      </>
    );
  }

  if (template === 'studio') {
    return (
      <>
        {jsonLd}
        <StudioPageHeader
          eyebrow="About"
          title={`About ${business.name}`}
          intro={business.oneLineDescription?.trim()}
        />
        <StudioAbout />
        <StudioTestimonials />
        <StudioCta />
      </>
    );
  }

  return (
    <>
      {jsonLd}
      <PageHeader
        eyebrow="About"
        title={`About ${business.name}`}
        intro={business.oneLineDescription?.trim()}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about/' },
        ]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="max-w-prose">
            {customer ? (
              <>
                <h2 className="text-2xl sm:text-3xl">Who we serve</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-muted">{customer}</p>
              </>
            ) : null}

            {creds.length ? (
              <div className="mt-12">
                <h2 className="text-2xl sm:text-3xl">Why people choose us</h2>
                <ul className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {creds.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <span
                        className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                        style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
                      >
                        <CheckIcon width={15} height={15} />
                      </span>
                      <span className="text-ink">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>

          {stats.length ? (
            <aside className="h-fit rounded-card border bg-[var(--surface-raised)] p-6 shadow-soft sm:p-8">
              <dl className="space-y-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-2xl font-semibold text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          ) : null}
        </div>
      </section>

      <ContactBand />
    </>
  );
}
