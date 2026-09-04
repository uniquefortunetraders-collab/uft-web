-- ============================================================
-- UniqueAI Row Level Security Policies
-- Migration 002: RLS Policies
-- ============================================================

-- ── Helper: Check if user is admin ──────────────────────────

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users
    WHERE id = auth.uid()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ════════════════════════════════════════════════════════════
-- Site Settings
-- ════════════════════════════════════════════════════════════

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

-- ════════════════════════════════════════════════════════════
-- Services
-- ════════════════════════════════════════════════════════════

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published services"
  ON services FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins can insert services"
  ON services FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update services"
  ON services FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete services"
  ON services FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Projects
-- ════════════════════════════════════════════════════════════

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins can insert projects"
  ON projects FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update projects"
  ON projects FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete projects"
  ON projects FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Testimonials
-- ════════════════════════════════════════════════════════════

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins can insert testimonials"
  ON testimonials FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update testimonials"
  ON testimonials FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete testimonials"
  ON testimonials FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Blog Categories
-- ════════════════════════════════════════════════════════════

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read blog categories"
  ON blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage blog categories"
  ON blog_categories FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- ════════════════════════════════════════════════════════════
-- Blog Posts
-- ════════════════════════════════════════════════════════════

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published blog posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (status = 'published' OR is_admin());

CREATE POLICY "Admins can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Offices
-- ════════════════════════════════════════════════════════════

ALTER TABLE offices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published offices"
  ON offices FOR SELECT
  TO anon, authenticated
  USING (is_published = true OR is_admin());

CREATE POLICY "Admins can insert offices"
  ON offices FOR INSERT
  TO authenticated
  WITH CHECK (is_admin());

CREATE POLICY "Admins can update offices"
  ON offices FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admins can delete offices"
  ON offices FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Project Inquiries
-- ════════════════════════════════════════════════════════════

ALTER TABLE project_inquiries ENABLE ROW LEVEL SECURITY;

-- Public can ONLY insert — never read, update, or delete
CREATE POLICY "Public can submit inquiries"
  ON project_inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admins can read all inquiries
CREATE POLICY "Admins can read inquiries"
  ON project_inquiries FOR SELECT
  TO authenticated
  USING (is_admin());

-- Admins can update inquiries (status, notes)
CREATE POLICY "Admins can update inquiries"
  ON project_inquiries FOR UPDATE
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());

-- Admins can delete inquiries
CREATE POLICY "Admins can delete inquiries"
  ON project_inquiries FOR DELETE
  TO authenticated
  USING (is_admin());

-- ════════════════════════════════════════════════════════════
-- Admin Users
-- ════════════════════════════════════════════════════════════

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Only admins can see admin users
CREATE POLICY "Admins can read admin users"
  ON admin_users FOR SELECT
  TO authenticated
  USING (is_admin());

-- Only admins can manage admin users
CREATE POLICY "Admins can manage admin users"
  ON admin_users FOR ALL
  TO authenticated
  USING (is_admin())
  WITH CHECK (is_admin());
