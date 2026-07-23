import type { Metadata } from 'next';
import { GreenLeafAreas } from '@/components/greenleaf/GreenLeafAreas';
import { NotAvailable } from '@/components/NotAvailable';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Service areas · ${business.name}` },
  alternates: { canonical: '/areas/' },
};

export default function AreasPage() {
  if (template !== 'greenleaf') return <NotAvailable />;
  return <GreenLeafAreas />;
}
