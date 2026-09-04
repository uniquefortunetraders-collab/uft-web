'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function updateSiteSettings(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const company_name = formData.get('company_name') as string;
  const legal_name = formData.get('legal_name') as string || null;
  const tagline = formData.get('tagline') as string || null;
  const description = formData.get('description') as string || null;
  const email = formData.get('email') as string || null;
  const phone = formData.get('phone') as string || null;
  const whatsapp = formData.get('whatsapp') as string || null;
  const seo_title = formData.get('seo_title') as string || null;
  const seo_description = formData.get('seo_description') as string || null;

  const social_links = {
    linkedin: (formData.get('linkedin') as string) || '',
    twitter: (formData.get('twitter') as string) || '',
    facebook: (formData.get('facebook') as string) || '',
    instagram: (formData.get('instagram') as string) || '',
  };

  const payload = {
    company_name,
    legal_name,
    tagline,
    description,
    email,
    phone,
    whatsapp,
    social_links,
    seo_title,
    seo_description,
  };

  const { data: existing } = await supabase.from('site_settings').select('id').single();

  if (existing?.id) {
    await supabase.from('site_settings').update(payload).eq('id', existing.id);
  } else {
    await supabase.from('site_settings').insert([payload]);
  }

  revalidatePath('/');
  revalidatePath('/contact');
  revalidatePath('/admin/settings');
}
