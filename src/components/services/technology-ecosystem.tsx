'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Check, Boxes } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';
import { Service } from '@/types/database';

interface TechnologyEcosystemProps {
  services?: Service[];
}

const DEFAULT_ECOSYSTEM_SERVICES = [
  {
    id: 'e-commerce',
    title: 'E-Commerce Development',
    slug: 'e-commerce-development',
    description:
      'Build powerful, scalable and secure online stores with modern features that enhance customer experience and boost sales.',
    features: [
      'Secure Payment Integrations',
      'Product Catalog Management',
      'Inventory Synchronization',
      'AI-based Recommendations',
      'Mobile Responsive Design',
    ],
    cta_label: 'Explore E-Commerce',
    cta_color: 'emerald',
    thumbnail_url: '/services/ecommerce-showcase.jpg',
  },
  {
    id: 'stock-market',
    title: 'Stock Market Software Solutions',
    slug: 'stock-market-software',
    description:
      'Advanced trading tools and market intelligence systems for traders, brokers and market educators.',
    features: [
      'Option Chain Analyzers',
      'Live Market Feed APIs',
      'Automated Order Execution',
      'Charting & Technical Analysis',
      'Trading Signal Generators',
    ],
    cta_label: 'Explore Market Solutions',
    cta_color: 'rose',
    thumbnail_url: '/services/stockmarket-showcase.jpg',
  },
  {
    id: 'erp-solutions',
    title: 'ERP Solutions for Enterprises',
    slug: 'erp-solutions',
    description:
      'Unify your business operations with our feature-rich ERP software built for companies of all sizes.',
    features: [
      'Centralized Business Management',
      'Real-time Reporting & Dashboards',
      'CRM, Payroll & Inventory Integration',
      'Customizable Modules',
      'Scalable for SMEs & Enterprises',
    ],
    cta_label: 'Explore ERP Solutions',
    cta_color: 'emerald',
    thumbnail_url: '/services/erp-showcase.jpg',
  },
];

const DEFAULT_FALLBACK_FEATURES = [
  'Secure Payment Integrations',
  'Product Catalog Management',
  'Inventory Synchronization',
  'AI-based Recommendations',
  'Mobile Responsive Design',
];

