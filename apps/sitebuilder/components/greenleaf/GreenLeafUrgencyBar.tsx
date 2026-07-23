import { contact, telHref, urgency } from '@/lib/site';

/** Urgency strip above the header (scrolls away; header stays sticky below). */
export function GreenLeafUrgencyBar() {
  const u = urgency();
  const href = telHref(contact.phone);
  if (!u.banner?.trim()) return null;

  return (
    <div className="bg-primary text-primary-fg">
      <div className="container-page flex flex-wrap items-center justify-center gap-x-4 gap-y-1 py-2 text-center text-sm">
        <span>{u.banner}</span>
        {href ? (
          <a href={href} className="font-semibold underline underline-offset-2">
            Call {contact.phone}
          </a>
        ) : null}
      </div>
    </div>
  );
}
