import { createClient } from '@supabase/supabase-js';

/**
 * Creates a Supabase client with service-role privileges.
 * SERVER-ONLY — never import this in client components or expose to the browser.
 *
 * Use only for:
 * - Admin operations that bypass RLS
 * - Database migrations
 * - Seed scripts
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables'
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
