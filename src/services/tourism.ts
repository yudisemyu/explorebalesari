import { createClient } from "@/lib/supabase/server";
import type { Tourism } from "@/types/database";

export async function getTourismList(): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTourismBySlug(slug: string): Promise<Tourism | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .eq("slug", slug)
    .single();
  return data;
}

export async function getFeaturedTourism(): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .eq("is_featured", true)
    .order("created_at", { ascending: false })
    .limit(6);
  return data ?? [];
}
