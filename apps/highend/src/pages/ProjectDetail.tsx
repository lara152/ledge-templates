import { Link, useParams } from 'react-router-dom';
import { Container, Gallery, ImageSlot, Section, buttonClasses } from '@ledge/ui';
import { projects } from '@/data/content';
import { CtaBand } from '@/components/CtaBand';

export default function ProjectDetail() {
  const { slug } = useParams();
  const idx = projects.findIndex((p) => p.slug === slug);
  const project = projects[idx];

  if (!project) {
    return (
      <div className="pt-40 sm:pt-48">
        <Container>
          <p className="eyebrow mb-4">Not found</p>
          <h1 className="text-4xl">That project isn&apos;t here.</h1>
          <Link to="/portfolio" className="mt-6 inline-block text-brand underline-offset-4 hover:underline">
            ← Back to the portfolio
          </Link>
        </Container>
      </div>
    );
  }

  const next = projects[(idx + 1) % projects.length];

  return (
    <>
      <section className="pt-16 sm:pt-20">
        <ImageSlot image={project.cover} ratio="21/9" priority rounded={false} className="w-full" />
      </section>

      <Section>
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-4">
                {project.neighborhood} · {project.year}
              </p>
              <h1 className="text-4xl sm:text-5xl">{project.name}</h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{project.summary}</p>
            </div>
            <aside>
              <dl className="space-y-5 border-t border-line pt-6 text-sm">
                <div className="flex justify-between gap-6">
                  <dt className="text-muted">Location</dt>
                  <dd className="text-right">{project.neighborhood}</dd>
                </div>
                <div className="flex justify-between gap-6">
                  <dt className="text-muted">Year</dt>
                  <dd>{project.year}</dd>
                </div>
                {project.budget && (
                  <div className="flex justify-between gap-6">
                    <dt className="text-muted">Scope of investment</dt>
                    <dd className="text-right">{project.budget}</dd>
                  </div>
                )}
                <div className="flex justify-between gap-6">
                  <dt className="text-muted">Services</dt>
                  <dd className="text-right">{project.scope.join(', ')}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-14">
            <Gallery images={project.gallery} columns={3} ratio="4/3" />
          </div>
        </Container>
      </Section>

      <Section className="border-t border-line">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-3">Next project</p>
              <Link to={`/portfolio/${next.slug}`} className="text-3xl transition-colors hover:text-brand sm:text-4xl">
                {next.name} →
              </Link>
            </div>
            <Link to="/portfolio" className={buttonClasses('outline', 'md')}>
              All projects
            </Link>
          </div>
        </Container>
      </Section>

      <CtaBand />
    </>
  );
}
