import { createClient } from '@/lib/supabase/server';
import { TestimonialsSection } from '@/components/testimonials/testimonials-section';

export const metadata = {
  title: 'Our Work Speaks — Client Testimonials | UniqueAI',
  description: 'Read reviews and testimonials from enterprise founders, CTOs, and tech leaders who rely on UniqueAI software engineering.',
};

export default async function TestimonialsPage() {
  let testimonials = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    testimonials = data || [];
  } catch {}

  return (
    <div className="pt-8 pb-16 bg-[#f1f8f3]">
      <TestimonialsSection
        testimonials={testimonials}
        title="Our Work Speaks For Itself"
        subtitle="Discover how UniqueAI software engineering, fintech systems, and ERP solutions drive impact for leading organizations."
      />
    </div>
  );
}
