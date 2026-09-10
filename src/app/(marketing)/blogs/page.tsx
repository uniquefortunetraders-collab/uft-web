import Link from 'next/link';
import { Calendar, ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';

export const metadata = {
  title: 'Blogs & Market Updates | UniqueAI',
  description: 'Technical insights, financial technology analysis, AI automation trends, and enterprise software guides from UniqueAI experts.',
};

export default async function BlogsPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  const itemsToRender = posts || [];

  return (
    <div className="py-12 md:py-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Reveal direction="up">
          <SectionHeading
            title="Blogs & Market Updates"
            highlightText="Blogs"
            subtitle="Thought leadership, tech deep dives, and market analysis from Unique Fortune Traders."
          />
        </Reveal>

        {itemsToRender.length === 0 ? (
          <Reveal direction="up">
            <div className="py-16 text-center bg-white rounded-2xl border border-gray-100 max-w-xl mx-auto shadow-xs">
              <p className="text-base font-bold text-gray-800">No blogs published yet</p>
              <p className="text-xs text-gray-500 mt-1">Blogs published from the admin panel will appear here.</p>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {itemsToRender.map((post: any, index) => {
              const catName = post.blog_categories?.name || post.category?.name || 'Technology';
              const isPink = catName.toLowerCase().includes('market');
              const dateStr = post.published_at
                ? new Date(post.published_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                : 'Recently';

              return (
                <Reveal key={post.id || index} direction="up" delay={index * 0.1}>
                  <Card className="h-full flex flex-col p-0 overflow-hidden bg-white border border-emerald-100 hover:border-emerald-300 transition-all group">
                    <div className="relative h-48 w-full bg-gray-900 overflow-hidden">
                      <div className="absolute top-3 left-3 z-10">
                        <Badge variant={isPink ? 'pink' : 'emerald'}>
                          {catName}
                        </Badge>
                      </div>
                      {post.featured_image_url ? (
                        <img
                          src={post.featured_image_url}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-4 text-white font-extrabold text-sm text-center bg-gradient-to-br from-slate-800 to-slate-950">
                          {post.title}
                        </div>
                      )}
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
                        href={`/blogs/${post.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 transition-colors mt-auto pt-2"
                      >
                        <span>Read Blog</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </Card>
                </Reveal>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
