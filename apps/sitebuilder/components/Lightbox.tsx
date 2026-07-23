'use client';

import { useCallback, useEffect } from 'react';
import type { MediaItem } from '@/lib/types';

/** Full-screen image viewer with keyboard (Esc / ← →) + prev/next. Vendored from @ledge/ui. */
export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: MediaItem[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const prev = useCallback(
    () => onIndexChange((index - 1 + items.length) % items.length),
    [index, items.length, onIndexChange],
  );
  const next = useCallback(
    () => onIndexChange((index + 1) % items.length),
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = original;
    };
  }, [onClose, prev, next]);

  const img = items[index];
  if (!img) return null;
  const caption = [img.caption, img.location].filter(Boolean).join(' · ');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full text-2xl text-white/80 hover:bg-white/10 hover:text-white"
      >
        &times;
      </button>

      {items.length > 1 && (
        <button
          type="button"
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-3xl text-white/80 hover:bg-white/10 hover:text-white sm:left-6"
        >
          &lsaquo;
        </button>
      )}

      <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
        {img.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={img.image} alt={img.alt || ''} className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain" />
        ) : (
          <div className="mx-auto grid aspect-[3/2] w-[min(80vw,52rem)] place-items-center rounded-lg bg-neutral-800 p-8 text-center text-neutral-300">
            {img.alt}
          </div>
        )}
        {caption && <figcaption className="mt-3 text-center text-sm text-white/75">{caption}</figcaption>}
      </figure>

      {items.length > 1 && (
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-3 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full text-3xl text-white/80 hover:bg-white/10 hover:text-white sm:right-6"
        >
          &rsaquo;
        </button>
      )}
    </div>
  );
}
