"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Loader2, ExternalLink } from "lucide-react";
import { Umkm } from "@/types/database";
import { deleteStorageFile, deleteStorageFiles } from "@/lib/storage";

export default function AdminUmkmList() {
  const [items, setItems] = useState<Umkm[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    let query = supabase.from("umkm").select("*").order("created_at", { ascending: false });

    if (search) {
      query = query.ilike("name", `%${search}%`);
    }

    const { data } = await query;
    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id: string, name: string, imageUrl: string | null) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${name}"?`)) return;

    const supabase = createClient();

    // Fetch extra images before deleting (CASCADE will remove rows but not storage files)
    const { data: extraImages } = await supabase
      .from("umkm_images")
      .select("image_url")
      .eq("umkm_id", id);

    const { error } = await supabase.from("umkm").delete().eq("id", id);
    
    if (error) {
      alert("Gagal menghapus data");
    } else {
      // Delete main image
      await deleteStorageFile(imageUrl);
      // Delete extra images from storage
      if (extraImages && extraImages.length > 0) {
        await deleteStorageFiles(extraImages.map((img) => img.image_url));
      }
      loadData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">UMKM Lokal</h1>
          <p className="mt-1 text-muted-foreground">Kelola data UMKM dan produk unggulan desa.</p>
        </div>
        <Link href="/admin/umkm/baru">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Tambah UMKM
          </Button>
        </Link>
      </div>

      <div className="flex items-center rounded-lg border border-border/50 bg-card px-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari UMKM..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex h-10 w-full border-0 bg-transparent px-3 py-2 text-sm outline-none focus:ring-0"
        />
      </div>

      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Nama Usaha / Produk</th>
                <th className="px-4 py-3 font-medium">Kategori</th>
                <th className="px-4 py-3 font-medium">Pemilik</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    Tidak ada data UMKM ditemukan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.category}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.owner_name}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.is_featured 
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" 
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                      }`}>
                        {item.is_featured ? "Unggulan" : "Biasa"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={`/umkm/${item.slug}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-muted-foreground hover:text-foreground"
                          title="Lihat Halaman"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <Link href={`/admin/umkm/${item.slug}`} className="p-2 text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id, item.name, item.image_url)}
                          className="p-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
