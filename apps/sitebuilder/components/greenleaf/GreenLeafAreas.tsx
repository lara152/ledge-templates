import Link from 'next/link';
import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { areas } from '@/lib/site';

export function GreenLeafAreas() {
  const list = areas();
  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Service areas"
        title="Where we work"
        intro="Lawn care and landscaping across the area and surrounding cities."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((a) => (
              <Link
                key={a.slug}
                href={`/areas/${a.slug}/`}
                className="group rounded-card border border-line bg-surface p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <h3 className="text-xl transition-colors group-hover:text-primary">{a.city}</h3>
                {a.blurb ? <p className="mt-2 text-sm text-ink-muted">{a.blurb}</p> : null}
                <p className="mt-4 text-sm font-semibold text-primary">View {a.city} →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
