import { createClient } from "@/lib/supabase/server";
import {
  TreePine,
  MapPin,
  Store,
  Newspaper,
  Image as ImageIcon,
  ExternalLink,
  Clock,
  ArrowRight,
  Home,
  BookOpen,
  BarChart3,
} from "lucide-react";
import Link from "next/link";
import { AnimatedSection } from "@/components/motion/animated-section";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Fetch counts and recent news in parallel
  const [
    { count: tourismCount },
    { count: umkmCount },
    { count: newsCount },
    { count: galleryCount },
    { data: recentNews },
  ] = await Promise.all([
    supabase.from("tourism").select("*", { count: "exact", head: true }),
    supabase.from("umkm").select("*", { count: "exact", head: true }),
    supabase.from("news").select("*", { count: "exact", head: true }),
    supabase.from("gallery").select("*", { count: "exact", head: true }),
    supabase
      .from("news")
      .select("id, title, slug, created_at, is_published")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      name: "Destinasi Wisata",
      value: tourismCount || 0,
      icon: MapPin,
      href: "/admin/wisata",
      color: "bg-emerald-500/10 text-emerald-600",
      hoverColor: "group-hover:bg-emerald-500 group-hover:text-white",
    },
    {
      name: "UMKM Lokal",
      value: umkmCount || 0,
      icon: Store,
      href: "/admin/umkm",
      color: "bg-amber-500/10 text-amber-600",
      hoverColor: "group-hover:bg-amber-500 group-hover:text-white",
    },
    {
      name: "Artikel Berita",
      value: newsCount || 0,
      icon: Newspaper,
      href: "/admin/berita",
      color: "bg-blue-500/10 text-blue-600",
      hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
    },
    {
      name: "Foto Galeri",
      value: galleryCount || 0,
      icon: ImageIcon,
      href: "/admin/gallery",
      color: "bg-purple-500/10 text-purple-600",
      hoverColor: "group-hover:bg-purple-500 group-hover:text-white",
    },
  ];

  const quickActions = [
    { label: "Tambah Wisata", href: "/admin/wisata/baru", icon: MapPin },
    { label: "Tambah UMKM", href: "/admin/umkm/baru", icon: Store },
    { label: "Tulis Berita", href: "/admin/berita/baru", icon: Newspaper },
    { label: "Upload Foto", href: "/admin/gallery/baru", icon: ImageIcon },
    { label: "Edit Beranda", href: "/admin/homepage", icon: Home },
    { label: "Edit Statistik", href: "/admin/statistik", icon: BarChart3 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Selamat datang di panel admin Desa Balesari.
          </p>
        </div>
        <Link
          href="/"
          target="_blank"
          className="hidden sm:inline-flex items-center gap-2 rounded-full border border-border/50 bg-card px-4 py-2 text-sm font-medium text-muted-foreground shadow-sm transition-colors hover:text-foreground hover:border-primary/30"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <AnimatedSection key={stat.name} variant="fadeUp" delay={index * 0.08}>
            <Link
              href={stat.href}
              className="group flex flex-col rounded-2xl border border-border/50 bg-card p-6 shadow-sm transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl transition-colors ${stat.color} ${stat.hoverColor}`}
              >
                <stat.icon className="h-6 w-6" />
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

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent News */}
        <AnimatedSection variant="fadeUp" delay={0.3} className="lg:col-span-3">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Berita Terbaru
              </h2>
              <Link
                href="/admin/berita"
                className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              >
                Lihat Semua
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {recentNews && recentNews.length > 0 ? (
              <div className="space-y-1">
                {recentNews.map((news) => (
                  <Link
                    key={news.id}
                    href={`/admin/berita/${news.slug}`}
                    className="flex items-center justify-between gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-muted/50"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-foreground">
                        {news.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {new Date(news.created_at).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${
                        news.is_published
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {news.is_published ? "Published" : "Draft"}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Newspaper className="h-10 w-10 text-muted-foreground/20 mb-3" />
                <p className="text-sm text-muted-foreground">
                  Belum ada berita.
                </p>
                <Link
                  href="/admin/berita/baru"
                  className="mt-3 text-xs font-medium text-primary hover:text-primary/80"
                >
                  Tulis berita pertama →
                </Link>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Quick Actions + Guide */}
        <AnimatedSection variant="fadeUp" delay={0.4} className="lg:col-span-2">
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TreePine className="h-5 w-5 text-primary" />
                Aksi Cepat
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <Link
                    key={action.href}
                    href={action.href}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                  >
                    <action.icon className="h-4 w-4 shrink-0" />
                    {action.label}
                  </Link>
                ))}
              </div>
            </div>

            <hr className="border-border/50" />

            <div>
              <h3 className="text-sm font-semibold mb-3 text-muted-foreground uppercase tracking-wider">
                Panduan
              </h3>
              <div className="space-y-2.5 text-xs text-muted-foreground leading-relaxed">
                <p>
                  <strong className="text-foreground">Beranda & Kontak:</strong>{" "}
                  Atur teks utama di halaman depan dan kontak desa.
                </p>
                <p>
                  <strong className="text-foreground">Profil Desa:</strong>{" "}
                  Tulis visi, misi, sejarah desa.
                </p>
                <p>
                  <strong className="text-foreground">Wisata & UMKM:</strong>{" "}
                  Kelola destinasi wisata dan produk unggulan.
                </p>
                <p>
                  <strong className="text-foreground">Berita:</strong> Tulis
                  artikel atau pengumuman.
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
