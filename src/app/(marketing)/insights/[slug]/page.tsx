import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, seo_title, seo_description')
    .eq('slug', slug)
    .single();

  if (!post) return { title: 'Article Not Found | UniqueAI' };

  return {
    title: post.seo_title || `${post.title} | UniqueAI Insights`,
    description: post.seo_description || post.excerpt,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  const catName = post.blog_categories?.name || 'Technology';
  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '28 May 2025';

  return (
    <div className="pt-8 pb-20 bg-[#f1f8f3]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Insights</span>
        </Link>

        <article className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl space-y-8">
          <div>
            <Badge variant="pink" className="mb-4">
              {catName}
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-500 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-pink-500" />
                <span>{dateStr}</span>
              </div>
              {post.author_name && (
                <div className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-pink-500" />
                  <span>{post.author_name}</span>
                </div>
              )}
              {post.reading_time && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-pink-500" />
                  <span>{post.reading_time} min read</span>
                </div>
              )}
            </div>
          </div>

          {post.excerpt && (
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed bg-emerald-50/70 p-6 rounded-2xl border-l-4 border-emerald-500 italic">
              {post.excerpt}
            </p>
          )}

          <div className="prose prose-emerald max-w-none text-sm sm:text-base text-gray-800 leading-relaxed space-y-4">
            <div dangerouslySetInnerHTML={{ __html: post.content || '<p>Detailed article content coming soon...</p>' }} />
          </div>
        </article>

      </div>
    </div>
  );
}
