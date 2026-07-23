import Link from 'next/link';
import { business, contact, lastUpdated, mailtoHref, socialLinks } from '@/lib/site';
import { SummitBookButton } from './SummitBookButton';

function socialLabel(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const name = host.split('.')[0];
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return 'Social';
  }
}

export function SummitFooter() {
  const year = lastUpdated().iso.slice(0, 4);
  const mail = mailtoHref(contact.email);
  const socials = socialLinks();

  return (
    <footer className="border-t border-line bg-[var(--surface-raised)]">
      <div className="container-page section !py-16">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="text-xl font-extrabold text-ink">{business.name}</p>
            {business.tagline?.trim() ? (
              <p className="mt-2 max-w-sm text-sm text-ink-muted">{business.tagline.trim()}</p>
            ) : null}
          </div>
          <SummitBookButton />
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-line pt-6 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.name}.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1">
            {mail ? (
              <a href={mail} className="hover:text-ink">
                {contact.email}
              </a>
            ) : null}
            {socials.map((s) => (
              <a key={s} href={s} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
                {socialLabel(s)}
              </a>
            ))}
            <Link href="/about/" className="hover:text-ink">
              About
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
