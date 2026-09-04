import { createClient } from '@/lib/supabase/server';
import { TestimonialsManager } from './testimonials-manager';

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return <TestimonialsManager initialTestimonials={testimonials || []} />;
}

