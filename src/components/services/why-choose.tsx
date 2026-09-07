'use client';

import { Sparkles, ShieldCheck, Layers, Headphones, TrendingUp } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

interface WhyChooseProps {
  data?: {
    title?: string;
    benefits?: Array<{
      icon?: any;
      title: string;
      description: string;
    }>;
  };
}

export function WhyChoose({ data }: WhyChooseProps) {
  const defaultPropositions = [
    {
      icon: Sparkles,
      iconBg: 'bg-pink-100 text-[#e6005c]',
      title: 'AI-Driven Technology',
      description: 'Intelligent systems that learn and adapt',
    },
    {
      icon: ShieldCheck,
      iconBg: 'bg-emerald-100 text-emerald-700',
      title: '100% Secure & Compliant',
      description: 'Enterprise-grade security and data protection',
    },
    {
      icon: Layers,
      iconBg: 'bg-amber-100 text-amber-700',
      title: 'Custom-Built Solutions',
      description: 'Tailored specifically to your business needs',
    },
    {
      icon: Headphones,
      iconBg: 'bg-purple-100 text-purple-700',
      title: '24/7 Dedicated Support',
      description: 'Round-the-clock expert technical assistance',
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-teal-100 text-teal-700',
      title: 'Proven Track Record',
      description: 'Trusted by 1000+ businesses across India',
    },
  ];

  const itemsToRender =
    data?.benefits && data.benefits.length >= 5
      ? data.benefits.map((b, idx) => ({
          icon: defaultPropositions[idx]?.icon || Sparkles,
          iconBg: defaultPropositions[idx]?.iconBg || 'bg-emerald-100 text-emerald-700',
          title: b.title,
          description: b.description,
        }))
      : defaultPropositions;

  return (
    <section className="py-4 sm:py-6 pb-8 sm:pb-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50/50 via-slate-50/70 to-teal-50/40 rounded-2xl sm:rounded-3xl p-3.5 sm:p-6 border border-emerald-100/90 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 sm:gap-4 lg:gap-6">
            {itemsToRender.map((item, index) => {
              const IconComponent = item.icon;

              return (
                <Reveal key={index} direction="up" delay={index * 0.05}>
                  <div
                    className={`flex items-center sm:items-start gap-3 p-3 rounded-xl bg-white sm:bg-transparent border border-gray-100 sm:border-0 shadow-2xs sm:shadow-none h-full ${
                      index === 4 ? 'sm:col-span-2 lg:col-span-1' : ''
                    }`}
                  >
                    <div
                      className={`w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-full ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-xs`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">{item.title}</h4>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed mt-0.5">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

