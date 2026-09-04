'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function upsertBlogPost(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const category_id = (formData.get('category_id') as string) || null;
  const excerpt = formData.get('excerpt') as string || null;
  const content = formData.get('content') as string;
  const author_name = formData.get('author_name') as string || 'UniqueAI Team';
  const featured_image_url = formData.get('featured_image_url') as string || null;
  const reading_time = parseInt((formData.get('reading_time') as string) || '5', 10);
  const status = (formData.get('status') as string) || 'published';

  const payload = {
    title,
    slug,
    category_id,
    excerpt,
    content,
    featured_image_url,
    author_name,
    reading_time,
    status,
    published_at: status === 'published' ? new Date().toISOString() : null,
  };

  if (id) {
    await supabase.from('blog_posts').update(payload).eq('id', id);
  } else {
    await supabase.from('blog_posts').insert([payload]);
  }

  revalidatePath('/insights');
  revalidatePath('/admin/insights');
  revalidatePath('/');
}

export async function deleteBlogPost(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('blog_posts').delete().eq('id', id);

  revalidatePath('/insights');
  revalidatePath('/admin/insights');
  revalidatePath('/');
}
