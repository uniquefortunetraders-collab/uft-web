import { createClient } from '@/lib/supabase/server';
import { InsightsManager } from './insights-manager';

export default async function AdminInsightsPage() {
  const supabase = await createClient();

  const [postsRes, categoriesRes] = await Promise.all([
    supabase.from('blog_posts').select('*, blog_categories(name)').order('created_at', { ascending: false }),
    supabase.from('blog_categories').select('*').order('name', { ascending: true }),
  ]);

  const posts = postsRes.data || [];
  const categories = categoriesRes.data || [];

  return <InsightsManager initialPosts={posts} categories={categories} />;
}

