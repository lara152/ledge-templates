import Link from 'next/link';
import type { Crumb } from '@/lib/schema';

/**
 * Interior-page header with a visible breadcrumb trail. The crumbs passed here are
 * the same ones fed to breadcrumbSchema(), so visible === structured data.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden border-b">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(48rem 30rem at 88% -20%, var(--brand-primary-soft), transparent 60%)',
        }}
      />
      <div className="container-page py-14 sm:py-20">
        {crumbs && crumbs.length ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-subtle">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.path} className="flex items-center gap-1.5">
                    {last ? (
                      <span aria-current="page" className="text-ink-muted">
                        {c.name}
                      </span>
                    ) : (
                      <>
                        <Link href={c.path} className="hover:text-ink">
                          {c.name}
                        </Link>
                        <span aria-hidden="true">/</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h1 className="max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {intro ? (
          <p className="mt-5 max-w-prose text-lg leading-relaxed text-ink-muted">{intro}</p>
        ) : null}
      </div>
    </section>
  );
}
