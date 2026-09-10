import { MetadataRoute } from 'next';
import { createClient } from '@/lib/supabase/server';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://uniqueai.com';

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
  ];

  try {
    const supabase = await createClient();
    
    const [servicesRes, projectsRes, postsRes] = await Promise.all([
      supabase.from('services').select('slug, updated_at').eq('is_published', true),
      supabase.from('projects').select('slug, updated_at').eq('is_published', true),
      supabase.from('blog_posts').select('slug, updated_at').eq('status', 'published'),
    ]);

    const serviceUrls: MetadataRoute.Sitemap = (servicesRes.data || []).map((s) => ({
      url: `${baseUrl}/solutions/${s.slug}`,
      lastModified: s.updated_at ? new Date(s.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

    const projectUrls: MetadataRoute.Sitemap = (projectsRes.data || []).map((p) => ({
      url: `${baseUrl}/work/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    const postUrls: MetadataRoute.Sitemap = (postsRes.data || []).map((b) => ({
      url: `${baseUrl}/blogs/${b.slug}`,
      lastModified: b.updated_at ? new Date(b.updated_at) : new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    return [...staticRoutes, ...serviceUrls, ...projectUrls, ...postUrls];
  } catch {
    return staticRoutes;
  }
}
