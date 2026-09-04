import { z } from 'zod';

export const inquirySchema = z.object({
  client_name: z.string().min(2, 'Name must be at least 2 characters'),
  client_email: z.string().email('Invalid email address'),
  client_phone: z.string().optional(),
  company_name: z.string().optional(),
  project_type: z.string().min(1, 'Please select a service'),
  budget_range: z.string().optional(),
  project_brief: z.string().min(5, 'Message must be at least 5 characters'),
  preferred_contact: z.string().optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
