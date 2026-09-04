'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function upsertTestimonial(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const client_name = formData.get('client_name') as string;
  const client_role = formData.get('client_role') as string || null;
  const company_name = formData.get('company_name') as string || null;
  const rating = parseInt((formData.get('rating') as string) || '5', 10);
  const content = formData.get('content') as string;
  const is_published = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'true' || formData.get('is_featured') === 'on';

  const payload = {
    client_name,
    client_role,
    company_name,
    rating,
    content,
    is_published,
    is_featured,
  };

  if (id) {
    await supabase.from('testimonials').update(payload).eq('id', id);
  } else {
    await supabase.from('testimonials').insert([payload]);
  }

  revalidatePath('/testimonials');
  revalidatePath('/work');
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function deleteTestimonial(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('testimonials').delete().eq('id', id);

  revalidatePath('/testimonials');
  revalidatePath('/work');
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}
