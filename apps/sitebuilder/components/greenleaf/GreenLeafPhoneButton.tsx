import { PhoneIcon } from '@/components/icons';
import { contact, telHref } from '@/lib/site';

/** Tappable phone — used in header, body, and footer (the conversion rule). */
export function GreenLeafPhoneButton({
  variant = 'solid',
  className = '',
  label,
}: {
  variant?: 'solid' | 'outline' | 'inline';
  className?: string;
  label?: string;
}) {
  const href = telHref(contact.phone);
  if (!href) return null;

  const base = 'inline-flex items-center gap-2 font-semibold transition-colors';
  const styles: Record<string, string> = {
    solid: 'rounded-control bg-accent px-5 py-3 text-accent-fg hover:brightness-95',
    outline: 'rounded-control border-2 border-primary px-5 py-3 text-primary hover:bg-surface-sunken',
    inline: 'text-primary hover:underline',
  };

  return (
    <a href={href} className={`${base} ${styles[variant]} ${className}`}>
      <PhoneIcon width={18} height={18} />
      <span>{label ?? `Call ${contact.phone}`}</span>
    </a>
  );
}
