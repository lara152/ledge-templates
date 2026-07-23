import { QuoteIcon, StarIcon } from '@/components/icons';
import { testimonials } from '@/lib/site';
import { config } from '@/lib/config';

/** Client love — a rating line plus quote cards. */
export function StudioTestimonials() {
  const quotes = testimonials();
  const reviewCount = config.proof?.reviewCount?.trim();
  if (quotes.length === 0 && !reviewCount) return null;

  return (
    <section className="section">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Client love</p>
          <h2 className="text-3xl sm:text-4xl">Neighbors who&apos;d have us back</h2>
          {reviewCount ? (
            <p className="mt-4 flex items-center gap-2 text-lg text-ink-muted">
              <span className="flex" style={{ color: 'var(--brand-accent)' }} aria-hidden="true">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} width={18} height={18} />
                ))}
              </span>
              Loved by {reviewCount} clients
            </p>
          ) : null}
        </div>

        {quotes.length ? (
          <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((t, i) => (
              <li
                key={i}
                className="flex flex-col rounded-card border border-[var(--line)] bg-[var(--surface-raised)] p-6 shadow-soft"
              >
                <QuoteIcon width={28} height={28} style={{ color: 'var(--brand-primary)' }} />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                {(t.author || t.detail) && (
                  <figcaption className="mt-5 border-t border-[var(--line)] pt-4 text-sm">
                    {t.author ? <span className="font-semibold text-ink">{t.author}</span> : null}
                    {t.detail ? <span className="block text-ink-subtle">{t.detail}</span> : null}
                  </figcaption>
                )}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
