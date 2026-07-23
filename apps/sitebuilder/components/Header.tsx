import Link from 'next/link';
import { Logo } from './Logo';
import { PrimaryCta } from './Cta';
import { MobileNav } from './MobileNav';
import { navItems } from '@/lib/site';

export function Header() {
  const items = navItems();

  return (
    <header className="sticky top-0 z-30 border-b bg-[color-mix(in_srgb,var(--surface)_86%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-control px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink hover:bg-[var(--surface-sunken)]"
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
