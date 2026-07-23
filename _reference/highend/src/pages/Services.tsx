import { Container, ImageSlot, Section } from '@ledge/ui';
import { servicePhases, servicesIntro } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

export default function Services() {
  return (
    <>
      <PageHeader
        eyebrow={servicesIntro.eyebrow}
        title={servicesIntro.headline}
        intro={servicesIntro.body}
      />
      <Section>
        <Container>
          <div className="space-y-20 sm:space-y-28">
            {servicePhases.map((phase, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={phase.n} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <ImageSlot image={phase.image} ratio="4/3" className={flip ? 'lg:order-2' : ''} />
                  <div className={flip ? 'lg:order-1' : ''}>
                    <span className="font-display text-5xl text-brand/40">{phase.n}</span>
                    <h3 className="mt-3 text-3xl sm:text-4xl">{phase.title}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-muted">{phase.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
