import { SectionTitle } from "@/components/ui/section-title";
import { AnimatedSection } from "@/components/motion/animated-section";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { CTABanner } from "@/components/ui/cta-banner";
import { TourismSection } from "@/components/features/home/tourism-section";
import { UmkmSection } from "@/components/features/home/umkm-section";
import { NewsSection } from "@/components/features/home/news-section";
import { GallerySection } from "@/components/features/home/gallery-section";
import { MapSection } from "@/components/features/home/map-section";
import { ContactSection } from "@/components/features/home/contact-section";
import { TreePine, Mountain, Users, Store, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getHomepage, getStatistics } from "@/services/homepage";

export default async function HomePage() {
  const homepage = await getHomepage();
  const statistics = await getStatistics();

  return (
    <>
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {homepage?.hero_image_url ? (
          <Image
            src={homepage.hero_image_url}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" />
        )}
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/20 mb-6">
              <TreePine className="h-4 w-4" />
              Selamat Datang di Desa Balesari
            </span>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.4}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {homepage?.hero_title || "Jelajahi Keindahan Desa Balesari"}
            </h1>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.6}>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80 sm:text-xl">
              {homepage?.hero_subtitle || "Rasakan pesona alam pegunungan, kekayaan budaya, dan keramahan masyarakat di desa wisata yang tersembunyi di lereng Gunung Sumbing."}
            </p>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.8}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/wisata"
                className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-green-900 shadow-lg shadow-black/20 transition-all hover:bg-white/90 hover:scale-105 active:scale-100"
              >
                Jelajahi Wisata
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Tentang Desa
              </Link>
            </div>
          </AnimatedSection>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="h-8 w-5 rounded-full border-2 border-white/40 flex items-start justify-center p-1">
            <div className="h-2 w-1 rounded-full bg-white/80" />
          </div>
        </div>
      </section>

      {/* ==================== ABOUT SECTION ==================== */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <AnimatedSection variant="fadeLeft">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                {homepage?.about_image_url ? (
                  <Image
                    src={homepage.about_image_url}
                    alt="Tentang Desa"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="text-center p-8 relative z-10">
                    <Mountain className="h-16 w-16 text-primary/40 mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Foto Desa Balesari</p>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeRight">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                Tentang Desa
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {homepage?.about_title || "Desa Balesari, Permata di Lereng Sumbing"}
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground whitespace-pre-wrap">
                {homepage?.about_description || "Terletak di lereng Gunung Sumbing, Kecamatan Windusari, Kabupaten Magelang, Desa Balesari menawarkan keindahan alam pegunungan yang memukau dengan udara sejuk dan pemandangan yang menakjubkan.\n\nDengan kearifan lokal yang terjaga, potensi wisata alam yang melimpah, dan semangat masyarakat yang guyub rukun, Desa Balesari siap menyambut setiap pengunjung dengan kehangatan."}
              </p>
              <Link
                href="/profil"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                Selengkapnya tentang Desa Balesari
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ==================== STATISTICS SECTION ==================== */}
      {statistics.length > 0 && (
        <section className="bg-primary py-20 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                  Desa Balesari dalam Angka
                </h2>
                <p className="mt-4 text-lg text-primary-foreground/70">
                  Sekilas tentang potensi dan kekayaan Desa Balesari
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {statistics.map((stat, index) => {
                // Map string icon name to Lucide component
                let Icon = Users;
                if (stat.icon === "mountain") Icon = Mountain;
                else if (stat.icon === "tree-pine") Icon = TreePine;
                else if (stat.icon === "store") Icon = Store;

                return (
                  <AnimatedSection key={stat.id} variant="fadeUp" delay={index * 0.1}>
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-foreground/10">
                        <Icon className="h-7 w-7 text-primary-foreground/90" />
                      </div>
                      <div className="text-3xl font-bold text-primary-foreground sm:text-4xl">
                        <AnimatedCounter target={stat.value} suffix={stat.suffix || ""} />
                      </div>
                      <div className="mt-1 text-sm font-medium text-primary-foreground/70">
                        {stat.label}
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ==================== POTENTIALS SECTION ==================== */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Potensi Desa"
            subtitle="Berbagai potensi unggulan yang dimiliki Desa Balesari untuk kesejahteraan masyarakat dan pengunjung"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Wisata Alam",
                description: "Pemandangan pegunungan yang menakjubkan, air terjun, dan jalur trekking menuju puncak.",
                icon: "🏔️",
              },
              {
                title: "Agrowisata",
                description: "Kebun kopi, sayuran organik, dan pengalaman bertani langsung bersama petani lokal.",
                icon: "🌿",
              },
              {
                title: "Kerajinan Lokal",
                description: "Produk kerajinan tangan khas desa yang unik dan bernilai seni tinggi.",
                icon: "🎨",
              },
              {
                title: "Kuliner Khas",
                description: "Cita rasa autentik masakan tradisional dengan bahan baku segar dari kebun.",
                icon: "🍲",
              },
              {
                title: "Budaya & Tradisi",
                description: "Kekayaan tradisi dan budaya Jawa yang masih terjaga dengan baik.",
                icon: "🎭",
              },
              {
                title: "Potensi UMKM",
                description: "Beragam usaha lokal masyarakat desa, mulai dari produk olahan, makanan, hingga berbagai produk unggulan yang memiliki potensi untuk dikembangkan.",
                icon: "🏪",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} variant="fadeUp" delay={index * 0.08}>
                <div className="group rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-lg hover:border-primary/30 hover:-translate-y-1">
                  <span className="text-4xl">{item.icon}</span>
                  <h3 className="mt-4 text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TOURISM SECTION ==================== */}
      <TourismSection />

      {/* ==================== UMKM SECTION ==================== */}
      <UmkmSection />

      {/* ==================== NEWS SECTION ==================== */}
      <NewsSection />

      {/* ==================== GALLERY SECTION ==================== */}
      <GallerySection />

      {/* ==================== MAP SECTION ==================== */}
      <MapSection />

      {/* ==================== CONTACT SECTION ==================== */}
      <ContactSection />

      {/* ==================== CTA SECTION ==================== */}
      <CTABanner
        title="Siap Menjelajahi Desa Balesari?"
        subtitle="Temukan destinasi wisata, produk UMKM lokal, dan pengalaman tak terlupakan di desa wisata kami."
        primaryAction={{ label: "Lihat Destinasi Wisata", href: "/wisata" }}
        secondaryAction={{ label: "Jelajahi UMKM", href: "/umkm" }}
      />
    </>
  );
}
