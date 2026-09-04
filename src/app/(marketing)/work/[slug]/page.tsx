import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Globe } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reveal } from '@/components/animations/reveal';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('title, short_description, seo_title, seo_description')
    .eq('slug', slug)
    .single();

  if (!project) return { title: 'Case Study Not Found | UniqueAI' };

  return {
    title: project.seo_title || `${project.title} — Case Study | UniqueAI`,
    description: project.seo_description || project.short_description,
  };
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!project) {
    notFound();
  }

  const techStack = project.tech_stack || [];
  const gallery = (project.gallery_images as any[]) || [];

  return (
    <div className="pt-8 pb-20 bg-[#f1f8f3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-pink-600 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Work</span>
        </Link>

        {/* Hero Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="pink">{project.category}</Badge>
            {project.client_name && (
              <span className="text-xs font-semibold text-gray-500">Client: {project.client_name}</span>
            )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight leading-tight">
            {project.title}
          </h1>

          <p className="mt-4 text-base sm:text-xl text-gray-600 leading-relaxed max-w-3xl">
            {project.short_description}
          </p>

          {project.live_url && (
            <div className="mt-6">
              <a href={project.live_url} target="_blank" rel="noreferrer">
                <Button variant="outline" size="sm" className="gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Visit Live Project</span>
                </Button>
              </a>
            </div>
          )}
        </div>

        {/* Challenge, Solution, Outcome Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Reveal direction="up" delay={0.1}>
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs h-full space-y-3">
              <h3 className="text-lg font-bold text-gray-900">The Challenge</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {project.challenge_description ||
                  'The client needed a high-performance system capable of processing high throughput under peak loads with 99.9% uptime.'}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <div className="bg-white p-6 rounded-3xl border border-emerald-100 shadow-xs h-full space-y-3">
              <h3 className="text-lg font-bold text-gray-900">Our Solution</h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {project.solution_description ||
                  'UniqueAI architected a modular microservices platform with real-time data streaming and automated fallback systems.'}
              </p>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <div className="bg-[#e4f3e7] p-6 rounded-3xl border border-emerald-200 shadow-xs h-full space-y-3">
              <h3 className="text-lg font-bold text-gray-900">The Outcome</h3>
              <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                {project.outcome_description ||
                  'Achieved 4x performance improvement, 0% unplanned downtime, and seamless automated scaling.'}
              </p>
            </div>
          </Reveal>
        </div>

        {/* Tech Stack */}
        {techStack.length > 0 && (
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm mb-12">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech: string, i: number) => (
                <span key={i} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-semibold">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
