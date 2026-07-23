export function GreenLeafPageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="border-b border-line bg-surface-sunken">
      <div className="container-page py-14 sm:py-16">
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="text-4xl sm:text-5xl">{title}</h1>
        {intro ? <p className="mt-4 max-w-2xl text-lg text-ink-muted">{intro}</p> : null}
      </div>
    </section>
  );
}
