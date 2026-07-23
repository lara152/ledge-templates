import { PrimaryCta } from '@/components/Cta';
import { CheckIcon } from '@/components/icons';
import { business, credentials } from '@/lib/site';
import { config } from '@/lib/config';

/** Value/approach block — a warm intro paragraph beside a project photo. */
export function StudioIntro() {
  const creds = credentials().slice(0, 4);
  const customer = config.audience?.customerDescription?.trim();
  const body =
    customer ||
    business.oneLineDescription?.trim() ||
    `${business.name} designs and builds outdoor spaces made for how you actually live — considered planting, materials that age well, and a plan you can build with confidence.`;

  return (
    <section className="section">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-4">Our approach</p>
          <h2 className="text-3xl sm:text-4xl">A garden designed around how you live</h2>
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

          <div className="mt-9">
            <PrimaryCta variant="primary" long className="text-base" />
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="overflow-hidden rounded-card border border-[var(--line)] shadow-lift">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/studio/intro.svg"
              alt={`A garden designed and built by ${business.name}`}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
