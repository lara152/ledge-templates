import { PrimaryCta } from '@/components/Cta';
import { StarIcon } from '@/components/icons';
import { business, contact, credentials, galleryItems, heroContent } from '@/lib/site';
import { config } from '@/lib/config';

/**
 * Full-bleed photographic hero (the image-forward template's signature). The hero
 * photo comes from config.hero.image; headline/subhead fall back to the business
 * tagline/description so the section is never empty.
 */
export function StudioHero() {
  const hero = heroContent();
  const area = contact.serviceArea?.trim();
  const established = business.yearEstablished?.trim();
  const reviewCount = config.proof?.reviewCount?.trim();
  const hasWork = galleryItems().length > 0;

  const eyebrow = ['Landscape design & build', area ? `Serving ${area}` : null]
    .filter(Boolean)
    .join('  ·  ');

  return (
    <section className="relative isolate overflow-hidden">
      {hero.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={hero.image}
          alt={hero.imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 -z-10 bg-[var(--brand-primary)]" />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(90deg, rgba(20,28,22,0.80) 0%, rgba(20,28,22,0.52) 44%, rgba(20,28,22,0.12) 100%)',
        }}
      />

      <div className="container-page flex min-h-[34rem] flex-col justify-center py-24 text-white sm:min-h-[40rem] lg:min-h-[44rem]">
        <div className="max-w-2xl animate-fade-up">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/80">{eyebrow}</p>
          <h1 className="mt-5 text-4xl font-semibold sm:text-5xl lg:text-[3.75rem]">{hero.headline}</h1>
          {hero.subhead ? (
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/85">{hero.subhead}</p>
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryCta variant="primary" long className="text-base" />
            {hasWork ? (
              <a
                href="/#portfolio"
                className="btn text-base"
                style={{ border: '1px solid rgba(255,255,255,0.45)', color: '#ffffff' }}
              >
                See our work
              </a>
            ) : null}
          </div>

          {reviewCount || established ? (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/85">
              {reviewCount ? (
                <span className="inline-flex items-center gap-2">
                  <span className="flex" style={{ color: 'var(--brand-accent)' }} aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} width={16} height={16} />
                    ))}
                  </span>
                  {reviewCount} happy clients
                </span>
              ) : null}
              {established ? <span>Designing outdoor spaces since {established}</span> : null}
              {credentials()[0]?.trim() ? <span>{credentials()[0].trim()}</span> : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
