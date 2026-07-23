import { useCallback, useEffect } from 'react';
import type { ImageAsset } from '../types';
import { useLockBodyScroll } from '../hooks/useLockBodyScroll';

/** Overlay de imagen a pantalla completa con teclado (Esc / ← →) y prev/next. */
export function Lightbox({
  images,
  index,
  onClose,
  onIndexChange,
}: {
  images: ImageAsset[];
  index: number;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  useLockBodyScroll();

  const prev = useCallback(
    () => onIndexChange((index - 1 + images.length) % images.length),
    [index, images.length, onIndexChange],
  );
  const next = useCallback(
    () => onIndexChange((index + 1) % images.length),
    [index, images.length, onIndexChange],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, prev, next]);

  const img = images[index];
  if (!img) return null;
  const caption = [img.caption, img.neighborhood].filter(Boolean).join(' · ');

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 animate-fade-in"
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

      {images.length > 1 && (
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
        {img.src ? (
          <img
            src={img.src}
            alt={img.alt}
            className="mx-auto max-h-[80vh] w-auto rounded-lg object-contain"
          />
        ) : (
          <div className="mx-auto grid aspect-[3/2] w-[min(80vw,52rem)] place-items-center rounded-lg bg-neutral-800 p-8 text-center text-neutral-300">
            {img.alt}
          </div>
        )}
        {caption && (
          <figcaption className="mt-3 text-center text-sm text-white/75">{caption}</figcaption>
        )}
      </figure>

      {images.length > 1 && (
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
