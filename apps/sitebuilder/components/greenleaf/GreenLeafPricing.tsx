import Link from 'next/link';
import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';
import { customQuote, plans } from '@/lib/site';

export function GreenLeafPricing() {
  const list = plans();
  const cq = customQuote();

  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Pricing"
        title="Simple, upfront pricing"
        intro="Pick a maintenance plan or get a custom quote for bigger projects. No contracts — cancel anytime."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-3">
            {list.map((plan) => (
              <div
                key={plan.name}
                className={`flex flex-col rounded-card border bg-surface p-7 shadow-soft ${plan.highlighted ? 'border-primary ring-2 ring-primary' : 'border-line'}`}
              >
                {plan.highlighted ? (
                  <span className="mb-3 inline-flex w-fit rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-fg">
                    Most popular
                  </span>
                ) : null}
                <h3 className="text-xl">{plan.name}</h3>
                {plan.blurb ? <p className="mt-1 text-sm text-ink-muted">{plan.blurb}</p> : null}
                <p className="mt-4">
                  {plan.price ? <span className="text-4xl font-extrabold text-ink">{plan.price}</span> : null}
                  {plan.cadence ? <span className="text-ink-muted">{plan.cadence}</span> : null}
                </p>
                {plan.features?.length ? (
                  <ul className="mt-6 flex-1 space-y-2.5">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-xs text-primary-fg">
                          ✓
                        </span>
                        <span className="text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex-1" />
                )}
                <Link
                  href="/contact/"
                  className={`mt-7 rounded-control px-5 py-3 text-center font-semibold transition ${plan.highlighted ? 'bg-accent text-accent-fg hover:brightness-95' : 'border border-primary text-primary hover:bg-surface-sunken'}`}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>

          {cq.title || cq.blurb ? (
            <div className="mt-8 flex flex-col items-center gap-5 rounded-card border border-line bg-surface-sunken p-8 text-center sm:flex-row sm:justify-between sm:text-left">
              <div>
                <h3 className="text-xl">{cq.title || 'Bigger project?'}</h3>
                {cq.blurb ? <p className="mt-1 max-w-xl text-ink-muted">{cq.blurb}</p> : null}
              </div>
              <div className="flex shrink-0 flex-wrap justify-center gap-3">
                <GreenLeafPhoneButton variant="outline" />
                <Link
                  href="/contact/"
                  className="inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-accent-fg hover:brightness-95"
                >
                  Get a custom quote
                </Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  );
}
