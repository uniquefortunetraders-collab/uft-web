'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertBlogPost, deleteBlogPost } from '@/actions/insights';
import { Plus, Trash2, Pencil, X, Image as ImageIcon } from 'lucide-react';
import { BlogPost, BlogCategory } from '@/types/database';
import { ImageUpload } from '@/components/admin/image-upload';

interface InsightsManagerProps {
  initialPosts: any[];
  categories: BlogCategory[];
}

export function InsightsManager({ initialPosts, categories }: InsightsManagerProps) {
  const [editingPost, setEditingPost] = useState<any | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  const handleEdit = (post: any) => {
    setEditingPost(post);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    formElementRef.current?.reset();
    setEditingPost(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Blog & Insights CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Publish tech articles, market guides, and enterprise software insights.</p>
        </div>
      </div>

      {/* Add / Edit Article Form */}
      <div ref={scrollRef}>
        <Card className={`p-6 bg-white border transition-colors ${editingPost ? 'border-[#e6005c] ring-1 ring-[#e6005c]/20' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {editingPost ? (
                <>
                  <Pencil className="w-4 h-4 text-[#e6005c]" />
                  <span>Edit Insight Article: <span className="text-[#e6005c]">{editingPost.title}</span></span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Publish New Insight Article</span>
                </>
              )}
            </h2>

            {editingPost && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-800 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded-md transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>Cancel Edit</span>
              </button>
            )}
          </div>

          <form
            ref={formElementRef}
            key={`insight-form-${editingPost?.id || 'new'}-${formKey}`}
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await upsertBlogPost(formData);
                formElementRef.current?.reset();
                setEditingPost(null);
                setFormKey((k) => k + 1);
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {editingPost && (
              <input type="hidden" name="id" value={editingPost.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Article Title</label>
                <input
                  key={editingPost ? `title-${editingPost.id}` : 'title-new'}
                  type="text"
                  name="title"
                  required
                  defaultValue={editingPost?.title || ''}
                  placeholder="e.g. How AI is Transforming Enterprise Automation in 2026"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <select
                  key={editingPost ? `cat-${editingPost.id}` : 'cat-new'}
                  name="category_id"
                  defaultValue={editingPost?.category_id || ''}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
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
                  key={editingPost ? `author-${editingPost.id}` : 'author-new'}
                  type="text"
                  name="author_name"
                  defaultValue={editingPost?.author_name || 'UniqueAI Tech Team'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Estimated Reading Time (minutes)</label>
                <input
                  key={editingPost ? `read-${editingPost.id}` : 'read-new'}
                  type="number"
                  name="reading_time"
                  defaultValue={editingPost?.reading_time || '5'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <ImageUpload
              key={editingPost ? `img-${editingPost.id}` : 'img-new'}
              name="featured_image_url"
              label="Article Featured Cover Image"
              defaultValue={editingPost?.featured_image_url}
              aspectRatio="video"
              helperText="Drag and drop or upload banner image for this article."
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Short Excerpt</label>
              <textarea
                key={editingPost ? `excerpt-${editingPost.id}` : 'excerpt-new'}
                name="excerpt"
                rows={2}
                defaultValue={editingPost?.excerpt || ''}
                placeholder="Brief summary displayed on article listing cards..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Article Body Content</label>
              <textarea
                key={editingPost ? `content-${editingPost.id}` : 'content-new'}
                name="content"
                required
                rows={6}
                defaultValue={editingPost?.content || ''}
                placeholder="Write or paste your article content here..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none font-mono"
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="block text-xs font-bold text-gray-700">Publishing Status:</label>
              <select
                key={editingPost ? `status-${editingPost.id}` : 'status-new'}
                name="status"
                defaultValue={editingPost?.status || 'published'}
                className="px-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="text-xs">
                {isSubmitting ? (editingPost ? 'Updating...' : 'Saving...') : editingPost ? 'Update Article' : 'Save Article'}
              </Button>
              {editingPost && (
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isSubmitting} className="text-xs">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Articles List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Published Articles ({initialPosts?.length || 0})</h2>

        {!initialPosts || initialPosts.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No articles published yet. Write your first post above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {initialPosts.map((post: any) => (
              <div key={post.id} className="py-4 flex items-start justify-between gap-4">
                {post.featured_image_url ? (
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src={post.featured_image_url}
                      alt={post.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-12 rounded-lg border border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 bg-gray-50 text-gray-400">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                )}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 truncate">{post.title}</span>
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

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                    className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs"
                    title="Edit Article"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>

                  <form action={async () => { await deleteBlogPost(post.id); }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete Article"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
