-- Add maps_url column to tourism table
ALTER TABLE tourism ADD COLUMN IF NOT EXISTS maps_url TEXT;
