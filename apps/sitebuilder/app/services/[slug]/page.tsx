import type { Metadata } from 'next';
import { GreenLeafServiceLanding } from '@/components/greenleaf/GreenLeafServiceLanding';
import { NotAvailable } from '@/components/NotAvailable';
import { business, serviceBySlug, services, template } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  const list = template === 'greenleaf' ? services().filter((s) => s.slug?.trim()) : [];
  const params = list.map((s) => ({ slug: s.slug as string }));
  return params.length ? params : [{ slug: 'not-found' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  return {
    title: { absolute: `${s?.name ?? 'Service'} · ${business.name}` },
    alternates: { canonical: `/services/${slug}/` },
  };
}

export default async function ServiceLandingPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  if (template !== 'greenleaf' || !s) return <NotAvailable />;
  return <GreenLeafServiceLanding service={s} />;
}
