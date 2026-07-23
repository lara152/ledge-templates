import Link from 'next/link';
import { MobileNav } from '@/components/MobileNav';
import { PrimaryCta } from '@/components/Cta';
import type { NavItem } from '@/lib/site';
import { brand, business, processSteps, projects, servicePhases, services } from '@/lib/site';

/** Meridian nav — derived; leads with the portfolio, the way a studio would. */
function meridianNav(): NavItem[] {
  const items: NavItem[] = [];
  if (projects().length) items.push({ label: 'Portfolio', href: '/portfolio/' });
  if (services().length || servicePhases().length) items.push({ label: 'Services', href: '/services/' });
  if (processSteps().length) items.push({ label: 'Process', href: '/process/' });
  items.push({ label: 'Studio', href: '/about/' });
  items.push({ label: 'Contact', href: '/contact/' });
  return items;
}

export function MeridianHeader() {
  const items = meridianNav();
  const logo = brand.logoPath?.trim();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_80%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link href="/" className="flex items-center gap-2.5">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt={`${business.name} logo`} className="h-9 w-auto" />
          ) : (
            <span className="font-display text-xl tracking-[0.28em] text-ink">
              {business.name.toUpperCase()}
            </span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm tracking-wide text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PrimaryCta variant="outline" className="!px-4 !py-2.5 text-sm" />
          </div>
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
