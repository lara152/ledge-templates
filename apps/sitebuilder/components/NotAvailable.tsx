import Link from 'next/link';

/**
 * Plain fallback for look-specific routes (portfolio/process) when the active look
 * doesn't use them. Static-export safe (no notFound()); these routes aren't linked
 * for other looks, so this is only ever reached by a stray URL.
 */
export function NotAvailable() {
  return (
    <div className="section pt-24 sm:pt-32">
      <div className="container-page">
        <p className="eyebrow mb-4">Not available</p>
        <h1 className="text-4xl sm:text-5xl">This page isn&apos;t part of this site.</h1>
        <Link href="/" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
          Return home →
        </Link>
      </div>
    </div>
  );
}
