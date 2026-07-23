import { useEffect } from 'react';

/** Bloquea el scroll del body mientras un overlay (lightbox/menú) está abierto. */
export function useLockBodyScroll(): void {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
}
