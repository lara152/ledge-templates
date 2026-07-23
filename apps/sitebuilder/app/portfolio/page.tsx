import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MeridianPortfolio } from '@/components/meridian/MeridianPortfolio';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Portfolio · ${business.name}` },
  alternates: { canonical: '/portfolio/' },
};

export default function PortfolioPage() {
  // Portfolio is a meridian-only surface; other looks don't link it.
  if (template !== 'meridian') notFound();
  return <MeridianPortfolio />;
}
