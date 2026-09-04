'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
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
  const eyebrow = content?.eyebrow || '1200+ Completed • Trusted by 1500+ Clients';
  const description =
    content?.description ||
    'UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.';
  const primaryLabel = content?.primary_cta_label || 'Explore Solutions';
  const primaryUrl = content?.primary_cta_url || '/solutions';
  const secondaryLabel = content?.secondary_cta_label || 'Talk to Our Experts';
  const secondaryUrl = content?.secondary_cta_url || '/contact';
  const heroImageUrl = content?.hero_image_url || '/hero-right-image.png';

  const trustLabels = content?.trust_labels || [
    'Secure',
    'Scalable',
    'Smart Automation',
    'Reliable Support',
  ];

  return (
    <section className="relative pt-6 pb-16 md:pt-10 md:pb-20 overflow-hidden bg-[#f1f8f3]">

      {/* Soft Ambient Light Pink & Mint Glow Background Accents */}
      <div className="absolute top-10 left-0 w-96 h-96 bg-emerald-100/70 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />
      <div className="absolute top-16 right-10 w-96 h-96 bg-pink-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Column: Text Content */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <Reveal direction="up" delay={0.1}>

              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100/90 border border-emerald-200 text-emerald-800 text-xs font-bold mb-4 shadow-sm shadow-pink-500/5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{eyebrow}</span>
              </div>

              {/* Main Heading with Soft Rose-Pink Gradient */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] font-sans">
                Technology That <br />
                <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 bg-clip-text text-transparent drop-shadow-sm">
                  Empowers Every <br />
                  Business
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl font-normal pt-2">
                {description}
              </p>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link href={primaryUrl}>
                  <Button variant="primary" size="lg" className="gap-2 bg-[#0b1e13] hover:bg-emerald-950 text-white font-bold rounded-2xl px-7 py-3.5 shadow-lg shadow-pink-500/20 hover:shadow-pink-500/35 border-0 group">
                    <span>{primaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-rose-400 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>

                <Link href={secondaryUrl}>
                  <Button variant="outline" size="lg" className="gap-2 bg-white/90 text-gray-800 border-emerald-200 hover:border-rose-300 hover:text-rose-600 font-bold rounded-2xl px-6 py-3.5 shadow-sm shadow-rose-500/10 group">
                    <span>{secondaryLabel}</span>
                    <ArrowRight className="w-4 h-4 text-rose-500 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-emerald-200/50 mt-8">
                {trustLabels.map((label, index) => (
                  <div key={index} className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{label}</span>
                  </div>
                ))}
              </div>

            </Reveal>
          </div>

          {/* Right Column: Hero Desktop Showcase */}
          <div className="lg:col-span-6 relative">
            <Reveal direction="left" delay={0.2}>
              <div className="relative mx-auto max-w-xl lg:max-w-none flex items-center justify-center">

                {/* Hero Desktop Image Showcase */}
                <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-rose-500/10 border border-emerald-100/80 bg-white">
                  <Image
                    src={heroImageUrl}
                    alt="UniqueAI Enterprise Technology Platform & Trading Workspace"
                    width={1200}
                    height={800}
                    priority
                    className="w-full h-auto object-contain transition-transform duration-700 hover:scale-[1.01]"
                  />
                </div>

              </div>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
