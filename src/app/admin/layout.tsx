import { createClient } from '@/lib/supabase/server';
import { AdminShell } from './admin-shell';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  } catch {}

  return <AdminShell userEmail={user?.email}>{children}</AdminShell>;
}
