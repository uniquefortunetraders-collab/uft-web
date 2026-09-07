import { createClient } from '@/lib/supabase/server';
import { ProductsManager } from '../projects/projects-manager';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return <ProductsManager initialProducts={products || []} />;
}
