import { useState } from 'react';
import { Container, Section, buttonClasses } from '@ledge/ui';
import { contact, site } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';

const fieldClass =
  'w-full rounded-control border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted focus:border-brand focus:outline-none';

function Field({
  label,
  name,
  type = 'text',
  required = false,
  placeholder,
  textarea = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-muted">
        {label}
        {required && ' *'}
      </span>
      {textarea ? (
        <textarea name={name} rows={5} required={required} placeholder={placeholder} className={fieldClass} />
      ) : (
        <input name={name} type={type} required={required} placeholder={placeholder} className={fieldClass} />
      )}
    </label>
  );
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader eyebrow={contact.eyebrow} title={contact.headline} intro={contact.body} />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <div>
              <p className="eyebrow mb-4">Studio</p>
              <ul className="space-y-4 text-lg">
                <li>
                  <a href={`mailto:${site.email}`} className="transition-colors hover:text-brand">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a
                    href={`tel:${site.phone.replace(/[^\d+]/g, '')}`}
                    className="transition-colors hover:text-brand"
                  >
                    {site.phone}
                  </a>
                </li>
                <li className="text-muted">{site.location}</li>
              </ul>
              <p className="mt-10 max-w-sm border-t border-line pt-6 text-sm leading-relaxed text-muted">
                {contact.note}. We take on a limited number of projects each year — every consultation
                is private and unhurried.
              </p>
            </div>

            <div>
              {sent ? (
                <div className="rounded-card border border-line bg-surface p-8 animate-fade-up">
                  <h2 className="text-2xl">Thank you.</h2>
                  <p className="mt-3 text-muted">
                    We&apos;ve received your note and will be in touch to arrange a private
                    consultation.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="space-y-5"
                >
                  <Field label="Name" name="name" required />
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <Field label="Property location" name="location" placeholder="Neighborhood, Austin" />
                  <Field label="Tell us about your project" name="message" textarea />
                  <button type="submit" className={buttonClasses('primary', 'lg', 'w-full sm:w-auto')}>
                    Request a consultation
                  </button>
                  {/* NOTA (interna): sin backend. Al enviar solo muestra el estado "gracias".
                      Conectar luego a Resend / CRM / Formspree según el plan. */}
                  <p className="text-xs text-muted">
                    By submitting you agree to be contacted about your project.
                  </p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
