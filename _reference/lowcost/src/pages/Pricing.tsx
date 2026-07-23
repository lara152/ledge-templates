import { Link } from 'react-router-dom';
import { Container, Section, cn } from '@ledge/ui';
import { customQuote, plans } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { PhoneButton } from '@/components/PhoneButton';

export default function Pricing() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Simple, upfront pricing"
        intro="Pick a maintenance plan or get a custom quote for bigger projects. No contracts — cancel anytime."
      />
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  'flex flex-col rounded-card border bg-surface p-7 shadow-soft',
                  plan.highlighted ? 'border-brand ring-2 ring-brand' : 'border-line',
                )}
              >
                {plan.highlighted && (
                  <span className="mb-3 inline-flex w-fit rounded-pill bg-brand px-3 py-1 text-xs font-bold text-brand-fg">
                    Most popular
                  </span>
                )}
                <h3 className="text-xl">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.blurb}</p>
                <p className="mt-4">
                  <span className="text-4xl font-extrabold text-ink">{plan.price}</span>
                  <span className="text-muted">{plan.cadence}</span>
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-brand-fg">
                        ✓
                      </span>
                      <span className="text-sm">{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className={cn(
                    'mt-7 rounded-control px-5 py-3 text-center font-semibold transition',
                    plan.highlighted
                      ? 'bg-accent text-accent-fg hover:brightness-95'
                      : 'border border-brand text-brand hover:bg-brand/5',
                  )}
                >
                  Get started
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col items-center gap-5 rounded-card border border-line bg-surface-2 p-8 text-center sm:flex-row sm:justify-between sm:text-left">
            <div>
              <h3 className="text-xl">{customQuote.title}</h3>
              <p className="mt-1 max-w-xl text-muted">{customQuote.blurb}</p>
            </div>
            <div className="flex shrink-0 flex-wrap justify-center gap-3">
              <PhoneButton variant="outline" />
              <Link
                to="/contact"
                className="inline-flex rounded-control bg-accent px-5 py-3 font-semibold text-accent-fg hover:brightness-95"
              >
                Get a custom quote
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
