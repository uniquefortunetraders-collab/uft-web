import { createClient } from '@/lib/supabase/server';
import { Hero } from '@/components/hero/hero';
import { TechStrip } from '@/components/tech/tech-strip';
import { TechnologyEcosystem } from '@/components/services/technology-ecosystem';
import { WhyChoose } from '@/components/services/why-choose';
import { TrustStats } from '@/components/stats/trust-stats';
import { FeaturedWork } from '@/components/projects/featured-work';
import { ProcessSteps } from '@/components/process/process-steps';
import { TestimonialsSection } from '@/components/testimonials/testimonials-section';
import { PricingPlans } from '@/components/pricing/pricing-plans';
import { CtaBanner } from '@/components/contact/cta-banner';

export const revalidate = 60; // Revalidate dynamic content every 60 seconds

export default async function HomePage() {
  let settings = null;
  let services = [];
  let projects = [];
  let blogs = [];
  let testimonials = [];

  try {
    const supabase = await createClient();

    const [settingsRes, servicesRes, projectsRes, blogsRes, testimonialsRes] =
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
          .from('blog_posts')
          .select('*, blog_categories(name)')
          .eq('status', 'published')
          .order('published_at', { ascending: false })
          .limit(3),
        supabase
          .from('testimonials')
          .select('*')
          .eq('is_published', true)
          .order('display_order', { ascending: true }),
      ]);

    settings = settingsRes.data;
    services = servicesRes.data || [];
    projects = projectsRes.data || [];
    blogs = blogsRes.data || [];
    testimonials = testimonialsRes.data || [];
  } catch (error) {
    console.error('Error fetching homepage CMS data:', error);
  }

  const homepageConfig = settings?.homepage_config as any;

  return (
    <>
      {/* 1. Hero */}
      <Hero content={homepageConfig?.hero} />

      {/* 2. Technologies We Work With */}
      <TechStrip />

      {/* 3. Choose Your Plan (Products & Software Plans) */}
      <PricingPlans products={projects} whatsapp={settings?.whatsapp || undefined} />

      {/* 4. Our Core Solutions */}
      <TechnologyEcosystem services={services} />

      {/* 5. 5 Value Propositions Banner */}
      <WhyChoose data={homepageConfig?.why_choose} />

      {/* 6. Building Trust Through Results (Dark Banner) */}
      <TrustStats stats={homepageConfig?.stats} />

      {/* 7. Our Work Speaks - Solutions We've Built / Blogs */}
      <FeaturedWork blogs={blogs} projects={projects} />

      {/* 8. Our Process - Proven Approach */}
      <ProcessSteps data={homepageConfig?.process} />

      {/* 9. Clients Love Us - Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* 10. Bottom CTA Banner */}
      <CtaBanner
        whatsapp={settings?.whatsapp || undefined}
        phone={settings?.phone || undefined}
      />
    </>
  );
}

