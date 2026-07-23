/** Editorial section heading (eyebrow + serif title + optional intro). */
export function MeridianSectionHead({
  eyebrow,
  title,
  intro,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}>
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl">{title}</h2>
      {intro ? <p className="mt-5 text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
    </div>
  );
}
