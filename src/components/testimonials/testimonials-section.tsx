'use client';

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Quote, Star, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';
import { Testimonial } from '@/types/database';

const AVATAR_COLORS = [
  'bg-emerald-600',
  'bg-blue-600',
  'bg-purple-600',
  'bg-pink-600',
  'bg-amber-600',
];

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

const DEFAULT_TESTIMONIALS = [
  {
    id: 'test-1',
    client_name: 'Arun Menon',
    client_role: 'CEO, Lifestyle Store',
    avatar_url: null,
    avatar_initial: 'A',
    avatar_bg: 'bg-emerald-600',
    content:
      'Unique Fortune Traders transformed our business with a powerful eCommerce platform. Their team is professional, responsive and truly understands our needs.',
  },
  {
    id: 'test-2',
    client_name: 'Vikram Nair',
    client_role: 'Pro Trader & Educator',
    avatar_url: null,
    avatar_initial: 'V',
    avatar_bg: 'bg-blue-600',
    content:
      'Their market analysis tools and automation systems have improved our trading efficiency significantly. Highly recommended for modern tech solutions!',
  },
  {
    id: 'test-3',
    client_name: 'Sneha Rajan',
    client_role: 'Operations Head',
    avatar_url: null,
    avatar_initial: 'S',
    avatar_bg: 'bg-pink-600',
    content:
      'The ERP solution streamlined our operations and improved productivity across departments. A truly great experience working with Unique Fortune Traders!',
  },
];

export function TestimonialsSection({ testimonials, title, subtitle }: TestimonialsSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const hasTestimonials = testimonials && testimonials.length > 0;

  const itemsToRender = hasTestimonials
    ? testimonials.map((t, idx) => ({
        id: t.id,
        client_name: t.client_name,
        client_role: t.client_role
          ? `${t.client_role}${t.company_name ? `, ${t.company_name}` : ''}`
          : '',
        avatar_url: t.avatar_url,
        avatar_initial: t.client_name ? t.client_name.charAt(0).toUpperCase() : '?',
        avatar_bg: AVATAR_COLORS[idx % AVATAR_COLORS.length],
        content: t.content,
      }))
    : DEFAULT_TESTIMONIALS;

  return (
    <section className="pt-6 sm:pt-8 md:pt-10 pb-12 sm:pb-16 md:pb-24 bg-white relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header with Navigation Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
          <Reveal direction="up">
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-[#e6005c] block mb-1 sm:mb-2">
              CLIENTS LOVE US
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {title ? title : (
                <>
                  Hear From Our <br className="hidden sm:inline" />
                  Happy Clients.
                </>
              )}
            </h2>
            {subtitle && (
              <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
                {subtitle}
              </p>
            )}
          </Reveal>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <Link
              href="/testimonials"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e6005c] hover:text-[#cc0052] transition-colors mr-1 group"
            >
              <span>View All Testimonials</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Mobile/Tablet Scroll side to side controls */}
            <div className="flex lg:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => scroll('left')}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center shadow-2xs transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet View (< lg): Parallel Vertical Portrait Cards that Scroll Side to Side */}
        <div
          ref={scrollContainerRef}
          className="flex lg:hidden items-stretch overflow-x-auto gap-4 sm:gap-6 pb-4 pt-1 snap-x snap-mandatory scroll-smooth -mx-4 px-4 sm:mx-0 sm:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {itemsToRender.map((item, index) => (
            <div
              key={item.id || index}
              className="w-[280px] sm:w-[320px] flex-shrink-0 snap-center"
            >
              <div className="h-full flex flex-col justify-between items-center text-center p-6 sm:p-7 bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-md hover:border-pink-200 transition-all min-h-[360px] group">

                {/* Top: Avatar & Stars */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3.5">
                    {item.avatar_url ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-100 shadow-sm bg-gray-100 ring-4 ring-pink-50">
                        <Image
                          src={item.avatar_url}
                          alt={item.client_name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-full ${item.avatar_bg} text-white font-bold flex items-center justify-center text-lg shadow-sm ring-4 ring-pink-50`}>
                        {item.avatar_initial}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-2xs" title="Verified Client">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Middle: Testimonial Quote */}
                <div className="my-auto py-3 px-1">
                  <Quote className="w-5 h-5 text-pink-200 fill-pink-100 mx-auto mb-2" />
                  <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic font-normal">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Bottom: Client Profile & Role */}
                <div className="w-full pt-4 border-t border-gray-100 flex flex-col items-center">
                  <div className="font-bold text-sm text-slate-900 leading-snug">
                    {item.client_name}
                  </div>
                  {item.client_role && (
                    <div className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                      {item.client_role}
                    </div>
                  )}
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Desktop View (lg+): Clean 3-Column Parallel Portrait Cards Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {itemsToRender.slice(0, 3).map((item, index) => (
            <Reveal key={item.id || index} direction="up" delay={index * 0.1}>
              <div className="h-full flex flex-col justify-between items-center text-center p-7 md:p-8 bg-white rounded-3xl border border-gray-200/90 shadow-xs hover:shadow-xl hover:border-pink-200 transition-all duration-300 relative group min-h-[390px]">

                {/* Top: Avatar & Stars */}
                <div className="flex flex-col items-center">
                  <div className="relative mb-3.5">
                    {item.avatar_url ? (
                      <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-100 shadow-sm bg-gray-100 ring-4 ring-pink-50">
                        <Image
                          src={item.avatar_url}
                          alt={item.client_name}
                          fill
                          unoptimized
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className={`w-14 h-14 rounded-full ${item.avatar_bg} text-white font-bold flex items-center justify-center text-lg shadow-sm ring-4 ring-pink-50`}>
                        {item.avatar_initial}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-2xs" title="Verified Client">
                      <CheckCircle className="w-3 h-3" />
                    </div>
                  </div>

                  {/* 5-Star Rating */}
                  <div className="flex items-center justify-center gap-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>

                {/* Middle: Testimonial Quote in Portrait */}
                <div className="my-auto py-3 px-1">
                  <Quote className="w-5 h-5 text-pink-200 fill-pink-100 mx-auto mb-2" />
                  <p className="text-slate-700 text-sm leading-relaxed italic font-normal">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                {/* Bottom: Client Profile & Role */}
                <div className="w-full pt-4 border-t border-gray-100 flex flex-col items-center">
                  <div className="font-bold text-sm text-slate-900 leading-snug">
                    {item.client_name}
                  </div>
                  {item.client_role && (
                    <div className="text-xs text-slate-500 font-medium mt-0.5">
                      {item.client_role}
                    </div>
                  )}
                </div>

              </div>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
