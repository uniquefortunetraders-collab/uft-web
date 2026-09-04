import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertOffice, deleteOffice } from '@/actions/offices';
import { Plus, Trash2, MapPin, Phone, Mail } from 'lucide-react';

export default async function AdminOfficesPage() {
  const supabase = await createClient();
  const { data: offices } = await supabase
    .from('offices')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Office Locations CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage physical office locations displayed on contact pages.</p>
        </div>
      </div>

      {/* Add New Office Form */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" /> Add Office Location
        </h2>
        <form action={upsertOffice} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Office Name / City</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Delhi HQ"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
              <input
                type="text"
                name="city"
                placeholder="e.g. New Delhi"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
              <input
                type="text"
                name="state"
                placeholder="e.g. Delhi"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. Connaught Place"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="e.g. +91 11 4000 7070"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="e.g. delhi@uniqueai.com"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
              <input type="checkbox" name="is_published" defaultChecked className="rounded text-emerald-600" />
              Published on Contact Page
            </label>
          </div>

          <Button type="submit" variant="primary" className="text-xs">
            Save Office Location
          </Button>
        </form>
      </Card>

      {/* Offices List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Active Offices ({offices?.length || 0})</h2>

        {!offices || offices.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No offices added yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {offices.map((office) => (
              <div key={office.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-sm text-gray-900">{office.name}</span>
                    <Badge variant={office.is_published ? 'emerald' : 'outline'}>
                      {office.is_published ? 'Active' : 'Hidden'}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">{office.address}, {office.city}, {office.state}</p>
                  <div className="flex items-center gap-4 text-[11px] text-gray-400">
                    {office.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {office.phone}</span>}
                    {office.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {office.email}</span>}
                  </div>
                </div>

                <form action={async () => { 'use server'; await deleteOffice(office.id); }}>
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
