'use client';

import { useState } from 'react';

/**
 * ImageSlot — fixed aspect-ratio (no layout shift) + lazy load + labeled placeholder.
 * When `src` is empty it renders an intentional placeholder showing the shot that goes
 * there, so an operator just replaces the URL in the client's config. Vendored from
 * @ledge/ui and retargeted to the engine's tokens.
 */
export function ImageSlot({
  src,
  alt = '',
  ratio = '4/3',
  priority = false,
  rounded = true,
  className = '',
  imgClassName = '',
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  priority?: boolean;
  rounded?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  const has = Boolean(src && src.trim());
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-surface-sunken ${rounded ? 'rounded-card' : ''} ${className}`}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      {has ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center p-6 text-center">
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, var(--surface-sunken), var(--surface))' }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-40"
            style={{ backgroundImage: 'radial-gradient(circle at 28% 24%, var(--brand-primary), transparent 62%)' }}
          />
          <div className="relative max-w-[30ch]">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-ink-subtle">
              Photo slot · {ratio}
            </p>
            <p className="mt-2 text-sm leading-snug text-ink/85">{alt || 'Add a real project photo'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
