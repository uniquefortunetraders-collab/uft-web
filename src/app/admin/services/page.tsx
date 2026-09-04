import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertService, deleteService } from '@/actions/services';
import { Plus, Trash2, Boxes } from 'lucide-react';

export default async function AdminServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Services & Solutions CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage software services, descriptions, CTA links, and visibility.</p>
        </div>
      </div>

      {/* Add New Service Form */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Add New Service
        </h2>
        <form action={upsertService} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Service Title</label>
              <input
                type="text"
                name="title"
                required
                placeholder="e.g. E-Commerce Development"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Custom Slug (optional)</label>
              <input
                type="text"
                name="slug"
                placeholder="e.g. e-commerce-development"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Short Description</label>
            <textarea
              name="short_description"
              rows={2}
              placeholder="Brief summary displayed on service cards..."
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Detailed Description</label>
            <textarea
              name="description"
              rows={4}
              placeholder="Comprehensive service breakdown..."
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
              Featured Service
            </label>
          </div>

          <Button type="submit" variant="primary" className="text-xs">
            Save Service
          </Button>
        </form>
      </Card>

      {/* Services List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Active Services ({services?.length || 0})</h2>

        {!services || services.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No services found. Add your first service above.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {services.map((item) => (
              <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <Boxes className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-gray-900">{item.title}</span>
                    <Badge variant={item.is_published ? 'emerald' : 'outline'}>
                      {item.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{item.short_description || 'No summary.'}</p>
                </div>

                <form action={async () => { 'use server'; await deleteService(item.id); }}>
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
