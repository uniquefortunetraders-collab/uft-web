'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertProject, deleteProject } from '@/actions/projects';
import { Plus, Trash2, Pencil, X, Image as ImageIcon } from 'lucide-react';
import { Project } from '@/types/database';
import { ImageUpload } from '@/components/admin/image-upload';

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formKey, setFormKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const formElementRef = useRef<HTMLFormElement>(null);

  const handleEdit = (item: Project) => {
    setEditingProject(item);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    formElementRef.current?.reset();
    setEditingProject(null);
    setFormKey((k) => k + 1);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Case Studies & Work CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage featured client case studies and portfolio projects.</p>
        </div>
      </div>

      {/* Add / Edit Case Study Form */}
      <div ref={scrollRef}>
        <Card className={`p-6 bg-white border transition-colors ${editingProject ? 'border-[#e6005c] ring-1 ring-[#e6005c]/20' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {editingProject ? (
                <>
                  <Pencil className="w-4 h-4 text-[#e6005c]" />
                  <span>Edit Case Study: <span className="text-[#e6005c]">{editingProject.title}</span></span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Add New Case Study Project</span>
                </>
              )}
            </h2>

            {editingProject && (
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
            key={`project-form-${editingProject?.id || 'new'}-${formKey}`}
            action={async (formData) => {
              setIsSubmitting(true);
              try {
                await upsertProject(formData);
                formElementRef.current?.reset();
                setEditingProject(null);
                setFormKey((k) => k + 1);
              } catch (err) {
                console.error(err);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="space-y-4"
          >
            {editingProject && (
              <input type="hidden" name="id" value={editingProject.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Project Title</label>
                <input
                  key={editingProject ? `title-${editingProject.id}` : 'title-new'}
                  type="text"
                  name="title"
                  required
                  defaultValue={editingProject?.title || ''}
                  placeholder="e.g. Smart FinTech Trading Platform"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
                <input
                  key={editingProject ? `cat-${editingProject.id}` : 'cat-new'}
                  type="text"
                  name="category"
                  required
                  defaultValue={editingProject?.category || ''}
                  placeholder="e.g. FinTech / E-Commerce / Enterprise ERP"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Client Name</label>
                <input
                  key={editingProject ? `client-${editingProject.id}` : 'client-new'}
                  type="text"
                  name="client_name"
                  defaultValue={editingProject?.client_name || ''}
                  placeholder="e.g. FinTech Dynamics Ltd."
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Tech Stack (comma separated)</label>
                <input
                  key={editingProject ? `stack-${editingProject.id}` : 'stack-new'}
                  type="text"
                  name="tech_stack"
                  defaultValue={editingProject?.tech_stack ? (Array.isArray(editingProject.tech_stack) ? editingProject.tech_stack.join(', ') : editingProject.tech_stack) : ''}
                  placeholder="Next.js, Python, Supabase, Tailwind"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <ImageUpload
              key={editingProject ? `thumb-${editingProject.id}` : 'thumb-new'}
              name="thumbnail_url"
              label="Project Cover / Thumbnail Image"
              defaultValue={editingProject?.thumbnail_url}
              aspectRatio="video"
              helperText="Drag and drop or upload the primary image displayed on homepage and portfolio cards."
            />

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Short Summary</label>
              <textarea
                key={editingProject ? `short-${editingProject.id}` : 'short-new'}
                name="short_description"
                rows={2}
                defaultValue={editingProject?.short_description || ''}
                placeholder="Brief summary displayed on portfolio cards..."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingProject ? `pub-${editingProject.id}-${editingProject.is_published}` : 'pub-new'}
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingProject ? editingProject.is_published : true}
                  className="rounded text-[#e6005c]"
                />
                Published on Website
              </label>
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingProject ? `feat-${editingProject.id}-${editingProject.is_featured}` : 'feat-new'}
                  type="checkbox"
                  name="is_featured"
                  defaultChecked={editingProject ? editingProject.is_featured : true}
                  className="rounded text-[#e6005c]"
                />
                Featured on Homepage
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" disabled={isSubmitting} className="text-xs">
                {isSubmitting ? (editingProject ? 'Updating...' : 'Saving...') : editingProject ? 'Update Case Study' : 'Save Case Study'}
              </Button>
              {editingProject && (
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} disabled={isSubmitting} className="text-xs">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Projects List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Existing Case Studies ({initialProjects?.length || 0})</h2>

        {!initialProjects || initialProjects.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No case studies found. Create your first project above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {initialProjects.map((proj) => (
              <div key={proj.id} className="py-4 flex items-center justify-between gap-4">
                {proj.thumbnail_url ? (
                  <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-gray-200 flex-shrink-0 bg-gray-100">
                    <Image
                      src={proj.thumbnail_url}
                      alt={proj.title}
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
                    <span className="font-bold text-sm text-gray-900 truncate">{proj.title}</span>
                    <Badge variant={proj.is_published ? 'emerald' : 'outline'}>
                      {proj.is_published ? 'Published' : 'Draft'}
                    </Badge>
                    {proj.is_featured && (
                      <Badge variant="pink">Featured</Badge>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{proj.short_description || 'No description provided.'}</p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Badge variant="pink">{proj.category}</Badge>
                    {proj.client_name && <span>Client: {proj.client_name}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(proj)}
                    className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs"
                    title="Edit Project"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>

                  <form action={async () => { await deleteProject(proj.id); }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete Project"
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
