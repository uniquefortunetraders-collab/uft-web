'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function upsertService(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const short_description = formData.get('short_description') as string || null;
  const description = formData.get('description') as string || null;
  const cta_label = formData.get('cta_label') as string || 'Get Free Consultation';
  const cta_url = formData.get('cta_url') as string || '/contact';
  const thumbnail_url = formData.get('thumbnail_url') as string || null;
  const icon_url = formData.get('icon_url') as string || null;
  const is_published = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'true' || formData.get('is_featured') === 'on';

  const payload = {
    title,
    slug,
    short_description,
    description,
    cta_label,
    cta_url,
    thumbnail_url,
    icon_url,
    is_published,
    is_featured,
  };

  if (id) {
    await supabase.from('services').update(payload).eq('id', id);
  } else {
    await supabase.from('services').insert([payload]);
  }

  revalidatePath('/solutions');
  revalidatePath('/admin/services');
  revalidatePath('/');
}

export async function deleteService(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('services').delete().eq('id', id);

  revalidatePath('/solutions');
  revalidatePath('/admin/services');
  revalidatePath('/');
}
