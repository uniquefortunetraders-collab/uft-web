'use client';

import { ArrowRight } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Reveal } from '@/components/animations/reveal';

interface ProcessStepsProps {
  data?: {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
}

export function ProcessSteps({ data }: ProcessStepsProps) {
  const defaultSteps = [
    {
      number: 1,
      title: 'Discover',
      description: 'We understand your business goals.',
    },
    {
      number: 2,
      title: 'Plan',
      description: 'We create a roadmap tailored to your needs.',
    },
    {
      number: 3,
      title: 'Design',
      description: 'We design intuitive and engaging experiences.',
    },
    {
      number: 4,
      title: 'Develop',
      description: 'We build with quality, security and scalability.',
    },
    {
      number: 5,
      title: 'Deploy & Support',
      description: 'We deploy smoothly and support your growth.',
    },
  ];

  const stepsToRender = data?.steps && data.steps.length > 0 ? data.steps : defaultSteps;

  return (
    <section className="py-16 md:py-24 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Our Proven Process"
            highlightText="Proven"
            subtitle="From idea to impact — we build technology that drives real results."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
          {stepsToRender.map((step, index) => {
            const numFormatted = step.number < 10 ? `0${step.number}` : `${step.number}`;
            return (
              <Reveal key={step.number || index} direction="up" delay={index * 0.1}>
                <div className="flex flex-col items-center text-center relative group">
                  
                  {/* Pink Badge Number Pill */}
                  <div className="w-10 h-10 rounded-full bg-pink-100 border-2 border-pink-400 text-pink-600 font-extrabold text-sm flex items-center justify-center mb-4 shadow-xs group-hover:bg-pink-500 group-hover:text-white transition-all">
                    {numFormatted}
                  </div>

                  {/* Connecting Arrow for Desktop */}
                  {index < stepsToRender.length - 1 && (
                    <div className="hidden md:block absolute top-5 left-[60%] w-[80%] z-0 text-emerald-300 pointer-events-none">
                      <ArrowRight className="w-5 h-5 mx-auto text-emerald-400 opacity-60" />
                    </div>
                  )}

                  {/* Step Title */}
                  <h4 className="text-base font-bold text-gray-900 mb-1.5">{step.title}</h4>

                  {/* Step Description */}
                  <p className="text-xs text-gray-600 leading-normal max-w-xs">{step.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
