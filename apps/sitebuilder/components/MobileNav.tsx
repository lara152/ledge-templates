'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { NavItem } from '@/lib/site';
import { MenuIcon, CloseIcon } from './icons';

/**
 * The one small piece of client JS in the site: an accessible mobile menu toggle
 * (aria-expanded, Escape to close). Everything else renders statically.
 */
export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-control text-ink"
      >
        {open ? <MenuIcon width={22} height={22} /> : <MenuIcon width={22} height={22} />}
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-40"
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false);
          }}
        >
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-[rgba(10,16,24,0.45)]"
            onClick={() => setOpen(false)}
          />
          <nav
            id="mobile-menu"
            className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col gap-1 bg-[var(--surface)] p-6 shadow-lift"
          >
            <div className="mb-4 flex justify-end">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-control"
              >
                <CloseIcon width={22} height={22} />
              </button>
            </div>
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-control px-3 py-3 text-lg font-medium text-ink hover:bg-[var(--surface-sunken)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
