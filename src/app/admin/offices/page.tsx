import { createClient } from '@/lib/supabase/server';
import { OfficesManager } from './offices-manager';

export default async function AdminOfficesPage() {
  const supabase = await createClient();
  const { data: offices } = await supabase
    .from('offices')
    .select('*')
    .order('display_order', { ascending: true });

  return <OfficesManager initialOffices={offices || []} />;
}

