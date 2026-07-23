import type { ReactNode } from 'react';
import { cn } from '../utils';

/** Contenedor con borde + superficie (los colores los define cada app vía tokens). */
export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('rounded-card border border-line bg-surface', className)}>{children}</div>
  );
}
