'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function upsertProject(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category = formData.get('category') as string || 'Software Engineering';
  const client_name = formData.get('client_name') as string || null;
  const short_description = formData.get('short_description') as string || null;
  const challenge_description = formData.get('challenge_description') as string || null;
  const solution_description = formData.get('solution_description') as string || null;
  const outcome_description = formData.get('outcome_description') as string || null;
  const live_url = formData.get('live_url') as string || null;
  const tech_stack_str = formData.get('tech_stack') as string || '';
  const is_published = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';
  const is_featured = formData.get('is_featured') === 'true' || formData.get('is_featured') === 'on';

  const tech_stack = tech_stack_str
    ? tech_stack_str.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  const payload: any = {
    title,
    slug,
    category,
    client_name,
    short_description,
    challenge_description,
    solution_description,
    outcome_description,
    live_url,
    tech_stack,
    is_published,
    is_featured,
  };

  if (id) {
    await supabase.from('projects').update(payload).eq('id', id);
  } else {
    await supabase.from('projects').insert([payload]);
  }

  revalidatePath('/work');
  revalidatePath('/admin/projects');
  revalidatePath('/');
}

export async function deleteProject(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('projects').delete().eq('id', id);

  revalidatePath('/work');
  revalidatePath('/admin/projects');
  revalidatePath('/');
}
