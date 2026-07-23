import { SectionHeader } from './SectionHeader';
import { QuoteIcon, StarIcon } from './icons';
import { notableClients, testimonials } from '@/lib/site';
import { config } from '@/lib/config';

export function Proof() {
  const quotes = testimonials();
  const reviewCount = config.proof?.reviewCount?.trim();
  const clients = notableClients();

  if (quotes.length === 0 && !reviewCount && clients.length === 0) return null;

  return (
    <section id="proof" className="section">
      <div className="container-page">
        <SectionHeader
          eyebrow="Proof"
          title="Trusted by neighbors who don't leave reviews lightly"
          intro={
            reviewCount
              ? `${reviewCount} customers have trusted us with their homes — here's what a few of them said.`
              : undefined
          }
        />

        {quotes.length ? (
          <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {quotes.map((t, i) => (
              <li
                key={i}
                className="flex flex-col rounded-card border bg-[var(--surface-raised)] p-6 shadow-soft"
              >
                <QuoteIcon width={28} height={28} style={{ color: 'var(--brand-primary)' }} />
                <blockquote className="mt-4 flex-1 text-[0.98rem] leading-relaxed text-ink">
                  “{t.quote}”
                </blockquote>
                {(t.author || t.detail) && (
                  <figcaption className="mt-5 border-t pt-4 text-sm">
                    {t.author ? <span className="font-semibold text-ink">{t.author}</span> : null}
                    {t.detail ? <span className="block text-ink-subtle">{t.detail}</span> : null}
                  </figcaption>
                )}
              </li>
            ))}
          </ul>
        ) : null}

        {clients.length ? (
          <div className="mt-12">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-subtle">
              Trusted by
            </p>
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3">
              {clients.map((c) => (
                <li key={c} className="font-display text-lg font-medium text-ink-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}
