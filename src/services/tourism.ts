import { createClient } from "@/lib/supabase/server";
import type { Tourism, TourismImage } from "@/types/database";

export async function getTourismList(): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getTourismBySlug(
  slug: string
): Promise<(Tourism & { images: TourismImage[] }) | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!data) return null;

  const { data: images } = await supabase
    .from("tourism_images")
    .select("*")
    .eq("tourism_id", data.id)
    .order("sort_order", { ascending: true });

  return { ...data, images: images ?? [] };
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

export async function getOtherTourism(excludeSlug: string): Promise<Tourism[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("tourism")
    .select("*")
    .neq("slug", excludeSlug)
    .order("created_at", { ascending: false })
    .limit(4);
  return data ?? [];
}
