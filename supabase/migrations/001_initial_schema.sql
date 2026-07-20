-- ============================================
-- Desa Balesari — Initial Database Schema
-- ============================================

-- Homepage content (hero, about)
CREATE TABLE IF NOT EXISTS homepage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hero_title TEXT,
  hero_subtitle TEXT,
  hero_image_url TEXT,
  about_title TEXT,
  about_description TEXT,
  about_image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Village statistics
CREATE TABLE IF NOT EXISTS statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value INTEGER NOT NULL,
  suffix TEXT DEFAULT '',
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Contact information
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT,
  phone TEXT,
  email TEXT,
  maps_embed_url TEXT,
  instagram TEXT,
  facebook TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Tourism destinations
CREATE TABLE IF NOT EXISTS tourism (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  excerpt TEXT,
  image_url TEXT,
  location TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- UMKM (small businesses)
CREATE TABLE IF NOT EXISTS umkm (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  excerpt TEXT,
  image_url TEXT,
  category TEXT,
  owner_name TEXT,
  phone TEXT,
  address TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- News articles
CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  image_url TEXT,
  author TEXT DEFAULT 'Admin',
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Gallery photos
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT,
  image_url TEXT NOT NULL,
  alt_text TEXT,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Village profile (rich text content)
CREATE TABLE IF NOT EXISTS village_profile (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- ============================================
-- Indexes for better query performance
-- ============================================

CREATE INDEX IF NOT EXISTS idx_tourism_slug ON tourism(slug);
CREATE INDEX IF NOT EXISTS idx_tourism_featured ON tourism(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_umkm_slug ON umkm(slug);
CREATE INDEX IF NOT EXISTS idx_umkm_featured ON umkm(is_featured) WHERE is_featured = true;
CREATE INDEX IF NOT EXISTS idx_umkm_category ON umkm(category);
CREATE INDEX IF NOT EXISTS idx_news_slug ON news(slug);
CREATE INDEX IF NOT EXISTS idx_news_published ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery(sort_order);
CREATE INDEX IF NOT EXISTS idx_statistics_sort ON statistics(sort_order);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE homepage ENABLE ROW LEVEL SECURITY;
ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE tourism ENABLE ROW LEVEL SECURITY;
ALTER TABLE umkm ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE village_profile ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public read access" ON homepage FOR SELECT USING (true);
CREATE POLICY "Public read access" ON statistics FOR SELECT USING (true);
CREATE POLICY "Public read access" ON contacts FOR SELECT USING (true);
CREATE POLICY "Public read access" ON tourism FOR SELECT USING (true);
CREATE POLICY "Public read access" ON umkm FOR SELECT USING (true);
CREATE POLICY "Public read access" ON news FOR SELECT USING (true);
CREATE POLICY "Public read access" ON gallery FOR SELECT USING (true);
CREATE POLICY "Public read access" ON village_profile FOR SELECT USING (true);

-- Admin write access (via service role key, bypasses RLS)
-- No additional policies needed since admin client uses service_role key

-- ============================================
-- Storage Buckets
-- Run these in Supabase SQL Editor or create via Dashboard
-- ============================================

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('profile', 'profile', true),
  ('wisata', 'wisata', true),
  ('umkm', 'umkm', true),
  ('berita', 'berita', true),
  ('gallery', 'gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access for all storage buckets
CREATE POLICY "Public read access" ON storage.objects FOR SELECT USING (bucket_id IN ('profile', 'wisata', 'umkm', 'berita', 'gallery'));

-- Authenticated users can upload/update/delete (admin operations use service role)
CREATE POLICY "Authenticated upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id IN ('profile', 'wisata', 'umkm', 'berita', 'gallery'));
CREATE POLICY "Authenticated update" ON storage.objects FOR UPDATE USING (bucket_id IN ('profile', 'wisata', 'umkm', 'berita', 'gallery'));
CREATE POLICY "Authenticated delete" ON storage.objects FOR DELETE USING (bucket_id IN ('profile', 'wisata', 'umkm', 'berita', 'gallery'));
