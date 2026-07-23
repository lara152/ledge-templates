import { processSteps } from '@/lib/site';
import { config } from '@/lib/config';

/** "How it works" — numbered steps. Renders nothing if no steps are configured. */
export function StudioProcess() {
  const steps = processSteps();
  if (steps.length === 0) return null;

  const heading = config.process?.heading?.trim() || 'How it works';
  const subhead = config.process?.subhead?.trim();

  return (
    <section id="process" className="section scroll-mt-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">The process</p>
          <h2 className="text-3xl sm:text-4xl">{heading}</h2>
          {subhead ? <p className="mt-4 text-lg leading-relaxed text-ink-muted">{subhead}</p> : null}
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <li key={step.title} className="relative">
              <span
                className="font-display text-5xl font-semibold leading-none"
                style={{ color: 'var(--brand-primary)', opacity: 0.28 }}
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-4 text-xl">{step.title}</h3>
              {step.description?.trim() ? (
                <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-muted">
                  {step.description.trim()}
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
