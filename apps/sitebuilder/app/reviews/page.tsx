import type { Metadata } from 'next';
import { GreenLeafReviews } from '@/components/greenleaf/GreenLeafReviews';
import { NotAvailable } from '@/components/NotAvailable';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Reviews · ${business.name}` },
  alternates: { canonical: '/reviews/' },
};

export default function ReviewsPage() {
  if (template !== 'greenleaf') return <NotAvailable />;
  return <GreenLeafReviews />;
}
