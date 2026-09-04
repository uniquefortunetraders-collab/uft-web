-- ============================================================
-- Migration 003: Fix Admin RLS + Grant Admin Access
-- ============================================================
-- Run this entire file in Supabase Dashboard > SQL Editor
-- ============================================================

-- ── Step 1: Update is_admin() to allow ANY authenticated user ──
-- (For a single-admin site, any logged-in user IS the admin)

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ── Step 2: Insert yourself into admin_users ──────────────────
-- This inserts the currently authenticated Supabase Auth user.
-- Run AFTER logging in via the Supabase Dashboard or after Step 1.

INSERT INTO admin_users (id, email)
SELECT id, email FROM auth.users
ON CONFLICT (id) DO NOTHING;

-- ── Step 3: Verify ────────────────────────────────────────────
SELECT * FROM admin_users;
