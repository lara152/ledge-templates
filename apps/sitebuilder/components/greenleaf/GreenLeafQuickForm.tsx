'use client';

import { useState } from 'react';
import { services } from '@/lib/site';

const FIELD =
  'w-full rounded-control border border-line bg-surface px-4 py-3 text-ink placeholder:text-ink-subtle focus:border-primary focus:outline-none';

/**
 * Short free-estimate form (name / phone / service / ZIP). Reused in the hero, on
 * service/area pages, and on Contact. No backend yet — on submit it shows the
 * thank-you state (wire delivery later per the BRD's central lead Worker).
 */
export function GreenLeafQuickForm({
  title = 'Get your free estimate',
  className = '',
}: {
  title?: string;
  className?: string;
}) {
  const [sent, setSent] = useState(false);
  const options = [...services().map((s) => s.name), 'Something else'];

  if (sent) {
    return (
      <div className={`rounded-card border border-line bg-surface p-6 shadow-soft ${className}`}>
        <p className="text-lg font-bold text-ink">Thanks — you&apos;re on the list! 🌿</p>
        <p className="mt-2 text-ink-muted">We&apos;ll call you within one business day with your free estimate.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className={`rounded-card border border-line bg-surface p-6 shadow-lift ${className}`}
    >
      {title ? <p className="text-lg font-bold text-ink">{title}</p> : null}
      <p className="mt-1 text-sm text-ink-muted">Takes 20 seconds · no obligation.</p>
      <div className="mt-4 space-y-3">
        <input name="name" required placeholder="Name" autoComplete="name" className={FIELD} />
        <input name="phone" type="tel" required placeholder="Phone" autoComplete="tel" className={FIELD} />
        <select name="service" required defaultValue="" className={FIELD}>
          <option value="" disabled>
            What do you need?
          </option>
          {options.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <input name="zip" required placeholder="ZIP code" inputMode="numeric" className={FIELD} />
        <button
          type="submit"
          className="w-full rounded-control bg-accent px-7 py-3.5 text-base font-semibold text-accent-fg transition hover:brightness-95"
        >
          Get my free estimate
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-ink-subtle">Prefer to talk? Call us — we pick up.</p>
    </form>
  );
}
