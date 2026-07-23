import { SectionHeader } from './SectionHeader';
import { ChevronDownIcon } from './icons';
import { getFaqs } from '@/lib/site';

/**
 * FAQ built from the same answered questions that feed the FAQPage JSON-LD, so the
 * visible text matches the schema exactly. Uses native <details> — zero JS, fully
 * keyboard-accessible.
 */
export function Faq() {
  const faqs = getFaqs();
  if (faqs.length === 0) return null;

  return (
    <section id="faq" className="section" style={{ backgroundColor: 'var(--surface-sunken)' }}>
      <div className="container-page">
        <SectionHeader
          eyebrow="Questions, answered"
          title="Answers to what customers ask most"
        />

        <div className="mt-10 divide-y overflow-hidden rounded-card border bg-[var(--surface-raised)]">
          {faqs.map((f, i) => (
            <details key={i} className="group px-6 open:bg-[var(--surface)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left">
                <span className="font-display text-lg font-medium text-ink">{f.question}</span>
                <ChevronDownIcon
                  width={22}
                  height={22}
                  className="shrink-0 text-ink-subtle transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <div className="-mt-1 max-w-prose pb-6 text-[0.98rem] leading-relaxed text-ink-muted">
                {f.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
