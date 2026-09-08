'use client';

import { useRef, useState, useEffect } from 'react';
import { Search, FileText, Code2, Rocket, Headphones, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const defaultSteps = [
    {
      number: '01',
      title: 'Discover',
      description: 'We understand your business and goals',
      icon: Search,
      iconColor: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      number: '02',
      title: 'Plan',
      description: 'We create a roadmap tailored to your needs',
      icon: FileText,
      iconColor: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      number: '03',
      title: 'Develop',
      description: 'We build with quality, security and scalability',
      icon: Code2,
      iconColor: 'bg-purple-50 text-purple-600 border-purple-200',
    },
    {
      number: '04',
      title: 'Deploy',
      description: 'We ensure smooth launch and onboarding',
      icon: Rocket,
      iconColor: 'bg-pink-50 text-[#e6005c] border-pink-200',
    },
    {
      number: '05',
      title: 'Support',
      description: 'We support and scale as you grow',
      icon: Headphones,
      iconColor: 'bg-teal-50 text-teal-700 border-teal-200',
    },
  ];

  const stepsToRender =
    data?.steps && data.steps.length >= 5
      ? data.steps.map((s, idx) => ({
          number: s.number < 10 ? `0${s.number}` : `${s.number}`,
          title: s.title,
          description: s.description,
          icon: defaultSteps[idx]?.icon || Search,
          iconColor: defaultSteps[idx]?.iconColor || 'bg-emerald-50 text-emerald-600 border-emerald-200',
        }))
      : defaultSteps;

  // Auto-scroll loop on mobile (advances steps every 2.5 seconds, pauses on hover/touch)
  useEffect(() => {
    if (isPaused || stepsToRender.length <= 1) return;
    const interval = setInterval(() => {
      if (!scrollContainerRef.current) return;
      const container = scrollContainerRef.current;
      const cardWidth = 185;
      const maxScroll = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPaused, stepsToRender.length]);

  return (
    <section className="py-8 md:py-10 bg-white relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8 sm:mb-10">
          <Reveal direction="up">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e6005c] block mb-2">
              OUR PROCESS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Our Proven Approach to <br className="hidden sm:inline" />
              Delivering Excellence.
            </h2>
          </Reveal>

          {/* Mobile Swipe Hint */}
          <div className="flex md:hidden items-center gap-1 text-xs text-slate-400 font-medium pb-1">
            <span>Auto / Swipe</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#e6005c]" />
          </div>
        </div>

        {/* Mobile View (< md): Parallel Clean Steps Matching Desktop Icon Style with Auto-Move & Hover-Pause */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex md:hidden items-center overflow-x-auto gap-2 pb-4 pt-1 snap-x snap-mandatory scroll-smooth -mx-4 px-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {stepsToRender.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <div key={index} className="flex items-center flex-shrink-0 snap-center">
                {/* Step Item (Clean, unboxed matching desktop) */}
                <div className="flex flex-col items-center text-center w-[165px] p-2.5">
                  <div
                    className={`w-13 h-13 rounded-2xl border flex items-center justify-center mb-3 shadow-xs ${step.iconColor}`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                    {step.number}. {step.title}
                  </h4>

                  <p className="text-xs text-slate-500 leading-relaxed max-w-[145px]">
                    {step.description}
                  </p>
                </div>

                {/* Arrow pointing to next step */}
                {index < stepsToRender.length - 1 && (
                  <div className="flex items-center justify-center px-0.5 text-gray-300 flex-shrink-0">
                    <ChevronRight className="w-4 h-4 text-gray-300 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop View (md+): Original Clean 5-Step Horizontal Flow */}
        <div className="hidden md:flex items-center justify-between gap-6 relative">
          {stepsToRender.map((step, index) => {
            const IconComponent = step.icon;

            return (
              <div key={index} className="flex items-center flex-1">
                <Reveal direction="up" delay={index * 0.1} className="w-full">
                  <div className="flex flex-col items-center text-center p-4 bg-white rounded-2xl hover:bg-slate-50/70 transition-colors group">
                    {/* Icon Container */}
                    <div
                      className={`w-14 h-14 rounded-2xl border flex items-center justify-center mb-4 shadow-xs ${step.iconColor} group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* Step Title with Number */}
                    <h4 className="text-sm font-bold text-slate-900 mb-1">
                      {step.number}. {step.title}
                    </h4>

                    {/* Description */}
                    <p className="text-xs text-slate-500 leading-relaxed max-w-[180px]">
                      {step.description}
                    </p>
                  </div>
                </Reveal>

                {/* Arrow Divider between steps for Desktop */}
                {index < stepsToRender.length - 1 && (
                  <div className="flex items-center justify-center px-1 text-gray-300 flex-shrink-0">
                    <ChevronRight className="w-5 h-5 text-gray-300 stroke-[2.5]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

