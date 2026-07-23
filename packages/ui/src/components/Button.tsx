import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const SIZES: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
};

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-brand text-brand-fg hover:opacity-90',
  outline: 'border border-line text-ink hover:bg-surface-2',
  ghost: 'text-ink hover:bg-surface-2',
};

/**
 * Clases de botón reutilizables. Exportadas aparte para poder estilizar un
 * <Link> de react-router con el mismo look sin acoplar el router a @ledge/ui.
 */
export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string): string {
  return cn(
    'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-control',
    'transition-colors duration-200 ease-out-expo',
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    SIZES[size],
    VARIANTS[variant],
    className,
  );
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={buttonClasses(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}
