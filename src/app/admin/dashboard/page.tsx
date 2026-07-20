import { createClient } from "@/lib/supabase/server";
import { TreePine, Users, MapPin, Store, Newspaper, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch counts for dashboard stats
  const [
    { count: tourismCount },
    { count: umkmCount },
    { count: newsCount },
    { count: galleryCount }
  ] = await Promise.all([
    supabase.from("tourism").select("*", { count: "exact", head: true }),
    supabase.from("umkm").select("*", { count: "exact", head: true }),
    supabase.from("news").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { name: "Destinasi Wisata", value: tourismCount || 0, icon: MapPin, href: "/admin/wisata" },
    { name: "UMKM Lokal", value: umkmCount || 0, icon: Store, href: "/admin/umkm" },
    { name: "Artikel Berita", value: newsCount || 0, icon: Newspaper, href: "/admin/berita" },
    { name: "Foto Galeri", value: galleryCount || 0, icon: ImageIcon, href: "/admin/gallery" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="mt-2 text-muted-foreground">
          Selamat datang di panel admin website Desa Balesari.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.name} variant="fadeUp" delay={index * 0.1}>
            <Link 
              href={stat.href}
              className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary">
                <stat.icon className="h-6 w-6 text-primary transition-colors group-hover:text-primary-foreground" />
              </div>
              <p className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </p>
              <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
                {stat.value}
              </p>
            </Link>
          </AnimatedSection>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatedSection variant="fadeUp" delay={0.4}>
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TreePine className="h-5 w-5 text-primary" />
              Panduan Penggunaan
            </h2>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
                <strong>Beranda & Kontak:</strong> Atur teks utama di halaman depan dan informasi kontak desa.
              </p>
              <p>
                <strong>Profil Desa:</strong> Tulis visi, misi, sejarah, dan informasi detail tentang desa.
              </p>
              <p>
                <strong>Wisata & UMKM:</strong> Tambah dan kelola daftar destinasi wisata dan produk unggulan.
              </p>
              <p>
                <strong>Berita:</strong> Tulis artikel atau pengumuman terbaru untuk warga dan pengunjung.
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
