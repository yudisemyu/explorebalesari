import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

const BASE_URL = "https://explorebalesari.online";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/profil`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/wisata`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/umkm`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/berita`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/galeri`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  // Dynamic: Tourism
  const { data: tourism } = await supabase
    .from("tourism")
    .select("slug, updated_at");

  const tourismPages: MetadataRoute.Sitemap = (tourism ?? []).map((item) => ({
    url: `${BASE_URL}/wisata/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: UMKM
  const { data: umkm } = await supabase
    .from("umkm")
    .select("slug, updated_at");

  const umkmPages: MetadataRoute.Sitemap = (umkm ?? []).map((item) => ({
    url: `${BASE_URL}/umkm/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Dynamic: News
  const { data: news } = await supabase
    .from("news")
    .select("slug, updated_at")
    .eq("is_published", true);

  const newsPages: MetadataRoute.Sitemap = (news ?? []).map((item) => ({
    url: `${BASE_URL}/berita/${item.slug}`,
    lastModified: new Date(item.updated_at),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...tourismPages, ...umkmPages, ...newsPages];
}
