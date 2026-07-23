export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  as = 'h2',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
  as?: 'h1' | 'h2';
}) {
  const Heading = as;
  return (
    <div className={align === 'center' ? 'mx-auto max-w-prose text-center' : 'max-w-prose'}>
      {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
      <Heading className="text-3xl sm:text-4xl">{title}</Heading>
      {intro ? <p className="mt-4 text-lg leading-relaxed text-ink-muted">{intro}</p> : null}
    </div>
  );
}
