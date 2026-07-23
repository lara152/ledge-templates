import Link from 'next/link';
import { ArrowRightIcon } from '@/components/icons';
import { services } from '@/lib/site';

/** Fallback template photo when a service has no image of its own. */
function serviceImage(image: string | undefined, i: number): string {
  return image?.trim() || `/studio/gallery-${(i % 4) + 1}.svg`;
}

/**
 * Image-forward service/package cards. On the home page it shows the first three;
 * `full` shows every service (used on /services).
 */
export function StudioServices({
  eyebrow = 'What we offer',
  title,
  intro,
  full = false,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  full?: boolean;
}) {
  const list = services();
  if (list.length === 0) return null;
  const shown = full ? list : list.slice(0, 3);

  return (
    <section id="services" className="section" style={{ backgroundColor: 'var(--surface-sunken)' }}>
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">{eyebrow}</p>
          <h2 className="text-3xl sm:text-4xl">{title}</h2>
          {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((s, i) => (
            <li
              key={s.name}
              className="group flex flex-col overflow-hidden rounded-card border border-[var(--line)] bg-[var(--surface-raised)] shadow-soft transition-shadow hover:shadow-lift"
            >
              <div className="overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={serviceImage(s.image, i)}
                  alt={s.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
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
              </div>
            </li>
          ))}
        </ul>

        {!full && list.length > shown.length ? (
          <div className="mt-10">
            <Link href="/services/" className="link-underline inline-flex items-center gap-1.5">
              View all services
              <ArrowRightIcon width={17} height={17} />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
