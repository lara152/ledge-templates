import { Container, Section } from '@ledge/ui';
import { process, trust } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

function TrustCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="eyebrow mb-4">{title}</p>
      <ul className="space-y-2 text-muted">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Process() {
  return (
    <>
      <PageHeader eyebrow={process.eyebrow} title={process.headline} />
      <Section>
        <Container>
          <ol className="border-y border-line">
            {process.steps.map((s, i) => (
              <li
                key={s.title}
                className="grid gap-4 border-b border-line py-8 last:border-b-0 sm:grid-cols-[auto_1fr] sm:gap-12"
              >
                <span className="font-display text-4xl text-brand/50">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="max-w-2xl">
                  <h3 className="text-2xl">{s.title}</h3>
                  <p className="mt-2 text-lg leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-20 grid gap-10 sm:grid-cols-3">
            <TrustCol title="Recognition" items={trust.awards} />
            <TrustCol title="Credentials" items={trust.certifications} />
            <TrustCol title="Featured in" items={trust.press} />
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
