-- Add maps_url column to umkm table
ALTER TABLE umkm ADD COLUMN IF NOT EXISTS maps_url TEXT;
