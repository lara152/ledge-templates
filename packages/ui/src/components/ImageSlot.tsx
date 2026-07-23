import { useState } from 'react';
import type { AspectRatio, ImageAsset } from '../types';
import { cn } from '../utils';

/**
 * ImageSlot — la pieza clave del sistema de imágenes.
 * - Aspect-ratio FIJO (no hay layout shift al cargar).
 * - Lazy loading por defecto (priority=true para el hero above-the-fold).
 * - Si `image.src` está vacío, muestra un placeholder elegante con la descripción
 *   de la foto que va ahí, para que solo reemplaces la URL en content.ts.
 */
export function ImageSlot({
  image,
  ratio = '4/3',
  className,
  imgClassName,
  priority = false,
  rounded = true,
}: {
  image: ImageAsset;
  ratio?: AspectRatio;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  rounded?: boolean;
}) {
  const hasSrc = Boolean(image.src && image.src.trim());
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn('relative overflow-hidden bg-surface-2', rounded && 'rounded-card', className)}
      style={{ aspectRatio: ratio.replace('/', ' / ') }}
    >
      {hasSrc ? (
        <img
          src={image.src}
          alt={image.alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={cn(
            'h-full w-full object-cover transition-opacity duration-700 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            imgClassName,
          )}
        />
      ) : (
        <Placeholder image={image} ratio={ratio} />
      )}
    </div>
  );
}

function Placeholder({ image, ratio }: { image: ImageAsset; ratio: AspectRatio }) {
  return (
    <div className="absolute inset-0 grid place-items-center p-6 text-center">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: 'linear-gradient(135deg, var(--color-surface-2), var(--color-surface))' }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-40"
        style={{ backgroundImage: 'radial-gradient(circle at 28% 24%, var(--color-brand), transparent 62%)' }}
      />
      <div className="relative max-w-[30ch]">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
          Photo slot · {ratio}
        </p>
        <p className="mt-2 text-sm leading-snug text-ink/85">{image.alt}</p>
      </div>
    </div>
  );
}
