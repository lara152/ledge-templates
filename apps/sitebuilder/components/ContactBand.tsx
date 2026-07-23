import { PrimaryCta } from './Cta';
import { business, contact, telHref } from '@/lib/site';

/**
 * Closing conversion band (dark, brand-secondary). Repeats the primary CTA where
 * the visitor is most likely ready to act.
 */
export function ContactBand() {
  const tel = telHref(contact.phone);

  return (
    <section
      className="section"
      style={{ backgroundColor: 'var(--surface-contrast)', color: 'var(--surface-contrast-fg)' }}
    >
      <div className="container-page flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl">
          <h2 className="text-3xl sm:text-4xl" style={{ color: 'var(--surface-contrast-fg)' }}>
            Ready when you are
          </h2>
          <p className="mt-3 text-lg opacity-80">
            {contact.hours?.trim()
              ? `Reach ${business.name} — ${contact.hours.trim()}.`
              : `Reach ${business.name} and we'll take it from here.`}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrimaryCta variant="on-dark" long className="text-base" />
          {tel && (
            <a
              href="/contact/"
              className="btn text-base"
              style={{
                border: '1px solid rgba(255,255,255,0.28)',
                color: 'var(--surface-contrast-fg)',
              }}
            >
              Contact options
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
