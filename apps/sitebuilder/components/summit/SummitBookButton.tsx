import Link from 'next/link';
import { bookHref } from '@/lib/site';

/** The single CTA of the summit look — "Book a call". Links to an external booking URL if set, else /contact/. */
export function SummitBookButton({ className = '', label = 'Book a call' }: { className?: string; label?: string }) {
  const href = bookHref();
  const cls = `inline-flex items-center justify-center gap-2 rounded-control bg-primary px-6 py-3 font-semibold text-primary-fg transition hover:opacity-90 ${className}`;
  if (href.startsWith('http')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {label}
    </Link>
  );
}
