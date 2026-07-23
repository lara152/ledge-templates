import type { Metadata } from 'next';
import { GreenLeafServiceArea } from '@/components/greenleaf/GreenLeafServiceArea';
import { NotAvailable } from '@/components/NotAvailable';
import { areaBySlug, areas, business, template } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  const list = template === 'greenleaf' ? areas() : [];
  const params = list.map((a) => ({ slug: a.slug }));
  return params.length ? params : [{ slug: 'not-found' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = areaBySlug(slug);
  return {
    title: { absolute: `${a ? `${a.city} lawn care & landscaping` : 'Service area'} · ${business.name}` },
    alternates: { canonical: `/areas/${slug}/` },
  };
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = areaBySlug(slug);
  if (template !== 'greenleaf' || !a) return <NotAvailable />;
  return <GreenLeafServiceArea area={a} />;
}
