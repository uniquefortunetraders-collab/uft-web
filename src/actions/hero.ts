'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { HeroSection } from '@/types/database';

export async function getHeroSection(): Promise<HeroSection | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) {
      console.warn('Hero section fetch warning:', error.message);
      return null;
    }

    if (data) {
      // Ensure trust_labels is array
      let trust_labels: string[] = ['Secure', 'Scalable', 'Smart Automation', 'Reliable Support'];
      if (Array.isArray(data.trust_labels)) {
        trust_labels = data.trust_labels;
      } else if (typeof data.trust_labels === 'string') {
        try {
          trust_labels = JSON.parse(data.trust_labels);
        } catch {
          trust_labels = data.trust_labels.split(',').map((s: string) => s.trim()).filter(Boolean);
        }
      }

      return {
        ...data,
        trust_labels,
      };
    }

    return null;
  } catch (err) {
    console.error('Failed to get hero section:', err);
    return null;
  }
}

export async function updateHeroSection(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const id = formData.get('id') as string | null;
    const eyebrow = (formData.get('eyebrow') as string) || '1200+ Completed • Trusted by 1500+ Clients';
    const title = (formData.get('title') as string) || 'Technology That';
    const title_highlight = (formData.get('title_highlight') as string) || 'Empowers Every';
    const title_line3 = (formData.get('title_line3') as string) || 'Business .';
    const description = (formData.get('description') as string) || '';
    const primary_cta_label = (formData.get('primary_cta_label') as string) || 'Explore Solutions';
    const primary_cta_url = (formData.get('primary_cta_url') as string) || '/solutions';
    const secondary_cta_label = (formData.get('secondary_cta_label') as string) || 'Talk to Our Experts';
    const secondary_cta_url = (formData.get('secondary_cta_url') as string) || '/contact';
    const hero_image_url = (formData.get('hero_image_url') as string) || '/algo-trading-hero.png';
    
    const trustLabelsRaw = (formData.get('trust_labels') as string) || '';
    const trust_labels = trustLabelsRaw
      .split('\n')
      .map((item) => item.trim())
      .filter((item) => item.length > 0);

    const payload = {
      eyebrow,
      title,
      title_highlight,
      title_line3,
      description,
      primary_cta_label,
      primary_cta_url,
      secondary_cta_label,
      secondary_cta_url,
      hero_image_url,
      trust_labels: trust_labels.length > 0 ? trust_labels : ['Secure', 'Scalable', 'Smart Automation', 'Reliable Support'],
      is_active: true,
      updated_at: new Date().toISOString(),
    };

    if (id) {
      const { error } = await supabase.from('hero_sections').update(payload).eq('id', id);
      if (error) throw error;
    } else {
      // Check if any existing row exists
      const { data: existing } = await supabase.from('hero_sections').select('id').limit(1).maybeSingle();
      if (existing?.id) {
        const { error } = await supabase.from('hero_sections').update(payload).eq('id', existing.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('hero_sections').insert([payload]);
        if (error) throw error;
      }
    }

    revalidatePath('/');
    revalidatePath('/admin/hero');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch (error: any) {
    console.error('Error updating hero section:', error);
    return { success: false, error: error.message || 'Failed to update hero section' };
  }
}
