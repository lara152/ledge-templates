import { Container } from '@ledge/ui';

/** Cabecera de subpágina (tema claro). El Nav es sticky en flujo, no hace falta padding extra. */
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
    <section className="border-b border-line bg-surface-2">
      <Container>
        <div className="py-14 sm:py-16">
          {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
          <h1 className="text-4xl sm:text-5xl">{title}</h1>
          {intro && <p className="mt-4 max-w-2xl text-lg text-muted">{intro}</p>}
        </div>
      </Container>
    </section>
  );
}
