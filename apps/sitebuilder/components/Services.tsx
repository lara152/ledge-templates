import { SectionHeader } from './SectionHeader';
import { services } from '@/lib/site';

/**
 * Services grid. Used on the home page (overview) and the /services page (full).
 * Answer-first: the section opens by naming exactly what the business offers.
 */
export function Services({
  eyebrow = 'What we do',
  title,
  intro,
  variant = 'overview',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  variant?: 'overview' | 'full';
}) {
  const list = services();
  if (list.length === 0) return null;

  return (
    <section id="services" className="section" style={{ backgroundColor: variant === 'overview' ? 'var(--surface-sunken)' : 'var(--surface)' }}>
      <div className="container-page">
        <SectionHeader eyebrow={eyebrow} title={title} intro={intro} />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((s, i) => (
            <li
              key={s.name}
              className="group flex flex-col rounded-card border bg-[var(--surface-raised)] p-6 shadow-soft transition-shadow hover:shadow-lift"
            >
              <span
                aria-hidden="true"
                className="mb-4 grid h-10 w-10 place-items-center rounded-control font-display text-sm font-semibold"
                style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl">{s.name}</h3>
              {s.description?.trim() ? (
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-ink-muted">
                  {s.description.trim()}
                </p>
              ) : null}
              {s.priceInfo?.trim() ? (
                <p
                  className="mt-4 inline-flex w-fit items-center rounded-pill px-3 py-1 text-xs font-semibold"
                  style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
                >
                  {s.priceInfo.trim()}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
