import { Container } from '@ledge/ui';

/** Cabecera de subpágina. Incluye padding superior para librar el nav fijo. */
export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="pt-32 sm:pt-40">
      <Container>
        <div className="max-w-3xl animate-fade-up">
          {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
          <h1 className="text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>}
        </div>
      </Container>
    </header>
  );
}
