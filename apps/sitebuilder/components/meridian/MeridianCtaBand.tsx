import { PrimaryCta } from '@/components/Cta';

/** Closing conversion band — "Schedule a design consultation". No open pricing. */
export function MeridianCtaBand() {
  return (
    <section className="section border-t border-line">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-5">Begin</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl">Schedule a design consultation</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            We take on a limited number of projects each year. Tell us about your property and we&apos;ll
            arrange a private consultation.
          </p>
          <div className="mt-9">
            <PrimaryCta variant="primary" long className="text-base" />
          </div>
        </div>
      </div>
    </section>
  );
}
