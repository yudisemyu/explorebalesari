import { createClient } from "@/lib/supabase/server";
import type { Umkm } from "@/types/database";

export async function getUmkmList(): Promise<Umkm[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("umkm")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getUmkmBySlug(slug: string): Promise<Umkm | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("umkm")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getFeaturedUmkm(): Promise<Umkm[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("umkm")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}

export async function getUmkmCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("umkm")
    .select("category")
    .not("category", "is", null);
  const categories = [...new Set(data?.map((d) => d.category).filter(Boolean) ?? [])];
  return categories as string[];
}
