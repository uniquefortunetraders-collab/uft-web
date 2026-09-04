import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertTestimonial, deleteTestimonial } from '@/actions/testimonials';
import { Plus, Trash2, Star, Quote } from 'lucide-react';

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Testimonials CMS (Our Work Speaks)</h1>
          <p className="text-xs text-gray-500 mt-1">Manage client reviews, enterprise feedback, and star ratings displayed on the website.</p>
        </div>
      </div>

      {/* Add New Testimonial Form */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Add Client Testimonial
        </h2>
        <form action={upsertTestimonial} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Client Name</label>
              <input
                type="text"
                name="client_name"
                required
                placeholder="e.g. Rahul Sharma"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Client Role / Designation</label>
              <input
                type="text"
                name="client_role"
                placeholder="e.g. Chief Technology Officer"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
              <input
                type="text"
                name="company_name"
                placeholder="e.g. FinTech Dynamics"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Star Rating (1 to 5)</label>
            <select
              name="rating"
              defaultValue="5"
              className="w-full sm:w-48 px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              <option value="5">5 Stars (⭐⭐⭐⭐⭐)</option>
              <option value="4">4 Stars (⭐⭐⭐⭐)</option>
              <option value="3">3 Stars (⭐⭐⭐)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Testimonial Quote / Feedback</label>
            <textarea
              name="content"
              required
              rows={3}
              placeholder="Enter authentic client testimonial quote..."
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
            Save Testimonial
          </Button>
        </form>
      </Card>

      {/* Testimonials List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Published Testimonials ({testimonials?.length || 0})</h2>

        {!testimonials || testimonials.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No testimonials added yet. Use the form above to add your first client review.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {testimonials.map((t) => (
              <div key={t.id} className="py-4 flex items-start justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">{t.client_name}</span>
                    <span className="text-xs text-gray-500">{t.client_role} {t.company_name ? `(${t.company_name})` : ''}</span>
                    <Badge variant={t.is_published ? 'emerald' : 'outline'}>
                      {t.is_published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: t.rating || 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 italic leading-relaxed">&ldquo;{t.content}&rdquo;</p>
                </div>

                <form action={async () => { 'use server'; await deleteTestimonial(t.id); }}>
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
