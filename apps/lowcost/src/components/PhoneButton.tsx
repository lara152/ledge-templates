import { cn } from '@ledge/ui';
import { site, telHref } from '@/data/content';

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 5.5C3 4.1 4.1 3 5.5 3H7l1.5 4L7 8.5a12 12 0 0 0 5.5 5.5L14 12.5l4 1.5v1.5c0 1.4-1.1 2.5-2.5 2.5A13.5 13.5 0 0 1 3 5.5Z" />
    </svg>
  );
}

/** Botón de teléfono tappable — se usa en header, body y footer (regla de conversión). */
export function PhoneButton({
  variant = 'solid',
  className,
  label,
}: {
  variant?: 'solid' | 'outline' | 'inline';
  className?: string;
  label?: string;
}) {
  const base = 'inline-flex items-center gap-2 font-semibold transition-colors';
  const styles: Record<string, string> = {
    solid: 'rounded-control bg-accent px-5 py-3 text-accent-fg hover:brightness-95',
    outline: 'rounded-control border-2 border-brand px-5 py-3 text-brand hover:bg-brand/5',
    inline: 'text-brand hover:underline',
  };
  return (
    <a href={telHref} className={cn(base, styles[variant], className)}>
      <PhoneIcon />
      <span>{label ?? `Call ${site.phone}`}</span>
    </a>
  );
}
