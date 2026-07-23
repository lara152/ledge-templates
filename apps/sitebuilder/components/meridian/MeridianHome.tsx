import Link from 'next/link';
import { ImageSlot } from '@/components/ImageSlot';
import { MeridianSectionHead } from './MeridianSectionHead';
import { MeridianCtaBand } from './MeridianCtaBand';
import { business, contact, featuredProjects, heroContent } from '@/lib/site';

export function MeridianHome() {
  const hero = heroContent();
  const featured = featuredProjects(3);
  const area = contact.serviceArea?.trim();

  return (
    <>
      {/* HERO — the photo (or video) leads */}
      <section className="relative min-h-[86vh] w-full overflow-hidden">
        <ImageSlot
          src={hero.image}
          alt={hero.imageAlt}
          ratio="16/9"
          priority
          rounded={false}
          className="absolute inset-0 h-full w-full"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(16,16,18,0.5) 0%, rgba(16,16,18,0.12) 40%, rgba(16,16,18,0.92) 100%)',
          }}
        />
        <div className="container-page relative flex min-h-[86vh] flex-col justify-end pb-20 sm:pb-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow mb-5">{area || 'Landscape design & build'}</p>
            <h1 className="text-5xl leading-[1.02] text-ink sm:text-6xl lg:text-7xl">{hero.headline}</h1>
            {hero.subhead ? <p className="mt-6 max-w-lg text-lg text-white/80">{hero.subhead}</p> : null}
            <div className="mt-9 flex flex-wrap gap-4">
              {featured.length > 0 ? (
                <Link href="/portfolio/" className="btn btn-primary text-base">
                  View the portfolio
                </Link>
              ) : null}
              <Link href="/contact/" className="btn btn-outline text-base">
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED — full-bleed projects */}
      {featured.length > 0 ? (
        <section className="section">
          <div className="container-page">
            <MeridianSectionHead
              eyebrow="Selected work"
              title="A few recent gardens"
              intro="Each is a bespoke design-build. Step into any project for the full case study."
            />
          </div>
          <div className="mt-14 space-y-6 sm:space-y-8">
            {featured.map((p, i) => (
              <Link key={p.slug} href={`/portfolio/${p.slug}/`} className="group block">
                <div className="relative overflow-hidden">
                  <ImageSlot
                    src={p.cover.image}
                    alt={p.cover.alt || p.name}
                    ratio="21/9"
                    priority={i === 0}
                    rounded={false}
                    imgClassName="transition-transform duration-[1200ms] group-hover:scale-[1.03]"
                    className="w-full"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(180deg, transparent 45%, rgba(16,16,18,0.85) 100%)' }}
                  />
                  <div className="absolute inset-x-0 bottom-0 py-6 sm:py-10">
                    <div className="container-page">
                      <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                          <p className="text-sm tracking-wide text-white/70">
                            {[p.neighborhood, p.year].filter(Boolean).join(' · ')}
                          </p>
                          <h3 className="mt-2 text-3xl text-ink sm:text-4xl">{p.name}</h3>
                        </div>
                        <span className="text-sm text-white/80 underline-offset-4 group-hover:underline">
                          View case study →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Statement */}
      <section className="section border-t border-line">
        <div className="container-page">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6">{business.name}</p>
            <p className="text-2xl leading-relaxed sm:text-3xl">
              {business.oneLineDescription?.trim() ||
                'We design and build a limited number of residential landscapes each year — singular gardens made to be lived in.'}
            </p>
            <Link
              href="/about/"
              className="mt-8 inline-block text-sm text-primary underline-offset-4 hover:underline"
            >
              About the studio →
            </Link>
          </div>
        </div>
      </section>

      <MeridianCtaBand />
    </>
  );
}
