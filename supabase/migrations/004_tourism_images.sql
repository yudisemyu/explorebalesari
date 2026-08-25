-- ============================================
-- Tourism Images (multi-photo gallery for wisata)
-- ============================================

CREATE TABLE IF NOT EXISTS tourism_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tourism_id UUID NOT NULL REFERENCES tourism(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_tourism_images_tourism_id ON tourism_images(tourism_id);

ALTER TABLE tourism_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON tourism_images FOR SELECT USING (true);
