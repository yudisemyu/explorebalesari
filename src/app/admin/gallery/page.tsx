"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Loader2, ImageIcon } from "lucide-react";
import { Gallery } from "@/types/database";
import { deleteStorageFile } from "@/lib/storage";

export default function AdminGalleryList() {
  const [items, setItems] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data } = await supabase.from("gallery").select("*").order("created_at", { ascending: false });

    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, title: string, imageUrl: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${title}"?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from("gallery").delete().eq("id", id);
    
    if (error) {
      alert("Gagal menghapus data");
    } else {
      await deleteStorageFile(imageUrl);
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Galeri Foto</h1>
          <p className="mt-1 text-muted-foreground">Kelola koleksi foto dokumentasi desa.</p>
        </div>
        <Link href="/admin/gallery/baru">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Tambah Foto
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <div className="flex min-h-[40vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center rounded-xl border border-border/50 bg-card p-8 text-center shadow-sm">
          <ImageIcon className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-medium text-foreground">Belum ada foto</h3>
          <p className="mt-1 text-sm text-muted-foreground">Mulai tambahkan foto ke dalam galeri desa.</p>
          <Link href="/admin/gallery/baru" className="mt-4">
            <Button variant="outline">Tambah Foto Pertama</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="group overflow-hidden rounded-xl border border-border/50 bg-card shadow-sm transition-all hover:shadow-md hover:border-primary/30">
              <div className="relative aspect-square w-full overflow-hidden bg-muted/30">
                <Image
                  src={item.image_url}
                  alt={item.alt_text || item.title || "Gallery image"}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1" title={item.title || ""}>
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2" title={item.alt_text || ""}>
                  {item.alt_text || "-"}
                </p>
                <div className="mt-4 flex justify-end">
                    <Link href={`/admin/gallery/${item.id}`}>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => handleDelete(item.id, item.title || "Tanpa Judul", item.image_url)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
          ))}
        </div>
      )}
    </div>
  );
}
