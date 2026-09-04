'use client';

import { Smartphone, Cloud, BarChart3, Link2, Palette, Wrench } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/animations/reveal';

interface CoreCapabilitiesProps {
  capabilities?: Array<{
    icon?: string;
    title: string;
  }>;
}

export function CoreCapabilities({ capabilities }: CoreCapabilitiesProps) {
  const defaultCapabilities = [
    { icon: Smartphone, title: 'Web & Mobile Development' },
    { icon: Cloud, title: 'Cloud & DevOps Solutions' },
    { icon: BarChart3, title: 'Data Analytics & Reporting' },
    { icon: Link2, title: 'API & System Integrations' },
    { icon: Palette, title: 'UI/UX Design & Branding' },
    { icon: Wrench, title: 'Maintenance & Tech Support' },
  ];

  const itemsToRender = capabilities && capabilities.length > 0 ? capabilities : defaultCapabilities;

  return (
    <section className="py-14 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Our Core Capabilities"
            highlightText="Core"
            align="center"
          />
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {itemsToRender.map((item, index) => {
            const IconComponent =
              typeof item.icon === 'function' || typeof item.icon === 'object'
                ? (item.icon as any)
                : index === 0
                ? Smartphone
                : index === 1
                ? Cloud
                : index === 2
                ? BarChart3
                : index === 3
                ? Link2
                : index === 4
                ? Palette
                : Wrench;

            return (
              <Reveal key={index} direction="up" delay={index * 0.06}>
                <div className="bg-white p-5 rounded-2xl border border-emerald-100/90 text-center flex flex-col items-center justify-center hover:shadow-md hover:border-emerald-300 transition-all group h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-pink-50 group-hover:text-pink-600 transition-all">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h4 className="text-xs font-bold text-gray-800 leading-snug">{item.title}</h4>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