export function TechnologyEcosystem({ services }: TechnologyEcosystemProps) {
  const hasDbServices = services && services.length > 0;

  // Use CMS services if available, otherwise fall back to default rich showcases
  const solutionsToRender = hasDbServices
    ? services.slice(0, 3).map((s, idx) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        description:
          s.short_description ||
          s.description ||
          DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length]?.description ||
          'Build powerful, scalable and secure digital solutions with modern features that enhance customer experience.',
        thumbnail_url:
          s.thumbnail_url ||
          DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length]?.thumbnail_url,
        features:
          s.features && (s.features as any[]).length > 0
            ? (s.features as any[]).map((f: any) =>
                typeof f === 'string' ? f : f.title || f.name || String(f)
              )
            : DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length]?.features ||
              DEFAULT_FALLBACK_FEATURES,
        cta_label:
          s.cta_label ||
          DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length]?.cta_label ||
          `Explore ${s.title.split(' ')[0]}`,
        cta_color:
          (DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length]
            ?.cta_color as 'emerald' | 'rose') || (idx === 1 ? 'rose' : 'emerald'),
      }))
    : DEFAULT_ECOSYSTEM_SERVICES;

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <Reveal direction="up">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e6005c] block mb-2">
              OUR CORE SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Complete Technology Solutions <br className="hidden sm:inline" />
              for Modern Businesses <span className="text-[#e6005c]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              From digital commerce to enterprise systems and market technology – we build solutions
              that solve real problems and create real impact.
            </p>
          </Reveal>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutionsToRender.map((solution, index) => {
            const isRose = solution.cta_color === 'rose';

            return (
              <Reveal key={solution.id || solution.slug || index} direction="up" delay={index * 0.1}>
                <div className="h-full flex flex-col bg-white rounded-[28px] border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 overflow-hidden group">

                  {/* Top Showcase Area - Image Fills 100% of the header */}
                  <div className="h-60 sm:h-64 w-full bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    {solution.thumbnail_url ? (
                      <Image
                        src={solution.thumbnail_url}
                        alt={solution.title}
                        fill
                        unoptimized
                        priority={index === 0}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 400px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center p-4">
                        <DeviceShowcaseMockup title={solution.title} />
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-7 sm:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Title */}
                      <h3 className={`text-2xl font-black text-slate-900 mb-3 tracking-tight leading-snug transition-colors ${isRose ? 'group-hover:text-[#e6005c]' : 'group-hover:text-emerald-700'}`}>
                        {solution.title}
                      </h3>

                      {/* Description */}
                      {solution.description && (
                        <p className="text-xs sm:text-[13px] text-slate-500 leading-relaxed mb-6 font-normal">
                          {solution.description}
                        </p>
                      )}

                      {/* Feature Points List with Color-coded Circle Checkmarks */}
                      {solution.features && solution.features.length > 0 && (
                        <ul className="space-y-3 mb-8">
                          {solution.features.map((feature: string, fIdx: number) => (
                            <li
                              key={fIdx}
                              className="flex items-center gap-2.5 text-xs sm:text-[13px] text-slate-700 font-medium"
                            >
                              <div
                                className={`w-4 h-4 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-2xs ${
                                  isRose ? 'bg-[#e6005c]' : 'bg-emerald-500'
                                }`}
                              >
                                <Check className="w-2.5 h-2.5 stroke-[3.5]" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* Call to Action Button */}
                    <div className="mt-auto pt-2">
                      <Link
                        href={`/solutions/${solution.slug}`}
                        className={`w-full py-3.5 px-6 rounded-full border text-xs sm:text-sm font-bold flex items-center justify-between transition-all duration-200 group/btn shadow-2xs ${
                          isRose
                            ? 'border-pink-300/80 bg-[#fff0f5] hover:bg-[#ffe6ef] text-[#e6005c]'
                            : 'border-emerald-300/80 bg-[#f0faf5] hover:bg-[#e2f5ec] text-emerald-700'
                        }`}
                      >
                        <span>{solution.cta_label}</span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform group-hover/btn:translate-x-1 ${
                            isRose ? 'text-[#e6005c]' : 'text-emerald-600'
                          }`}
                        />
                      </Link>
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

/**
 * Realistic Laptop & Mobile Device Showcase Mockup
 * Matches the reference image's mint background with central laptop and front phone
 */
function DeviceShowcaseMockup({ title }: { title: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center select-none pointer-events-none">
      {/* Background radial glow */}
      <div className="absolute w-44 h-44 rounded-full bg-emerald-300/20 blur-2xl" />

      <div className="relative flex items-center justify-center w-full max-w-[280px] h-full">
        {/* Central Laptop Mockup */}
        <div className="relative z-10 w-48 sm:w-52 bg-slate-900 rounded-t-xl pt-1.5 px-1.5 pb-0 shadow-2xl border border-slate-700/70">
          {/* Laptop Top Bezel & Camera */}
          <div className="flex items-center justify-between px-2 py-0.5 bg-slate-800/90 rounded-t-md mb-1">
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
            </div>
            <div className="w-14 h-1 bg-slate-700 rounded-full" />
            <div className="w-1.5 h-1.5 rounded-full bg-slate-600" />
          </div>

          {/* Laptop Screen Viewport */}
          <div className="bg-[#0c1613] rounded-b-sm p-2 text-white space-y-1.5 h-26 overflow-hidden">
            {/* Store / App Banner */}
            <div className="h-9 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-950 rounded p-1.5 flex items-center justify-between border border-emerald-900/40">
              <div className="space-y-0.5 min-w-0 flex-1">
                <div className="text-[7.5px] font-black text-emerald-400 truncate">
                  {title}
                </div>
                <div className="text-[5.5px] text-slate-400">Enterprise Digital Store</div>
              </div>
              <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-[7px] text-emerald-300 font-bold ml-1 flex-shrink-0">
                ✓
              </div>
            </div>

            {/* Catalog Grid Cards */}
            <div className="grid grid-cols-3 gap-1 pt-0.5">
              <div className="h-11 bg-slate-800/90 rounded border border-slate-700/60 p-1 flex flex-col justify-between">
                <div className="w-full h-4 bg-emerald-900/40 rounded" />
                <div className="w-7 h-1 bg-slate-500 rounded-full" />
                <div className="w-4 h-1 bg-emerald-400 rounded-full" />
              </div>
              <div className="h-11 bg-slate-800/90 rounded border border-slate-700/60 p-1 flex flex-col justify-between">
                <div className="w-full h-4 bg-emerald-900/40 rounded" />
                <div className="w-7 h-1 bg-slate-500 rounded-full" />
                <div className="w-4 h-1 bg-emerald-400 rounded-full" />
              </div>
              <div className="h-11 bg-slate-800/90 rounded border border-slate-700/60 p-1 flex flex-col justify-between">
                <div className="w-full h-4 bg-emerald-900/40 rounded" />
                <div className="w-7 h-1 bg-slate-500 rounded-full" />
                <div className="w-4 h-1 bg-emerald-400 rounded-full" />
              </div>
            </div>
          </div>

          {/* Laptop Aluminum Base */}
          <div className="w-56 -ml-4 h-2 bg-gradient-to-b from-slate-400 to-slate-600 rounded-b-lg shadow-lg border-t border-slate-300" />
        </div>

        {/* Smartphone Mockup (Front Left) */}
        <div className="absolute -left-1 bottom-3 z-20 w-22 bg-white rounded-2xl p-1 shadow-2xl border border-slate-200 transform -rotate-2">
          {/* Speaker ear piece */}
          <div className="w-5 h-1 bg-slate-300 rounded-full mx-auto mb-1" />
          <div className="bg-slate-50 rounded-xl p-1.5 space-y-1">
            <div className="flex items-center justify-between">
              <div className="w-3.5 h-3.5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[7px] text-emerald-600 font-bold">
                ●
              </div>
              <div className="text-[6px] font-bold text-emerald-600 bg-emerald-50 px-1 py-0.5 rounded-full">
                Active
              </div>
            </div>
            <div className="w-12 h-1 bg-slate-800 rounded-full mt-0.5" />
            <div className="w-8 h-1 bg-slate-300 rounded-full" />
            <div className="h-5 bg-emerald-100/70 rounded-md border border-emerald-200 flex items-center justify-center text-[7px] font-black text-emerald-800">
              $48,920
            </div>
            <div className="space-y-0.5 pt-0.5">
              <div className="flex justify-between items-center text-[5.5px] text-slate-500 font-semibold">
                <span>Growth</span>
                <span className="text-emerald-600 font-bold">+24.8%</span>
              </div>
              <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full w-4/5" />
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Tablet Screen (Back Right) */}
        <div className="absolute right-0 top-6 z-0 w-20 bg-slate-800 rounded-xl p-1 shadow-lg border border-slate-700 transform rotate-4">
          <div className="bg-slate-900 rounded-lg p-1 space-y-1">
            <div className="w-10 h-1 bg-slate-600 rounded-full" />
            <div className="grid grid-cols-2 gap-0.5">
              <div className="h-5 bg-emerald-950/90 rounded border border-emerald-800/40" />
              <div className="h-5 bg-slate-800 rounded border border-slate-700" />
              <div className="h-5 bg-slate-800 rounded border border-slate-700" />
              <div className="h-5 bg-emerald-950/90 rounded border border-emerald-800/40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
