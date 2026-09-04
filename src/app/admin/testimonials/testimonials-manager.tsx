'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertTestimonial, deleteTestimonial } from '@/actions/testimonials';
import { Plus, Trash2, Pencil, Star, X, User } from 'lucide-react';
import { Testimonial } from '@/types/database';
import { ImageUpload } from '@/components/admin/image-upload';

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsManager({ initialTestimonials }: TestimonialsManagerProps) {
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  const handleEdit = (item: Testimonial) => {
    setEditingTestimonial(item);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    formElementRef.current?.reset();
    setEditingTestimonial(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Testimonials CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage client reviews, enterprise feedback, and ratings displayed on the website.</p>
        </div>
      </div>

      {/* Add / Edit Testimonial Form */}
      <div ref={scrollRef}>
        <Card className={`p-6 bg-white border transition-colors ${editingTestimonial ? 'border-[#e6005c] ring-1 ring-[#e6005c]/20' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {editingTestimonial ? (
                <>
                  <Pencil className="w-4 h-4 text-[#e6005c]" />
                  <span>Edit Testimonial: <span className="text-[#e6005c]">{editingTestimonial.client_name}</span></span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Add Client Testimonial</span>
                </>
              )}
            </h2>

            {editingTestimonial && (
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
            key={`testimonial-form-${editingTestimonial?.id || 'new'}-${formKey}`}
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await upsertTestimonial(formData);
                formElementRef.current?.reset();
                setEditingTestimonial(null);
                setFormKey((k) => k + 1);
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {editingTestimonial && (
              <input type="hidden" name="id" value={editingTestimonial.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Client Name</label>
                <input
                  key={editingTestimonial ? `name-${editingTestimonial.id}` : 'name-new'}
                  type="text"
                  name="client_name"
                  required
                  defaultValue={editingTestimonial?.client_name || ''}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Client Role / Designation</label>
                <input
                  key={editingTestimonial ? `role-${editingTestimonial.id}` : 'role-new'}
                  type="text"
                  name="client_role"
                  defaultValue={editingTestimonial?.client_role || ''}
                  placeholder="e.g. Chief Technology Officer"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                <input
                  key={editingTestimonial ? `company-${editingTestimonial.id}` : 'company-new'}
                  type="text"
                  name="company_name"
                  defaultValue={editingTestimonial?.company_name || ''}
                  placeholder="e.g. FinTech Dynamics"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <ImageUpload
              key={editingTestimonial ? `avatar-${editingTestimonial.id}` : 'avatar-new'}
              name="avatar_url"
              label="Client Avatar / Photo"
              defaultValue={editingTestimonial?.avatar_url}
              aspectRatio="avatar"
              helperText="Drag and drop or upload client profile photo."
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Star Rating (1 to 5)</label>
              <select
                key={editingTestimonial ? `rating-${editingTestimonial.id}` : 'rating-new'}
                name="rating"
                defaultValue={editingTestimonial?.rating?.toString() || '5'}
                className="w-full sm:w-48 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              >
                <option value="5">5 Stars (⭐⭐⭐⭐⭐)</option>
                <option value="4">4 Stars (⭐⭐⭐⭐)</option>
                <option value="3">3 Stars (⭐⭐⭐)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Testimonial Quote / Feedback</label>
              <textarea
                key={editingTestimonial ? `content-${editingTestimonial.id}` : 'content-new'}
                name="content"
                required
                rows={3}
                defaultValue={editingTestimonial?.content || ''}
                placeholder="Enter authentic client testimonial quote..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingTestimonial ? `pub-${editingTestimonial.id}-${editingTestimonial.is_published}` : 'pub-new'}
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingTestimonial ? editingTestimonial.is_published : true}
                  className="rounded text-[#e6005c]"
                />
                Published on Website
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingTestimonial ? `feat-${editingTestimonial.id}-${editingTestimonial.is_featured}` : 'feat-new'}
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editingTestimonial ? editingTestimonial.is_featured : true}
                  className="rounded text-[#e6005c]"
                />
                Featured on Homepage
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="text-xs">
                {isSubmitting ? (editingTestimonial ? 'Updating...' : 'Saving...') : editingTestimonial ? 'Update Testimonial' : 'Save Testimonial'}
              </Button>
              {editingTestimonial && (
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isSubmitting} className="text-xs">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Testimonials List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Published Testimonials ({initialTestimonials?.length || 0})</h2>

        {!initialTestimonials || initialTestimonials.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No testimonials added yet. Use the form above to add your first client review.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {initialTestimonials.map((t) => (
              <div key={t.id} className="py-4 flex items-start justify-between gap-4">
                {t.avatar_url ? (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src={t.avatar_url}
                      alt={t.client_name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-pink-100 text-[#e6005c] font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {t.client_name ? t.client_name.charAt(0).toUpperCase() : '?'}
                  </div>
                )}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{t.client_name}</span>
                    <span className="text-xs text-gray-500">{t.client_role} {t.company_name ? `(${t.company_name})` : ''}</span>
                    <Badge variant={t.is_published ? 'emerald' : 'outline'}>
                      {t.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    {t.is_featured && (
                      <Badge variant="pink">Featured</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(t)}
                    className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs"
                    title="Edit Testimonial"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>

                  <form action={async () => { await deleteTestimonial(t.id); }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete Testimonial"
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
