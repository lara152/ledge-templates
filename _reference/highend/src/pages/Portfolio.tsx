import { Link } from 'react-router-dom';
import { Container, ImageSlot, Section } from '@ledge/ui';
import { projects } from '@/data/content';
import { PageHeader } from '@/components/PageHeader';
import { CtaBand } from '@/components/CtaBand';

export default function Portfolio() {
  return (
    <>
      <PageHeader
        eyebrow="Portfolio"
        title="Selected work"
        intro="A limited number of bespoke residential landscapes across Austin and the Texas Hill Country."
      />
      <Section>
        <Container>
          <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link to={`/portfolio/${p.slug}`} className="group block">
                  <ImageSlot
                    image={p.cover}
                    ratio="4/3"
                    imgClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                  <div className="mt-4 flex items-baseline justify-between gap-4">
                    <div>
                      <h3 className="text-2xl">{p.name}</h3>
                      <p className="mt-1 text-sm text-muted">{p.neighborhood}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted">{p.year}</span>
                  </div>
                  {p.budget && <p className="mt-2 text-sm text-brand">{p.budget}</p>}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <CtaBand />
    </>
  );
}
