import { BeforeAfter, Container, Section } from '@ledge/ui';
import { beforeAfter } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';

export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Our work"
        title="Before &amp; after"
        intro="Real jobs across the Austin area. Drag the slider to see the transformation."
      />
      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            {beforeAfter.map((item, i) => (
              <div key={i}>
                <BeforeAfter before={item.before} after={item.after} ratio="3/2" />
                <div className="mt-3">
                  <p className="font-semibold text-ink">{item.scope}</p>
                  <p className="text-sm text-muted">
                    {item.city} · {item.duration}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
