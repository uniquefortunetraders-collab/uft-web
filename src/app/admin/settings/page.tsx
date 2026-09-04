import { createClient } from '@/lib/supabase/server';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateSiteSettings } from '@/actions/settings';
import { Settings, Globe, Shield, Phone, Mail } from 'lucide-react';

export default async function AdminSettingsPage() {
  let settings = null;

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('*').single();
    settings = data;
  } catch {}

  const social = (settings?.social_links as any) || {};

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-2xl font-black text-gray-900">Site Settings & Global SEO CMS</h1>
        <p className="text-xs text-gray-500 mt-1">Manage global company metadata, contact information, social links, and SEO tags.</p>
      </div>

      <Card className="p-6 bg-white border border-gray-200">
        <form action={updateSiteSettings} className="space-y-6">
          
          {/* General Information */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Globe className="w-4 h-4 text-emerald-600" /> Company Branding & Legal Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Name</label>
                <input
                  type="text"
                  name="company_name"
                  defaultValue={settings?.company_name || 'UniqueAI Technologies'}
                  required
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Legal Company Name</label>
                <input
                  type="text"
                  name="legal_name"
                  defaultValue={settings?.legal_name || 'UniqueAI Technologies Pvt. Ltd.'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Brand Tagline</label>
                <input
                  type="text"
                  name="tagline"
                  defaultValue={settings?.tagline || 'Technology for a Smarter Tomorrow'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Company Overview / Description</label>
                <input
                  type="text"
                  name="description"
                  defaultValue={settings?.description || ''}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Phone className="w-4 h-4 text-emerald-600" /> Primary Contact Info
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Email</label>
                <input
                  type="email"
                  name="email"
                  defaultValue={settings?.email || 'contact@uniqueai.com'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Primary Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={settings?.phone || '+91 9876 543 210'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp Number</label>
                <input
                  type="text"
                  name="whatsapp"
                  defaultValue={settings?.whatsapp || '+919876543210'}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Mail className="w-4 h-4 text-emerald-600" /> Social Links
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedin"
                  defaultValue={social.linkedin || ''}
                  placeholder="https://linkedin.com/company/uniqueai"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Twitter / X URL</label>
                <input
                  type="text"
                  name="twitter"
                  defaultValue={social.twitter || ''}
                  placeholder="https://x.com/uniqueai"
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SEO Metadata */}
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 flex items-center gap-2 border-b border-gray-100 pb-2">
              <Shield className="w-4 h-4 text-emerald-600" /> Global Search Engine Optimization (SEO)
            </h2>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Global SEO Title</label>
              <input
                type="text"
                name="seo_title"
                defaultValue={settings?.seo_title || 'UniqueAI — Technology for a Smarter Tomorrow'}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Global SEO Meta Description</label>
              <textarea
                name="seo_description"
                rows={3}
                defaultValue={settings?.seo_description || 'UniqueAI delivers innovative software, AI automation, and market technology solutions for modern businesses.'}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" className="text-xs">
            Save Site & SEO Settings
          </Button>
        </form>
      </Card>
    </div>
  );
}
