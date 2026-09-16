-- ============================================================
-- Migration: Create hero_sections table & seed initial content
-- ============================================================

CREATE TABLE IF NOT EXISTS hero_sections (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  eyebrow text DEFAULT '1200+ Completed • Trusted by 1500+ Clients',
  title text NOT NULL DEFAULT 'Technology That',
  title_highlight text DEFAULT 'Empowers Every',
  title_line3 text DEFAULT 'Business .',
  description text DEFAULT 'UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.',
  primary_cta_label text DEFAULT 'Explore Solutions',
  primary_cta_url text DEFAULT '/solutions',
  secondary_cta_label text DEFAULT 'Talk to Our Experts',
  secondary_cta_url text DEFAULT '/contact',
  hero_image_url text DEFAULT '/algo-trading-hero.png',
  trust_labels jsonb DEFAULT '["Secure", "Scalable", "Smart Automation", "Reliable Support"]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_hero_sections_active ON hero_sections(is_active);

-- Auto updated_at trigger
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at_hero_sections') THEN
    CREATE TRIGGER set_updated_at_hero_sections BEFORE UPDATE ON hero_sections FOR EACH ROW EXECUTE FUNCTION trigger_set_updated_at();
  END IF;
END $$;

-- Row Level Security
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can read active hero sections" ON hero_sections;
CREATE POLICY "Public can read active hero sections" ON hero_sections FOR SELECT TO anon, authenticated USING (is_active = true OR is_admin());

DROP POLICY IF EXISTS "Admins can manage hero sections" ON hero_sections;
CREATE POLICY "Admins can manage hero sections" ON hero_sections FOR ALL TO authenticated USING (is_admin()) WITH CHECK (is_admin());

-- Seed default Hero section if table is empty
INSERT INTO hero_sections (
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
  trust_labels,
  is_active
)
SELECT
  '1200+ Completed • Trusted by 1500+ Clients',
  'Technology That',
  'Empowers Every',
  'Business .',
  'UniqueAI delivers innovative software, intelligent automation and market technology that helps businesses grow, operate efficiently and stay ahead in a digital world.',
  'Explore Solutions',
  '/solutions',
  'Talk to Our Experts',
  '/contact',
  '/algo-trading-hero.png',
  '["Secure", "Scalable", "Smart Automation", "Reliable Support"]'::jsonb,
  true
WHERE NOT EXISTS (SELECT 1 FROM hero_sections);
