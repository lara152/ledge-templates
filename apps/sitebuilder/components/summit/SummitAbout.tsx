import { ImageSlot } from '@/components/ImageSlot';
import { SummitBookButton } from './SummitBookButton';
import { aboutSection, business, stats } from '@/lib/site';

export function SummitAbout() {
  const about = aboutSection();
  const s = stats();
  const body = about.body?.trim() || business.oneLineDescription?.trim() || '';

  return (
    <>
      <header className="pt-20 sm:pt-24">
        <div className="container-page max-w-3xl">
          <p className="eyebrow mb-4">About</p>
          <h1 className="text-4xl sm:text-5xl">{about.heading?.trim() || `About ${business.name}`}</h1>
        </div>
      </header>
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageSlot src={about.image} alt={about.imageAlt || business.name} ratio="4/5" />
          <div>
            {body ? <p className="text-lg leading-relaxed text-ink-muted">{body}</p> : null}
            {s.length ? (
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-8">
                {s.map((st) => (
                  <div key={st.label}>
                    <dt className="sr-only">{st.label}</dt>
                    <dd className="font-display text-3xl font-extrabold text-primary">{st.value}</dd>
                    <p className="mt-1 text-xs text-ink-muted">{st.label}</p>
                  </div>
                ))}
              </dl>
            ) : null}
            <div className="mt-9">
              <SummitBookButton />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
