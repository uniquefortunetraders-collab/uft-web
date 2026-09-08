'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Check,
  MessageCircle,
  ArrowRight,
  MapPin,
  Sparkles,
  Zap,
  Server,
  TrendingUp,
  ShieldCheck,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Reveal } from '@/components/animations/reveal';
import { Project } from '@/types/database';

interface PricingPlansProps {
  products?: Project[];
  whatsapp?: string;
}

const DEFAULT_PLANS = [
  {
    id: 'plan-1',
    title: 'Manual Algo',
    category: 'Most Popular for Starters',
    client_name: '₹999',
    outcome_description: '+ GST',
    short_description: 'Best for beginners to learn signals & manual execution. One-time setup support.',
    tech_stack: ['TradingView Signals', 'WhatsApp Support', 'Beginner Friendly'],
    live_url: '/contact',
    challenge_description: 'Hello, I want to enquire about Manual Algo (₹999 + GST)',
    thumbnail_url: '/products/manual-algo.jpg',
    is_featured: false,
    is_published: true,
  },
  {
    id: 'plan-2',
    title: 'Auto Without Server',
    category: 'BEST VALUE',
    client_name: '₹3,999',
    outcome_description: '/ year',
    short_description: 'Fully automated on your system. No monthly server cost. Ideal for employees.',
    tech_stack: ['100% Auto Trading', 'No Server Needed', 'For Working Professionals'],
    live_url: '/contact',
    challenge_description: 'Hello, I want to enquire about Auto Without Server (₹3,999 / year)',
    thumbnail_url: '/products/auto-without-server.jpg',
    is_featured: true,
    is_published: true,
  },
  {
    id: 'plan-3',
    title: 'Auto With Server',
    category: 'Fully Hands-Free',
    client_name: '₹6,000',
    outcome_description: '+ GST / year',
    short_description: 'Hands-free trading on cloud server. Zero hassle, we manage everything.',
    tech_stack: ['Cloud Server Included', 'Zero Monitoring', 'For Housewives & Busy Users'],
    live_url: '/contact',
    challenge_description: 'Hello, I want to enquire about Auto With Server (₹6,000 + GST / year)',
    thumbnail_url: '/products/auto-with-server.jpg',
    is_featured: false,
    is_published: true,
  },
];

