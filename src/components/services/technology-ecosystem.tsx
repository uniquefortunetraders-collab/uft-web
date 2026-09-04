'use client';

import Link from 'next/link';
import { ShoppingCart, BarChart2, Monitor, Cpu, ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/animations/reveal';
import { Service } from '@/types/database';

interface TechnologyEcosystemProps {
  services?: Service[];
}

export function TechnologyEcosystem({ services }: TechnologyEcosystemProps) {
  // Default fallback data matching the reference design exactly
  const defaultServices = [
    {
      title: 'E-Commerce Development',
      slug: 'e-commerce-development',
      short_description:
        'Scalable online stores that drive sales and deliver great customer experiences.',
      cta_label: 'Explore E-Commerce',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'Stock Market Software Solutions',
      slug: 'stock-market-software',
      short_description:
        'Real-time tools and analytics for smarter trading and informed market decisions.',
      cta_label: 'Explore Market Solutions',
      icon: BarChart2,
      iconBg: 'bg-pink-100 text-pink-700',
    },
    {
      title: 'ERP Solutions for Enterprises',
      slug: 'erp-solutions',
      short_description:
        'Streamline operations, reduce costs and improve productivity with unified systems.',
      cta_label: 'Explore ERP Solutions',
      icon: Monitor,
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
    {
      title: 'AI & Automation Services',
      slug: 'ai-automation',
      short_description:
        'Intelligent automation and AI solutions tailored to your business workflows.',
      cta_label: 'Explore AI Solutions',
      icon: Cpu,
      iconBg: 'bg-emerald-100 text-emerald-700',
    },
  ];

  const itemsToRender = services && services.length > 0 ? services : defaultServices;

  return (
    <section className="py-16 md:py-24 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Our Technology Ecosystem"
            highlightText="Technology"
            subtitle="Complete solutions for modern businesses, traders and enterprises."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {itemsToRender.map((item, index) => {
            const IconComponent =
              'icon' in item && item.icon
                ? (item.icon as any)
                : index === 1
                ? BarChart2
                : index === 2
                ? Monitor
                : index === 3
                ? Cpu
                : ShoppingCart;

            const iconBgClass =
              'iconBg' in item
                ? (item.iconBg as string)
                : index === 1
                ? 'bg-pink-100 text-pink-700'
                : 'bg-emerald-100 text-emerald-700';

            return (
              <Reveal key={item.slug || index} direction="up" delay={index * 0.1}>
                <Card className="h-full flex flex-col justify-between p-6 bg-white border border-emerald-100 hover:border-emerald-300 transition-all group">
                  <div>
                    {/* Icon Circle */}
                    <div
                      className={`w-14 h-14 rounded-2xl ${iconBgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      {item.short_description}
                    </p>
                  </div>

                  {/* CTA Link */}
                  <Link
                    href={`/solutions/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-pink-600 transition-colors group/link mt-auto pt-2"
                  >
                    <span>{item.cta_label || 'Explore Solutions'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </Card>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
