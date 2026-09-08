'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Boxes, Sparkles } from 'lucide-react';
import { Service } from '@/types/database';

interface TechnologyEcosystemProps {
  services?: Service[];
}

interface ProcessedService {
  id: string;
  title: string;
  slug: string;
  category_badge: string;
  description: string;
  features: string[];
  cta_label: string;
  cta_color: 'emerald' | 'rose' | 'amber';
  thumbnail_url: string;
}

const DEFAULT_ECOSYSTEM_SERVICES: ProcessedService[] = [
  {
    id: 'e-commerce',
    title: 'E-Commerce Development',
    slug: 'e-commerce-development',
    category_badge: 'E-Commerce & Digital Stores',
    description:
      'Build powerful, scalable and secure online stores with modern features that enhance customer experience and boost sales.',
    features: [
      'Secure Payment Integrations',
      'Product Catalog Management',
      'Inventory Synchronization',
      'AI-based Recommendations',
      'Mobile Responsive Design',
    ],
    cta_label: 'Get Free Consultation',
    cta_color: 'emerald',
    thumbnail_url: '/services/ecommerce-showcase.jpg',
  },
  {
    id: 'stock-market',
    title: 'Stock Market Software Solutions',
    slug: 'stock-market-software',
    category_badge: 'Fintech & Trading Engines',
    description:
      'Advanced trading tools and market intelligence systems for traders, brokers and market educators.',
    features: [
      'Option Chain Analyzers',
      'Live Market Feed APIs',
      'Automated Order Execution',
      'Charting & Technical Analysis',
      'Trading Signal Generators',
    ],
    cta_label: 'Get Free Consultation',
    cta_color: 'rose',
    thumbnail_url: '/services/stockmarket-showcase.jpg',
  },
  {
    id: 'erp-solutions',
    title: 'ERP Solutions for Enterprises',
    slug: 'erp-solutions',
    category_badge: 'Enterprise Operations',
    description:
      'Unify your business operations with our feature-rich ERP software built for companies of all sizes.',
    features: [
      'Centralized Business Management',
      'Real-time Reporting & Dashboards',
      'CRM, Payroll & Inventory Integration',
      'Customizable Modules',
      'Scalable for SMEs & Enterprises',
    ],
    cta_label: 'Get Free Consultation',
    cta_color: 'amber',
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

  // Map incoming backend services to structured card data
  const solutionsToRender: ProcessedService[] = hasDbServices
    ? services.map((s, idx) => {
        const fallback = DEFAULT_ECOSYSTEM_SERVICES[idx % DEFAULT_ECOSYSTEM_SERVICES.length];
        
        let parsedFeatures: string[] = [];
        if (Array.isArray(s.features) && s.features.length > 0) {
          parsedFeatures = s.features.map((f: any) =>
            typeof f === 'string' ? f : f?.title || f?.name || String(f)
          );
        } else {
          parsedFeatures = fallback?.features || DEFAULT_FALLBACK_FEATURES;
        }

        const colorCycle: ('emerald' | 'rose' | 'amber')[] = ['emerald', 'rose', 'amber'];
        const ctaColor = colorCycle[idx % colorCycle.length];

        const badges = [
          'E-Commerce & Digital Stores',
          'Fintech & Trading Engines',
          'Enterprise Operations',
          'Intelligent Automation',
        ];

        return {
          id: s.id || `service-${idx}`,
          title: s.title,
          slug: s.slug,
          category_badge: badges[idx % badges.length],
          description:
            s.short_description ||
            s.description ||
            fallback?.description ||
            'Build powerful, scalable and secure digital solutions with modern features that enhance customer experience.',
          thumbnail_url: s.thumbnail_url || fallback?.thumbnail_url || '/services/ecommerce-showcase.jpg',
          features: parsedFeatures,
          cta_label: s.cta_label || 'Get Free Consultation',
          cta_color: ctaColor,
        };
      })
    : DEFAULT_ECOSYSTEM_SERVICES;

  // Theme presets
  const themeMap = {
    emerald: {
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      titleHover: 'group-hover:text-emerald-700',
      checkBg: 'bg-emerald-600',
      btnClass: 'border-emerald-300 bg-emerald-50/90 hover:bg-emerald-100 text-emerald-800',
      btnIcon: 'text-emerald-700',
    },
    rose: {
      badgeBg: 'bg-pink-50 text-[#e6005c] border-pink-200',
      titleHover: 'group-hover:text-[#e6005c]',
      checkBg: 'bg-[#e6005c]',
      btnClass: 'border-pink-300 bg-[#fff0f5] hover:bg-[#ffe6ef] text-[#e6005c]',
      btnIcon: 'text-[#e6005c]',
    },
    amber: {
      badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
      titleHover: 'group-hover:text-amber-700',
      checkBg: 'bg-amber-500',
      btnClass: 'border-amber-300 bg-amber-50/90 hover:bg-amber-100 text-amber-900',
      btnIcon: 'text-amber-700',
    },
  };

  return (
    <section className="pt-12 pb-10 sm:pt-16 sm:pb-14 md:pt-20 md:pb-16 bg-[#f8fafc] relative">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-emerald-100/40 via-pink-100/20 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100/80 border border-emerald-300/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Boxes className="w-3.5 h-3.5 text-emerald-700" />
              OUR CORE SOLUTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Complete Technology Solutions <br className="hidden sm:inline" />
              for Modern Businesses <span className="text-[#e6005c]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
              From digital commerce to enterprise systems and market technology – we build solutions
              that solve real problems and create real impact.
            </p>
          </motion.div>
        </div>

        {/* Shared Single-Container Stacking Cards Track */}
        <div className="relative w-full pb-2 sm:pb-4">
          {solutionsToRender.map((service, index) => {
            const theme = themeMap[service.cta_color] || themeMap.emerald;
            const isLast = index === solutionsToRender.length - 1;

            return (
              <div
                key={service.id || index}
                id={`service-card-${service.id}`}
                className={`sticky w-full ${isLast ? 'mb-0' : 'mb-[25vh] sm:mb-[32vh] md:mb-[40vh]'}`}
                style={{
                  top: `calc(4.5rem + ${index * 12}px)`,
                  zIndex: 10 + index,
                }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-20px' }}
                  transition={{ duration: 0.5 }}
                  className="w-full bg-white rounded-2xl sm:rounded-3xl md:rounded-[36px] border border-slate-200/90 shadow-2xl shadow-slate-300/50 p-5 sm:p-7 md:p-10 overflow-hidden group transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">

                    {/* Content Column: Title, Description, Features, CTA */}
                    <div className="lg:col-span-6 flex flex-col justify-between space-y-4 sm:space-y-6 text-left order-2 lg:order-1">
                      <div>
                        {/* Category Tag Badge */}
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider mb-2 sm:mb-3 shadow-2xs">
                          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-700" />
                          <span className="text-slate-800">{service.category_badge}</span>
                        </div>

                        {/* Service Title */}
                        <h3 className={`text-xl sm:text-2xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight transition-colors ${theme.titleHover}`}>
                          {service.title}
                        </h3>

                        {/* Short Description */}
                        {service.description && (
                          <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                            {service.description}
                          </p>
                        )}

                        {/* Feature Points with Colored Checkmarks */}
                        {service.features && service.features.length > 0 && (
                          <ul className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                            {service.features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-center gap-2 sm:gap-2.5 text-xs sm:text-sm text-slate-700 font-medium"
                              >
                                <div
                                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full text-white flex items-center justify-center flex-shrink-0 shadow-2xs ${theme.checkBg}`}
                                >
                                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 stroke-[3.5]" />
                                </div>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-1 sm:pt-2">
                        <Link
                          href={`/solutions/${service.slug}`}
                          className={`inline-flex items-center justify-between gap-3 sm:gap-4 py-2.5 px-5 sm:py-3 sm:px-7 rounded-full border text-xs sm:text-sm font-bold transition-all duration-200 group/btn shadow-xs hover:shadow-md cursor-pointer ${theme.btnClass}`}
                        >
                          <span>{service.cta_label}</span>
                          <ArrowRight
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover/btn:translate-x-1 ${theme.btnIcon}`}
                          />
                        </Link>
                      </div>
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-6 w-full flex items-center justify-center order-1 lg:order-2">
                      <div className="relative w-full h-44 sm:h-64 md:h-80 lg:h-96 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group/img">
                        {service.thumbnail_url ? (
                          <Image
                            src={service.thumbnail_url}
                            alt={service.title}
                            fill
                            unoptimized
                            className="object-cover w-full h-full group-hover/img:scale-105 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                            priority={index === 0}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-400 text-sm">
                            {service.title}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
