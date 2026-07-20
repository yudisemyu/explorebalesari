import { createClient } from "@/lib/supabase/server";
import type { VillageProfile } from "@/types/database";

export async function getVillageProfile(): Promise<VillageProfile | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("village_profile")
    .select("*")
    .limit(1)
    .single();
  return data;
}
