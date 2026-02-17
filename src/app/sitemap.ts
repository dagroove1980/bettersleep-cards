import { MetadataRoute } from 'next';
import { getAllTechniques, getAllCategories } from '@/lib/techniques';
import { SITE_URL } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const techniques = getAllTechniques();
  const categories = getAllCategories();

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    ...categories.map((cat) => ({
      url: `${SITE_URL}/category/${cat}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
    ...techniques.map((t) => ({
      url: `${SITE_URL}/technique/${t.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
