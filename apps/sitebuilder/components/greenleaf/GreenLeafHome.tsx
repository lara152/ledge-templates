import Link from 'next/link';
import { BeforeAfter } from '@/components/BeforeAfter';
import { ImageSlot } from '@/components/ImageSlot';
import { GreenLeafSectionHead } from './GreenLeafSectionHead';
import { GreenLeafServiceCard } from './GreenLeafServiceCard';
import { GreenLeafReviewStars } from './GreenLeafReviewStars';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';
import { GreenLeafQuickForm } from './GreenLeafQuickForm';
import {
  areas,
  beforeAfterItems,
  heroContent,
  heroPoints,
  reviews,
  reviewsSummary,
  services,
  urgency,
} from '@/lib/site';

export function GreenLeafHome() {
  const hero = heroContent();
  const points = heroPoints();
  const svc = services();
  const ba = beforeAfterItems();
  const revs = reviews();
  const summary = reviewsSummary();
  const areaList = areas();
  const u = urgency();

  return (
    <>
      {/* HERO — value prop + tappable phone + short form above the fold */}
      <section className="bg-surface-sunken">
        <div className="container-page grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-2 lg:gap-16">
          <div>
            {u.hero?.trim() ? (
              <span
                className="mb-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-accent"
                style={{ background: 'color-mix(in srgb, var(--brand-accent) 12%, transparent)' }}
              >
                ● {u.hero}
              </span>
            ) : null}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl">{hero.headline}</h1>
            {hero.subhead ? <p className="mt-5 max-w-lg text-lg text-ink-muted">{hero.subhead}</p> : null}
            {points.length ? (
              <ul className="mt-6 space-y-2.5">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 font-medium">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary text-xs text-primary-fg">
                      ✓
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <GreenLeafPhoneButton variant="solid" />
              <span className="text-sm text-ink-muted">or use the form →</span>
            </div>
            {summary.rating ? (
              <div className="mt-7 flex items-center gap-2 text-sm text-ink-muted">
                <GreenLeafReviewStars rating={5} />
                <span>
                  <strong className="text-ink">{summary.rating}</strong>
                  {summary.count ? ` from ${summary.count} reviews` : ''}
                </span>
              </div>
            ) : null}
          </div>
          <div className="lg:pl-6">
            <GreenLeafQuickForm />
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="border-y border-line bg-surface">
        <div className="container-page flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-sm font-medium text-ink-muted">
          <span>✓ Licensed &amp; insured</span>
          <span>✓ Locally owned</span>
          <span>✓ Upfront pricing</span>
          <span>✓ Free estimates</span>
          <span>✓ No contracts</span>
        </div>
      </div>

      {/* Services */}
      {svc.length ? (
        <section className="section">
          <div className="container-page">
            <GreenLeafSectionHead
              eyebrow="What we do"
              title="Everything to keep your yard great"
              intro="From weekly mowing to full installs — pick a service to see what's included and a price range."
            />
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {svc.map((s) => (
                <GreenLeafServiceCard key={s.slug || s.name} service={s} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Real work band */}
      {hero.image ? (
        <section className="relative">
          <ImageSlot src={hero.image} alt={hero.imageAlt} ratio="21/9" rounded={false} className="w-full" />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(90deg, rgba(23,37,29,0.72), rgba(23,37,29,0.2))' }}
          />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page">
              <div className="max-w-md text-white">
                <h2 className="text-3xl sm:text-4xl" style={{ color: '#fff' }}>
                  Real work, real yards
                </h2>
                <p className="mt-3 opacity-90">See before-and-afters from jobs across the area.</p>
                {ba.length ? (
                  <Link
                    href="/portfolio/"
                    className="mt-6 inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-accent-fg hover:brightness-95"
                  >
                    See our work
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {/* Before/after teaser */}
      {ba.length ? (
        <section className="section">
          <div className="container-page">
            <GreenLeafSectionHead eyebrow="Before &amp; after" title="The difference is the point" />
            <div className="mx-auto mt-10 max-w-3xl">
              <BeforeAfter before={ba[0].before} after={ba[0].after} ratio="3/2" />
              <p className="mt-3 text-center text-sm text-ink-muted">
                {[ba[0].scope, ba[0].city, ba[0].duration].filter(Boolean).join(' · ')}
              </p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Reviews teaser */}
      {revs.length ? (
        <section className="section bg-surface-sunken">
          <div className="container-page">
            <GreenLeafSectionHead
              eyebrow="Reviews"
              title="Neighbors who recommend us"
              intro={summary.rating ? `${summary.rating}★ average${summary.count ? ` from ${summary.count} happy customers` : ''}.` : undefined}
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {revs.slice(0, 3).map((r, i) => (
                <div key={i} className="rounded-card border border-line bg-surface p-6 shadow-soft">
                  <GreenLeafReviewStars rating={r.rating || 5} />
                  <p className="mt-3 text-[0.98rem] leading-relaxed text-ink">“{r.text}”</p>
                  <p className="mt-4 text-sm font-semibold text-ink">
                    {r.name}
                    {r.city ? <span className="font-normal text-ink-muted"> · {r.city}</span> : null}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/reviews/" className="font-semibold text-primary hover:underline">
                Read all reviews →
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* Areas teaser */}
      {areaList.length ? (
        <section className="section">
          <div className="container-page">
            <GreenLeafSectionHead eyebrow="Service areas" title="Proudly serving the area" />
            <ul className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-3">
              {areaList.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/areas/${a.slug}/`}
                    className="inline-flex rounded-pill border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-primary hover:text-primary"
                  >
                    {a.city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </>
  );
}
