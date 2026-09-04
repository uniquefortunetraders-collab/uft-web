'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';

export async function upsertOffice(formData: FormData): Promise<void> {
  const supabase = await createClient();

  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string;
  const address = formData.get('address') as string || null;
  const city = formData.get('city') as string || null;
  const state = formData.get('state') as string || null;
  const country = formData.get('country') as string || 'India';
  const postal_code = formData.get('postal_code') as string || null;
  const phone = formData.get('phone') as string || null;
  const email = formData.get('email') as string || null;
  const map_url = formData.get('map_url') as string || null;
  const is_published = formData.get('is_published') === 'true' || formData.get('is_published') === 'on';

  const payload = {
    name,
    address,
    city,
    state,
    country,
    postal_code,
    phone,
    email,
    map_url,
    is_published,
  };

  if (id) {
    await supabase.from('offices').update(payload).eq('id', id);
  } else {
    await supabase.from('offices').insert([payload]);
  }

  revalidatePath('/contact');
  revalidatePath('/admin/offices');
  revalidatePath('/');
}

export async function deleteOffice(id: string): Promise<void> {
  const supabase = await createClient();
  await supabase.from('offices').delete().eq('id', id);

  revalidatePath('/contact');
  revalidatePath('/admin/offices');
  revalidatePath('/');
}
