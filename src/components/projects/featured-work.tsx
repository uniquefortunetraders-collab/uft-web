'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BookOpen, Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';

interface FeaturedWorkProps {
  blogs?: any[];
  projects?: any[];
}

const BADGE_COLORS = [
  'bg-pink-100 text-[#e6005c] border-pink-200',
  'bg-emerald-100 text-emerald-800 border-emerald-200',
  'bg-amber-100 text-amber-800 border-amber-200',
  'bg-blue-100 text-blue-800 border-blue-200',
];

export function FeaturedWork({ blogs = [] }: FeaturedWorkProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Display published blogs from admin panel
  const itemsToRender = (blogs && blogs.length > 0 ? blogs : []).map((b, idx) => ({
    id: b.id,
    title: b.title,
    category: b.blog_categories?.name || 'Blog Post',
    badgeColor: BADGE_COLORS[idx % BADGE_COLORS.length],
    short_description: b.excerpt || (b.content ? b.content.slice(0, 120).replace(/<[^>]*>?/gm, '') + '...' : ''),
    thumbnail_url: b.featured_image_url || null,
    slug: b.slug,
    link: `/blogs/${b.slug}`,
    published_at: b.published_at
      ? new Date(b.published_at).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : null,
  }));

  const totalItems = itemsToRender.length;

  // Scroll to index
  const scrollToIndex = useCallback((index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.children;
    if (cards.length > index && cards[index]) {
      const card = cards[index] as HTMLElement;
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft - 16,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  }, []);

  const handleNext = useCallback(() => {
    if (totalItems <= 1) return;
    const nextIdx = (activeIndex + 1) % totalItems;
    scrollToIndex(nextIdx);
  }, [activeIndex, totalItems, scrollToIndex]);

  const handlePrev = useCallback(() => {
    if (totalItems <= 1) return;
    const prevIdx = (activeIndex - 1 + totalItems) % totalItems;
    scrollToIndex(prevIdx);
  }, [activeIndex, totalItems, scrollToIndex]);

  // Track active index on manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 300;
    const newIdx = Math.round(scrollLeft / (cardWidth + 20));
    if (newIdx >= 0 && newIdx < totalItems && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

  // Auto-scroll loop on mobile / desktop (advances every 4 seconds when not hovered/touched)
  useEffect(() => {
    if (isPaused || totalItems <= 1) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4000);
    return () => clearInterval(interval);
  }, [isPaused, totalItems, handleNext]);

  return (
    <section id="blog" className="py-16 md:py-24 bg-white relative scroll-mt-20 overflow-hidden w-full max-w-full">
      <div id="insights" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <Reveal direction="up">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 border border-pink-200 text-[#e6005c] text-xs font-bold uppercase tracking-wider mb-3">
              <BookOpen className="w-3.5 h-3.5 text-[#e6005c]" />
              OUR BLOGS & INSIGHTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Latest Articles, Market Insights <br className="hidden sm:inline" />
              & Tech Updates <span className="text-[#e6005c]">.</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Stay ahead with expert market analysis, algo trading guides, and technology breakthroughs written by our team.
            </p>
          </Reveal>

          {/* Desktop Navigation Controls & View All Button (Hidden on mobile, shown on desktop) */}
          <Reveal direction="left" delay={0.1}>
            <div className="hidden sm:flex items-center gap-3">
              {totalItems > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous blog"
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs hover:border-pink-300 hover:text-[#e6005c] cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next blog"
                    className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center transition-all shadow-2xs hover:border-pink-300 hover:text-[#e6005c] cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#e6005c] hover:text-[#cc0052] bg-pink-50 hover:bg-pink-100/80 border border-pink-200/80 px-5 py-2.5 rounded-full transition-all duration-200 shadow-2xs group"
              >
                <span>View All Blogs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#e6005c]" />
              </Link>
            </div>
          </Reveal>
        </div>

        {/* Dynamic Blog Showcase Carousel / Slider */}
        {totalItems === 0 ? (
          <Reveal direction="up">
            <div className="py-16 text-center bg-slate-50/70 rounded-3xl border border-slate-200/80 max-w-xl mx-auto p-6">
              <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-base font-bold text-slate-800">No blog articles published yet</p>
              <p className="text-xs text-slate-500 mt-1">
                Articles and market insights published from the admin panel will appear here automatically.
              </p>
            </div>
          </Reveal>
        ) : (
          <div
            className="relative"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Scrollable track: 1 full card + 25% preview of 2nd card on mobile */}
            <div
              ref={scrollRef}
              onScroll={handleScroll}
              className="flex items-stretch gap-4 sm:gap-6 lg:gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {itemsToRender.map((item, index) => (
                <div
                  key={item.id || index}
                  className="w-[82vw] sm:w-[360px] lg:w-[calc((100%-4rem)/3)] flex-shrink-0 snap-start flex flex-col"
                >
                  <article className="h-full flex flex-col bg-white rounded-3xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 overflow-hidden group">

                    {/* Visual Image Header */}
                    <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-20">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${item.badgeColor}`}>
                          {item.category}
                        </span>
                      </div>

                      {item.thumbnail_url ? (
                        <Image
                          src={item.thumbnail_url}
                          alt={item.title}
                          fill
                          unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 flex items-center justify-center">
                          <div className="text-center text-white/60">
                            <BookOpen className="w-10 h-10 text-white/20 mx-auto mb-1" />
                            <div className="text-xs font-semibold text-slate-400">{item.category}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between">
                      <div>
                        {item.published_at && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium mb-2.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{item.published_at}</span>
                          </div>
                        )}

                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2.5 group-hover:text-[#e6005c] transition-colors line-clamp-2 leading-snug">
                          {item.title}
                        </h3>

                        {item.short_description && (
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal line-clamp-2">
                            {item.short_description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-100 mt-auto">
                        <Link
                          href={item.link}
                          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#e6005c] hover:text-[#cc0052] transition-colors py-1 group/link"
                        >
                          <span>Read Full Blog</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>

                  </article>
                </div>
              ))}
            </div>

            {/* Pagination Dots Indicator */}
            {totalItems > 1 && (
              <div className="flex items-center justify-center gap-1.5 mt-5 sm:mt-8">
                {itemsToRender.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => scrollToIndex(dotIdx)}
                    aria-label={`Go to slide ${dotIdx + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIndex === dotIdx ? 'w-6 bg-[#e6005c]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Mobile Bottom Bar: View All Blogs Button */}
            <div className="flex sm:hidden flex-col items-center mt-6">
              <Link
                href="/blogs"
                className="w-full inline-flex items-center justify-center gap-2 text-xs font-bold text-[#e6005c] hover:text-[#cc0052] bg-pink-50 hover:bg-pink-100/80 border border-pink-200/80 px-6 py-3 rounded-full transition-all duration-200 shadow-2xs"
              >
                <span>View All Blogs</span>
                <ArrowRight className="w-4 h-4 text-[#e6005c]" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
