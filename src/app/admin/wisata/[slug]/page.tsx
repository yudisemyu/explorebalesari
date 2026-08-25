"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { ImageUpload } from "@/components/ui/image-upload";
import { MultiImageUpload } from "@/components/ui/multi-image-upload";
import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { createClient } from "@/lib/supabase/client";
import { deleteStorageFile, deleteStorageFiles } from "@/lib/storage";
import { Loader2, ArrowLeft, Save } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  excerpt: z.string().min(1, "Deskripsi singkat wajib diisi"),
  description: z.string().min(1, "Konten wajib diisi"),
  location: z.string().min(1, "Lokasi wajib diisi"),
  maps_url: z.string().nullable(),
  image_url: z.string().nullable(),
  is_featured: z.boolean(),
});

type FormData = z.infer<typeof schema>;

interface ExtraImage {
  id?: string;
  image_url: string;
  sort_order: number;
}

export default function AdminWisataForm({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const isNew = slug === "baru";
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [originalId, setOriginalId] = useState<string | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);

  // Multi-image state
  const [extraImages, setExtraImages] = useState<ExtraImage[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [removedImageUrls, setRemovedImageUrls] = useState<string[]>([]);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      description: "",
      location: "",
      maps_url: "",
      image_url: null,
      is_featured: false,
    },
  });

  // Auto-generate slug from title if it's new
  const watchTitle = form.watch("title");
  useEffect(() => {
    if (isNew && watchTitle) {
      const generatedSlug = watchTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", generatedSlug);
    }
  }, [watchTitle, isNew, form]);

  useEffect(() => {
    if (!isNew) {
      async function loadData() {
        const supabase = createClient();
        const { data } = await supabase.from("tourism").select("*").eq("slug", slug).single();
        
        if (data) {
          setOriginalId(data.id);
          setOldImageUrl(data.image_url);
          form.reset({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            description: data.description || "",
            location: data.location || "",
            maps_url: data.maps_url || "",
            image_url: data.image_url,
            is_featured: data.is_featured || false,
          });

          // Load extra images
          const { data: images } = await supabase
            .from("tourism_images")
            .select("*")
            .eq("tourism_id", data.id)
            .order("sort_order", { ascending: true });

          if (images) {
            setExtraImages(
              images.map((img) => ({
                id: img.id,
                image_url: img.image_url,
                sort_order: img.sort_order,
              }))
            );
          }
        }
        setIsLoading(false);
      }
      loadData();
    }
  }, [isNew, slug, form]);

  const handleAddImage = (url: string) => {
    setExtraImages((prev) => [
      ...prev,
      { image_url: url, sort_order: prev.length },
    ]);
  };

  const handleRemoveImage = (index: number) => {
    const removed = extraImages[index];
    if (removed.id) {
      setRemovedImageIds((prev) => [...prev, removed.id!]);
    }
    setRemovedImageUrls((prev) => [...prev, removed.image_url]);
    setExtraImages((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    const supabase = createClient();

    try {
      let tourismId = originalId;

      if (isNew) {
        const { data: inserted, error } = await supabase
          .from("tourism")
          .insert([data])
          .select("id")
          .single();
        if (error) throw error;
        tourismId = inserted.id;
      } else {
        const { error } = await supabase.from("tourism").update({
          ...data,
          updated_at: new Date().toISOString(),
        }).eq("id", originalId);
        if (error) throw error;
        
        if (data.image_url !== oldImageUrl) {
          await deleteStorageFile(oldImageUrl);
        }
      }

      // Handle extra images: delete removed ones
      if (removedImageIds.length > 0) {
        await supabase
          .from("tourism_images")
          .delete()
          .in("id", removedImageIds);
      }

      // Delete removed image files from storage
      if (removedImageUrls.length > 0) {
        await deleteStorageFiles(removedImageUrls);
      }

      // Insert new images (ones without an id)
      const newImages = extraImages.filter((img) => !img.id);
      if (newImages.length > 0 && tourismId) {
        const { error: imgError } = await supabase
          .from("tourism_images")
          .insert(
            newImages.map((img, index) => ({
              tourism_id: tourismId,
              image_url: img.image_url,
              sort_order: index,
            }))
          );
        if (imgError) throw imgError;
      }
      
      router.push("/admin/wisata");
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
        <Link href="/admin/wisata">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? "Tambah Wisata" : "Edit Wisata"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {isNew ? "Tambahkan destinasi wisata baru." : "Ubah informasi destinasi wisata."}
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Foto Utama</label>
            <ImageUpload 
              bucket="wisata" 
              value={form.watch("image_url")} 
              onChange={(url) => form.setValue("image_url", url)} 
            />
          </div>

          {/* Multi image gallery */}
          <div className="pt-4 border-t border-border/50">
            <MultiImageUpload
              images={extraImages}
              onAdd={handleAddImage}
              onRemove={handleRemoveImage}
              maxImages={5}
              bucket="wisata"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nama Wisata</label>
              <input
                {...form.register("title")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Slug (URL)</label>
              <input
                {...form.register("slug")}
                className="flex h-10 w-full rounded-md border border-input bg-muted px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.slug && <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>}
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Link Google Maps (Opsional)</label>
              <input
                {...form.register("maps_url")}
                placeholder="https://maps.app.goo.gl/..."
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <p className="text-xs text-muted-foreground">Bisa diisi dengan link Google Maps dari lokasi wisata.</p>
              {form.formState.errors.maps_url && <p className="text-sm text-destructive">{form.formState.errors.maps_url.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Lokasi (Dusun/Jalan)</label>
            <input
              {...form.register("location")}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {form.formState.errors.location && <p className="text-sm text-destructive">{form.formState.errors.location.message}</p>}
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
            <label className="text-sm font-medium">Konten Lengkap</label>
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
          <Link href="/admin/wisata">
            <Button variant="outline" type="button">Batal</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="min-w-[120px]">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Wisata
          </Button>
        </div>
      </form>
    </div>
  );
}
