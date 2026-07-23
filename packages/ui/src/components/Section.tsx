import type { ReactNode } from 'react';
import { cn } from '../utils';

/** Bloque vertical con ritmo de sección consistente. */
export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn('py-20 sm:py-28', className)}>
      {children}
    </section>
  );
}
