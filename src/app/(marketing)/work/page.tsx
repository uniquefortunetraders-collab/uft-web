import { createClient } from '@/lib/supabase/server';
import { PricingPlans } from '@/components/pricing/pricing-plans';

export const metadata = {
  title: 'Products & Pricing Plans | Unique Fortune Traders',
  description: 'Choose your software plan — Manual Algo, Auto Without Server, and Auto With Server for automated trading.',
};

export const revalidate = 60;

export default async function ProductsWorkPage() {
  let products = [];
  let settings = null;

  try {
    const supabase = await createClient();
    const [productsRes, settingsRes] = await Promise.all([
      supabase
        .from('projects')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false }),
      supabase.from('site_settings').select('*').single(),
    ]);

    products = productsRes.data || [];
    settings = settingsRes.data;
  } catch {}

  return (
    <div className="pt-6 pb-12">
      <PricingPlans
        products={products}
        whatsapp={settings?.whatsapp || undefined}
      />
    </div>
  );
}
