-- Migration 005: Add payment settings to site_settings
ALTER TABLE site_settings
  ADD COLUMN IF NOT EXISTS upi_id      text,
  ADD COLUMN IF NOT EXISTS qr_code_url text;
