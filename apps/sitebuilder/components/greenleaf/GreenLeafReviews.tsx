import { GreenLeafPageHeader } from './GreenLeafPageHeader';
import { GreenLeafReviewStars } from './GreenLeafReviewStars';
import { reviews, reviewsSummary } from '@/lib/site';

export function GreenLeafReviews() {
  const list = reviews();
  const s = reviewsSummary();
  return (
    <>
      <GreenLeafPageHeader
        eyebrow="Reviews"
        title={s.rating ? `${s.rating}★${s.count ? ` from ${s.count} customers` : ''}` : 'What our customers say'}
        intro="We earn our reviews one yard at a time. Here's what neighbors across the area say."
      />
      <section className="section">
        <div className="container-page">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((r, i) => (
              <div key={i} className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <GreenLeafReviewStars rating={r.rating || 5} />
                  {r.source ? <span className="text-xs font-medium text-ink-subtle">{r.source}</span> : null}
                </div>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink">“{r.text}”</p>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {r.name}
                  {r.city ? <span className="font-normal text-ink-muted"> · {r.city}</span> : null}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
