import { createClient } from '@/lib/supabase/server';
import { Hero } from '@/components/hero/hero';
import { TechStrip } from '@/components/tech/tech-strip';
import { TechnologyEcosystem } from '@/components/services/technology-ecosystem';
import { WhyChoose } from '@/components/services/why-choose';
import { CoreCapabilities } from '@/components/services/core-capabilities';
import { ProcessSteps } from '@/components/process/process-steps';
import { FeaturedWork } from '@/components/projects/featured-work';
import { TestimonialsSection } from '@/components/testimonials/testimonials-section';
import { FeaturedInsights } from '@/components/insights/featured-insights';
import { TrustStats } from '@/components/stats/trust-stats';
import { ContactSection } from '@/components/contact/contact-section';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  let settings = null;
  let services = [];
  let projects = [];
  let testimonials = [];
  let posts = [];
  let offices = [];

  try {
    const supabase = await createClient();

    const [settingsRes, servicesRes, projectsRes, testimonialsRes, postsRes, officesRes] =
      await Promise.all([
        supabase.from('site_settings').select('*').single(),
        supabase
          .from('services')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true }),
        supabase
          .from('projects')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true })
          .limit(3),
        supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true }),
        supabase
          .from('blog_posts')
          .select('*, blog_categories(name, slug)')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3),
        supabase
          .from('offices')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true }),
      ]);

    settings = settingsRes.data;
    services = servicesRes.data || [];
    projects = projectsRes.data || [];
    testimonials = testimonialsRes.data || [];
    posts = postsRes.data || [];
    offices = officesRes.data || [];
  } catch (error) {
    console.error('Error fetching homepage CMS data:', error);
  }

  const homepageConfig = settings?.homepage_config as any;

  return (
    <>
      {/* 1. Hero */}
      <Hero content={homepageConfig?.hero} />

      {/* 1.5 Tech Strip — Technologies We Work With */}
      <TechStrip />

      {/* 2. Technology Ecosystem */}
      <TechnologyEcosystem services={services} />

      {/* 3. Why Choose UniqueAI */}
      <WhyChoose data={homepageConfig?.why_choose} />

      {/* 4. Core Capabilities */}
      <CoreCapabilities capabilities={homepageConfig?.capabilities} />

      {/* 5. Proven Process */}
      <ProcessSteps data={homepageConfig?.process} />

      {/* 6. Featured Work / Case Studies */}
      <FeaturedWork projects={projects} />

      {/* 7. Our Work Speaks — Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 8. Insights & Market Updates */}
      <FeaturedInsights posts={posts} />

      {/* 9. Trust & Company Statistics */}
      <TrustStats stats={homepageConfig?.stats} />

      {/* 10. Contact & Inquiry */}
      <ContactSection
        settings={{
          email: settings?.email || undefined,
          phone: settings?.phone || undefined,
          whatsapp: settings?.whatsapp || undefined,
        }}
        offices={offices}
      />
    </>
  );
}
