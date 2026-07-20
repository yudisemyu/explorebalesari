import { createClient } from "@/lib/supabase/server";
import type { Gallery } from "@/types/database";

export async function getGalleryList(): Promise<Gallery[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getGalleryByCategory(category: string): Promise<Gallery[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .eq("category", category)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getGalleryCategories(): Promise<string[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery")
    .select("category")
    .not("category", "is", null);
  const categories = [...new Set(data?.map((d) => d.category).filter(Boolean) ?? [])];
  return categories as string[];
}
