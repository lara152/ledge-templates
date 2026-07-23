import { PrimaryCta } from './Cta';
import { StarIcon, ClockIcon, MapPinIcon, PhoneIcon, CheckIcon } from './icons';
import { business, contact, credentials, telHref } from '@/lib/site';
import { config } from '@/lib/config';

export function Hero() {
  const tel = telHref(contact.phone);
  const creds = credentials().slice(0, 3);
  const reviewCount = config.proof?.reviewCount?.trim();
  const established = business.yearEstablished?.trim();

  const eyebrowBits = [
    established ? `Established ${established}` : null,
    contact.serviceArea?.trim() ? `Serving ${contact.serviceArea.trim()}` : null,
  ].filter(Boolean);

  return (
    <section className="relative overflow-hidden">
      {/* Decorative brand wash */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60rem 40rem at 78% -10%, var(--brand-primary-soft), transparent 60%), linear-gradient(180deg, var(--surface), var(--surface))',
        }}
      />
      <div className="container-page grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Copy */}
        <div className="animate-fade-up">
          {eyebrowBits.length ? (
            <p className="eyebrow mb-4">{eyebrowBits.join(' · ')}</p>
          ) : null}

          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem]">{business.name}</h1>

          {business.tagline?.trim() ? (
            <p className="mt-4 font-display text-2xl font-medium leading-snug text-ink sm:text-3xl">
              {business.tagline.trim()}
            </p>
          ) : null}

          {business.oneLineDescription?.trim() ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-muted">
              {business.oneLineDescription.trim()}
            </p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryCta variant="primary" long className="text-base" />
            <a href="/services/" className="btn btn-outline text-base">
              Explore services
            </a>
          </div>

          {creds.length ? (
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
              {creds.map((c) => (
                <li key={c} className="flex items-center gap-2">
                  <CheckIcon width={17} height={17} style={{ color: 'var(--brand-primary)' }} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {/* Quick-facts card */}
        <div className="animate-fade-up rounded-card border bg-[var(--surface-raised)] p-6 shadow-lift sm:p-8">
          {reviewCount ? (
            <div className="flex items-center gap-2">
              <span className="flex" style={{ color: 'var(--brand-accent)' }} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={18} height={18} />
                ))}
              </span>
              <span className="text-sm font-medium text-ink">
                {reviewCount} happy customers
              </span>
            </div>
          ) : null}

          {tel ? (
            <a href={tel} className="mt-5 flex items-center gap-3 group">
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-control"
                style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
              >
                <PhoneIcon width={20} height={20} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wide text-ink-subtle">Call us</span>
                <span className="block font-display text-xl font-semibold text-ink group-hover:underline">
                  {contact.phone}
                </span>
              </span>
            </a>
          ) : null}

          <ul className="mt-6 space-y-4 text-sm">
            {contact.hours?.trim() ? (
              <li className="flex gap-3">
                <ClockIcon width={18} height={18} className="mt-0.5 shrink-0 text-ink-subtle" />
                <span className="text-ink-muted">
                  <span className="sr-only">Hours: </span>
                  {contact.hours.trim()}
                </span>
              </li>
            ) : null}
            {contact.serviceArea?.trim() ? (
              <li className="flex gap-3">
                <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0 text-ink-subtle" />
                <span className="text-ink-muted">
                  <span className="sr-only">Service area: </span>
                  {contact.serviceArea.trim()}
                </span>
              </li>
            ) : null}
          </ul>

          <div className="mt-6">
            <PrimaryCta variant="primary" long className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
