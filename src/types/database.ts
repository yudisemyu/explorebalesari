// TypeScript interfaces for all database tables

export interface Homepage {
  id: string;
  hero_title: string | null;
  hero_subtitle: string | null;
  hero_image_url: string | null;
  about_title: string | null;
  about_description: string | null;
  about_image_url: string | null;
  updated_at: string;
}

export interface Statistic {
  id: string;
  label: string;
  value: number;
  suffix: string;
  icon: string | null;
  sort_order: number;
  created_at: string;
}

export interface Contact {
  id: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  maps_embed_url: string | null;
  instagram: string | null;
  facebook: string | null;
  updated_at: string;
}

export interface Tourism {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  image_url: string | null;
  location: string | null;
  maps_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface Umkm {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  excerpt: string | null;
  image_url: string | null;
  category: string | null;
  owner_name: string | null;
  phone: string | null;
  address: string | null;
  maps_url: string | null;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

export interface News {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  image_url: string | null;
  author: string;
  is_published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Gallery {
  id: string;
  title: string | null;
  image_url: string;
  alt_text: string | null;
  category: string | null;
  sort_order: number;
  created_at: string;
}

export interface VillageProfile {
  id: string;
  content: string | null;
  updated_at: string;
}

export interface UmkmImage {
  id: string;
  umkm_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}
