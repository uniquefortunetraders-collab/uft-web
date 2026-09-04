import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/animations/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('services')
    .select('title, short_description, seo_title, seo_description')
    .eq('slug', slug)
    .single();

  if (!service) return { title: 'Solution Not Found | UniqueAI' };

  return {
    title: service.seo_title || `${service.title} | UniqueAI Solutions`,
    description: service.seo_description || service.short_description,
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) {
    notFound();
  }

  const features = (service.features as any[]) || [];

  return (
    <div className="pt-8 pb-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <Link
          href="/#solutions"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Solutions</span>
        </Link>

        {/* Hero Banner for Service */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl mb-12">
          <Badge variant="emerald" className="mb-4">
            Enterprise Vertical Solution
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {service.title}
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl font-normal">
            {service.short_description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link href="/contact">
              <Button variant="primary" size="lg" className="gap-2">
                <span>{service.cta_label || 'Request Solution Consultation'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a href={`https://wa.me/?text=Inquiry%20regarding%20${encodeURIComponent(service.title)}`} target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg">
                Talk on WhatsApp
              </Button>
            </a>
          </div>
        </div>

        {/* Overview & Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-8 space-y-8">
            <Reveal direction="up">
              <div className="bg-white rounded-3xl p-8 border border-emerald-100 shadow-sm space-y-4">
                <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                <div className="text-sm sm:text-base text-gray-600 leading-relaxed space-y-4">
                  {service.description ? (
                    <p className="whitespace-pre-line">{service.description}</p>
                  ) : (
                    <p>
                      UniqueAI provides robust, scalable, and high-performance technology for{' '}
                      {service.title}. Designed for enterprises, financial entities, and growing brands seeking automated workflow and high availability.
                    </p>
                  )}
                </div>
              </div>
            </Reveal>

            {/* Key Features */}
            {features.length > 0 && (
              <Reveal direction="up" delay={0.1}>
                <div className="bg-[#e4f3e7] rounded-3xl p-8 border border-emerald-200/80">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">Key Solution Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {features.map((feat, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-bold text-gray-900">{feat.title || feat}</h4>
                          {feat.description && (
                            <p className="text-xs text-gray-500 mt-0.5">{feat.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>

          {/* Sidebar CTA Card */}
          <div className="lg:col-span-4">
            <Reveal direction="up" delay={0.2}>
              <div className="bg-gradient-to-br from-emerald-900 to-gray-900 rounded-3xl p-8 text-white shadow-xl space-y-6">
                <h3 className="text-2xl font-bold text-white">Need a Custom Setup?</h3>
                <p className="text-xs text-emerald-200 leading-relaxed">
                  Our senior engineering team designs bespoke modules tailored strictly to your existing infrastructure.
                </p>
                <div className="pt-2">
                  <Link href="/contact">
                    <Button variant="primary" size="md" className="w-full">
                      Book Architecture Review
                    </Button>
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

      </div>
    </div>
  );
}
