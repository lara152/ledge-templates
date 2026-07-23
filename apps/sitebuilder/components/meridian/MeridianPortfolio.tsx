import Link from 'next/link';
import { ImageSlot } from '@/components/ImageSlot';
import { MeridianPageHeader } from './MeridianPageHeader';
import { MeridianCtaBand } from './MeridianCtaBand';
import { contact, projects } from '@/lib/site';

export function MeridianPortfolio() {
  const list = projects();
  const area = contact.serviceArea?.trim();

  return (
    <>
      <MeridianPageHeader
        eyebrow="Portfolio"
        title="Selected work"
        intro={
          area
            ? `A limited number of bespoke residential landscapes across ${area}.`
            : 'A limited number of bespoke residential landscapes.'
        }
      />
      <section className="section">
        <div className="container-page">
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {list.map((p) => (
              <li key={p.slug}>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <ImageSlot
                    src={p.cover.image}
                    alt={p.cover.alt || p.name}
                    ratio="4/3"
                    imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-2xl">{p.name}</h3>
                      {p.neighborhood ? <p className="mt-1 text-sm text-ink-muted">{p.neighborhood}</p> : null}
                    </div>
                    {p.year ? <span className="shrink-0 text-sm text-ink-muted">{p.year}</span> : null}
                  </div>
                  {p.budget ? <p className="mt-2 text-sm text-primary">{p.budget}</p> : null}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <MeridianCtaBand />
    </>
  );
}
