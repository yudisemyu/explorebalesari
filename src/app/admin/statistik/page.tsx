"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Statistic } from "@/types/database";
import {
  Plus,
  Trash2,
  Save,
  Loader2,
  GripVertical,
  Mountain,
  Users,
  TreePine,
  Store,
  BarChart3,
} from "lucide-react";

const schema = z.object({
  label: z.string().min(1, "Label wajib diisi"),
  value: z.number().min(0, "Nilai harus >= 0"),
  suffix: z.string(),
  icon: z.string(),
});

type FormData = z.infer<typeof schema>;

const ICON_OPTIONS = [
  { value: "users", label: "Penduduk", Icon: Users },
  { value: "mountain", label: "Gunung", Icon: Mountain },
  { value: "tree-pine", label: "Pohon", Icon: TreePine },
  { value: "store", label: "Toko", Icon: Store },
  { value: "bar-chart", label: "Grafik", Icon: BarChart3 },
];

export default function AdminStatistikPage() {
  const [items, setItems] = useState<Statistic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      label: "",
      value: 0,
      suffix: "",
      icon: "users",
    },
  });

  const loadData = async () => {
    setIsLoading(true);
    const supabase = createClient();
    const { data } = await supabase
      .from("statistics")
      .select("*")
      .order("sort_order", { ascending: true });
    setItems(data || []);
    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const startEdit = (item: Statistic) => {
    setEditingId(item.id);
    setIsAdding(false);
    form.reset({
      label: item.label,
      value: item.value,
      suffix: item.suffix || "",
      icon: item.icon || "users",
    });
  };

  const startAdd = () => {
    setIsAdding(true);
    setEditingId(null);
    form.reset({
      label: "",
      value: 0,
      suffix: "",
      icon: "users",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsAdding(false);
    form.reset();
  };

  const onSubmit = async (data: FormData) => {
    setIsSaving(true);
    const supabase = createClient();

    try {
      if (isAdding) {
        const { error } = await supabase.from("statistics").insert([
          {
            ...data,
            sort_order: items.length,
          },
        ]);
        if (error) throw error;
      } else if (editingId) {
        const { error } = await supabase
          .from("statistics")
          .update(data)
          .eq("id", editingId);
        if (error) throw error;
      }

      cancelEdit();
      loadData();
    } catch (error: any) {
      alert(`Gagal menyimpan: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string, label: string) => {
    if (!confirm(`Hapus statistik "${label}"?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from("statistics").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus data");
    } else {
      loadData();
    }
  };

  const getIconComponent = (iconName: string) => {
    const found = ICON_OPTIONS.find((opt) => opt.value === iconName);
    return found ? found.Icon : Users;
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Statistik Desa</h1>
          <p className="mt-1 text-muted-foreground">
            Kelola angka-angka yang ditampilkan di bagian &quot;Desa Balesari
            dalam Angka&quot; pada halaman utama.
          </p>
        </div>
        {!isAdding && !editingId && (
          <Button onClick={startAdd} className="gap-2">
            <Plus className="h-4 w-4" />
            Tambah
          </Button>
        )}
      </div>

      {/* Add / Edit Form */}
      {(isAdding || editingId) && (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="rounded-2xl border border-primary/20 bg-primary/5 p-6 shadow-sm space-y-5"
        >
          <h2 className="text-lg font-semibold">
            {isAdding ? "Tambah Statistik Baru" : "Edit Statistik"}
          </h2>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Label</label>
              <input
                {...form.register("label")}
                placeholder="Contoh: Jumlah Penduduk"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              {form.formState.errors.label && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.label.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nilai</label>
                <input
                  type="number"
                  {...form.register("value", { valueAsNumber: true })}
                  placeholder="1200"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Satuan</label>
                <input
                  {...form.register("suffix")}
                  placeholder="Jiwa, Ha, +"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Ikon</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((opt) => {
                const isSelected = form.watch("icon") === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => form.setValue("icon", opt.value)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary font-medium"
                        : "border-border bg-background text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <opt.Icon className="h-4 w-4" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={isSaving} className="gap-2">
              {isSaving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              Simpan
            </Button>
            <Button type="button" variant="outline" onClick={cancelEdit}>
              Batal
            </Button>
          </div>
        </form>
      )}

      {/* Items List */}
      {isLoading ? (
        <div className="flex min-h-[30vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center rounded-2xl border border-dashed border-border">
          <BarChart3 className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <p className="text-muted-foreground">Belum ada data statistik.</p>
          <p className="text-sm text-muted-foreground mt-1">
            Klik tombol &quot;Tambah&quot; untuk menambahkan angka pertama.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const IconComp = getIconComponent(item.icon || "users");
            return (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-border/50 bg-card p-4 shadow-sm transition-colors hover:bg-muted/30"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <IconComp className="h-5 w-5 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">
                    {item.label}
                  </p>
                  <p className="text-2xl font-bold tracking-tight text-foreground">
                    {item.value.toLocaleString("id-ID")}
                    {item.suffix && (
                      <span className="text-sm font-medium text-muted-foreground ml-1">
                        {item.suffix}
                      </span>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => startEdit(item)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                  >
                    <Save className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id, item.label)}
                    className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
