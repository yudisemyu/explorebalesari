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
import { deleteStorageFile } from "@/lib/storage";
import { Loader2, ArrowLeft, Save } from "lucide-react";

const schema = z.object({
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  excerpt: z.string().min(1, "Deskripsi singkat wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
  author: z.string().min(1, "Penulis wajib diisi"),
  image_url: z.string().nullable(),
  is_published: z.boolean(),
  published_at: z.string(),
});

type FormData = z.infer<typeof schema>;

export default function AdminNewsForm({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const router = useRouter();
  const isNew = slug === "baru";
  
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isSaving, setIsSaving] = useState(false);
  const [originalId, setOriginalId] = useState<string | null>(null);
  const [oldImageUrl, setOldImageUrl] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      author: "Admin",
      image_url: null,
      is_published: true,
      published_at: new Date().toISOString().slice(0, 16), // YYYY-MM-DDThh:mm
    },
  });

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
        const { data } = await supabase.from("news").select("*").eq("slug", slug).single();
        
        if (data) {
          setOriginalId(data.id);
          setOldImageUrl(data.image_url);
          form.reset({
            title: data.title,
            slug: data.slug,
            excerpt: data.excerpt,
            content: data.content || "",
            author: data.author,
            image_url: data.image_url,
            is_published: data.is_published || false,
            published_at: new Date(data.published_at).toISOString().slice(0, 16),
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

    // Ensure valid ISO string for postgres
    const formattedData = {
      ...data,
      published_at: new Date(data.published_at).toISOString()
    };

    try {
      if (isNew) {
        const { error } = await supabase.from("news").insert([formattedData]);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").update({
          ...formattedData,
          updated_at: new Date().toISOString(),
        }).eq("id", originalId);
        if (error) throw error;

        if (data.image_url !== oldImageUrl) {
          await deleteStorageFile(oldImageUrl);
        }
      }
      
      router.push("/admin/berita");
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
        <Link href="/admin/berita">
          <Button variant="outline" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isNew ? "Tulis Berita" : "Edit Berita"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {isNew ? "Buat artikel atau pengumuman baru." : "Ubah konten artikel."}
          </p>
        </div>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Gambar Sampul (Thumbnail)</label>
            <ImageUpload 
              bucket="berita" 
              value={form.watch("image_url")} 
              onChange={(url) => form.setValue("image_url", url)} 
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-sm font-medium">Judul Berita</label>
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
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Penulis</label>
              <input
                {...form.register("author")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.author && <p className="text-sm text-destructive">{form.formState.errors.author.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Tanggal Publikasi</label>
              <input
                {...form.register("published_at")}
                type="datetime-local"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.published_at && <p className="text-sm text-destructive">{form.formState.errors.published_at.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ringkasan (Muncul di daftar berita)</label>
            <textarea
              {...form.register("excerpt")}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            />
            {form.formState.errors.excerpt && <p className="text-sm text-destructive">{form.formState.errors.excerpt.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Isi Berita Lengkap</label>
            <TiptapEditor 
              value={form.watch("content")} 
              onChange={(html) => form.setValue("content", html)}
            />
            {form.formState.errors.content && <p className="text-sm text-destructive">{form.formState.errors.content.message}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-6 pt-4 border-t border-border/50">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...form.register("is_published")} className="h-5 w-5 rounded border-input" />
              <div>
                <p className="text-sm font-medium">Publikasikan Sekarang</p>
                <p className="text-xs text-muted-foreground">Berita akan langsung tampil di website</p>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/admin/berita">
            <Button variant="outline" type="button">Batal</Button>
          </Link>
          <Button type="submit" disabled={isSaving} className="min-w-[120px]">
            {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            Simpan Berita
          </Button>
        </div>
      </form>
    </div>
  );
}
