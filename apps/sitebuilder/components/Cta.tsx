import Link from 'next/link';
import { primaryCta } from '@/lib/site';
import { ArrowRightIcon, PhoneIcon } from './icons';

type Variant = 'primary' | 'accent' | 'outline' | 'on-dark';

/**
 * The primary call-to-action, resolved from config.goal.primaryCTA.
 * `call` renders a live tel: link; every other CTA routes to a page/anchor that
 * always exists in the static export.
 */
export function PrimaryCta({
  variant = 'primary',
  long = false,
  className = '',
}: {
  variant?: Variant;
  long?: boolean;
  className?: string;
}) {
  const cta = primaryCta();
  const label = long ? cta.label : cta.shortLabel;
  const classes = `btn btn-${variant} ${className}`.trim();

  const inner = (
    <>
      {cta.kind === 'call' ? <PhoneIcon width={18} height={18} /> : null}
      <span>{label}</span>
      {cta.kind !== 'call' ? <ArrowRightIcon width={18} height={18} /> : null}
    </>
  );

  const isPlainAnchor = cta.href.startsWith('tel:') || cta.href.startsWith('mailto:') || cta.external;

  if (isPlainAnchor) {
    return (
      <a href={cta.href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={cta.href} className={classes}>
      {inner}
    </Link>
  );
}
