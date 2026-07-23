import { Link } from 'react-router-dom';
import { Container } from '@ledge/ui';
import { nav, site } from '@/data/content';

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      <Container>
        <div className="grid gap-12 py-16 sm:py-20 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.2em]">{site.name.toUpperCase()}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {site.tagline}. {site.location}.
            </p>
            <p className="mt-6 text-sm text-muted">{site.projectsFrom}</p>
          </div>

          <div>
            <p className="eyebrow">Explore</p>
            <ul className="mt-4 space-y-3 text-sm">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="text-muted transition-colors hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow">Studio</p>
            <ul className="mt-4 space-y-3 text-sm text-muted">
              <li>
                <a href={`mailto:${site.email}`} className="transition-colors hover:text-ink">
                  {site.email}
                </a>
              </li>
              <li>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-ink">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noreferrer" className="transition-colors hover:text-ink">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-line py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {2026} {site.fullName}. All rights reserved.
          </p>
          <p>Licensed Landscape Architect · {site.location}</p>
        </div>
      </Container>
    </footer>
  );
}
