'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export interface ProductPlan {
  id: string;
  title: string; // Product name e.g. "Manual Algo"
  slug: string;
  price: string; // Stored in client_name column e.g. "₹999"
  period: string; // Stored in outcome_description column e.g. "+ GST", "/ year", "+ GST / year"
  badge: string; // Stored in category column e.g. "BEST VALUE", "Most Popular for Starters"
  badge_color?: string; // e.g. "pink" | "blue" | "emerald" | "amber"
  description: string; // Stored in short_description
  features: string[]; // Stored in tech_stack array
  buy_url: string; // Stored in live_url
  whatsapp_text: string; // Stored in challenge_description
  thumbnail_url?: string;
  is_featured: boolean;
  is_published: boolean;
  display_order?: number;
  created_at?: string;
}

export async function upsertProduct(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const title = (formData.get('title') as string)?.trim() || 'New Plan';
  const slug =
    (formData.get('slug') as string)?.trim() ||
    title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  const price = (formData.get('price') as string)?.trim() || '₹999';
  const period = (formData.get('period') as string)?.trim() || '+ GST';
  const badge = (formData.get('badge') as string)?.trim() || '';
  const description = (formData.get('description') as string)?.trim() || '';
  const features_raw = (formData.get('features') as string) || '';
  const buy_url = (formData.get('buy_url') as string)?.trim() || '/contact';
  const whatsapp_text = (formData.get('whatsapp_text') as string)?.trim() || `I would like to enquire about ${title}`;
  const thumbnail_url = (formData.get('thumbnail_url') as string)?.trim() || null;
  const is_published = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'true' || formData.get('is_featured') === 'on';

  // Parse feature bullet points (split by newline or comma)
  const features = features_raw
    .split(/\r?\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);

  const payload: any = {
    title,
    slug,
    category: badge || 'Plan', // Store badge text in category
    client_name: price, // Store formatted price in client_name
    outcome_description: period, // Store billing period in outcome_description
    short_description: description,
    tech_stack: features, // Store features list
    live_url: buy_url,
    challenge_description: whatsapp_text,
    thumbnail_url,
    is_published,
    is_featured,
  };

  if (id) {
    await supabase.from('projects').update(payload).eq('id', id);
  } else {
    await supabase.from('projects').insert([payload]);
  }

  revalidatePath('/work');
  revalidatePath('/products');
  revalidatePath('/admin/projects');
  revalidatePath('/admin/products');
  revalidatePath('/');
}

export async function deleteProduct(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('projects').delete().eq('id', id);

  revalidatePath('/work');
  revalidatePath('/products');
  revalidatePath('/admin/projects');
  revalidatePath('/admin/products');
  revalidatePath('/');
}
