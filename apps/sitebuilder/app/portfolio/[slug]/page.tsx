import type { Metadata } from 'next';
import { MeridianProjectDetail } from '@/components/meridian/MeridianProjectDetail';
import { NotAvailable } from '@/components/NotAvailable';
import { business, projectBySlug, projects, template } from '@/lib/site';

// Static export: only the active client's project slugs are prerendered.
export const dynamicParams = false;

export function generateStaticParams() {
  const list = template === 'meridian' ? projects() : [];
  const params = list.map((p) => ({ slug: p.slug }));
  // `output: export` needs at least one param for a dynamic route; when a look has
  // no projects we emit a single unlinked placeholder that renders the fallback.
  return params.length ? params : [{ slug: 'not-found' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  const name = p?.name ?? business.name;
  return {
    title: { absolute: `${name} · ${business.name}` },
    alternates: { canonical: `/portfolio/${slug}/` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = projects();
  const idx = list.findIndex((p) => p.slug === slug);
  if (template !== 'meridian' || idx === -1) return <NotAvailable />;
  const project = list[idx];
  const next = list.length > 1 ? list[(idx + 1) % list.length] : undefined;
  return <MeridianProjectDetail project={project} next={next} />;
}
