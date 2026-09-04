'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Reveal } from '@/components/animations/reveal';
import { Project } from '@/types/database';

interface FeaturedWorkProps {
  blogs?: any[];
  projects?: Project[];
}

const BADGE_COLORS = [
  'bg-pink-100 text-[#e6005c] border-pink-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-slate-100 text-slate-700 border-slate-200',
];

export function FeaturedWork({ blogs = [], projects = [] }: FeaturedWorkProps) {
  // Only display blogs/works actually added from the admin panel (no hardcoded items)
  const itemsToRender = (blogs && blogs.length > 0 ? blogs : []).map((b, idx) => ({
    id: b.id,
    title: b.title,
    category: b.blog_categories?.name || 'Article',
    badgeColor: BADGE_COLORS[idx % BADGE_COLORS.length],
    short_description: b.excerpt || (b.content ? b.content.slice(0, 110) + '...' : ''),
    thumbnail_url: b.featured_image_url || null,
    slug: b.slug,
    link: `/insights/${b.slug}`,
  }));

  return (
    <section id="blog" className="pt-8 md:pt-12 pb-8 md:pb-10 bg-white relative scroll-mt-20">
      <div id="works" className="absolute -top-24" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
          <Reveal direction="up">
            <span className="text-xs font-bold uppercase tracking-wider text-[#e6005c] block mb-2">
              OUR WORK SPEAKS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Solutions We&apos;ve Built. <br />
              Success We&apos;ve Delivered.
            </h2>
          </Reveal>

          {/* View All Projects disabled for now as requested */}
          <Reveal direction="left" delay={0.1}>
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 select-none cursor-default mt-4 sm:mt-0"
              title="Coming soon"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
            </span>
          </Reveal>
        </div>

        {/* Dynamic Works & Blog Showcase Grid */}
        {itemsToRender.length === 0 ? (
          <Reveal direction="up">
            <div className="py-16 text-center bg-slate-50/60 rounded-3xl border border-slate-100">
              <p className="text-sm font-bold text-slate-700">No articles or case studies published yet</p>
              <p className="text-xs text-slate-400 mt-1">Articles published from the admin panel will appear here.</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {itemsToRender.map((item, index) => (
              <Reveal key={item.id || index} direction="up" delay={index * 0.1}>
              <div className="h-full flex flex-col bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl hover:border-gray-300 transition-all duration-300 overflow-hidden group">

                {/* Visual Media Header */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">

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
                    <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center">
                      <div className="text-center text-white/60">
                        <div className="text-4xl font-black text-white/10 select-none">
                          {item.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-xs font-semibold mt-2 text-slate-400">{item.category}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-[#e6005c] transition-colors">
                      {item.title}
                    </h3>
                    {item.short_description && (
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 font-normal line-clamp-2">
                        {item.short_description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-gray-100 mt-auto">
                    <Link
                      href={item.link}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e6005c] hover:text-[#cc0052] transition-colors py-1 group/link"
                    >
                      <span>View Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>

              </div>
            </Reveal>
          ))}
          </div>
        )}

      </div>
    </section>
  );
}
