import { Link } from 'react-router-dom';
import { Container, Section, ImageSlot, buttonClasses } from '@ledge/ui';
import { featured, hero } from '@/data/content';
import { SectionHead } from '@/components/SectionHead';
import { CtaBand } from '@/components/CtaBand';

export default function Home() {
  return (
    <>
      {/* ---- HERO: full-screen, la foto (o video) manda ---- */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        <ImageSlot
          image={hero.image}
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
              'linear-gradient(180deg, rgba(16,16,18,0.55) 0%, rgba(16,16,18,0.15) 38%, rgba(16,16,18,0.9) 100%)',
          }}
        />
        <Container className="relative flex h-full flex-col justify-end pb-20 sm:pb-28">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow mb-5">{hero.eyebrow}</p>
            <h1 className="text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{hero.headline}</h1>
            <p className="mt-6 max-w-lg text-lg text-ink/80">{hero.sub}</p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/portfolio" className={buttonClasses('primary', 'lg')}>
                View the portfolio
              </Link>
              <Link to="/contact" className={buttonClasses('outline', 'lg')}>
                Schedule a Consultation
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* ---- FEATURED: proyectos full-bleed ---- */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="Selected work"
            title="A few recent gardens"
            intro="Each is a bespoke design-build. Step into any project for the full case study."
          />
        </Container>
        <div className="mt-14 space-y-6 sm:space-y-8">
          {featured.map((p, i) => (
            <Link key={p.slug} to={`/portfolio/${p.slug}`} className="group block">
              <div className="relative overflow-hidden">
                <ImageSlot
                  image={p.cover}
                  ratio="21/9"
                  priority={i === 0}
                  rounded={false}
                  imgClassName="transition-transform duration-[1200ms] ease-out-expo group-hover:scale-[1.03]"
                  className="w-full"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 45%, rgba(16,16,18,0.8) 100%)',
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 py-6 sm:py-10">
                  <Container>
                    <div className="flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <p className="text-sm tracking-wide text-ink/70">
                          {p.neighborhood} · {p.year}
                        </p>
                        <h3 className="mt-2 text-3xl sm:text-4xl">{p.name}</h3>
                      </div>
                      <span className="text-sm text-ink/80 underline-offset-4 group-hover:underline">
                        View case study →
                      </span>
                    </div>
                  </Container>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* ---- Statement ---- */}
      <Section className="border-t border-line">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-6">Meridian</p>
            <p className="text-2xl leading-relaxed sm:text-3xl">
              We design and build a limited number of residential landscapes each year — singular
              gardens rooted in the Texas Hill Country, made to be lived in.
            </p>
            <Link
              to="/about"
              className="mt-8 inline-block text-sm text-brand underline-offset-4 hover:underline"
            >
              About the studio →
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
