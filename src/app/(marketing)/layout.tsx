import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { createClient } from '@/lib/supabase/server';

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let settings = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('*').single();
    settings = data;
  } catch {
    // Graceful fallback when DB is not yet populated
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#f1f8f3] overflow-x-hidden w-full max-w-full">
      <Header
        companyName={settings?.company_name || 'Unique Fortune Traders'}
        whatsapp={settings?.whatsapp || undefined}
      />
      <main className="flex-grow overflow-x-hidden w-full max-w-full">{children}</main>
      <Footer
        companyName={settings?.company_name || 'Unique Fortune Traders'}
        tagline={settings?.tagline || 'Technology for a Smarter Tomorrow'}
      />
    </div>
  );
}
