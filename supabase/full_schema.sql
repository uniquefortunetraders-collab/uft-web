-- ============================================================
-- UniqueAI Complete Database Schema & Initial Seed Script
-- Run this in your Supabase SQL Editor (https://app.supabase.com)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ── 1. Site Settings ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name text NOT NULL DEFAULT 'UniqueAI Technologies',
  legal_name text DEFAULT 'UniqueAI Technologies Pvt. Ltd.',
  tagline text DEFAULT 'Technology for a Smarter Tomorrow',
  description text DEFAULT 'UniqueAI delivers innovative software, intelligent automation, and market technology solutions.',
  logo_url text,
  favicon_url text,
  email text DEFAULT 'contact@uniqueai.com',
  phone text DEFAULT '+91 9876 543 210',
  whatsapp text DEFAULT '+919876543210',
  social_links jsonb DEFAULT '{"linkedin": "", "twitter": "", "facebook": "", "instagram": "", "github": ""}'::jsonb,
  seo_title text DEFAULT 'UniqueAI — Technology for a Smarter Tomorrow',
  seo_description text DEFAULT 'UniqueAI delivers innovative software, AI automation, and market technology solutions for modern businesses.',
  homepage_config jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ── 2. Services ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  description text,
  icon_url text,
  thumbnail_url text,
  featured_image_url text,
  features jsonb DEFAULT '[]'::jsonb,
  cta_label text DEFAULT 'Get Free Consultation',
  cta_url text DEFAULT '/contact',
  display_order integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_services_published ON services(is_published);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(display_order);

-- ── 3. Projects (Our Work Speaks) ─────────────────────────────

CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  client_name text,
  category text NOT NULL DEFAULT 'Software Engineering',
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

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_published ON projects(is_published);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(display_order);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- ── 4. Testimonials (Our Work Speaks) ─────────────────────────

CREATE TABLE IF NOT EXISTS testimonials (
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

CREATE INDEX IF NOT EXISTS idx_testimonials_published ON testimonials(is_published);
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(display_order);

-- ── 5. Blog Categories ────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_categories_slug ON blog_categories(slug);

-- ── 6. Blog Posts ─────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image_url text,
  author_name text DEFAULT 'UniqueAI Team',
  reading_time integer DEFAULT 5,
  published_at timestamptz DEFAULT now(),
  status text DEFAULT 'published' CHECK (status IN ('draft', 'published')),
  seo_title text,
  seo_description text,
  og_image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);

-- ── 7. Offices ────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS offices (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  address text,
  city text,
  state text,
  country text DEFAULT 'India',
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

CREATE INDEX IF NOT EXISTS idx_offices_published ON offices(is_published);

-- ── 8. Project Inquiries ──────────────────────────────────────

CREATE TABLE IF NOT EXISTS project_inquiries (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  client_name text NOT NULL,
  client_email text NOT NULL,
  client_phone text,
  company_name text,
  project_type text NOT NULL,
  budget_range text,
  project_brief text NOT NULL,
  preferred_contact text DEFAULT 'email',
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'in_discussion', 'converted', 'closed')),
  internal_notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_inquiries_status ON project_inquiries(status);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON project_inquiries(created_at);

-- ── 9. Admin Users ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- ── Updated-At Trigger ───────────────────────────────────────

CREATE OR REPLACE FUNCTION trigger_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_site_settings') THEN
    CREATE TRIGGER set_updated_at_site_settings BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_services') THEN
    CREATE TRIGGER set_updated_at_services BEFORE UPDATE ON services FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_projects') THEN
    CREATE TRIGGER set_updated_at_projects BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_testimonials') THEN
    CREATE TRIGGER set_updated_at_testimonials BEFORE UPDATE ON testimonials FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_blog_posts') THEN
    CREATE TRIGGER set_updated_at_blog_posts BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_offices') THEN
    CREATE TRIGGER set_updated_at_offices BEFORE UPDATE ON offices FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_project_inquiries') THEN
    CREATE TRIGGER set_updated_at_project_inquiries BEFORE UPDATE ON project_inquiries FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
END $$;

-- ── 10. Row Level Security Policies ──────────────────────────

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Site Settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read site settings" ON site_settings;
CREATE POLICY "Public can read site settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins can update site settings" ON site_settings;
CREATE POLICY "Admins can update site settings" ON site_settings FOR UPDATE TO authenticated USING (is_admin()) WITH CHECK (is_admin());
DROP POLICY IF EXISTS "Admins can insert site settings" ON site_settings;
CREATE POLICY "Admins can insert site settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (is_admin());

-- Services
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published services" ON services;
CREATE POLICY "Public can read published services" ON services FOR SELECT TO anon, authenticated USING (is_published = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage services" ON services;
CREATE POLICY "Admins can manage services" ON services FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Projects
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published projects" ON projects;
CREATE POLICY "Public can read published projects" ON projects FOR SELECT TO anon, authenticated USING (is_published = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage projects" ON projects;
CREATE POLICY "Admins can manage projects" ON projects FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Testimonials
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published testimonials" ON testimonials;
CREATE POLICY "Public can read published testimonials" ON testimonials FOR SELECT TO anon, authenticated USING (is_published = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage testimonials" ON testimonials;
CREATE POLICY "Admins can manage testimonials" ON testimonials FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Blog Categories & Posts
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read blog categories" ON blog_categories;
CREATE POLICY "Public can read blog categories" ON blog_categories FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Admins can manage blog categories" ON blog_categories;
CREATE POLICY "Admins can manage blog categories" ON blog_categories FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published blog posts" ON blog_posts;
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT TO anon, authenticated USING (status = 'published' OR is_admin());
DROP POLICY IF EXISTS "Admins can manage blog posts" ON blog_posts;
CREATE POLICY "Admins can manage blog posts" ON blog_posts FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Offices
ALTER TABLE offices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read published offices" ON offices;
CREATE POLICY "Public can read published offices" ON offices FOR SELECT TO anon, authenticated USING (is_published = true OR is_admin());
DROP POLICY IF EXISTS "Admins can manage offices" ON offices;
CREATE POLICY "Admins can manage offices" ON offices FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Inquiries
ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can submit inquiries" ON project_inquiries;
CREATE POLICY "Public can submit inquiries" ON project_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Admins can manage inquiries" ON project_inquiries;
CREATE POLICY "Admins can manage inquiries" ON project_inquiries FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Admin Users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Admins can manage admin users" ON admin_users;
CREATE POLICY "Admins can manage admin users" ON admin_users FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- ── 11. Initial Seed Data ─────────────────────────────────────

INSERT INTO site_settings (
  company_name, legal_name, tagline, description, email, phone, whatsapp, social_links, seo_title, seo_description, homepage_config
) VALUES (
  'UniqueAI',
  'UniqueAI Technologies Pvt. Ltd.',
  'Technology for a Smarter Tomorrow',
  'UniqueAI delivers innovative software, intelligent automation, and market technology that helps businesses grow, operate efficiently, and stay ahead in a digital world.',
  'contact@uniqueai.com',
  '+91 9876 543 210',
  '+919876543210',
  '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com", "facebook": "", "instagram": ""}'::jsonb,
  'UniqueAI — Technology for a Smarter Tomorrow',
  'UniqueAI delivers innovative software, AI automation, and market technology solutions for modern businesses.',
  '{
    "hero": {
      "eyebrow": "1200+ Completed • Trusted by 1500+ Clients",
      "title": "Technology that empowers every business.",
      "highlight_text": "empowers every",
      "description": "UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.",
      "primary_cta_label": "Explore Solutions",
      "primary_cta_url": "/solutions",
      "secondary_cta_label": "Talk to Our Experts",
      "secondary_cta_url": "/contact",
      "trust_labels": ["Secure", "Scalable", "Smart Automation", "Reliable Support"]
    },
    "why_choose": {
      "title": "Why Businesses Choose UniqueAI?",
      "benefits": [
        {"icon": "Shield", "title": "100% Secure", "description": "Your data is safe with enterprise-grade security protocols."},
        {"icon": "Settings", "title": "Custom Solutions", "description": "Tailored software that fits your exact business needs."},
        {"icon": "Users", "title": "Expert Team", "description": "15+ years of experience across multiple domains."},
        {"icon": "Headphones", "title": "24/7 Support", "description": "With you at every step of your journey."},
        {"icon": "TrendingUp", "title": "Proven Results", "description": "Trusted by 1500+ businesses across India."}
      ]
    },
    "process": {
      "title": "Our Proven Process",
      "subtitle": "From idea to impact — we build technology that offers real results.",
      "steps": [
        {"number": 1, "title": "Discover", "description": "We understand your business needs."},
        {"number": 2, "title": "Plan", "description": "We create a strategy tailored to your needs."},
        {"number": 3, "title": "Design", "description": "We design beautiful experiences."},
        {"number": 4, "title": "Develop", "description": "We build scalable and reliable solutions."},
        {"number": 5, "title": "Deploy & Support", "description": "We launch and support for growth."}
      ]
    },
    "stats": [
      {"value": "1000+", "label": "Happy Clients", "order": 1},
      {"value": "150+", "label": "Projects Delivered", "order": 2},
      {"value": "10+", "label": "Years of Experience", "order": 3},
      {"value": "99.9%", "label": "System Uptime", "order": 4},
      {"value": "24/7", "label": "Expert Support", "order": 5}
    ],
    "capabilities": [
      {"icon": "Globe", "title": "Web & Mobile Development", "order": 1},
      {"icon": "Cloud", "title": "Cloud & DevOps Solutions", "order": 2},
      {"icon": "BarChart3", "title": "Data Analytics & Reporting", "order": 3},
      {"icon": "Link2", "title": "API & System Integration", "order": 4},
      {"icon": "Palette", "title": "UI/UX Design & Branding", "order": 5},
      {"icon": "Wrench", "title": "Maintenance & Tech Support", "order": 6}
    ]
  }'::jsonb
) ON CONFLICT DO NOTHING;

INSERT INTO testimonials (client_name, client_role, company_name, rating, content, display_order, is_featured, is_published) VALUES
('Rahul Sharma', 'CTO', 'FinTech Dynamics', 5, 'UniqueAI transformed our trading infrastructure. The real-time charts and low latency feeds improved our trader satisfaction by 40%.', 1, true, true),
('Ananya Patel', 'Founder & CEO', 'StyleKendra Retail', 5, 'Their e-commerce solution handled our peak holiday traffic seamlessly. High-performance design and ultra-fast page speed!', 2, true, true),
('Vikram Mehta', 'VP of Operations', 'Apex Logistics', 5, 'The custom ERP system designed by UniqueAI streamlined our supply chain and reduced order processing overhead by half.', 3, true, true),
('Siddharth Nair', 'Director', 'Nair Global Ventures', 5, 'Working with UniqueAI was an absolute pleasure. Professional software engineering with unmatched reliability and support.', 4, true, true)
ON CONFLICT DO NOTHING;

INSERT INTO blog_categories (name, slug) VALUES
  ('AI & Automation', 'ai-automation'),
  ('Market Guides', 'market-guides'),
  ('Business', 'business'),
  ('Technology', 'technology'),
  ('E-Commerce', 'e-commerce')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO blog_posts (title, slug, excerpt, content, author_name, reading_time, published_at, status) VALUES
(
  'How AI is Transforming Business Automation in 2025',
  'ai-transforming-business-automation-2025',
  'Explore how intelligent automation helps businesses save time, optimize workflows, and scale faster with AI tools.',
  'Artificial intelligence is no longer a futuristic concept—it is driving real bottom-line impact today. Modern enterprise solutions leverage machine learning models to automate document processing, client communications, and predictive supply chain management...',
  'UniqueAI Tech Team', 6, now(), 'published'
),
(
  'Understanding Option Chain Like a Pro',
  'understanding-option-chain-like-a-pro',
  'A beginner-friendly guide to reading option chain data and making smarter market trading decisions.',
  'Navigating option chains can seem overwhelming at first. In this guide, we break down Open Interest (OI), Volume, Implied Volatility (IV), and Greeks to equip traders with clear actionable insights...',
  'FinTech Research Desk', 8, now(), 'published'
),
(
  'Why ERP Systems are Essential for Scaling Enterprise Business',
  'why-erp-is-essential-for-growing-businesses',
  'Discover how integrated ERP software improves operational efficiency, financial accounting, and organizational transparency.',
  'As companies grow, operating on fragmented spreadsheets and isolated databases creates costly bottlenecks. An integrated enterprise resource planning system centralizes data...',
  'Enterprise Solutions Lead', 5, now(), 'published'
)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO offices (name, address, city, state, country, postal_code, phone, email, display_order) VALUES
('Delhi HQ', 'Connaught Place', 'New Delhi', 'Delhi', 'India', '110001', '+91 11 4000 7070', 'delhi@uniqueai.com', 1),
('Bangalore Tech Hub', 'MG Road', 'Bangalore', 'Karnataka', 'India', '560001', '+91 80 4000 8080', 'bangalore@uniqueai.com', 2)
ON CONFLICT DO NOTHING;
