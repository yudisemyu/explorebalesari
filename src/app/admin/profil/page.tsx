"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

export default function AdminProfilPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      const { data } = await supabase.from("village_profile").select("content").limit(1).single();

      if (data?.content) {
        setContent(data.content);
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    setSuccess(false);
    const supabase = createClient();

    try {
      await supabase
        .from("village_profile")
        .update({ 
          content,
          updated_at: new Date().toISOString()
        })
        .neq("id", "00000000-0000-0000-0000-000000000000"); // Update all hack

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan data.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Profil & Sejarah Desa</h1>
          <p className="mt-2 text-muted-foreground">
            Edit konten yang ditampilkan pada halaman Profil (visi, misi, sejarah).
          </p>
        </div>
        <Button 
          onClick={handleSave} 
          disabled={isSaving}
          className="min-w-[120px]"
        >
          {isSaving ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Menyimpan...</>
          ) : success ? (
            <><CheckCircle2 className="mr-2 h-4 w-4" /> Tersimpan</>
          ) : (
            <><Save className="mr-2 h-4 w-4" /> Simpan</>
          )}
        </Button>
      </div>

      <div className="rounded-2xl border border-border/50 bg-card shadow-sm overflow-hidden pb-10">
        <TiptapEditor 
          value={content} 
          onChange={setContent} 
          className="border-0 rounded-none shadow-none min-h-[600px]"
        />
      </div>
    </div>
  );
}
