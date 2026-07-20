import { createClient } from "@/lib/supabase/server";
import type { Homepage, Statistic, Contact } from "@/types/database";

export async function getHomepage(): Promise<Homepage | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("homepage")
    .select("*")
    .limit(1)
    .single();
  return data;
}

export async function getStatistics(): Promise<Statistic[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("statistics")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getContacts(): Promise<Contact | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contacts")
    .select("*")
    .limit(1)
    .single();
  return data;
}
