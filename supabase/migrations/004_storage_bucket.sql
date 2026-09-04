-- ============================================================
-- Migration 004: Create Supabase Storage Bucket for Media
-- ============================================================
-- Run this in Supabase Dashboard > SQL Editor if you want to
-- store uploaded images in Supabase Cloud Storage.
-- (Local fallback will work automatically in the meantime).
-- ============================================================

-- 1. Create public 'media' bucket if not exists
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE
SET public = true,
    file_size_limit = 10485760;

-- 2. Enable public read access to media bucket
DROP POLICY IF EXISTS "Public Media Access" ON storage.objects;
CREATE POLICY "Public Media Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- 3. Allow authenticated users (admin) to upload objects
DROP POLICY IF EXISTS "Authenticated User Upload" ON storage.objects;
CREATE POLICY "Authenticated User Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'media');

-- 4. Allow authenticated users to update objects
DROP POLICY IF EXISTS "Authenticated User Update" ON storage.objects;
CREATE POLICY "Authenticated User Update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'media');

-- 5. Allow authenticated users to delete objects
DROP POLICY IF EXISTS "Authenticated User Delete" ON storage.objects;
CREATE POLICY "Authenticated User Delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'media');
