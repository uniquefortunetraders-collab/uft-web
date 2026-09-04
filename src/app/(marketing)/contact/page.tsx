import { createClient } from '@/lib/supabase/server';
import { ContactSection } from '@/components/contact/contact-section';

export const metadata = {
  title: 'Contact Us | UniqueAI Technologies',
  description: 'Get in touch with UniqueAI software engineers and enterprise solution advisors in Cochin & Bengaluru.',
};

export default async function ContactPage() {
  let settings = null;
  let offices = [];

  try {
    const supabase = await createClient();
    const [settingsRes, officesRes] = await Promise.all([
      supabase.from('site_settings').select('*').single(),
      supabase
        .from('offices')
        .select('*')
        .eq('is_published', true)
        .order('display_order', { ascending: true }),
    ]);

    settings = settingsRes.data;
    offices = officesRes.data || [];
  } catch {}

  return (
    <div className="pt-8 pb-12 bg-[#f1f8f3]">
      <ContactSection
        settings={{
          email: settings?.email || undefined,
          phone: settings?.phone || undefined,
          whatsapp: settings?.whatsapp || undefined,
        }}
        offices={offices}
      />
    </div>
  );
}
