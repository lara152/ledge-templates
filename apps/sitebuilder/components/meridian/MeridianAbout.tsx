import { ImageSlot } from '@/components/ImageSlot';
import { MeridianPageHeader } from './MeridianPageHeader';
import { MeridianCtaBand } from './MeridianCtaBand';
import { aboutSection, business, team, trust } from '@/lib/site';

export function MeridianAbout() {
  const about = aboutSection();
  const members = team();
  const t = trust();
  const heading = about.heading?.trim() || 'A small studio, by intent';
  const body = about.body?.trim() || business.oneLineDescription?.trim() || '';

  return (
    <>
      <MeridianPageHeader eyebrow="The studio" title={`About ${business.name}`} />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <ImageSlot
              src={about.image}
              alt={about.imageAlt || `The team behind ${business.name}`}
              ratio="4/5"
            />
            <div>
              <h2 className="text-3xl sm:text-4xl">{heading}</h2>
              {body ? <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">{body}</p> : null}
              {t.certifications?.length ? (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-t border-line pt-6 text-sm text-ink-muted">
                  {t.certifications.map((c) => (
                    <span key={c}>{c}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {members.length ? (
            <div className="mt-24">
              <p className="eyebrow mb-8">The team</p>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {members.map((m) => (
                  <div key={m.name}>
                    <ImageSlot src={m.image} alt={m.name} ratio="4/5" />
                    <p className="mt-4 text-xl">{m.name}</p>
                    {m.role ? <p className="text-sm text-ink-muted">{m.role}</p> : null}
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>
      <MeridianCtaBand />
    </>
  );
}
