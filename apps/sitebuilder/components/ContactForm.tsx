import { contact, business } from '@/lib/site';

/**
 * Progressive contact form — plain HTML POST, works with zero JS.
 * Posts to config.contact.formEndpoint (e.g. a Formspree URL) when set; otherwise
 * falls back to the Cloudflare Pages Function placeholder at /api/contact
 * (see functions/api/contact.ts).
 */
export function ContactForm() {
  const endpoint = contact.formEndpoint?.trim() || '/api/contact';
  const usingFormspree = endpoint.includes('formspree.io');

  const inputClass =
    'w-full rounded-control border bg-[var(--surface)] px-4 py-3 text-ink placeholder:text-ink-subtle focus:border-[var(--brand-primary)]';

  return (
    <form
      action={endpoint}
      method="POST"
      className="rounded-card border bg-[var(--surface-raised)] p-6 shadow-soft sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <label htmlFor="cf-name" className="mb-1.5 block text-sm font-medium text-ink">
            Name
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name" required className={inputClass} />
        </div>
        <div className="sm:col-span-1">
          <label htmlFor="cf-phone" className="mb-1.5 block text-sm font-medium text-ink">
            Phone
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-email" className="mb-1.5 block text-sm font-medium text-ink">
            Email
          </label>
          <input id="cf-email" name="email" type="email" autoComplete="email" required className={inputClass} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="cf-message" className="mb-1.5 block text-sm font-medium text-ink">
            How can we help?
          </label>
          <textarea id="cf-message" name="message" rows={5} required className={inputClass} />
        </div>
      </div>

      {/* Honeypot spam trap — hidden from humans, tempting to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px]" style={{ position: 'absolute', left: '-9999px' }}>
        <label htmlFor="cf-company">Company (leave blank)</label>
        <input id="cf-company" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {usingFormspree ? (
        <input type="hidden" name="_subject" value={`New inquiry from ${business.name} website`} />
      ) : null}

      <button type="submit" className="btn btn-primary mt-6 w-full sm:w-auto">
        Send message
      </button>

      <p className="mt-3 text-xs text-ink-subtle">
        We&apos;ll get back to you within one business day. Your details are only used to respond to
        your inquiry.
      </p>
    </form>
  );
}
