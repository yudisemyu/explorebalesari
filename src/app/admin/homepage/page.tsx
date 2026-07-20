"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { createClient } from "@/lib/supabase/client";
import { Loader2, Save, CheckCircle2 } from "lucide-react";

const schema = z.object({
  hero_title: z.string().min(1, "Wajib diisi"),
  hero_subtitle: z.string().min(1, "Wajib diisi"),
  hero_image_url: z.string().nullable(),
  about_title: z.string().min(1, "Wajib diisi"),
  about_description: z.string().min(1, "Wajib diisi"),
  about_image_url: z.string().nullable(),
  address: z.string().min(1, "Wajib diisi"),
  phone: z.string().nullable(),
  email: z.string().email().nullable().or(z.literal("")),
  maps_embed_url: z.string().nullable(),
  instagram: z.string().url().nullable().or(z.literal("")),
  facebook: z.string().url().nullable().or(z.literal("")),
});

type FormData = z.infer<typeof schema>;

export default function AdminHomepage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      hero_title: "",
      hero_subtitle: "",
      hero_image_url: null,
      about_title: "",
      about_description: "",
      about_image_url: null,
      address: "",
      phone: "",
      email: "",
      maps_embed_url: "",
      instagram: "",
      facebook: "",
    },
  });

  useEffect(() => {
    async function loadData() {
      const supabase = createClient();
      
      const [homeRes, contactRes] = await Promise.all([
        supabase.from("homepage").select("*").limit(1).single(),
        supabase.from("contacts").select("*").limit(1).single(),
      ]);

      if (homeRes.data) {
        form.reset({
          hero_title: homeRes.data.hero_title || "",
          hero_subtitle: homeRes.data.hero_subtitle || "",
          hero_image_url: homeRes.data.hero_image_url,
          about_title: homeRes.data.about_title || "",
          about_description: homeRes.data.about_description || "",
          about_image_url: homeRes.data.about_image_url,
          address: contactRes.data?.address || "",
          phone: contactRes.data?.phone || "",
          email: contactRes.data?.email || "",
          maps_embed_url: contactRes.data?.maps_embed_url || "",
          instagram: contactRes.data?.instagram || "",
          facebook: contactRes.data?.facebook || "",
        });
      }
      setIsLoading(false);
    }
    loadData();
  }, [form]);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    setSuccess(false);
    const supabase = createClient();

    try {
      await Promise.all([
        supabase.from("homepage").update({
          hero_title: data.hero_title,
          hero_subtitle: data.hero_subtitle,
          hero_image_url: data.hero_image_url,
          about_title: data.about_title,
          about_description: data.about_description,
          about_image_url: data.about_image_url,
          updated_at: new Date().toISOString(),
        }).neq("id", "00000000-0000-0000-0000-000000000000"), // Hack to update all (since there's only 1 row)
        
        supabase.from("contacts").update({
          address: data.address,
          phone: data.phone,
          email: data.email,
          maps_embed_url: data.maps_embed_url,
          instagram: data.instagram,
          facebook: data.facebook,
          updated_at: new Date().toISOString(),
        }).neq("id", "00000000-0000-0000-0000-000000000000"),
      ]);

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
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beranda & Kontak</h1>
          <p className="mt-2 text-muted-foreground">
            Kelola teks utama di halaman beranda dan informasi kontak desa.
          </p>
        </div>
        <Button 
          onClick={form.handleSubmit(onSubmit)} 
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

      <form className="space-y-8 pb-20">
        {/* Hero Section */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">Bagian Hero (Atas)</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Foto Background Hero</label>
            <ImageUpload 
              bucket="profile" 
              value={form.watch("hero_image_url")} 
              onChange={(url) => form.setValue("hero_image_url", url)} 
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Judul Utama</label>
              <input
                {...form.register("hero_title")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.hero_title && (
                <p className="text-sm text-destructive">{form.formState.errors.hero_title.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Sub-judul / Deskripsi Singkat</label>
              <textarea
                {...form.register("hero_subtitle")}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.hero_subtitle && (
                <p className="text-sm text-destructive">{form.formState.errors.hero_subtitle.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">Bagian Tentang Desa</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Foto Desa</label>
            <ImageUpload 
              bucket="profile" 
              value={form.watch("about_image_url")} 
              onChange={(url) => form.setValue("about_image_url", url)} 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Judul Tentang Desa</label>
            <input
              {...form.register("about_title")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi Tentang Desa</label>
            <textarea
              {...form.register("about_description")}
              className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>

        {/* Contacts */}
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold">Informasi Kontak & Peta</h2>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Alamat Lengkap</label>
            <textarea
              {...form.register("address")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Telepon</label>
              <input
                {...form.register("phone")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                {...form.register("email")}
                type="email"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Instagram</label>
              <input
                {...form.register("instagram")}
                placeholder="https://instagram.com/..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Link Facebook</label>
              <input
                {...form.register("facebook")}
                placeholder="https://facebook.com/..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Google Maps Embed URL</label>
            <p className="text-xs text-muted-foreground">Isi dengan nilai parameter 'src' dari iframe Google Maps.</p>
            <input
              {...form.register("maps_embed_url")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
