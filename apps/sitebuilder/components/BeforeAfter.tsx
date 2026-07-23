'use client';

import { useCallback, useRef, useState } from 'react';
import type { MediaItem } from '@/lib/types';
import { ImageSlot } from './ImageSlot';

/** Before/after slider (clip-path so the "before" image never distorts). Vendored from @ledge/ui. */
export function BeforeAfter({
  before,
  after,
  ratio = '3/2',
}: {
  before: MediaItem;
  after: MediaItem;
  ratio?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <div
      ref={ref}
      className="relative select-none overflow-hidden rounded-card"
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
      onMouseMove={(e) => {
        if (e.buttons === 1) move(e.clientX);
      }}
      onTouchMove={(e) => move(e.touches[0].clientX)}
      onClick={(e) => move(e.clientX)}
    >
      <ImageSlot src={after.image} alt={after.alt || ''} ratio={ratio} rounded={false} className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageSlot src={before.image} alt={before.alt || ''} ratio={ratio} rounded={false} className="absolute inset-0 h-full w-full" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        After
      </span>

      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="mx-auto h-full w-0.5 bg-white/90" />
        <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink">
          <span className="text-xs">&#8596;</span>
        </div>
      </div>
    </div>
  );
}
