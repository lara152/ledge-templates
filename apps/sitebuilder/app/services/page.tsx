import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Services } from '@/components/Services';
import { ContactBand } from '@/components/ContactBand';
import { JsonLd } from '@/components/JsonLd';
import { StudioPageHeader } from '@/components/studio/StudioPageHeader';
import { StudioServices } from '@/components/studio/StudioServices';
import { StudioProcess } from '@/components/studio/StudioProcess';
import { StudioCta } from '@/components/studio/StudioCta';
import { MeridianServices } from '@/components/meridian/MeridianServices';
import { breadcrumbSchema, serviceSchemas } from '@/lib/schema';
import { config } from '@/lib/config';
import { business, contact, services, template } from '@/lib/site';

const addr = config.contact?.address;
const cityRegion = [addr?.city?.trim(), addr?.region?.trim()].filter(Boolean).join(', ');
const area = contact.serviceArea?.trim();
const names = services()
  .slice(0, 4)
  .map((s) => s.name.toLowerCase())
  .join(', ');

export const metadata: Metadata = {
  title: { absolute: `Services${cityRegion ? ` in ${cityRegion}` : ''} · ${business.name}` },
  description:
    `What ${business.name} offers${area ? ` across ${area}` : ''}` +
    (names ? `: ${names}. ` : '. ') +
    `Clear scope and honest, upfront pricing.`,
  // No explicit `openGraph` block: Next derives og:title/og:description from the
  // title/description above and keeps the shared branded OG image (app/opengraph-image).
  alternates: { canonical: '/services/' },
};

export default function ServicesPage() {
  const jsonLd = (
    <JsonLd
      data={[
        breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services/' },
        ]),
        ...serviceSchemas(),
      ]}
    />
  );
  const title = area ? `Services for ${area}` : 'Our services';
  const intro = `Every project starts with a clear scope and an upfront price. Here's exactly what ${business.name} can help you with.`;

  if (template === 'meridian') {
    return (
      <>
        {jsonLd}
        <MeridianServices />
      </>
    );
  }

  if (template === 'studio') {
    return (
      <>
        {jsonLd}
        <StudioPageHeader eyebrow="Services" title={title} intro={intro} />
        <StudioServices title="What we do" full eyebrow="Full service list" />
        <StudioProcess />
        <StudioCta />
      </>
    );
  }

  return (
    <>
      {jsonLd}
      <PageHeader
        eyebrow="Services"
        title={title}
        intro={intro}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services/' },
        ]}
      />
      <Services title="What we do" variant="full" eyebrow="Full service list" />
      <ContactBand />
    </>
  );
}
