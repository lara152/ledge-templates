import { useCallback, useRef, useState } from 'react';
import type { AspectRatio, ImageAsset } from '../types';
import { ImageSlot } from './ImageSlot';
import { cn } from '../utils';

/**
 * Comparador antes/después con handle arrastrable. Usa clip-path para que la
 * imagen "before" no se deforme al mover el divisor.
 */
export function BeforeAfter({
  before,
  after,
  ratio = '3/2',
  className,
}: {
  before: ImageAsset;
  after: ImageAsset;
  ratio?: AspectRatio;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);

  const moveTo = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, p)));
  }, []);

  return (
    <div
      ref={ref}
      className={cn('relative select-none overflow-hidden rounded-card', className)}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
      onMouseMove={(e) => {
        if (e.buttons === 1) moveTo(e.clientX);
      }}
      onTouchMove={(e) => moveTo(e.touches[0].clientX)}
      onClick={(e) => moveTo(e.clientX)}
    >
      {/* AFTER (base, ocupa todo) */}
      <ImageSlot image={after} ratio={ratio} rounded={false} className="absolute inset-0 h-full w-full" />

      {/* BEFORE (recortado con clip-path desde la derecha) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <ImageSlot image={before} ratio={ratio} rounded={false} className="absolute inset-0 h-full w-full" />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        Before
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
        After
      </span>

      {/* Divisor + handle */}
      <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%`, transform: 'translateX(-50%)' }}>
        <div className="mx-auto h-full w-0.5 bg-white/90" />
        <div className="absolute left-1/2 top-1/2 grid h-9 w-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift">
          <span className="text-xs">&#8596;</span>
        </div>
      </div>
    </div>
  );
}
