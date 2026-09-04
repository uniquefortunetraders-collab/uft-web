'use client';

import Link from 'next/link';
import { ArrowRight, Calendar } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';
import { BlogPost } from '@/types/database';

interface FeaturedInsightsProps {
  posts?: BlogPost[];
}

export function FeaturedInsights({ posts }: FeaturedInsightsProps) {
  const defaultPosts = [
    {
      id: '1',
      title: 'How AI is Transforming Business Automation in 2025',
      slug: 'ai-transforming-business-automation-2025',
      excerpt:
        'Explore how intelligent automation helps businesses save time and scale faster.',
      published_at: '2025-05-28T00:00:00Z',
      category_name: 'AI & Automation',
      is_pink: false,
    },
    {
      id: '2',
      title: 'Understanding Option Chain Like a Pro',
      slug: 'understanding-option-chain-like-a-pro',
      excerpt:
        'A beginner-friendly guide to reading option chain data and making smarter trades.',
      published_at: '2025-05-26T00:00:00Z',
      category_name: 'Market Updates',
      is_pink: true,
    },
    {
      id: '3',
      title: 'Why ERP is Essential for Growing Businesses',
      slug: 'why-erp-is-essential-for-growing-businesses',
      excerpt:
        'Discover how ERP systems improve efficiency, visibility and profitability.',
      published_at: '2025-05-24T00:00:00Z',
      category_name: 'Business',
      is_pink: false,
    },
  ];

  const itemsToRender = posts && posts.length > 0 ? posts : defaultPosts;

  return (
    <section className="py-16 md:py-24 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <Reveal direction="up" className="w-full md:w-auto">
            <SectionHeading
              title="Insights & Market Updates"
              highlightText="Insights"
              align="left"
              className="mb-0"
            />
          </Reveal>
          <Reveal direction="left" delay={0.2}>
            <Link
              href="/insights"
              className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 hover:text-pink-700 transition-colors mt-4 md:mt-0"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itemsToRender.map((post: any, index) => {
            const catName = post.category?.name || post.category_name || 'Technology';
            const isPink = post.is_pink || catName.toLowerCase().includes('market');
            const dateStr = post.published_at
              ? new Date(post.published_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : '28 May 2025';

            return (
              <Reveal key={post.id || index} direction="up" delay={index * 0.1}>
                <Card className="h-full flex flex-col p-0 overflow-hidden bg-white border border-emerald-100 hover:border-emerald-300 transition-all group">
                  
                  {/* Image Graphic Thumbnail */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-900 flex items-center justify-center p-4">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant={isPink ? 'pink' : 'emerald'}>
                        {catName}
                      </Badge>
                    </div>

                    {/* Simulated Article Hero Graphic */}
                    {isPink ? (
                      <div className="w-full h-full rounded-lg bg-gradient-to-tr from-purple-900 via-pink-900 to-indigo-950 p-3 text-white flex flex-col justify-center items-center text-center">
                        <div className="text-xs font-extrabold text-pink-400 font-mono">OPTION CHAIN LABS</div>
                        <div className="text-xl font-bold mt-1 text-white">NIFTY CALL / PUT</div>
                      </div>
                    ) : index === 0 ? (
                      <div className="w-full h-full rounded-lg bg-gradient-to-tr from-emerald-950 via-teal-900 to-gray-950 p-3 text-white flex flex-col justify-center items-center text-center">
                        <div className="text-xs font-extrabold text-emerald-400">AI AUTOMATION 2025</div>
                        <div className="text-xl font-bold mt-1 text-white">SMART WORKFLOWS</div>
                      </div>
                    ) : (
                      <div className="w-full h-full rounded-lg bg-gradient-to-tr from-slate-900 via-emerald-950 to-teal-950 p-3 text-white flex flex-col justify-center items-center text-center">
                        <div className="text-xs font-extrabold text-emerald-300">ENTERPRISE ERP</div>
                        <div className="text-xl font-bold mt-1 text-white">SCALABLE ARCHITECTURE</div>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateStr}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 leading-snug group-hover:text-pink-600 transition-colors">
                        {post.title}
                      </h3>

                      <p className="text-xs text-gray-600 leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                    </div>

                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mt-auto pt-2"
                    >
                      <span>Read More</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                </Card>
              </Reveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
