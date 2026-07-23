import Link from 'next/link';
import { MobileNav } from '@/components/MobileNav';
import type { NavItem } from '@/lib/site';
import { areas, beforeAfterItems, business, plans, reviews, services } from '@/lib/site';
import { GreenLeafPhoneButton } from './GreenLeafPhoneButton';

function greenleafNav(): NavItem[] {
  const items: NavItem[] = [];
  if (services().length) items.push({ label: 'Services', href: '/services/' });
  if (plans().length) items.push({ label: 'Pricing', href: '/pricing/' });
  if (beforeAfterItems().length) items.push({ label: 'Work', href: '/portfolio/' });
  if (reviews().length) items.push({ label: 'Reviews', href: '/reviews/' });
  if (areas().length) items.push({ label: 'Areas', href: '/areas/' });
  return items;
}

export function GreenLeafHeader() {
  const items = greenleafNav();
  const [first, ...rest] = business.name.split(' ');

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--surface)_95%,transparent)] backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="text-xl font-extrabold tracking-tight">
          <span className="text-primary">{first}</span>
          {rest.length ? <span className="text-ink"> {rest.join(' ')}</span> : null}
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-ink-muted transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <GreenLeafPhoneButton variant="solid" label="Call" className="!px-3.5 !py-2 text-sm md:hidden" />
          <GreenLeafPhoneButton variant="inline" className="hidden md:inline-flex" />
          <Link
            href="/contact/"
            className="hidden rounded-control bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-95 md:inline-flex"
          >
            Free estimate
          </Link>
          <MobileNav items={[...items, { label: 'Contact', href: '/contact/' }]} />
        </div>
      </div>
    </header>
  );
}
