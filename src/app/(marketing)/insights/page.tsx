import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';

export const metadata = {
  title: 'Insights & Market Updates | UniqueAI Blog',
  description: 'Technical insights, financial technology analysis, AI automation trends, and enterprise software guides from UniqueAI experts.',
};

export default async function InsightsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const defaultPosts = [
    {
      id: '1',
      title: 'How AI is Transforming Business Automation in 2025',
      slug: 'ai-transforming-business-automation-2025',
      excerpt: 'Explore how intelligent automation helps businesses save time and scale faster.',
      published_at: '2025-05-28T00:00:00Z',
      category_name: 'AI & Automation',
    },
    {
      id: '2',
      title: 'Understanding Option Chain Like a Pro',
      slug: 'understanding-option-chain-like-a-pro',
      excerpt: 'A beginner-friendly guide to reading option chain data and making smarter trades.',
      published_at: '2025-05-26T00:00:00Z',
      category_name: 'Market Updates',
    },
    {
      id: '3',
      title: 'Why ERP is Essential for Growing Businesses',
      slug: 'why-erp-is-essential-for-growing-businesses',
      excerpt: 'Discover how ERP systems improve efficiency, visibility and profitability.',
      published_at: '2025-05-24T00:00:00Z',
      category_name: 'Business',
    },
  ];

  const itemsToRender = posts && posts.length > 0 ? posts : defaultPosts;

  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Insights & Market Updates"
            highlightText="Insights"
            subtitle="Thought leadership, tech deep dives, and market analysis from UniqueAI."
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itemsToRender.map((post: any, index) => {
            const catName = post.category?.name || post.category_name || 'Technology';
            const isPink = catName.toLowerCase().includes('market');
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
                  <div className="relative h-44 w-full bg-gray-900 flex items-center justify-center p-4">
                    <div className="absolute top-3 left-3 z-10">
                      <Badge variant={isPink ? 'pink' : 'emerald'}>
                        {catName}
                      </Badge>
                    </div>
                    <div className="text-white font-extrabold text-sm text-center">
                      {post.title}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{dateStr}</span>
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
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
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              </Reveal>
            );
          })}
        </div>

      </div>
    </div>
  );
}
