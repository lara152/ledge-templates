import type { Metadata } from 'next';
import { GreenLeafPricing } from '@/components/greenleaf/GreenLeafPricing';
import { NotAvailable } from '@/components/NotAvailable';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Pricing · ${business.name}` },
  alternates: { canonical: '/pricing/' },
};

export default function PricingPage() {
  if (template !== 'greenleaf') return <NotAvailable />;
  return <GreenLeafPricing />;
}
