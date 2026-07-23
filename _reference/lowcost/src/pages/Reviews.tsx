import { Container, Section } from '@ledge/ui';
import { reviews, reviewsSummary } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { ReviewStars } from '@/components/ReviewStars';

export default function Reviews() {
  return (
    <>
      <PageHeader
        eyebrow="Reviews"
        title={`${reviewsSummary.rating}★ from ${reviewsSummary.count} customers`}
        intro="We earn our reviews one yard at a time. Here's what neighbors across the Austin area say."
      />
      <Section>
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((r, i) => (
              <div key={i} className="flex flex-col rounded-card border border-line bg-surface p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <ReviewStars rating={r.rating} />
                  <span className="text-xs font-medium text-muted">{r.source}</span>
                </div>
                <p className="mt-3 flex-1 text-[0.98rem] leading-relaxed text-ink">“{r.text}”</p>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {r.name} <span className="font-normal text-muted">· {r.city}</span>
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
