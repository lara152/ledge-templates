import { ImageSlot } from '@/components/ImageSlot';
import { SummitBookButton } from './SummitBookButton';
import { config } from '@/lib/config';
import {
  bookHref,
  business,
  contact,
  episodes,
  heroContent,
  heroPoints,
  podcast,
  processSteps,
  stats,
  telHref,
  testimonials,
} from '@/lib/site';

export function SummitHome() {
  const hero = heroContent();
  const points = heroPoints();
  const s = stats();
  const steps = processSteps();
  const quotes = testimonials();
  const pod = podcast();
  const eps = episodes();
  const customer = config.audience?.customerDescription?.trim();
  const tel = telHref(contact.phone);
  const book = bookHref();
  const bookExternal = book.startsWith('http');

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(58rem 40rem at 78% -12%, color-mix(in srgb, var(--brand-primary) 22%, transparent), transparent 60%)',
          }}
        />
        <div className="container-page grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="animate-fade-up">
            {business.tagline?.trim() ? <p className="eyebrow mb-5">{business.tagline}</p> : null}
            <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{hero.headline}</h1>
            {hero.subhead ? <p className="mt-6 max-w-xl text-lg text-ink-muted">{hero.subhead}</p> : null}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <SummitBookButton className="!px-7 !py-3.5 text-base" />
              {tel ? (
                <a href={tel} className="text-sm font-medium text-ink-muted hover:text-ink">
                  or call {contact.phone}
                </a>
              ) : null}
            </div>
            {points.length ? (
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-muted">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    {p}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <div>
            <ImageSlot src={hero.image} alt={hero.imageAlt} ratio="4/5" priority />
          </div>
        </div>
      </section>

      {/* Results / stats */}
      {s.length ? (
        <section id="results" className="scroll-mt-24 border-y border-line bg-[var(--surface-raised)]">
          <div className="container-page py-14">
            <div className="grid gap-8 sm:grid-cols-3">
              {s.map((st) => (
                <div key={st.label} className="text-center sm:text-left">
                  <p className="font-display text-4xl font-extrabold text-primary sm:text-5xl">{st.value}</p>
                  <p className="mt-2 text-sm text-ink-muted">{st.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Who it's for */}
      {customer ? (
        <section className="section">
          <div className="container-page">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-4">Who it&apos;s for</p>
              <p className="text-2xl leading-relaxed sm:text-3xl">{customer}</p>
            </div>
          </div>
        </section>
      ) : null}

      {/* Program / how it works */}
      {steps.length ? (
        <section className="section border-t border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">How it works</p>
              <h2 className="text-3xl sm:text-4xl">A clear path to more profit</h2>
            </div>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st, i) => (
                <li key={st.title}>
                  <span className="font-display text-4xl font-extrabold text-primary opacity-40">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 text-xl">{st.title}</h3>
                  {st.description ? (
                    <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">{st.description}</p>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      {/* Podcast */}
      {pod.title?.trim() || eps.length ? (
        <section id="podcast" className="section scroll-mt-24 border-t border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">The podcast</p>
              <h2 className="text-3xl sm:text-4xl">{pod.title?.trim() || 'The podcast'}</h2>
              {pod.blurb?.trim() ? <p className="mt-4 text-lg text-ink-muted">{pod.blurb}</p> : null}
            </div>
            {eps.length ? (
              <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {eps.map((e, i) => (
                  <li key={i} className="rounded-card border border-line bg-[var(--surface-raised)] p-5">
                    <p className="font-semibold text-ink">{e.title}</p>
                    {e.blurb?.trim() ? <p className="mt-2 text-sm text-ink-muted">{e.blurb}</p> : null}
                    {e.url?.trim() ? (
                      <a href={e.url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-primary hover:underline">
                        Listen →
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            ) : null}
            {pod.url?.trim() ? (
              <div className="mt-8">
                <a href={pod.url} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                  All episodes →
                </a>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* Testimonials */}
      {quotes.length ? (
        <section className="section border-t border-line">
          <div className="container-page">
            <div className="max-w-2xl">
              <p className="eyebrow mb-4">Results</p>
              <h2 className="text-3xl sm:text-4xl">Landscapers who grew</h2>
            </div>
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {quotes.map((t, i) => (
                <li key={i} className="rounded-card border border-line bg-[var(--surface-raised)] p-6">
                  <blockquote className="text-[0.98rem] leading-relaxed text-ink">“{t.quote}”</blockquote>
                  {t.author || t.detail ? (
                    <figcaption className="mt-5 border-t border-line pt-4 text-sm">
                      {t.author ? <span className="font-semibold text-ink">{t.author}</span> : null}
                      {t.detail ? <span className="block text-ink-subtle">{t.detail}</span> : null}
                    </figcaption>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* CTA band */}
      <section
        className="section"
        style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--brand-primary-fg)' }}
      >
        <div className="container-page text-center">
          <h2 className="mx-auto max-w-2xl text-3xl sm:text-4xl lg:text-5xl" style={{ color: 'var(--brand-primary-fg)' }}>
            Ready to sell more?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">
            Book a call and let&apos;s map the fastest path to seven figures.
          </p>
          <div className="mt-8 flex justify-center">
            <a
              href={book}
              {...(bookExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="inline-flex items-center rounded-control bg-[var(--surface)] px-7 py-3.5 font-semibold text-ink transition hover:opacity-90"
            >
              Book a time to talk
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
