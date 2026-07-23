import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MeridianProcess } from '@/components/meridian/MeridianProcess';
import { business, template } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: `Our process · ${business.name}` },
  alternates: { canonical: '/process/' },
};

export default function ProcessPage() {
  // Process is a meridian-only surface; other looks don't link it.
  if (template !== 'meridian') notFound();
  return <MeridianProcess />;
}
