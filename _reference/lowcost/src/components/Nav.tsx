import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, cn } from '@ledge/ui';
import { nav } from '@/data/content';
import { PhoneButton } from './PhoneButton';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link to="/" className="text-xl font-extrabold tracking-tight">
            <span className="text-brand">Green</span>
            <span className="text-ink">Leaf</span>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn('text-sm font-medium text-muted hover:text-ink', isActive && 'text-ink')
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Teléfono tappable — SIEMPRE visible (mobile: compacto) */}
            <PhoneButton variant="solid" label="Call" className="!px-3.5 !py-2 text-sm md:hidden" />
            <PhoneButton variant="inline" className="hidden md:inline-flex" />
            <Link
              to="/contact"
              className="hidden rounded-control bg-accent px-4 py-2.5 text-sm font-semibold text-accent-fg transition hover:brightness-95 md:inline-flex"
            >
              Free estimate
            </Link>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center text-ink lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="text-2xl leading-none">{open ? '×' : '≡'}</span>
            </button>
          </div>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line bg-surface lg:hidden">
          <Container>
            <nav className="flex flex-col py-3">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base font-medium text-ink"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-control bg-accent px-4 py-3 text-center text-base font-semibold text-accent-fg"
              >
                Get a free estimate
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
