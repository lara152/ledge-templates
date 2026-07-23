/** Compact page header for studio sub-pages (Services / About / Contact). */
export function StudioPageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-[var(--line)]" style={{ backgroundColor: 'var(--surface-sunken)' }}>
      <div className="container-page py-16 sm:py-20">
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
      </div>
    </section>
  );
}