export function PricingPlans({
  products = [],
  whatsapp = '+919447077076',
}: PricingPlansProps) {
  const cleanWhatsapp = whatsapp.replace(/[^0-9]/g, '');

  const itemsToRender =
    products && products.length > 0
      ? products.map((p, idx) => ({
          ...p,
          thumbnail_url:
            p.thumbnail_url ||
            DEFAULT_PLANS[idx % DEFAULT_PLANS.length]?.thumbnail_url ||
            '/products/auto-without-server.jpg',
        }))
      : DEFAULT_PLANS;

  const cardStyles = [
    {
      cardBg: 'bg-gradient-to-b from-[#eef9f3] via-white to-[#f8fdfa]',
      border: 'border border-emerald-200/90 shadow-lg shadow-emerald-900/5 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-600/10',
      badgeBg: 'bg-emerald-600 text-white shadow-emerald-600/30',
      iconBg: 'bg-emerald-100 text-emerald-700',
      checkBg: 'bg-emerald-500 text-white',
      tagColor: 'text-emerald-700',
      accentGlow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      glowRing: 'ring-emerald-400/20',
    },
    {
      cardBg: 'bg-gradient-to-b from-[#eaf4ff] via-white to-[#f4f9ff]',
      border: 'border-2 border-emerald-500 shadow-2xl shadow-emerald-500/15 ring-4 ring-emerald-500/15',
      badgeBg: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-emerald-600/30',
      iconBg: 'bg-emerald-100 text-emerald-700',
      checkBg: 'bg-emerald-600 text-white',
      tagColor: 'text-emerald-700',
      accentGlow: 'from-cyan-500/25 via-emerald-500/15 to-transparent',
      glowRing: 'ring-emerald-500/30',
    },
    {
      cardBg: 'bg-gradient-to-b from-[#fff0f5] via-white to-[#fffafc]',
      border: 'border border-pink-200/90 shadow-lg shadow-pink-900/5 hover:border-[#e6005c]/50 hover:shadow-xl hover:shadow-pink-600/10',
      badgeBg: 'bg-[#e6005c] text-white shadow-pink-500/30',
      iconBg: 'bg-pink-100 text-[#e6005c]',
      checkBg: 'bg-[#e6005c] text-white',
      tagColor: 'text-[#e6005c]',
      accentGlow: 'from-pink-500/20 via-rose-500/10 to-transparent',
      glowRing: 'ring-pink-400/20',
    },
  ];

  return (
    <section id="pricing" className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#eaf8f1] via-[#f1faf5] to-white relative overflow-hidden w-full max-w-full">
      
      {/* Dynamic Luminous Ambient Halo Glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-200/35 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-pink-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-teal-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <Reveal direction="up" className="max-w-2xl">
            
            {/* Category Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-emerald-300/80 text-emerald-900 text-xs font-bold shadow-xs mb-3.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>TRANSPARENT &amp; PROVEN SOFTWARE SUITE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
              Choose Your <span className="text-[#e6005c]">Plan .</span>
            </h2>

            <p className="mt-3 text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
              Explore proven algorithmic trading solutions designed for seamless automation and consistent market execution.
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 shadow-sm text-xs sm:text-sm font-bold text-slate-800 self-start md:self-auto">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <MapPin className="w-4 h-4 text-[#e6005c]" />
              <span>Cochin • GST Registered</span>
            </div>
          </Reveal>
        </div>

        {/* Modern Visual Product Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {itemsToRender.map((plan, index) => {
            const features = plan.tech_stack
              ? Array.isArray(plan.tech_stack)
                ? plan.tech_stack
                : String(plan.tech_stack).split(',')
              : [];

            const isBestValue =
              plan.is_featured ||
              plan.category?.toLowerCase().includes('best value') ||
              index === 1;

            const priceDisplay = plan.client_name || '₹999';
            const periodDisplay = plan.outcome_description || '+ GST';
            const badgeText =
              plan.category ||
              (index === 0
                ? 'Most Popular for Starters'
                : index === 1
                ? 'BEST VALUE'
                : 'Fully Hands-Free');

            const style = cardStyles[index % cardStyles.length];

            const enquireMessage = encodeURIComponent(
              plan.challenge_description ||
                `Hello, I would like to buy/enquire about ${plan.title} (${priceDisplay} ${periodDisplay})`
            );

            return (
              <Reveal
                key={plan.id || index}
                direction="up"
                delay={index * 0.12}
                className="h-full flex"
              >
                <div
                  className={`w-full flex flex-col justify-between rounded-[32px] overflow-hidden p-2 sm:p-2.5 ${style.cardBg} ${style.border} transition-all duration-300 relative group ${
                    isBestValue
                      ? 'lg:-translate-y-2 lg:hover:-translate-y-3'
                      : 'hover:-translate-y-1.5'
                  }`}
                >
                  
                  {/* Subtle Top Ambient Glow Backing */}
                  <div className={`absolute top-0 inset-x-0 h-40 bg-gradient-to-b ${style.accentGlow} pointer-events-none rounded-t-[32px] -z-0`} />

                  {/* Inner Frame for Image with Smooth Bending & Curves */}
                  <div className="relative rounded-[24px] overflow-hidden bg-slate-950 border border-slate-800/60 shadow-inner z-10">
                    <div className="h-52 sm:h-60 w-full relative overflow-hidden flex items-center justify-center">
                      {plan.thumbnail_url ? (
                        <Image
                          src={plan.thumbnail_url}
                          alt={plan.title}
                          fill
                          unoptimized
                          priority={index === 1}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-emerald-800 via-teal-900 to-slate-900 flex items-center justify-center p-4">
                          <span className="text-white text-lg font-black">{plan.title}</span>
                        </div>
                      )}

                      {/* Smooth Multi-Stop Gradient Transition Overlay on Image */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-black/30 pointer-events-none" />

                      {/* Floating Glass Badge on top of image */}
                      <div className="absolute top-3.5 left-3.5 z-10">
                        <span
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-lg backdrop-blur-md ${style.badgeBg}`}
                        >
                          {isBestValue && <Flame className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />}
                          <span>{badgeText}</span>
                        </span>
                      </div>

                      {/* Bottom overlay title in photo */}
                      <div className="absolute bottom-3 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2 text-white">
                        <span className="text-base sm:text-lg font-black drop-shadow-md truncate min-w-0">
                          {plan.title}
                        </span>
                        <span className="text-[11px] font-extrabold text-emerald-300 bg-slate-900/85 border border-emerald-500/30 backdrop-blur-md px-2.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                          ⚡ Active Algo
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price Section */}
                      <div className="flex items-baseline justify-between gap-2 pb-4 border-b border-slate-100">
                        <div className="flex items-baseline gap-1.5">
                          <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                            {priceDisplay}
                          </span>
                          {periodDisplay && (
                            <span className="text-xs sm:text-sm font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                              {periodDisplay}
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>Instant Live</span>
                        </div>
                      </div>

                      {/* Description */}
                      {plan.short_description && (
                        <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mt-4 font-normal min-h-[40px]">
                          {plan.short_description}
                        </p>
                      )}

                      {/* Features List with Color-Coded Checkmarks */}
                      {features.length > 0 && (
                        <div className="mt-6 pt-4 border-t border-slate-100">
                          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-3">
                            Included Capabilities:
                          </div>
                          <ul className="space-y-2.5">
                            {features.map((f: string, fIdx: number) => (
                              <li
                                key={fIdx}
                                className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-800 font-semibold"
                              >
                                <div
                                  className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 shadow-2xs ${style.checkBg}`}
                                >
                                  <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                                </div>
                                <span>{f.trim()}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Dual Action CTA Buttons */}
                    <div className="pt-6 mt-6 border-t border-slate-100 space-y-2.5">
                      <div className="flex flex-row items-center gap-2 sm:gap-2.5">
                        {/* Buy Now Button (Hot Pink with Arrow - Single Line Guaranteed) */}
                        <Link
                          href={
                            plan.live_url ||
                            `/contact?plan=${encodeURIComponent(plan.title)}`
                          }
                          className="flex-1 min-w-0"
                        >
                          <Button
                            variant="primary"
                            size="md"
                            className="w-full justify-center gap-1.5 bg-[#e6005c] hover:bg-[#cc0052] text-white font-bold rounded-full py-3 sm:py-3.5 px-3 sm:px-4 shadow-md shadow-pink-500/25 text-xs sm:text-[13px] tracking-tight whitespace-nowrap transition-all group cursor-pointer"
                          >
                            <span className="whitespace-nowrap">Buy Now</span>
                            <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-0.5 transition-transform" />
                          </Button>
                        </Link>

                        {/* WhatsApp Enquire Button */}
                        <a
                          href={`https://wa.me/${cleanWhatsapp}?text=${enquireMessage}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 min-w-0 inline-flex items-center justify-center gap-1.5 px-3 sm:px-4 py-3 sm:py-3.5 rounded-full bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-800 hover:text-emerald-900 font-bold text-xs sm:text-[13px] tracking-tight whitespace-nowrap transition-all shadow-2xs text-center cursor-pointer"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600 shrink-0" />
                          <span className="whitespace-nowrap">Enquire</span>
                        </a>
                      </div>

                      {/* Trust Footnote */}
                      <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-600 font-medium text-center pt-1 whitespace-nowrap">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Setup Assistance &amp; 1-on-1 Onboarding</span>
                      </div>
                    </div>

                  </div>

                </div>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
