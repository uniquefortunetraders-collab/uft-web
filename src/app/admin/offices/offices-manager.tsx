'use client';

import { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { upsertOffice, deleteOffice } from '@/actions/offices';
import { Plus, Trash2, Pencil, MapPin, Phone, Mail, X } from 'lucide-react';
import { Office } from '@/types/database';

interface OfficesManagerProps {
  initialOffices: Office[];
}

export function OfficesManager({ initialOffices }: OfficesManagerProps) {
  const [editingOffice, setEditingOffice] = useState<Office | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const handleEdit = (office: Office) => {
    setEditingOffice(office);
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCancel = () => {
    setEditingOffice(null);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Office Locations CMS</h1>
          <p className="text-xs text-gray-500 mt-1">Manage physical office locations displayed on contact pages.</p>
        </div>
      </div>

      {/* Add / Edit Office Form */}
      <div ref={formRef}>
        <Card className={`p-6 bg-white border transition-colors ${editingOffice ? 'border-[#e6005c] ring-1 ring-[#e6005c]/20' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
              {editingOffice ? (
                <>
                  <Pencil className="w-4 h-4 text-[#e6005c]" />
                  <span>Edit Office: <span className="text-[#e6005c]">{editingOffice.name}</span></span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 text-emerald-600" />
                  <span>Add Office Location</span>
                </>
              )}
            </h2>

            {editingOffice && (
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

          <form action={async (formData) => {
            await upsertOffice(formData);
            setEditingOffice(null);
          }} className="space-y-4">
            {editingOffice && (
              <input type="hidden" name="id" value={editingOffice.id} />
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Office Name / City</label>
                <input
                  key={editingOffice ? `name-${editingOffice.id}` : 'name-new'}
                  type="text"
                  name="name"
                  required
                  defaultValue={editingOffice?.name || ''}
                  placeholder="e.g. Delhi HQ"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">City</label>
                <input
                  key={editingOffice ? `city-${editingOffice.id}` : 'city-new'}
                  type="text"
                  name="city"
                  defaultValue={editingOffice?.city || ''}
                  placeholder="e.g. New Delhi"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">State</label>
                <input
                  key={editingOffice ? `state-${editingOffice.id}` : 'state-new'}
                  type="text"
                  name="state"
                  defaultValue={editingOffice?.state || ''}
                  placeholder="e.g. Delhi"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Street Address</label>
                <input
                  key={editingOffice ? `addr-${editingOffice.id}` : 'addr-new'}
                  type="text"
                  name="address"
                  defaultValue={editingOffice?.address || ''}
                  placeholder="e.g. Connaught Place"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Phone Number</label>
                <input
                  key={editingOffice ? `phone-${editingOffice.id}` : 'phone-new'}
                  type="text"
                  name="phone"
                  defaultValue={editingOffice?.phone || ''}
                  placeholder="e.g. +91 11 4000 7070"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  key={editingOffice ? `email-${editingOffice.id}` : 'email-new'}
                  type="email"
                  name="email"
                  defaultValue={editingOffice?.email || ''}
                  placeholder="e.g. delhi@uniqueai.com"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e6005c] focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 text-xs text-gray-700 font-bold cursor-pointer">
                <input
                  key={editingOffice ? `pub-${editingOffice.id}-${editingOffice.is_published}` : 'pub-new'}
                  type="checkbox"
                  name="is_published"
                  defaultChecked={editingOffice ? editingOffice.is_published : true}
                  className="rounded text-[#e6005c]"
                />
                Published on Contact Page
              </label>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button type="submit" variant="primary" className="text-xs">
                {editingOffice ? 'Update Office Location' : 'Save Office Location'}
              </Button>
              {editingOffice && (
                <Button type="button" variant="outline" size="sm" onClick={handleCancel} className="text-xs">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Card>
      </div>

      {/* Offices List */}
      <Card className="p-6 bg-white border border-gray-200">
        <h2 className="text-base font-bold text-gray-900 mb-4">Active Offices ({initialOffices?.length || 0})</h2>

        {!initialOffices || initialOffices.length === 0 ? (
          <div className="text-xs text-gray-500 py-6 text-center">No offices added yet.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {initialOffices.map((office) => (
              <div key={office.id} className="py-4 flex items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#e6005c]" />
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

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(office)}
                    className="text-slate-700 hover:text-[#e6005c] hover:border-pink-300 flex items-center gap-1 text-xs"
                    title="Edit Office"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </Button>

                  <form action={async () => { await deleteOffice(office.id); }}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete Office"
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
