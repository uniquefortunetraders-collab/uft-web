'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';
import { Project } from '@/types/database';

interface FeaturedWorkProps {
  projects?: Project[];
}

export function FeaturedWork({ projects }: FeaturedWorkProps) {
  const defaultProjects = [
    {
      id: '1',
      title: 'Lifestyle Store',
      slug: 'lifestyle-store',
      category: 'E-Commerce',
      short_description:
        'Custom WooCommerce platform with AI recommendations and advanced analytics.',
      preview_type: 'ecommerce',
    },
    {
      id: '2',
      title: 'Trading Platform',
      slug: 'trading-platform',
      category: 'FinTech',
      short_description:
        'Real-time market data platform with advanced charts, analytics and automated signals.',
      preview_type: 'fintech',
    },
    {
      id: '3',
      title: 'ERP System',
      slug: 'erp-system',
      category: 'Enterprise',
      short_description:
        'Complete ERP solution for a manufacturing company with 20+ custom modules.',
      preview_type: 'erp',
    },
  ];

  const itemsToRender = projects && projects.length > 0 ? projects : defaultProjects;

  return (
    <section className="py-16 md:py-24 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <Reveal direction="up" className="w-full md:w-auto">
            <SectionHeading
              title="Our Work Speaks for Itself"
              highlightText="Work"
              align="left"
              className="mb-0"
            />
          </Reveal>
          <Reveal direction="left" delay={0.2}>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors mt-4 md:mt-0"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itemsToRender.map((project, index) => {
            const isFintech = project.category?.toLowerCase().includes('fintech') || (project as any).preview_type === 'fintech';
            const isEcommerce = project.category?.toLowerCase().includes('commerce') || (project as any).preview_type === 'ecommerce';

            return (
              <Reveal key={project.id || index} direction="up" delay={index * 0.1}>
                <Card className="h-full flex flex-col p-0 overflow-hidden bg-white border border-emerald-100 hover:border-emerald-300 transition-all group">
                  
                  {/* Image Container with Badge Overlay */}
                  <div className="relative h-52 w-full overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
                    
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <Badge variant={isFintech ? 'pink' : 'emerald'}>
                        {project.category}
                      </Badge>
                    </div>

                    {/* Simulated Screen Graphic for Portfolio item */}
                    {isEcommerce ? (
                      <div className="w-full h-full rounded-xl bg-emerald-100/70 border border-emerald-200 p-3 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-between text-[10px] font-bold text-emerald-800">
                          <span>STOREFRONT AI</span>
                          <span>₹4,999</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 my-auto">
                          <div className="bg-white p-2 rounded-lg shadow-xs text-center text-[10px] font-medium">Product A</div>
                          <div className="bg-white p-2 rounded-lg shadow-xs text-center text-[10px] font-medium">Product B</div>
                        </div>
                      </div>
                    ) : isFintech ? (
                      <div className="w-full h-full rounded-xl bg-gray-900 border border-gray-800 p-3 flex flex-col justify-between text-white group-hover:scale-105 transition-transform duration-300">
                        <div className="flex justify-between text-[9px] text-pink-400 font-mono">
                          <span>NIFTY 24950 C</span>
                          <span className="text-emerald-400">+42.8%</span>
                        </div>
                        {/* Candlestick / Area Sparkline */}
                        <svg className="w-full h-20 text-pink-500" viewBox="0 0 100 40">
                          <path d="M0 35 L20 28 L40 30 L60 15 L80 18 L100 5" fill="none" stroke="currentColor" strokeWidth="2.5" />
                        </svg>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex flex-col justify-between group-hover:scale-105 transition-transform duration-300">
                        <div className="flex items-center justify-between text-[10px] font-bold text-gray-700">
                          <span>ENTERPRISE ERP</span>
                          <span className="text-emerald-600">20+ Modules</span>
                        </div>
                        <div className="bg-white p-2.5 rounded-lg border border-gray-100 text-[10px] space-y-1">
                          <div className="flex justify-between"><span>Inventory</span><span className="font-bold">98%</span></div>
                          <div className="flex justify-between"><span>Logistics</span><span className="font-bold text-emerald-600">Active</span></div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {project.short_description}
                      </p>
                    </div>

                    <Link
                      href={`/work/${project.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mt-auto pt-2"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </Card>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
