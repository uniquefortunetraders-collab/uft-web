import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Calendar,
  User,
  Clock,
  ChevronRight,
  ShieldCheck,
  Zap,
  Sparkles,
  ArrowRight,
  MessageSquare,
  BookOpen,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { calculateReadingTime } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/animations/reveal';
import { ReadingProgressBar } from '@/components/blogs/reading-progress-bar';
import { SocialShareBar } from '@/components/blogs/social-share-bar';

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

  if (!post) return { title: 'Blog Not Found | UniqueAI' };

  return {
    title: post.seo_title || `${post.title} | UniqueAI Blogs`,
    description: post.seo_description || post.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch current post
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .eq('slug', slug)
    .single();

  if (!post) {
    notFound();
  }

  // Fetch related published posts (excluding current post)
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('*, blog_categories(name, slug)')
    .eq('status', 'published')
    .neq('slug', slug)
    .order('published_at', { ascending: false })
    .limit(3);

  const catName = post.blog_categories?.name || 'Technology';
  const dateStr = post.published_at
    ? new Date(post.published_at).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : 'Recently';

  const dynamicReadingTime = calculateReadingTime(post.content, post.excerpt);

  return (
    <div className="min-h-screen bg-[#f1f8f3] pt-6 pb-24 relative">
      {/* Top Reading Progress Bar */}
      <ReadingProgressBar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Breadcrumbs & Back Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#e6005c] transition-colors bg-white px-4 py-2 rounded-full border border-slate-200/80 shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform text-[#e6005c]" />
            <span>Back to Blogs</span>
          </Link>

          {/* Breadcrumb path */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <Link href="/" className="hover:text-slate-900 transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/blogs" className="hover:text-slate-900 transition-colors">Blogs</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold truncate max-w-[200px]">{post.title}</span>
          </div>
        </div>

        {/* Main Outer Card Container */}
        <article className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-slate-200/80 shadow-xl space-y-8">
          
          {/* Header Metadata Section */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="pink" className="px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {catName}
              </Badge>
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/80">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Verified Tech Insight</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {post.title}
            </h1>

            {/* Author & Publish Info Bar */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-sm shadow-2xs">
                  {post.author_name ? post.author_name.charAt(0) : 'U'}
                </div>
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <span>{post.author_name || 'UniqueAI Tech Team'}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  </div>
                  <div className="text-[11px] text-slate-400 font-normal">Solutions Architect & Technical Author</div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#e6005c]" />
                  <span>{dateStr}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#e6005c]" />
                  <span>{dynamicReadingTime} min read</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          {post.featured_image_url && (
            <div className="relative w-full h-64 sm:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-slate-900 group">
              <img
                src={post.featured_image_url}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60" />
            </div>
          )}

          {/* Social Share Bar */}
          <SocialShareBar title={post.title} />

          {/* Executive Summary / Key Takeaways Box */}
          {post.excerpt && (
            <div className="bg-gradient-to-r from-emerald-50/90 via-emerald-50/50 to-pink-50/30 p-6 sm:p-7 rounded-2xl border-l-4 border-emerald-500 border border-emerald-100 shadow-2xs space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <Zap className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Executive Summary &amp; Key Takeaways</span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed italic">
                "{post.excerpt}"
              </p>
            </div>
          )}

          {/* 2-Column Main Layout: Content (8 cols) + Sticky Lead Gen Sidebar (4 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pt-4">
            
            {/* Left Column: Full Article Content */}
            <div className="lg:col-span-8 space-y-6">
              <div
                className="prose prose-emerald max-w-none text-sm sm:text-base text-slate-800 leading-relaxed space-y-6 [&>h2]:text-2xl [&>h2]:font-extrabold [&>h2]:text-slate-900 [&>h2]:mt-8 [&>h2]:mb-4 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-slate-900 [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5 [&>blockquote]:border-l-4 [&>blockquote]:border-[#e6005c] [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-slate-700"
                dangerouslySetInnerHTML={{
                  __html: post.content || '<p>Detailed blog content coming soon...</p>',
                }}
              />

              {/* End of article signature */}
              <div className="pt-8 mt-12 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-6 rounded-2xl">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-xs font-bold text-slate-900">Found this article valuable?</div>
                  <div className="text-xs text-slate-500">Share it with your team or explore more tech guides.</div>
                </div>
                <Link
                  href="/blogs"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
                >
                  <BookOpen className="w-4 h-4 text-pink-400" />
                  <span>Browse All Blogs</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Sticky Lead Gen Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-28 space-y-6">
                
                {/* Enterprise Lead Generation CTA Card */}
                <div className="p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl shadow-xl border border-slate-800 space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-[11px] font-bold uppercase tracking-wider border border-pink-500/30">
                    <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                    <span>Enterprise Solutions</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-black text-white leading-tight">
                      Need Custom ERP or Trading Software?
                    </h3>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      Unique Fortune Traders develops high-performance enterprise systems tailored for your business growth.
                    </p>
                  </div>

                  <ul className="space-y-2 text-xs font-medium text-slate-200">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>20+ Modular ERP Workflows</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-400" />
                      <span>Algo Trading &amp; Financial Software</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <span>AI Automation Integration</span>
                    </li>
                  </ul>

                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#e6005c] hover:bg-[#cc0052] text-white text-xs font-bold transition-all shadow-md shadow-pink-600/30 group"
                  >
                    <span>Request Consultation</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>

                {/* Quick Info & Help Card */}
                <div className="p-6 bg-emerald-50/60 border border-emerald-100 rounded-3xl space-y-3">
                  <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-emerald-600" />
                    <span>Have Questions?</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Have questions about this article or technical implementation? Contact our expert engineering team.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors pt-1"
                  >
                    <span>Talk to an Expert →</span>
                  </Link>
                </div>

              </div>
            </aside>

          </div>

        </article>

        {/* Bottom Section: Related Articles Carousel / Grid */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-[#e6005c] uppercase tracking-wider block mb-1">
                  Keep Reading
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Related Articles &amp; Insights
                </h2>
              </div>

              <Link
                href="/blogs"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#e6005c] hover:underline"
              >
                <span>View All Blogs →</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map((relPost: any, idx) => {
                const relCatName = relPost.blog_categories?.name || 'Technology';
                const relDate = relPost.published_at
                  ? new Date(relPost.published_at).toLocaleDateString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recently';

                return (
                  <Reveal key={relPost.id || idx} direction="up" delay={idx * 0.1}>
                    <Card className="h-full flex flex-col p-0 overflow-hidden bg-white border border-slate-200/80 hover:border-pink-300 hover:shadow-lg transition-all group">
                      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                        <div className="absolute top-3 left-3 z-10">
                          <Badge variant="emerald">{relCatName}</Badge>
                        </div>
                        {relPost.featured_image_url ? (
                          <img
                            src={relPost.featured_image_url}
                            alt={relPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center p-4 text-white font-bold text-xs text-center bg-gradient-to-br from-slate-800 to-slate-950">
                            {relPost.title}
                          </div>
                        )}
                      </div>

                      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="text-[11px] font-medium text-slate-400 flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-[#e6005c]" />
                            <span>{relDate}</span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#e6005c] transition-colors line-clamp-2">
                            {relPost.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {relPost.excerpt || 'Read details inside...'}
                          </p>
                        </div>

                        <Link
                          href={`/blogs/${relPost.slug}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#e6005c] hover:text-[#cc0052] transition-colors pt-2"
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
        )}

      </div>
    </div>
  );
}
