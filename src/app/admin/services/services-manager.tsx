'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertService, deleteService } from '@/actions/services';
import { Plus, Trash2, Pencil, Boxes, X, Image as ImageIcon } from 'lucide-react';
import { Service } from '@/types/database';
import { ImageUpload } from '@/components/admin/image-upload';

interface ServicesManagerProps {
  initialServices: Service[];
}

export function ServicesManager({ initialServices }: ServicesManagerProps) {
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  const handleEdit = (service: Service) => {
    setEditingService(service);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    formElementRef.current?.reset();
    setEditingService(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Services & Solutions CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage software services, descriptions, CTA links, and visibility.</p>
        </div>
      </div>

      {/* Add / Edit Service Form */}
      <div ref={scrollRef}>
        <Card className={`p-6 bg-white border transition-colors ${editingService ? 'border-[#e6005c] ring-1 ring-[#e6005c]/20' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {editingService ? (
                <>
                  <Pencil className="w-4 h-4 text-[#e6005c]" />
                  <span>Edit Service: <span className="text-[#e6005c]">{editingService.title}</span></span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Add New Service</span>
                </>
              )}
            </h2>

            {editingService && (
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
            key={`service-form-${editingService?.id || 'new'}-${formKey}`}
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await upsertService(formData);
                formElementRef.current?.reset();
                setEditingService(null);
                setFormKey((k) => k + 1);
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {editingService && (
              <input type="hidden" name="id" value={editingService.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Service Title</label>
                <input
                  key={editingService ? `title-${editingService.id}` : 'title-new'}
                  type="text"
                  name="title"
                  required
                  defaultValue={editingService?.title || ''}
                  placeholder="e.g. E-Commerce Development"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Custom Slug (optional)</label>
                <input
                  key={editingService ? `slug-${editingService.id}` : 'slug-new'}
                  type="text"
                  name="slug"
                  defaultValue={editingService?.slug || ''}
                  placeholder="e.g. e-commerce-development"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none font-mono"
                />
              </div>
            </div>

            <ImageUpload
              key={editingService ? `thumb-${editingService.id}` : 'thumb-new'}
              name="thumbnail_url"
              label="Service Image / Thumbnail"
              defaultValue={editingService?.thumbnail_url}
              aspectRatio="video"
              helperText="Drag and drop or upload image for this service showcase."
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
              <textarea
                key={editingService ? `short-${editingService.id}` : 'short-new'}
                name="short_description"
                rows={2}
                defaultValue={editingService?.short_description || ''}
                placeholder="Brief summary displayed on service cards..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description</label>
              <textarea
                key={editingService ? `desc-${editingService.id}` : 'desc-new'}
                name="description"
                rows={4}
                defaultValue={editingService?.description || ''}
                placeholder="Comprehensive service breakdown..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingService ? `pub-${editingService.id}-${editingService.is_published}` : 'pub-new'}
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingService ? editingService.is_published : true}
                  className="rounded text-[#e6005c]"
                />
                Published on Website
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingService ? `feat-${editingService.id}-${editingService.is_featured}` : 'feat-new'}
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editingService ? editingService.is_featured : true}
                  className="rounded text-[#e6005c]"
                />
                Featured Service
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="text-xs">
                {isSubmitting ? (editingService ? 'Updating Service...' : 'Saving Service...') : editingService ? 'Update Service' : 'Save Service'}
              </Button>
              {editingService && (
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isSubmitting} className="text-xs">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Services List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Active Services ({initialServices?.length || 0})</h2>

        {!initialServices || initialServices.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No services found. Add your first service above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {initialServices.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                {item.thumbnail_url ? (
                  <div className="relative w-14 h-11 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src={item.thumbnail_url}
                      alt={item.title}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-11 h-11 rounded-lg border border-dashed border-gray-200 flex items-center justify-center flex-shrink-0 bg-gray-50 text-gray-400">
                    <Boxes className="w-5 h-5 text-gray-400" />
                  </div>
                )}
                <div className="space-y-1 flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 truncate">{item.title}</span>
                    <Badge variant={item.is_published ? 'emerald' : 'outline'}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    {item.is_featured && (
                      <Badge variant="pink">Featured</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{item.short_description || 'No summary.'}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(item)}
                    className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs"
                    title="Edit Service"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>

                  <form action={async () => { await deleteService(item.id); }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete Service"
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
