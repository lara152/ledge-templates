import { ImageSlot } from '@/components/ImageSlot';
import { MeridianPageHeader } from './MeridianPageHeader';
import { MeridianCtaBand } from './MeridianCtaBand';
import { business, servicePhases } from '@/lib/site';

export function MeridianServices() {
  const phases = servicePhases();

  return (
    <>
      <MeridianPageHeader
        eyebrow="What we do"
        title="One studio, from first sketch to final stone"
        intro={`${business.name} is a design-build practice — the team that draws your garden is the team that builds it, so intent survives contact with the ground.`}
      />
      <section className="section">
        <div className="container-page">
          <div className="space-y-20 sm:space-y-28">
            {phases.map((phase, i) => {
              const flip = i % 2 === 1;
              return (
                <div key={phase.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                  <ImageSlot src={phase.image} alt={phase.title} ratio="4/3" className={flip ? 'lg:order-2' : ''} />
                  <div className={flip ? 'lg:order-1' : ''}>
                    <span className="font-display text-5xl text-primary opacity-40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-3 text-3xl sm:text-4xl">{phase.title}</h3>
                    {phase.body ? (
                      <p className="mt-5 text-lg leading-relaxed text-ink-muted">{phase.body}</p>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <MeridianCtaBand />
    </>
  );
}
