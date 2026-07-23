import { CheckIcon } from '@/components/icons';
import { aboutSection, business, contact, credentials } from '@/lib/site';
import { config } from '@/lib/config';

/** About-page body for the studio template: story + photo, credentials, and a stats aside. */
export function StudioAbout() {
  const about = aboutSection();
  const creds = credentials();
  const customer = config.audience?.customerDescription?.trim();
  const established = business.yearEstablished?.trim();
  const reviewCount = config.proof?.reviewCount?.trim();
  const area = contact.serviceArea?.trim();

  const heading = about.heading?.trim() || 'Design-led, build-ready';
  const body =
    about.body?.trim() ||
    customer ||
    business.oneLineDescription?.trim() ||
    `${business.name} is a landscape design and build studio. We start with how you want to use your space, translate it into a considered plan, and see it through to a garden that gets better every year.`;
  const image = about.image?.trim() || '/studio/about.svg';

  const stats = [
    established ? { label: 'Designing since', value: established } : null,
    reviewCount ? { label: 'Clients served', value: reviewCount } : null,
    area ? { label: 'Service area', value: area } : null,
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <section className="section">
      <div className="container-page grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="overflow-hidden rounded-card border border-[var(--line)] shadow-lift">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={about.imageAlt?.trim() || `The team behind ${business.name}`}
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div>
          <h2 className="text-3xl sm:text-4xl">{heading}</h2>
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">{body}</p>

          {creds.length ? (
            <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {creds.map((c) => (
                <li key={c} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full"
                    style={{ backgroundColor: 'var(--brand-primary-soft)', color: 'var(--brand-primary)' }}
                  >
                    <CheckIcon width={15} height={15} />
                  </span>
                  <span className="text-ink">{c}</span>
                </li>
              ))}
            </ul>
          ) : null}

          {stats.length ? (
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-8">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-ink-subtle">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl font-semibold text-ink">{s.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </section>
  );
}
