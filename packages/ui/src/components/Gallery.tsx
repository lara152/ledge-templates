import { useState } from 'react';
import type { AspectRatio, ImageAsset } from '../types';
import { ImageSlot } from './ImageSlot';
import { Lightbox } from './Lightbox';
import { cn } from '../utils';

const COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

/** Grid responsivo de imágenes que abre un Lightbox al hacer clic. */
export function Gallery({
  images,
  columns = 3,
  ratio = '4/3',
  className,
}: {
  images: ImageAsset[];
  columns?: 2 | 3 | 4;
  ratio?: AspectRatio;
  className?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  if (images.length === 0) return null;

  return (
    <>
      <ul className={cn('grid gap-4', COLS[columns], className)}>
        {images.map((img, i) => (
          <li key={`${img.src}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full rounded-card text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              <ImageSlot
                image={img}
                ratio={ratio}
                imgClassName="transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
              />
              {(img.caption || img.neighborhood) && (
                <div className="mt-2.5 flex items-baseline justify-between gap-3">
                  {img.caption && <span className="text-sm text-ink">{img.caption}</span>}
                  {img.neighborhood && (
                    <span className="shrink-0 text-xs text-muted">{img.neighborhood}</span>
                  )}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>

      {open !== null && (
        <Lightbox
          images={images}
          index={open}
          onClose={() => setOpen(null)}
          onIndexChange={setOpen}
        />
      )}
    </>
  );
}
