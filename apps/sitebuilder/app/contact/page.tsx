import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { ContactForm } from '@/components/ContactForm';
import { JsonLd } from '@/components/JsonLd';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/icons';
import { StudioPageHeader } from '@/components/studio/StudioPageHeader';
import { StudioContact } from '@/components/studio/StudioContact';
import { MeridianContact } from '@/components/meridian/MeridianContact';
import { GreenLeafContact } from '@/components/greenleaf/GreenLeafContact';
import { SummitContact } from '@/components/summit/SummitContact';
import { breadcrumbSchema } from '@/lib/schema';
import { config } from '@/lib/config';
import {
  business,
  contact,
  formattedAddress,
  mailtoHref,
  mapEmbedUrl,
  telHref,
  template,
} from '@/lib/site';

const addr = config.contact?.address;
const city = addr?.city?.trim();
const area = contact.serviceArea?.trim();

export const metadata: Metadata = {
  title: { absolute: `Contact ${business.name}${city ? ` in ${city}` : ''}` },
  description:
    `Get in touch with ${business.name}` +
    (contact.phone?.trim() ? ` — call ${contact.phone.trim()}` : '') +
    (area ? `, serving ${area}` : '') +
    '. Send a message and we’ll reply within one business day.',
  // og:title/og:description are derived from title/description; OG image is inherited.
  alternates: { canonical: '/contact/' },
};

export default function ContactPage() {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const address = formattedAddress();
  const mapUrl = mapEmbedUrl();

  const methods = [
    tel
      ? { icon: PhoneIcon, label: 'Call', value: contact.phone!.trim(), href: tel }
      : null,
    mail
      ? { icon: MailIcon, label: 'Email', value: contact.email!.trim(), href: mail }
      : null,
    contact.hours?.trim()
      ? { icon: ClockIcon, label: 'Hours', value: contact.hours.trim(), href: undefined }
      : null,
    address
      ? { icon: MapPinIcon, label: 'Visit', value: address, href: undefined }
      : null,
  ].filter(Boolean) as {
    icon: typeof PhoneIcon;
    label: string;
    value: string;
    href?: string;
  }[];

  const jsonLd = (
    <JsonLd
      data={breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Contact', path: '/contact/' },
      ])}
    />
  );
  const intro = area
    ? `Serving ${area}. Call, email, or send a message below — we reply within one business day.`
    : 'Call, email, or send a message below — we reply within one business day.';

  if (template === 'meridian') {
    return (
      <>
        {jsonLd}
        <MeridianContact />
      </>
    );
  }

  if (template === 'greenleaf') {
    return (
      <>
        {jsonLd}
        <GreenLeafContact />
      </>
    );
  }

  if (template === 'summit') {
    return (
      <>
        {jsonLd}
        <SummitContact />
      </>
    );
  }

  if (template === 'studio') {
    return (
      <>
        {jsonLd}
        <StudioPageHeader eyebrow="Contact" title={`Talk to ${business.name}`} intro={intro} />
        <StudioContact />
      </>
    );
  }

  return (
    <>
      {jsonLd}
      <PageHeader
        eyebrow="Contact"
        title={`Talk to ${business.name}`}
        intro={intro}
        crumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact/' },
        ]}
      />

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2">
          {/* Details */}
          <div>
            <ul className="space-y-5">
              {methods.map((m) => {
                const Icon = m.icon;
                return (
                  <li key={m.label} className="flex gap-4">
                    <span
                      className="grid h-11 w-11 shrink-0 place-items-center rounded-control"
                      style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
                    >
                      <Icon width={20} height={20} />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
                        {m.label}
                      </p>
                      {m.href ? (
                        <a href={m.href} className="mt-1 block text-lg font-medium text-ink hover:underline">
                          {m.value}
                        </a>
                      ) : (
                        <p className="mt-1 text-lg text-ink">{m.value}</p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>

            {mapUrl ? (
              <div className="mt-8 overflow-hidden rounded-card border shadow-soft">
                <iframe
                  title={`Map showing ${business.name}`}
                  src={mapUrl}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-64 w-full border-0"
                />
              </div>
            ) : null}
          </div>

          {/* Form */}
          <div id="contact-form" className="scroll-mt-28">
            <h2 className="text-2xl sm:text-3xl">Send a message</h2>
            <p className="mt-2 text-ink-muted">
              Tell us what you need and the best way to reach you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
