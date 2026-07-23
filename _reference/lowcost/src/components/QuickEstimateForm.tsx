import { useState } from 'react';
import { cn } from '@ledge/ui';
import { serviceOptions } from '@/data/content';

const field =
  'w-full rounded-control border border-line bg-surface px-4 py-3 text-ink placeholder:text-muted focus:border-brand focus:outline-none';

/**
 * Formulario CORTO de estimado (nombre, teléfono, servicio, ZIP). Reutilizado en
 * el hero, en bandas CTA y en Contact. Sin backend: al enviar muestra el "gracias".
 */
export function QuickEstimateForm({
  title = 'Get your free estimate',
  className,
}: {
  title?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className={cn('rounded-card border border-line bg-surface p-6 shadow-soft', className)}>
        <p className="text-lg font-bold text-ink">Thanks — you&apos;re on the list! 🌿</p>
        <p className="mt-2 text-muted">
          We&apos;ll call you within one business day with your free estimate.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={cn('rounded-card border border-line bg-surface p-6 shadow-lift', className)}
    >
      {title && <p className="text-lg font-bold text-ink">{title}</p>}
      <p className="mt-1 text-sm text-muted">Takes 20 seconds · no obligation.</p>
      <div className="mt-4 space-y-3">
        <input name="name" required placeholder="Name" autoComplete="name" className={field} />
        <input name="phone" type="tel" required placeholder="Phone" autoComplete="tel" className={field} />
        <select name="service" required defaultValue="" className={field}>
          <option value="" disabled>
            What do you need?
          </option>
          {serviceOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input name="zip" required placeholder="ZIP code" inputMode="numeric" className={field} />
        <button
          type="submit"
          className="w-full rounded-control bg-accent px-7 py-3.5 text-base font-semibold text-accent-fg transition hover:brightness-95"
        >
          Get my free estimate
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">Prefer to talk? Call us — we pick up.</p>
    </form>
  );
}
