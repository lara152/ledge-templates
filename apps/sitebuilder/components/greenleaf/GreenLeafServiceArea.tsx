import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { GreenLeafQuickForm } from './GreenLeafQuickForm';
import { GreenLeafServiceCard } from './GreenLeafServiceCard';
import { services } from '@/lib/site';
import type { Area } from '@/lib/types';

export function GreenLeafServiceArea({ area }: { area: Area }) {
  const svc = services().slice(0, 4);
  return (
    <>
      <GreenLeafPageHeader
        eyebrow={`Serving ${area.city}`}
        title={`Lawn care & landscaping in ${area.city}`}
        intro={area.blurb}
      />
      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            {area.neighborhoods?.length ? (
              <>
                <h2 className="text-2xl">Neighborhoods we serve in {area.city}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {area.neighborhoods.map((n) => (
                    <li key={n} className="rounded-pill border border-line px-3 py-1 text-sm text-ink-muted">
                      {n}
                    </li>
                  ))}
                </ul>
              </>
            ) : null}

            {svc.length ? (
              <>
                <h2 className="mt-12 text-2xl">Popular services in {area.city}</h2>
                <div className="mt-5 grid gap-6 sm:grid-cols-2">
                  {svc.map((s) => (
                    <GreenLeafServiceCard key={s.slug || s.name} service={s} />
                  ))}
                </div>
              </>
            ) : null}
          </div>
          <div className="lg:pt-1">
            <GreenLeafQuickForm title={`Free estimate in ${area.city}`} />
          </div>
        </div>
      </section>
    </>
  );
}
