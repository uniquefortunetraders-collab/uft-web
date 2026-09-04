/* ──────────────────────────────────────────────────────────────
   Database type definitions matching the Supabase schema.
   These types are manually maintained to match the SQL migration.
   ────────────────────────────────────────────────────────────── */

// ── Enums ────────────────────────────────────────────────────

export type InquiryStatus =
  | 'new'
  | 'contacted'
  | 'in_discussion'
  | 'converted'
  | 'closed';

export type BlogPostStatus = 'draft' | 'published';

// ── Core Tables ──────────────────────────────────────────────

export interface SiteSettings {
  id: string;
  company_name: string;
  legal_name: string | null;
  tagline: string | null;
  description: string | null;
  logo_url: string | null;
  favicon_url: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  social_links: SocialLinks;
  seo_title: string | null;
  seo_description: string | null;
  homepage_config: HomepageConfig | null;
  created_at: string;
  updated_at: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  linkedin?: string;
  instagram?: string;
  youtube?: string;
  github?: string;
  [key: string]: string | undefined;
}

export interface HomepageConfig {
  hero?: {
    eyebrow?: string;
    title?: string;
    highlight_text?: string;
    description?: string;
    primary_cta_label?: string;
    primary_cta_url?: string;
    secondary_cta_label?: string;
    secondary_cta_url?: string;
    hero_image_url?: string;
    trust_labels?: string[];
  };
  why_choose?: {
    title?: string;
    benefits?: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
  };
  process?: {
    title?: string;
    subtitle?: string;
    steps?: Array<{
      number: number;
      title: string;
      description: string;
    }>;
  };
  stats?: Array<{
    value: string;
    label: string;
    order: number;
  }>;
  capabilities?: Array<{
    icon?: string;
    title: string;
    order: number;
  }>;
  cta?: {
    heading?: string;
    description?: string;
    button_label?: string;
    button_url?: string;
  };
}

// ── Services ─────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  icon_url: string | null;
  thumbnail_url: string | null;
  featured_image_url: string | null;
  features: ServiceFeature[];
  cta_label: string | null;
  cta_url: string | null;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceFeature {
  title: string;
  description?: string;
  icon?: string;
}

// ── Projects ─────────────────────────────────────────────────

export interface Project {
  id: string;
  title: string;
  slug: string;
  client_name: string | null;
  category: string;
  short_description: string | null;
  challenge_description: string | null;
  solution_description: string | null;
  outcome_description: string | null;
  thumbnail_url: string | null;
  featured_image_url: string | null;
  live_url: string | null;
  tech_stack: string[];
  gallery_images: GalleryImage[];
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface GalleryImage {
  url: string;
  alt: string;
  caption?: string;
}

// ── Testimonials ─────────────────────────────────────────────

export interface Testimonial {
  id: string;
  client_name: string;
  client_role: string | null;
  company_name: string | null;
  avatar_url: string | null;
  rating: number;
  content: string;
  display_order: number;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ── Blog ─────────────────────────────────────────────────────

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  reading_time: number | null;
  published_at: string | null;
  status: BlogPostStatus;
  seo_title: string | null;
  seo_description: string | null;
  og_image_url: string | null;
  created_at: string;
  updated_at: string;
  // Joined fields
  category?: BlogCategory | null;
}

// ── Offices ──────────────────────────────────────────────────

export interface Office {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  state: string | null;
  country: string | null;
  postal_code: string | null;
  latitude: number | null;
  longitude: number | null;
  phone: string | null;
  email: string | null;
  map_url: string | null;
  display_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

// ── Project Inquiries ────────────────────────────────────────

export interface ProjectInquiry {
  id: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  company_name: string | null;
  project_type: string;
  budget_range: string | null;
  project_brief: string;
  preferred_contact: string | null;
  status: InquiryStatus;
  internal_notes: string | null;
  created_at: string;
  updated_at: string;
}

// ── Admin Users ──────────────────────────────────────────────

export interface AdminUser {
  id: string;
  email: string;
  created_at: string;
}

// ── Navigation ───────────────────────────────────────────────

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  display_order: number;
  is_external: boolean;
  parent_id: string | null;
  is_active: boolean;
  created_at: string;
}
