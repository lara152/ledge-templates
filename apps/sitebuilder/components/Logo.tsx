import Link from 'next/link';
import { brand, business } from '@/lib/site';

/**
 * Brand lockup: an emblem + the business-name wordmark.
 * - If config.brand.logoPath is set, the client's logo image is the emblem.
 * - Otherwise an auto monogram (business initial) in a brand-colored tile is used,
 *   so the mark re-colors with the theme and no logo file is required.
 */
export function Logo({ onDark = false }: { onDark?: boolean }) {
  const logo = brand.logoPath?.trim();
  const initial = business.name.trim().charAt(0).toUpperCase() || '•';

  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
    >
      {logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={logo} alt={`${business.name} logo`} className="h-9 w-auto" />
      ) : (
        <span
          aria-hidden="true"
          className="grid h-9 w-9 place-items-center rounded-control font-display text-lg font-semibold"
          style={{ backgroundColor: 'var(--brand-primary)', color: 'var(--brand-primary-fg)' }}
        >
          {initial}
        </span>
      )}
      <span
        className="font-display text-[1.05rem] font-semibold leading-none tracking-tight"
        style={{ color: onDark ? 'var(--surface-contrast-fg)' : 'var(--ink)' }}
      >
        {business.name}
      </span>
    </Link>
  );
}
