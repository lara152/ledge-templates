import type { ReactNode } from 'react';
import { cn } from '../utils';

/** Ancho máximo centrado + padding lateral responsivo. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-container px-6 sm:px-8', className)}>{children}</div>;
}
