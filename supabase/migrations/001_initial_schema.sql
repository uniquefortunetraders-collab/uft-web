-- ============================================================
-- UniqueAI Database Schema
-- Migration 001: Initial Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── Site Settings ────────────────────────────────────────────

CREATE TABLE site_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  legal_name text,
  tagline text,
  description text,
  logo_url text,
  favicon_url text,
  email text,
  phone text,
  whatsapp text,
  social_links jsonb DEFAULT '{}'::jsonb,
  seo_title text,
  seo_description text,
  homepage_config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── Services ─────────────────────────────────────────────────

CREATE TABLE services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  description text,
  icon_url text,
  thumbnail_url text,
  featured_image_url text,
  features jsonb DEFAULT '[]'::jsonb,
  cta_label text,
  cta_url text,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_services_slug ON services(slug);
CREATE INDEX idx_services_published ON services(is_published);
CREATE INDEX idx_services_order ON services(display_order);
CREATE INDEX idx_services_featured ON services(is_featured);

-- ── Projects ─────────────────────────────────────────────────

CREATE TABLE projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  client_name text,
  category text NOT NULL,
  short_description text,
  challenge_description text,
  solution_description text,
  outcome_description text,
  thumbnail_url text,
  featured_image_url text,
  live_url text,
  tech_stack text[] DEFAULT '{}',
  gallery_images jsonb DEFAULT '[]'::jsonb,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_projects_slug ON projects(slug);
CREATE INDEX idx_projects_published ON projects(is_published);
CREATE INDEX idx_projects_order ON projects(display_order);
CREATE INDEX idx_projects_category ON projects(category);

-- ── Testimonials ─────────────────────────────────────────────

CREATE TABLE testimonials (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  client_role text,
  company_name text,
  avatar_url text,
  rating integer DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  content text NOT NULL,
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT true,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_testimonials_published ON testimonials(is_published);
CREATE INDEX idx_testimonials_order ON testimonials(display_order);

-- ── Blog Categories ──────────────────────────────────────────

CREATE TABLE blog_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_blog_categories_slug ON blog_categories(slug);

-- ── Blog Posts ───────────────────────────────────────────────

CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image_url text,
  author_name text,
  reading_time integer,
  published_at timestamptz,
  status text DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published_at ON blog_posts(published_at);

-- ── Offices ──────────────────────────────────────────────────

CREATE TABLE offices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  latitude numeric,
  longitude numeric,
  phone text,
  email text,
  map_url text,
  display_order integer DEFAULT 0,
  is_published boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_offices_published ON offices(is_published);
CREATE INDEX idx_offices_order ON offices(display_order);

-- ── Project Inquiries ────────────────────────────────────────

CREATE TABLE project_inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  company_name text,
  project_type text NOT NULL,
  budget_range text,
  project_brief text NOT NULL,
  preferred_contact text,
  status text DEFAULT 'new'
    CHECK (status IN (
      'new',
      'contacted',
      'in_discussion',
      'converted',
      'closed'
    )),
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_inquiries_status ON project_inquiries(status);
CREATE INDEX idx_inquiries_created ON project_inquiries(created_at);

-- ── Admin Users ──────────────────────────────────────────────

CREATE TABLE admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ── Updated-at trigger ──────────────────────────────────────

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON services
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON testimonials
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON offices
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();

CREATE TRIGGER set_updated_at BEFORE UPDATE ON project_inquiries
  FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
