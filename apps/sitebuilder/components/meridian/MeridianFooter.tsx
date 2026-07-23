import Link from 'next/link';
import {
  business,
  contact,
  lastUpdated,
  mailtoHref,
  processSteps,
  projects,
  servicePhases,
  services,
  socialLinks,
  telHref,
} from '@/lib/site';

function socialLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const name = host.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Social';
  }
}

export function MeridianFooter() {
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const socials = socialLinks();
  const year = lastUpdated().iso.slice(0, 4);

  const links: { label: string; href: string }[] = [];
  if (projects().length) links.push({ label: 'Portfolio', href: '/portfolio/' });
  if (services().length || servicePhases().length) links.push({ label: 'Services', href: '/services/' });
  if (processSteps().length) links.push({ label: 'Process', href: '/process/' });
  links.push({ label: 'Studio', href: '/about/' });
  links.push({ label: 'Contact', href: '/contact/' });

  return (
    <footer className="border-t border-line bg-[var(--surface-raised)]">
      <div className="container-page section !py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.22em]">{business.name.toUpperCase()}</p>
            {business.tagline?.trim() ? (
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-muted">
                {business.tagline.trim()}
                {contact.serviceArea?.trim() ? ` · ${contact.serviceArea.trim()}` : ''}
              </p>
            ) : null}
          </div>

          <div>
            <p className="eyebrow mb-4">Explore</p>
            <ul className="space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-ink-muted transition-colors hover:text-ink">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow mb-4">Studio</p>
            <ul className="space-y-3 text-sm text-ink-muted">
              {mail ? (
                <li>
                  <a href={mail} className="transition-colors hover:text-ink">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {tel ? (
                <li>
                  <a href={tel} className="transition-colors hover:text-ink">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {socials.map((s) => (
                <li key={s}>
                  <a href={s} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">
                    {socialLabel(s)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-line pt-6 text-xs text-ink-subtle">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
