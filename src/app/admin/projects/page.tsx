import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertProject, deleteProject } from '@/actions/projects';
import { Plus, Trash2, Globe } from 'lucide-react';

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Case Studies & Work CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage featured client case studies and portfolio projects.</p>
        </div>
      </div>

      {/* Create New Project Form */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Add New Case Study Project
        </h2>
        <form action={upsertProject} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Project Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. Smart FinTech Trading Platform"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                required
                placeholder="e.g. FinTech / E-Commerce / Enterprise ERP"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                name="client_name"
                placeholder="e.g. FinTech Dynamics Ltd."
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Tech Stack (comma separated)</label>
              <input
                type="text"
                name="tech_stack"
                placeholder="Next.js, Python, Supabase, Tailwind"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Short Summary</label>
            <textarea
              name="short_description"
              rows={2}
              placeholder="Brief summary displayed on portfolio cards..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
              <input type="checkbox" name="is_published" defaultChecked className="rounded text-emerald-600" />
              Published on Website
            </label>
            <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
              <input type="checkbox" name="is_featured" defaultChecked className="rounded text-emerald-600" />
              Featured on Homepage
            </label>
          </div>

          <Button type="submit" variant="primary" className="text-xs">
            Save Case Study
          </Button>
        </form>
      </Card>

      {/* Projects List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Existing Case Studies ({projects?.length || 0})</h2>

        {!projects || projects.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No case studies found. Create your first project above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {projects.map((proj) => (
              <div key={proj.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{proj.title}</span>
                    <Badge variant={proj.is_published ? 'emerald' : 'outline'}>
                      {proj.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{proj.short_description || 'No description provided.'}</p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <Badge variant="pink">{proj.category}</Badge>
                    {proj.client_name && <span>Client: {proj.client_name}</span>}
                  </div>
                </div>

                <form action={async () => { 'use server'; await deleteProject(proj.id); }}>
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
