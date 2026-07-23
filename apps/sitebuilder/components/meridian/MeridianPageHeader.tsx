/** Sub-page header for the meridian look (the header is sticky/in-flow, so normal top spacing). */
export function MeridianPageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pt-16 sm:pt-24">
      <div className="container-page">
        <div className="max-w-3xl animate-fade-up">
          {eyebrow ? <p className="eyebrow mb-5">{eyebrow}</p> : null}
          <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro ? <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
        </div>
      </div>
    </header>
  );
}
