-- ============================================
-- Add UMKM Images table for multi-photo support
-- ============================================

CREATE TABLE IF NOT EXISTS umkm_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  umkm_id UUID NOT NULL REFERENCES umkm(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Index for fast lookup by umkm_id
CREATE INDEX IF NOT EXISTS idx_umkm_images_umkm_id ON umkm_images(umkm_id);

-- Enable RLS
ALTER TABLE umkm_images ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read access" ON umkm_images FOR SELECT USING (true);

-- Authenticated write access
CREATE POLICY "Authenticated insert access" ON umkm_images FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated update access" ON umkm_images FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated delete access" ON umkm_images FOR DELETE TO authenticated USING (true);
