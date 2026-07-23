import { ContactForm } from '@/components/ContactForm';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from '@/components/icons';
import { business, contact, formattedAddress, mailtoHref, mapEmbedUrl, telHref } from '@/lib/site';

/** Contact-page body for the studio template: methods + map beside the message form. */
export function StudioContact() {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const address = formattedAddress();
  const mapUrl = mapEmbedUrl();

  const methods = [
    tel ? { icon: PhoneIcon, label: 'Call', value: contact.phone!.trim(), href: tel } : null,
    mail ? { icon: MailIcon, label: 'Email', value: contact.email!.trim(), href: mail } : null,
    contact.hours?.trim()
      ? { icon: ClockIcon, label: 'Hours', value: contact.hours.trim(), href: undefined }
      : null,
    address ? { icon: MapPinIcon, label: 'Studio', value: address, href: undefined } : null,
  ].filter(Boolean) as { icon: typeof PhoneIcon; label: string; value: string; href?: string }[];

  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2">
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
            <div className="mt-8 overflow-hidden rounded-card border border-[var(--line)] shadow-soft">
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

        <div id="contact-form" className="scroll-mt-28">
          <h2 className="text-2xl sm:text-3xl">Send a message</h2>
          <p className="mt-2 text-ink-muted">
            Tell us about your space and the best way to reach you.
          </p>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
