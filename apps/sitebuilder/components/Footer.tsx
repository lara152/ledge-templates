import Link from 'next/link';
import {
  business,
  contact,
  formattedAddress,
  lastUpdated,
  mailtoHref,
  navItems,
  socialLinks,
  telHref,
} from '@/lib/site';
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from './icons';

function socialLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const name = host.split('.')[0];
    const map: Record<string, string> = {
      facebook: 'Facebook',
      instagram: 'Instagram',
      x: 'X',
      twitter: 'X',
      linkedin: 'LinkedIn',
      youtube: 'YouTube',
      tiktok: 'TikTok',
      yelp: 'Yelp',
    };
    return map[name] ?? name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Social';
  }
}

export function Footer() {
  const address = formattedAddress();
  const tel = telHref(contact.phone);
  const mail = mailtoHref(contact.email);
  const socials = socialLinks();
  const updated = lastUpdated();
  const year = updated.iso.slice(0, 4);

  return (
    <footer
      style={{ backgroundColor: 'var(--surface-contrast)', color: 'var(--surface-contrast-fg)' }}
    >
      <div className="container-page section !py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand + description */}
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">{business.name}</p>
            {business.oneLineDescription ? (
              <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-75">
                {business.oneLineDescription}
              </p>
            ) : null}
            {socials.length ? (
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s}>
                    <a
                      href={s}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-75 underline-offset-4 hover:underline hover:opacity-100"
                    >
                      {socialLabel(s)}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {/* NAP */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Contact</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {address ? (
                <li className="flex gap-3">
                  <MapPinIcon width={18} height={18} className="mt-0.5 shrink-0 opacity-60" />
                  <span className="not-italic opacity-90">{address}</span>
                </li>
              ) : null}
              {tel ? (
                <li className="flex gap-3">
                  <PhoneIcon width={18} height={18} className="mt-0.5 shrink-0 opacity-60" />
                  <a href={tel} className="opacity-90 hover:underline">
                    {contact.phone}
                  </a>
                </li>
              ) : null}
              {mail ? (
                <li className="flex gap-3">
                  <MailIcon width={18} height={18} className="mt-0.5 shrink-0 opacity-60" />
                  <a href={mail} className="opacity-90 hover:underline">
                    {contact.email}
                  </a>
                </li>
              ) : null}
              {contact.hours ? (
                <li className="flex gap-3">
                  <ClockIcon width={18} height={18} className="mt-0.5 shrink-0 opacity-60" />
                  <span className="opacity-90">{contact.hours}</span>
                </li>
              ) : null}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] opacity-60">Explore</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {navItems().map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="opacity-90 underline-offset-4 hover:underline">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-[rgba(255,255,255,0.14)] pt-6 text-xs opacity-60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. All rights reserved.
          </p>
          <p>
            Last updated{' '}
            <time dateTime={updated.iso}>{updated.display}</time>
          </p>
        </div>
      </div>
    </footer>
  );
}
