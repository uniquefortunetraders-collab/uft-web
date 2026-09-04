'use client';

import { ShieldCheck, Settings, Users, Headphones, Award } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/animations/reveal';

interface WhyChooseProps {
  data?: {
    title?: string;
    benefits?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  };
}

export function WhyChoose({ data }: WhyChooseProps) {
  const defaultBenefits = [
    {
      icon: ShieldCheck,
      title: '100% Secure',
      description: 'Your data is safe with enterprise grade security.',
    },
    {
      icon: Settings,
      title: 'Custom Solutions',
      description: 'Tailored software that fits your exact business needs.',
    },
    {
      icon: Users,
      title: 'Expert Team',
      description: '15+ years of experience across multiple domains.',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: "We're with you at every step of your journey.",
    },
    {
      icon: Award,
      title: 'Proven Results',
      description: 'Trusted by 1000+ businesses across India.',
    },
  ];

  const benefitsToRender = data?.benefits && data.benefits.length > 0 ? data.benefits : defaultBenefits;

  return (
    <section className="py-12 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#e4f3e7] rounded-3xl p-8 md:p-12 border border-emerald-200/60 shadow-sm">
          
          <Reveal direction="up">
            <SectionHeading
              title="Why Businesses Choose UniqueAI?"
              highlightText="UniqueAI?"
              align="center"
              className="mb-10"
            />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {benefitsToRender.map((item, index) => {
              const IconComponent =
                typeof item.icon === 'function' || typeof item.icon === 'object'
                  ? (item.icon as any)
                  : index === 0
                  ? ShieldCheck
                  : index === 1
                  ? Settings
                  : index === 2
                  ? Users
                  : index === 3
                  ? Headphones
                  : Award;

              return (
                <Reveal key={index} direction="up" delay={index * 0.08}>
                  <div className="flex flex-col items-center text-center p-4 bg-white/70 rounded-2xl border border-emerald-100 backdrop-blur-xs h-full hover:bg-white transition-colors">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-xs text-gray-600 leading-normal">{item.description}</p>
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
