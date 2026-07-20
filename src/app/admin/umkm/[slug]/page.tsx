"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { createClient } from "@/lib/supabase/client";
import { Loader2, ArrowLeft, Save } from "lucide-react";

const schema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  excerpt: z.string().min(1, "Deskripsi singkat wajib diisi"),
  description: z.string().min(1, "Deskripsi lengkap wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  owner_name: z.string().min(1, "Nama pemilik wajib diisi"),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  maps_url: z.string().nullable(),
  image_url: z.string().nullable(),
  is_featured: z.boolean(),
});

type FormData = z.infer<typeof schema>;

export default function AdminUmkmForm({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const isNew = slug === "baru";
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [originalId, setOriginalId] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      slug: "",
      excerpt: "",
      description: "",
      category: "",
      owner_name: "",
      phone: "",
      address: "",
      maps_url: "",
      image_url: null,
      is_featured: false,
    },
  });

  const watchName = form.watch("name");
  useEffect(() => {
    if (isNew && watchName) {
      const generatedSlug = watchName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug);
    }
  }, [watchName, isNew, form]);

  useEffect(() => {
    if (!isNew) {
      async function loadData() {
        const supabase = createClient();
        const { data } = await supabase.from("umkm").select("*").eq("slug", slug).single();
        
        if (data) {
          setOriginalId(data.id);
          form.reset({
            name: data.name,
            slug: data.slug,
            excerpt: data.excerpt,
            description: data.description || "",
            category: data.category,
            owner_name: data.owner_name,
            phone: data.phone || "",
            address: data.address || "",
            maps_url: data.maps_url || "",
            image_url: data.image_url,
            is_featured: data.is_featured || false,
          });
        }
        setIsLoading(false);
      }
      loadData();
    }
  }, [isNew, slug, form]);

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    const supabase = createClient();

    try {
      if (isNew) {
        const { error } = await supabase.from("umkm").insert([data]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("umkm").update({
          ...data,
          updated_at: new Date().toISOString(),
        }).eq("id", originalId);
        if (error) throw error;
      }
      
      router.push("/admin/umkm");
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
    <div className="mx-auto max-w-4xl space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/umkm">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? "Tambah UMKM" : "Edit UMKM"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {isNew ? "Tambahkan data UMKM baru." : "Ubah informasi UMKM."}
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Foto Produk/Usaha</label>
            <ImageUpload 
              bucket="umkm" 
              value={form.watch("image_url")} 
              onChange={(url) => form.setValue("image_url", url)} 
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Usaha / Produk</label>
              <input
                {...form.register("name")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.name && <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <input
                {...form.register("slug")}
                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.slug && <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Kategori</label>
              <select
                {...form.register("category")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <option value="">Pilih Kategori...</option>
                <option value="Makanan">Makanan</option>
                <option value="Minuman">Minuman</option>
                <option value="Kerajinan">Kerajinan</option>
                <option value="Pertanian">Pertanian / Agrobisnis</option>
                <option value="Jasa">Jasa</option>
                <option value="Lainnya">Lainnya</option>
              </select>
              {form.formState.errors.category && <p className="text-sm text-destructive">{form.formState.errors.category.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Pemilik</label>
              <input
                {...form.register("owner_name")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.owner_name && <p className="text-sm text-destructive">{form.formState.errors.owner_name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Nomor WhatsApp / HP</label>
              <input
                {...form.register("phone")}
                placeholder="0812..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Alamat</label>
              <input
                {...form.register("address")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Link Google Maps (Opsional)</label>
              <input
                {...form.register("maps_url")}
                placeholder="https://maps.app.goo.gl/..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <p className="text-xs text-muted-foreground">Bisa diisi dengan link Google Maps dari lokasi usaha.</p>
              {form.formState.errors.maps_url && <p className="text-sm text-destructive">{form.formState.errors.maps_url.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Deskripsi Singkat (Tampil di Card)</label>
            <textarea
              {...form.register("excerpt")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {form.formState.errors.excerpt && <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Detail Produk / Usaha</label>
            <TiptapEditor 
              value={form.watch("description")} 
              onChange={(html) => form.setValue("description", html)}
            />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-border/50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...form.register("is_featured")} className="h-5 w-5 rounded border-input" />
              <div>
                <p className="text-sm font-medium">Jadikan Unggulan</p>
                <p className="text-xs text-muted-foreground">Tampilkan di halaman utama (Beranda)</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/umkm">
            <Button variant="outline" type="button">Batal</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="min-w-[120px]">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan UMKM
          </Button>
        </div>
      </form>
    </div>
  );
}
