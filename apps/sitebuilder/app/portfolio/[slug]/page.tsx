import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MeridianProjectDetail } from '@/components/meridian/MeridianProjectDetail';
import { business, projectBySlug, projects, template } from '@/lib/site';

// Static export: only the active client's project slugs are prerendered.
export const dynamicParams = false;

export function generateStaticParams() {
  if (template !== 'meridian') return [];
  return projects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = projectBySlug(slug);
  const name = p?.name ?? 'Project';
  return {
    title: { absolute: `${name} · ${business.name}` },
    alternates: { canonical: `/portfolio/${slug}/` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  if (template !== 'meridian') notFound();
  const { slug } = await params;
  const list = projects();
  const idx = list.findIndex((p) => p.slug === slug);
  if (idx === -1) notFound();
  const project = list[idx];
  const next = list.length > 1 ? list[(idx + 1) % list.length] : undefined;
  return <MeridianProjectDetail project={project} next={next} />;
}
