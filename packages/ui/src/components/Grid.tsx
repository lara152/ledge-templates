import type { ReactNode } from 'react';
import { cn } from '../utils';

const COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 lg:grid-cols-4',
};

/** Grid responsivo simple (1–4 columnas). */
export function Grid({
  cols = 3,
  className,
  children,
}: {
  cols?: 1 | 2 | 3 | 4;
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn('grid gap-6', COLS[cols], className)}>{children}</div>;
}
