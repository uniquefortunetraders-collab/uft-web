'use client';

import { Star, Quote } from 'lucide-react';
import { SectionHeading } from '@/components/ui/section-heading';
import { Card } from '@/components/ui/card';
import { Reveal } from '@/components/animations/reveal';
import { Testimonial } from '@/types/database';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
  title?: string;
  subtitle?: string;
}

export function TestimonialsSection({
  testimonials,
  title = "Our Work Speaks",
  subtitle = "Real feedback from client partners, enterprise CTOs, and founders who trust UniqueAI software solutions.",
}: TestimonialsSectionProps) {
  const defaultTestimonials: Partial<Testimonial>[] = [
    {
      id: '1',
      client_name: 'Rahul Sharma',
      client_role: 'CTO',
      company_name: 'FinTech Dynamics',
      rating: 5,
      content: 'UniqueAI transformed our trading infrastructure. The real-time charts and low latency feeds improved our trader satisfaction by 40%.',
    },
    {
      id: '2',
      client_name: 'Ananya Patel',
      client_role: 'Founder & CEO',
      company_name: 'StyleKendra Retail',
      rating: 5,
      content: 'Their e-commerce solution handled our peak holiday traffic seamlessly. High-performance design and ultra-fast page speed!',
    },
    {
      id: '3',
      client_name: 'Vikram Mehta',
      client_role: 'VP of Operations',
      company_name: 'Apex Logistics',
      rating: 5,
      content: 'The custom ERP system designed by UniqueAI streamlined our supply chain and reduced order processing overhead by half.',
    },
  ];

  const itemsToRender = testimonials && testimonials.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#f1f8f3] to-white relative overflow-hidden">
      
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-emerald-100/60 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-72 h-72 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <Reveal direction="up">
          <SectionHeading
            title={title}
            highlightText="Speaks"
            subtitle={subtitle}
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {itemsToRender.map((item, index) => (
            <Reveal key={item.id || index} direction="up" delay={index * 0.1}>
              <Card className="h-full flex flex-col p-8 bg-white/90 backdrop-blur border border-emerald-100 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 group rounded-2xl relative">
                
                <Quote className="absolute top-6 right-6 w-8 h-8 text-emerald-100 group-hover:text-emerald-200 transition-colors" />

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: item.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Content Quote */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1 italic font-sans">
                  &ldquo;{item.content}&rdquo;
                </p>

                {/* Client Profile */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-emerald-950 text-amber-400 font-extrabold flex items-center justify-center text-sm shadow-md">
                    {item.client_name ? item.client_name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-gray-900 group-hover:text-emerald-700 transition-colors">
                      {item.client_name}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">
                      {item.client_role} {item.company_name ? `• ${item.company_name}` : ''}
                    </div>
                  </div>
                </div>

              </Card>
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}
