import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertBlogPost, deleteBlogPost } from '@/actions/insights';
import { Plus, Trash2, FileText, Calendar } from 'lucide-react';

export default async function AdminInsightsPage() {
  const supabase = await createClient();

  const [postsRes, categoriesRes] = await Promise.all([
    supabase.from('blog_posts').select('*, blog_categories(name)').order('created_at', { ascending: false }),
    supabase.from('blog_categories').select('*').order('name', { ascending: true }),
  ]);

  const posts = postsRes.data || [];
  const categories = categoriesRes.data || [];

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog & Insights CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Publish tech articles, market guides, and enterprise software insights.</p>
        </div>
      </div>

      {/* Add New Article Form */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Publish New Insight Article
        </h2>
        <form action={upsertBlogPost} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Article Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. How AI is Transforming Enterprise Automation in 2025"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <select
                name="category_id"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Author Name</label>
              <input
                type="text"
                name="author_name"
                defaultValue="UniqueAI Tech Team"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Reading Time (minutes)</label>
              <input
                type="number"
                name="reading_time"
                defaultValue="5"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Short Excerpt</label>
            <textarea
              name="excerpt"
              rows={2}
              placeholder="Brief summary displayed on article listing cards..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Full Article Body Content</label>
            <textarea
              name="content"
              required
              rows={6}
              placeholder="Write or paste your article content here..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="block text-xs font-bold text-gray-700">Publishing Status:</label>
            <select
              name="status"
              defaultValue="published"
              className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          <Button type="submit" variant="primary" className="text-xs">
            Save Article
          </Button>
        </form>
      </Card>

      {/* Articles List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Published Articles ({posts?.length || 0})</h2>

        {!posts || posts.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No articles published yet. Write your first post above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post: any) => (
              <div key={post.id} className="py-4 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{post.title}</span>
                    <Badge variant={post.status === 'published' ? 'emerald' : 'outline'}>
                      {post.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{post.excerpt || 'No excerpt.'}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 pt-1">
                    <span>Category: {post.blog_categories?.name || 'General'}</span>
                    <span>• Author: {post.author_name}</span>
                    <span>• {post.reading_time || 5} min read</span>
                  </div>
                </div>

                <form action={async () => { 'use server'; await deleteBlogPost(post.id); }}>
                  <Button type="submit" variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </form>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
