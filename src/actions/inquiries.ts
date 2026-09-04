'use server';

import { createClient } from '@/lib/supabase/server';
import { inquirySchema } from '@/lib/validations/inquiry';

export async function submitInquiry(formData: FormData) {
  const rawData = {
    client_name: formData.get('client_name'),
    client_email: formData.get('client_email'),
    client_phone: formData.get('client_phone') || undefined,
    company_name: formData.get('company_name') || undefined,
    project_type: formData.get('project_type'),
    budget_range: formData.get('budget_range') || undefined,
    project_brief: formData.get('project_brief'),
    preferred_contact: formData.get('preferred_contact') || undefined,
  };

  const validation = inquirySchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0]?.message || 'Invalid form input',
    };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('project_inquiries').insert([
      {
        ...validation.data,
        status: 'new',
      },
    ]);

    if (error) {
      console.error('Database insertion error for inquiry:', error);
      return {
        success: false,
        message: 'Unable to save inquiry. Please try again or message us on WhatsApp.',
      };
    }

    return {
      success: true,
      message: 'Thank you! Your project inquiry has been received. Our team will contact you shortly.',
    };
  } catch (err) {
    console.error('Server error submitting inquiry:', err);
    return {
      success: false,
      message: 'A system error occurred. Please try again.',
    };
  }
}
