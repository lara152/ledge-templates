import { ContactForm } from '@/components/ContactForm';
import { MeridianPageHeader } from './MeridianPageHeader';
import { business, contact, mailtoHref, telHref } from '@/lib/site';

export function MeridianContact() {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const area = contact.serviceArea?.trim();

  return (
    <>
      <MeridianPageHeader
        eyebrow="Begin"
        title={`Talk to ${business.name}`}
        intro={
          area
            ? `Serving ${area}. Tell us about your property and we'll arrange a private consultation.`
            : "Tell us about your property and we'll arrange a private consultation."
        }
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-4">Studio</p>
            <ul className="space-y-4 text-lg">
              {mail ? (
                <li>
                  <a href={mail} className="transition-colors hover:text-primary">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {tel ? (
                <li>
                  <a href={tel} className="transition-colors hover:text-primary">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {area ? <li className="text-ink-muted">{area}</li> : null}
            </ul>
          </div>

          <div id="contact-form" className="scroll-mt-28">
            <h2 className="text-2xl sm:text-3xl">Send a message</h2>
            <p className="mt-2 text-ink-muted">Tell us about your space and the best way to reach you.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
