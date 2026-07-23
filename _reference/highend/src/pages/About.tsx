import { Container, Grid, ImageSlot, Section } from '@ledge/ui';
import { studio, trust } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

export default function About() {
  return (
    <>
      <PageHeader eyebrow={studio.eyebrow} title={studio.headline} />
      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ImageSlot image={studio.portrait} ratio="4/5" />
            <div className="space-y-6">
              {studio.paragraphs.map((p, i) => (
                <p key={i} className="text-lg leading-relaxed text-muted">
                  {p}
                </p>
              ))}
              <div className="flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 text-sm text-muted">
                {trust.certifications.map((c) => (
                  <span key={c}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-24">
            <p className="eyebrow mb-8">The team</p>
            <Grid cols={3}>
              {studio.team.map((m) => (
                <div key={m.name}>
                  <ImageSlot image={m.image} ratio="4/5" />
                  <p className="mt-4 text-xl">{m.name}</p>
                  <p className="text-sm text-muted">{m.role}</p>
                </div>
              ))}
            </Grid>
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
