import type { Metadata } from 'next';
import { MeridianPortfolio } from '@/components/meridian/MeridianPortfolio';
import { NotAvailable } from '@/components/NotAvailable';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Portfolio · ${business.name}` },
  alternates: { canonical: '/portfolio/' },
};

export default function PortfolioPage() {
  // Portfolio is a meridian-only surface; other looks don't link it.
  if (template !== 'meridian') return <NotAvailable />;
  return <MeridianPortfolio />;
}
