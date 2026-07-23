import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Container, buttonClasses, cn } from '@ledge/ui';
import { nav, site } from '@/data/content';

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line/50 bg-bg/70 backdrop-blur-md">
      <Container>
        <div className="flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="font-display text-xl tracking-[0.28em] text-ink">
            {site.name.toUpperCase()}
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'text-sm tracking-wide text-muted transition-colors hover:text-ink',
                    isActive && 'text-ink',
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className={buttonClasses('outline', 'md')}>
              Schedule a Consultation
            </Link>
          </div>

          <button
            type="button"
            className="grid h-10 w-10 place-items-center text-ink md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-2xl leading-none">{open ? '×' : '≡'}</span>
          </button>
        </div>
      </Container>

      {open && (
        <div className="border-t border-line/50 bg-bg/95 backdrop-blur-md md:hidden">
          <Container>
            <nav className="flex flex-col py-4">
              {nav.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="py-3 text-base text-ink"
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className={buttonClasses('outline', 'md', 'mt-3 w-full')}
              >
                Schedule a Consultation
              </Link>
            </nav>
          </Container>
        </div>
      )}
    </header>
  );
}
