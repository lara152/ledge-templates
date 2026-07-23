import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { GreenLeafQuickForm } from './GreenLeafQuickForm';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';
import { contact, mailtoHref } from '@/lib/site';

export function GreenLeafContact() {
  const mail = mailtoHref(contact.email);
  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Contact"
        title="Get your free estimate"
        intro="Call us or send the short form — we reply within one business day."
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-lg">The fastest way is to call — we actually pick up.</p>
            <div className="mt-5">
              <GreenLeafPhoneButton variant="solid" />
            </div>
            <ul className="mt-8 space-y-3 text-ink-muted">
              {mail ? (
                <li>
                  Email:{' '}
                  <a href={mail} className="font-medium text-primary hover:underline">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.hours?.trim() ? <li>Hours: {contact.hours}</li> : null}
              {contact.serviceArea?.trim() ? <li>Serving: {contact.serviceArea}</li> : null}
            </ul>
          </div>
          <div>
            <GreenLeafQuickForm title="Request your free estimate" />
          </div>
        </div>
      </section>
    </>
  );
}
