"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, Search, Edit, Trash2, Loader2, ExternalLink } from "lucide-react";
import { News } from "@/types/database";
import { deleteStorageFile } from "@/lib/storage";

export default function AdminNewsList() {
  const [items, setItems] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    let query = supabase.from("news").select("*").order("published_at", { ascending: false });

    if (search) {
      query = query.ilike("title", `%${search}%`);
    }

    const { data } = await query;
    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleDelete = async (id: string, title: string, imageUrl: string | null) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus "${title}"?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from("news").delete().eq("id", id);
    
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
          <h1 className="text-3xl font-bold tracking-tight">Berita & Informasi</h1>
          <p className="mt-1 text-muted-foreground">Kelola artikel, pengumuman, dan berita desa.</p>
        </div>
        <Link href="/admin/berita/baru">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Tulis Berita
          </Button>
        </Link>
      </div>

      <div className="flex items-center rounded-lg border border-border/50 bg-card px-3 shadow-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Cari berita..."
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
                <th className="px-4 py-3 font-medium">Judul</th>
                <th className="px-4 py-3 font-medium">Penulis</th>
                <th className="px-4 py-3 font-medium">Tanggal</th>
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
                    Tidak ada berita ditemukan.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="transition-colors hover:bg-muted/30">
                    <td className="px-4 py-3 font-medium text-foreground">{item.title}</td>
                    <td className="px-4 py-3 text-muted-foreground">{item.author}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {item.published_at ? new Date(item.published_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric"
                      }) : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                        item.is_published 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                      }`}>
                        {item.is_published ? "Publik" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2">
                        <a 
                          href={`/berita/${item.slug}`} 
                          target="_blank" 
                          rel="noreferrer"
                          className="p-2 text-muted-foreground hover:text-foreground"
                          title="Lihat Halaman"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                        <Link href={`/admin/berita/${item.slug}`} className="p-2 text-muted-foreground hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button 
                          onClick={() => handleDelete(item.id, item.title, item.image_url)}
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
