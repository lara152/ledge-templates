import type { MetadataRoute } from 'next';
import { absoluteUrl, lastUpdated, services } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = lastUpdated().iso;
  const entries: MetadataRoute.Sitemap = [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'weekly', priority: 1 },
    { url: absoluteUrl('/about/'), lastModified, changeFrequency: 'yearly', priority: 0.7 },
    { url: absoluteUrl('/contact/'), lastModified, changeFrequency: 'yearly', priority: 0.6 },
  ];
  if (services().length > 0) {
    entries.splice(1, 0, {
      url: absoluteUrl('/services/'),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }
  return entries;
}
