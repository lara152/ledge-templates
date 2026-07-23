import { MeridianPageHeader } from './MeridianPageHeader';
import { MeridianCtaBand } from './MeridianCtaBand';
import { processSteps, trust } from '@/lib/site';

function TrustCol({ title, items }: { title: string; items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2 text-ink-muted">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}

export function MeridianProcess() {
  const steps = processSteps();
  const t = trust();
  const hasTrust = Boolean(t.awards?.length || t.certifications?.length || t.press?.length);

  return (
    <>
      <MeridianPageHeader eyebrow="How we work" title="A measured, full-service process" />
      <section className="section">
        <div className="container-page">
          <ol className="border-y border-line">
            {steps.map((s, i) => (
              <li
                key={s.title}
                className="grid gap-4 border-b border-line py-8 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-12"
              >
                <span className="font-display text-4xl text-primary opacity-50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-2xl">{s.title}</h3>
                  {s.description ? (
                    <p className="mt-2 text-lg leading-relaxed text-ink-muted">{s.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>

          {hasTrust ? (
            <div className="mt-20 grid gap-10 sm:grid-cols-3">
              <TrustCol title="Recognition" items={t.awards} />
              <TrustCol title="Credentials" items={t.certifications} />
              <TrustCol title="Featured in" items={t.press} />
            </div>
          ) : null}
        </div>
      </section>
      <MeridianCtaBand />
    </>
  );
}
