import { ContactForm } from '@/components/ContactForm';
import { SummitBookButton } from './SummitBookButton';
import { contact, mailtoHref, telHref } from '@/lib/site';

export function SummitContact() {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const external = Boolean(contact.bookingUrl?.trim());

  return (
    <>
      <header className="pt-20 sm:pt-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4">Book a call</p>
          <h1 className="text-4xl sm:text-5xl">Let&apos;s map your path to seven figures</h1>
          <p className="mt-5 text-lg text-ink-muted">
            Book a time to talk — or send a message and we&apos;ll reach out.
          </p>
        </div>
      </header>
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-lg">The fastest way is to book a call.</p>
            <div className="mt-5">
              <SummitBookButton label={external ? 'Book a time to talk' : 'Request a call'} />
            </div>
            <ul className="mt-8 space-y-3 text-ink-muted">
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
            </ul>
          </div>
          <div id="contact-form" className="scroll-mt-28">
            <h2 className="text-2xl sm:text-3xl">Send a message</h2>
            <p className="mt-2 text-ink-muted">Tell us about your landscaping business.</p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
