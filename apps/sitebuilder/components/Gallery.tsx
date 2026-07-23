'use client';

import { useState } from 'react';
import type { MediaItem } from '@/lib/types';
import { ImageSlot } from './ImageSlot';
import { Lightbox } from './Lightbox';

const COLS: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

/** Responsive image grid that opens a Lightbox on click. Vendored from @ledge/ui. */
export function Gallery({
  items,
  columns = 3,
  ratio = '4/3',
}: {
  items: MediaItem[];
  columns?: 2 | 3 | 4;
  ratio?: string;
}) {
  const [open, setOpen] = useState<number | null>(null);
  if (!items.length) return null;

  return (
    <>
      <ul className={`grid gap-4 ${COLS[columns]}`}>
        {items.map((img, i) => (
          <li key={`${img.image}-${i}`}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full rounded-card text-left"
            >
              <ImageSlot
                src={img.image}
                alt={img.alt || img.title || ''}
                ratio={ratio}
                imgClassName="transition-transform duration-700 group-hover:scale-[1.04]"
              />
              {(img.title || img.caption || img.location) && (
                <div className="mt-2.5 flex items-baseline justify-between gap-3">
                  <span className="text-sm text-ink">{img.title || img.caption}</span>
                  {img.location && <span className="shrink-0 text-xs text-ink-subtle">{img.location}</span>}
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <Lightbox items={items} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
      )}
    </>
  );
}
