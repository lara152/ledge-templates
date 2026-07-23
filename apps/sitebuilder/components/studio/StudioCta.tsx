import { PrimaryCta } from '@/components/Cta';
import { business, contact, telHref } from '@/lib/site';

/** Closing conversion band, centered, on the deep-green surface-contrast band. */
export function StudioCta() {
  const tel = telHref(contact.phone);

  return (
    <section
      className="section"
      style={{ backgroundColor: 'var(--surface-contrast)', color: 'var(--surface-contrast-fg)' }}
    >
      <div className="container-page flex flex-col items-center text-center">
        <h2 className="max-w-2xl text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--surface-contrast-fg)' }}>
          Live a better life outside
        </h2>
        <p className="mt-4 max-w-xl text-lg opacity-80">
          {contact.hours?.trim()
            ? `Tell ${business.name} about your space — ${contact.hours.trim()}.`
            : `Tell ${business.name} about your space and we'll take it from there.`}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <PrimaryCta variant="on-dark" long className="text-base" />
          {tel ? (
            <a
              href="/contact/"
              className="btn text-base"
              style={{ border: '1px solid rgba(255,255,255,0.32)', color: 'var(--surface-contrast-fg)' }}
            >
              Contact options
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
