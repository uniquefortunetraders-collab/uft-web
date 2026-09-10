import { createClient } from '@/lib/supabase/server';
import { BlogsManager } from './blogs-manager';

export default async function AdminBlogsPage() {
  const supabase = await createClient();

  const [postsRes, catRes] = await Promise.all([
    supabase
      .from('blog_posts')
      .select('*, blog_categories(name, slug)')
      .order('created_at', { ascending: false }),
    supabase.from('blog_categories').select('*').order('name'),
  ]);

  const posts = postsRes.data || [];
  const categories = catRes.data || [];

  return <BlogsManager initialPosts={posts} categories={categories} />;
}
