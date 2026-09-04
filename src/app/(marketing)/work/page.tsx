import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';

export const metadata = {
  title: 'Our Case Studies & Work | UniqueAI',
  description: 'Explore selected software engineering, fintech, e-commerce, and ERP projects delivered by UniqueAI.',
};

export default async function WorkPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('is_published', true)
    .order('display_order', { ascending: true });

  const defaultProjects = [
    {
      id: '1',
      title: 'Lifestyle Store',
      slug: 'lifestyle-store',
      category: 'E-Commerce',
      short_description: 'Custom WooCommerce platform with AI recommendations and advanced analytics.',
    },
    {
      id: '2',
      title: 'Trading Platform',
      slug: 'trading-platform',
      category: 'FinTech',
      short_description: 'Real-time market data platform with advanced charts, analytics and automated signals.',
    },
    {
      id: '3',
      title: 'ERP System',
      slug: 'erp-system',
      category: 'Enterprise',
      short_description: 'Complete ERP solution for a manufacturing company with 20+ custom modules.',
    },
  ];

  const itemsToRender = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Our Work Speaks for Itself"
            highlightText="Work"
            subtitle="Selected case studies demonstrating engineered solutions across fintech, enterprise ERP, and e-commerce."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itemsToRender.map((project, index) => {
            const isFintech = project.category?.toLowerCase().includes('fintech');
            return (
              <Reveal key={project.id || index} direction="up" delay={index * 0.1}>
                <Card className="h-full flex flex-col p-0 overflow-hidden bg-white border border-emerald-100 hover:border-emerald-300 transition-all group">
                  <div className="relative h-48 w-full bg-gray-900 p-4 flex items-center justify-center">
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant={isFintech ? 'pink' : 'emerald'}>
                        {project.category}
                      </Badge>
                    </div>
                    <div className="text-white font-extrabold text-lg text-center font-mono">
                      {project.title}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {project.short_description}
                      </p>
                    </div>

                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mt-auto pt-2"
                    >
                      <span>View Full Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
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
