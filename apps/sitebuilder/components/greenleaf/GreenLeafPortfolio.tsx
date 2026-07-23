import { BeforeAfter } from '@/components/BeforeAfter';
import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { beforeAfterItems } from '@/lib/site';

export function GreenLeafPortfolio() {
  const items = beforeAfterItems();
  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Our work"
        title="Before &amp; after"
        intro="Real jobs across the area. Drag the slider to see the transformation."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-2">
            {items.map((item, i) => (
              <div key={i}>
                <BeforeAfter before={item.before} after={item.after} ratio="3/2" />
                <div className="mt-3">
                  {item.scope ? <p className="font-semibold text-ink">{item.scope}</p> : null}
                  <p className="text-sm text-ink-muted">{[item.city, item.duration].filter(Boolean).join(' · ')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
