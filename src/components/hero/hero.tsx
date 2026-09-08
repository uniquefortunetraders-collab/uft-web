'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';

interface HeroProps {
  content?: {
    eyebrow?: string;
    title?: string;
    highlight_text?: string;
    description?: string;
    primary_cta_label?: string;
    primary_cta_url?: string;
    secondary_cta_label?: string;
    secondary_cta_url?: string;
    hero_image_url?: string;
    trust_labels?: string[];
  };
}

export function Hero({ content }: HeroProps) {
  const eyebrow = content?.eyebrow || 'SEBI Compliant • Trusted by 1000+ Clients';
  const description =
    content?.description ||
    'UniqueAI delivers innovative software, intelligent automation and market technology that help businesses grow, operate efficiently and stay ahead in a digital world.';
  const primaryLabel = content?.primary_cta_label || 'Explore Solutions';
  const primaryUrl = content?.primary_cta_url || '/solutions';
  const secondaryLabel = content?.secondary_cta_label || 'Talk to Our Experts';
  const secondaryUrl = content?.secondary_cta_url || '/contact';
  const heroImageUrl = content?.hero_image_url || '/algo-trading-hero.png';

  const trustLabels = content?.trust_labels || [
    'Secure',
    'Scalable',
    'Smart Automation',
    'Reliable Support',
  ];

  return (
    <section className="relative pt-6 pb-16 md:pt-12 md:pb-24 overflow-hidden bg-gradient-to-b from-[#eaf8f1] via-[#ddf4e8] to-[#ccefdc] w-full max-w-full">
      {/* Soft luminous ambient glows matching the reference */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-teal-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-10 w-[500px] h-[500px] bg-[#a7f3d0]/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Copy & CTAs (Order 2 on mobile, Order 1 on Desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            <Reveal direction="up" delay={0.1}>
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#d2f3e3] border border-emerald-300/70 text-emerald-900 text-xs font-semibold mb-3">
                <ShieldCheck className="w-4 h-4 text-emerald-700" />
                <span>{eyebrow}</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.14] sm:leading-[1.08] font-sans">
                Technology That <br />
                Empowers <span className="text-[#e6005c]">Every</span> <br />
                <span className="text-[#e6005c]">Business .</span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal pt-2">
                {description}
              </p>

              {/* CTA Buttons */}
              <div className="pt-3 flex flex-col sm:flex-row sm:items-center gap-3.5">
                <Link href={primaryUrl} className="w-full sm:w-auto">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto justify-center gap-2 bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold rounded-full px-7 py-3.5 shadow-md shadow-pink-500/25 border-0 group cursor-pointer"
                  >
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-white/90 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href={secondaryUrl} className="w-full sm:w-auto">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto justify-center gap-2 bg-white text-slate-800 border-gray-200 hover:border-pink-300 hover:text-[#e6005c] font-semibold rounded-full px-6 py-3.5 shadow-xs group cursor-pointer"
                  >
                    <span>{secondaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-[#e6005c] group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Checkmarks Row - Balanced 2x2 on Mobile, Flex Row on Desktop */}
              <div className="pt-4 sm:pt-6 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5 mt-2 sm:mt-4">
                {trustLabels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </Reveal>
          </div>

          {/* Right Column: Hero Graphic Image (Order 1 on mobile, Order 2 on Desktop) */}
          <div className="order-1 lg:order-2 block lg:col-span-6 relative mt-2 lg:mt-0 w-full flex items-center justify-center">
            <Reveal direction="left" delay={0.2} className="w-full">
              <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none flex items-center justify-center">
                <Image
                  src={heroImageUrl}
                  alt="Algo Trading Platform & Intelligent Automation"
                  width={650}
                  height={480}
                  priority
                  className="w-full h-auto max-h-[360px] sm:max-h-[440px] lg:max-h-[520px] object-contain"
                />
              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}

