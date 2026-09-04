import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Boxes, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';

export const metadata = {
  title: 'Services & Software Solutions | UniqueAI',
  description: 'Explore enterprise software solutions, fintech systems, AI automation, e-commerce, and ERP platforms by UniqueAI.',
};

export default async function SolutionsPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  const defaultServices = [
    {
      id: '1',
      title: 'E-Commerce Development',
      slug: 'e-commerce-development',
      short_description: 'Scalable online stores that drive sales, handle high concurrency, and deliver great customer experiences.',
      features: [
        { title: 'Custom Storefront Design' },
        { title: 'Payment Gateway Integration' },
        { title: 'Inventory Management' },
      ],
    },
    {
      id: '2',
      title: 'Stock Market Software Solutions',
      slug: 'stock-market-software',
      short_description: 'Real-time tools, charting feeds, and analytics for smarter trading and informed market decisions.',
      features: [
        { title: 'Real-time Market Data' },
        { title: 'Technical Analysis Tools' },
        { title: 'Risk Management' },
      ],
    },
    {
      id: '3',
      title: 'ERP Solutions for Enterprises',
      slug: 'erp-solutions',
      short_description: 'Streamline operations, reduce overhead costs, and improve productivity with unified enterprise systems.',
      features: [
        { title: 'Financial Management' },
        { title: 'HR & Payroll' },
        { title: 'Supply Chain' },
      ],
    },
    {
      id: '4',
      title: 'AI & Automation Services',
      slug: 'ai-automation',
      short_description: 'Intelligent automation and AI solutions tailored to your complex business workflows.',
      features: [
        { title: 'Process Automation' },
        { title: 'Predictive Analytics' },
        { title: 'Chatbots & NLP' },
      ],
    },
  ];

  const itemsToRender = services && services.length > 0 ? services : defaultServices;

  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Reveal direction="up">
          <SectionHeading
            title="Software Solutions & Engineering"
            highlightText="Solutions"
            subtitle="Custom engineered software solutions designed to transform enterprise operations and accelerate digital growth."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {itemsToRender.map((service: any, index: number) => {
            const features = Array.isArray(service.features) ? service.features : [];
            return (
              <Reveal key={service.id || index} direction="up" delay={index * 0.1}>
                <Card className="h-full flex flex-col justify-between overflow-hidden bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl group">
                  {service.thumbnail_url && (
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-[#edf7f2]">
                      <Image
                        src={service.thumbnail_url}
                        alt={service.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {!service.thumbnail_url && (
                        <div className="w-12 h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                          <Boxes className="w-6 h-6" />
                        </div>
                      )}

                      <h3 className="text-xl font-extrabold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors">
                        {service.title}
                      </h3>

                    <p className="text-xs text-gray-600 leading-relaxed mb-6">
                      {service.short_description}
                    </p>

                    {features.length > 0 && (
                      <div className="space-y-2 mb-6 pt-4 border-t border-gray-100">
                        {features.map((feat: any, fIdx: number) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span>{feat.title || feat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <Link
                      href={`/solutions/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors"
                    >
                      <span>Explore Solution Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link href="/contact">
                      <Button variant="outline" size="sm" className="text-xs font-bold">
                        Consult Expert
                      </Button>
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}
