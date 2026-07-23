import Link from 'next/link';
import { ImageSlot } from '@/components/ImageSlot';
import { Gallery } from '@/components/Gallery';
import { MeridianCtaBand } from './MeridianCtaBand';
import type { Project } from '@/lib/types';

export function MeridianProjectDetail({ project, next }: { project: Project; next?: Project }) {
  const meta = [project.neighborhood, project.year].filter(Boolean).join(' · ');

  return (
    <>
      <section className="pt-16 sm:pt-20">
        <ImageSlot
          src={project.cover.image}
          alt={project.cover.alt || project.name}
          ratio="21/9"
          priority
          rounded={false}
          className="w-full"
        />
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            <div>
              {meta ? <p className="eyebrow mb-4">{meta}</p> : null}
              <h1 className="text-4xl sm:text-5xl">{project.name}</h1>
              {project.summary ? (
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{project.summary}</p>
              ) : null}
            </div>
            <aside>
              <dl className="space-y-5 border-t border-line pt-6 text-sm">
                {project.neighborhood ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink-muted">Location</dt>
                    <dd className="text-right">{project.neighborhood}</dd>
                  </div>
                ) : null}
                {project.year ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink-muted">Year</dt>
                    <dd>{project.year}</dd>
                  </div>
                ) : null}
                {project.budget ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink-muted">Scope of investment</dt>
                    <dd className="text-right">{project.budget}</dd>
                  </div>
                ) : null}
                {project.scope?.length ? (
                  <div className="flex justify-between gap-6">
                    <dt className="text-ink-muted">Services</dt>
                    <dd className="text-right">{project.scope.join(', ')}</dd>
                  </div>
                ) : null}
              </dl>
            </aside>
          </div>

          {project.gallery?.length ? (
            <div className="mt-14">
              <Gallery items={project.gallery} columns={3} ratio="4/3" />
            </div>
          ) : null}
        </div>
      </section>

      {next ? (
        <section className="section border-t border-line">
          <div className="container-page">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow mb-3">Next project</p>
                <Link
                  href={`/portfolio/${next.slug}/`}
                  className="text-3xl transition-colors hover:text-primary sm:text-4xl"
                >
                  {next.name} →
                </Link>
              </div>
              <Link href="/portfolio/" className="btn btn-outline">
                All projects
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      <MeridianCtaBand />
    </>
  );
}
