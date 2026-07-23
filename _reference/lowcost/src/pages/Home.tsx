import { Link } from 'react-router-dom';
import { BeforeAfter, Container, ImageSlot, Section } from '@ledge/ui';
import { areas, beforeAfter, hero, reviews, reviewsSummary, services, urgency } from '@/data/content';
import { PhoneButton } from '@/components/PhoneButton';
import { QuickEstimateForm } from '@/components/QuickEstimateForm';
import { SectionHead } from '@/components/SectionHead';
import { ServiceCard } from '@/components/ServiceCard';
import { ReviewStars } from '@/components/ReviewStars';

export default function Home() {
  return (
    <>
      {/* ---- HERO: propuesta de valor + teléfono + formulario corto, above the fold ---- */}
      <section className="bg-surface-2">
        <Container>
          <div className="grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="badge-urgency mb-5">● {urgency.hero}</span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl">{hero.headline}</h1>
              <p className="mt-5 max-w-lg text-lg text-muted">{hero.sub}</p>
              <ul className="mt-6 space-y-2.5">
                {hero.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 font-medium">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-xs text-brand-fg">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <PhoneButton variant="solid" />
                <span className="text-sm text-muted">or use the form →</span>
              </div>
              <div className="mt-7 flex items-center gap-2 text-sm text-muted">
                <ReviewStars rating={5} />
                <span>
                  <strong className="text-ink">{reviewsSummary.rating}</strong> from{' '}
                  {reviewsSummary.count} reviews
                </span>
              </div>
            </div>

            <div className="lg:pl-6">
              <QuickEstimateForm />
            </div>
          </div>
        </Container>
      </section>

      {/* ---- Trust strip ---- */}
      <div className="border-y border-line bg-surface">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-sm font-medium text-muted">
            <span>✓ Licensed &amp; insured</span>
            <span>✓ Locally owned</span>
            <span>✓ Upfront pricing</span>
            <span>✓ Free estimates</span>
            <span>✓ No contracts</span>
          </div>
        </Container>
      </div>

      {/* ---- Services ---- */}
      <Section>
        <Container>
          <SectionHead
            eyebrow="What we do"
            title="Everything to keep your yard great"
            intro="From weekly mowing to full installs — pick a service to see what's included and a price range."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---- Real work band ---- */}
      <section className="relative">
        <ImageSlot image={hero.image} ratio="21/9" rounded={false} className="w-full" />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(90deg, rgba(23,37,29,0.72), rgba(23,37,29,0.2))' }}
        />
        <div className="absolute inset-0 flex items-center">
          <Container>
            <div className="max-w-md text-white">
              <h2 className="text-3xl sm:text-4xl" style={{ color: '#fff' }}>
                Real work, real yards
              </h2>
              <p className="mt-3 opacity-90">See before-and-afters from jobs across the Austin area.</p>
              <Link
                to="/portfolio"
                className="mt-6 inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-accent-fg hover:brightness-95"
              >
                See our work
              </Link>
            </div>
          </Container>
        </div>
      </section>

      {/* ---- Before/after teaser ---- */}
      <Section>
        <Container>
          <SectionHead eyebrow="Before &amp; after" title="The difference is the point" />
          <div className="mx-auto mt-10 max-w-3xl">
            <BeforeAfter before={beforeAfter[0].before} after={beforeAfter[0].after} ratio="3/2" />
            <p className="mt-3 text-center text-sm text-muted">
              {beforeAfter[0].scope} · {beforeAfter[0].city} · {beforeAfter[0].duration}
            </p>
          </div>
        </Container>
      </Section>

      {/* ---- Reviews teaser ---- */}
      <Section className="bg-surface-2">
        <Container>
          <SectionHead
            eyebrow="Reviews"
            title="Neighbors who recommend us"
            intro={`${reviewsSummary.rating}★ average from ${reviewsSummary.count} happy customers.`}
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {reviews.slice(0, 3).map((r, i) => (
              <div key={i} className="rounded-card border border-line bg-surface p-6 shadow-soft">
                <ReviewStars rating={r.rating} />
                <p className="mt-3 text-[0.98rem] leading-relaxed text-ink">“{r.text}”</p>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {r.name} <span className="font-normal text-muted">· {r.city}</span>
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="font-semibold text-brand hover:underline">
              Read all reviews →
            </Link>
          </div>
        </Container>
      </Section>

      {/* ---- Areas teaser ---- */}
      <Section>
        <Container>
          <SectionHead eyebrow="Service areas" title="Proudly serving the Austin area" />
          <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <li key={a.slug}>
                <Link
                  to={`/areas/${a.slug}`}
                  className="inline-flex rounded-pill border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-brand hover:text-brand"
                >
                  {a.city}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
