"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft, Save } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  alt_text: z.string().nullable(),
  image_url: z.string().min(1, "Foto wajib diupload"),
});

type FormData = z.infer<typeof schema>;

export default function AdminGalleryForm({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const isNew = id === "baru";
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      alt_text: "",
      image_url: "", // using empty string instead of null for validation, updated via ImageUpload
    },
  });

  useEffect(() => {
    if (!isNew) {
      async function loadData() {
        const supabase = createClient();
        const { data } = await supabase.from("gallery").select("*").eq("id", id).single();
        
        if (data) {
          form.reset({
            title: data.title,
            alt_text: data.alt_text || "",
            image_url: data.image_url,
          });
        }
        setIsLoading(false);
      }
      loadData();
    }
  }, [isNew, id, form]);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    const supabase = createClient();

    try {
      if (isNew) {
        const { error } = await supabase.from("gallery").insert([data]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("gallery").update({
          ...data,
          updated_at: new Date().toISOString(),
        }).eq("id", id);
        if (error) throw error;
      }
      
      router.push("/admin/gallery");
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(`Gagal menyimpan data: ${error.message}`);
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
    <div className="mx-auto max-w-2xl space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/gallery">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? "Tambah Foto" : "Edit Foto"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {isNew ? "Upload foto baru ke galeri desa." : "Ubah informasi foto."}
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Foto</label>
            <ImageUpload 
              bucket="gallery" 
              value={form.watch("image_url") || null} 
              onChange={(url) => form.setValue("image_url", url)} 
            />
            {form.formState.errors.image_url && <p className="text-sm text-destructive">{form.formState.errors.image_url.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Foto</label>
            <input
              {...form.register("title")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi / Alt Text (Untuk SEO)</label>
            <textarea
              {...form.register("alt_text")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-border/50">
            {/* Gallery items are always published by default */}
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/gallery">
            <Button variant="outline" type="button">Batal</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="min-w-[120px]">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Foto
          </Button>
        </div>
      </form>
    </div>
  );
}
