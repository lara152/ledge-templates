import Link from 'next/link';
import { MobileNav } from '@/components/MobileNav';
import { PrimaryCta } from '@/components/Cta';
import type { NavItem } from '@/lib/site';
import { brand, business, galleryItems, getFaqs, processSteps, services } from '@/lib/site';

/** Studio-template nav — derived, like the classic one, but leads with the visual sections. */
function studioNav(): NavItem[] {
  const items: NavItem[] = [];
  if (galleryItems().length) items.push({ label: 'Work', href: '/#portfolio' });
  if (processSteps().length) items.push({ label: 'Process', href: '/#process' });
  if (services().length) items.push({ label: 'Services', href: '/services/' });
  items.push({ label: 'About', href: '/about/' });
  if (getFaqs().length) items.push({ label: 'FAQ', href: '/#faq' });
  items.push({ label: 'Contact', href: '/contact/' });
  return items;
}

export function StudioHeader() {
  const items = studioNav();
  const logo = brand.logoPath?.trim();

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[color-mix(in_srgb,var(--surface)_90%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          {logo ? (
            <img src={logo} alt={`${business.name} logo`} className="h-9 w-auto" />
          ) : (
            <span className="font-display text-[1.4rem] font-semibold tracking-tight text-ink">
              {business.name}
            </span>
          )}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <PrimaryCta variant="primary" className="!px-4 !py-2.5 text-sm" />
          </div>
          <MobileNav items={items} />
        </div>
      </div>
    </header>
  );
}
