import Link from 'next/link';
import { business, episodes, stats } from '@/lib/site';
import { SummitBookButton } from './SummitBookButton';

export function SummitHeader() {
  const hasPodcast = episodes().length > 0;
  const hasResults = stats().length > 0;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-[color-mix(in_srgb,var(--surface)_85%,transparent)] backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-[4.5rem]">
        <Link href="/" className="text-lg font-extrabold tracking-tight text-ink">
          {business.name}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {hasResults ? (
            <a href="/#results" className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              Results
            </a>
          ) : null}
          {hasPodcast ? (
            <a href="/#podcast" className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
              Podcast
            </a>
          ) : null}
          <Link href="/about/" className="text-sm font-medium text-ink-muted transition-colors hover:text-ink">
            About
          </Link>
        </nav>
        <SummitBookButton className="!px-4 !py-2 text-sm" />
      </div>
    </header>
  );
}
