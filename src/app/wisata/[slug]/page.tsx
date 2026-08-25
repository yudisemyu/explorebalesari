import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTourismBySlug, getOtherTourism } from "@/services/tourism";
import { AnimatedSection } from "@/components/motion/animated-section";
import { TourismGallery } from "@/components/features/wisata/tourism-gallery";
import { TourismCard } from "@/components/ui/tourism-card";
import { JsonLd, touristAttractionJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import {
  MapPin,
  ArrowLeft,
  Mountain,
  Camera,
  ExternalLink,
  ArrowRight,
} from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tourism = await getTourismBySlug(slug);
  if (!tourism) return { title: "Wisata Tidak Ditemukan" };

  return {
    title: tourism.title,
    description:
      tourism.excerpt || `Destinasi wisata ${tourism.title} di Desa Balesari.`,
    openGraph: {
      title: tourism.title,
      description: tourism.excerpt || undefined,
      images: tourism.image_url ? [{ url: tourism.image_url }] : undefined,
    },
  };
}

const highlights = [
  {
    icon: Mountain,
    title: "Trekking",
    description:
      "Jalur pendakian menuju puncak dengan pemandangan pegunungan yang memukau. Nikmati udara segar dan keindahan alam di setiap langkah perjalanan.",
  },
  {
    icon: Camera,
    title: "Spot Foto",
    description:
      "Berbagai titik foto instagramable dengan latar belakang alam yang menakjubkan. Abadikan momen tak terlupakan di tengah keindahan pegunungan.",
  },
];

export default async function WisataDetailPage({ params }: Props) {
  const { slug } = await params;
  const tourism = await getTourismBySlug(slug);

  if (!tourism) notFound();

  const hasGallery = tourism.images && tourism.images.length > 0;
  const otherTourism = await getOtherTourism(slug);

  return (
    <>
      <JsonLd
        data={touristAttractionJsonLd({
          title: tourism.title,
          slug: tourism.slug,
          description: tourism.excerpt,
          imageUrl: tourism.image_url,
          location: tourism.location,
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Beranda", url: "/" },
          { name: "Wisata", url: "/wisata" },
          { name: tourism.title, url: `/wisata/${tourism.slug}` },
        ])}
      />

      {/* ==================== HERO — Full viewport ==================== */}
      <section className="relative flex min-h-screen items-end overflow-hidden">
        {tourism.image_url ? (
          <Image
            src={tourism.image_url}
            alt={tourism.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <AnimatedSection variant="fadeUp">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Beranda
            </Link>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/15 mb-6">
              <MapPin className="h-3.5 w-3.5" />
              Destinasi Wisata
            </span>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {tourism.title}
            </h1>
          </AnimatedSection>

          {tourism.location && (
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1.5 text-base text-white/70">
                  <MapPin className="h-4 w-4" />
                  {tourism.location}
                </div>
                {tourism.maps_url && (
                  <a
                    href={tourism.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Buka di Google Maps
                  </a>
                )}
              </div>
            </AnimatedSection>
          )}

          {tourism.excerpt && (
            <AnimatedSection variant="fadeUp" delay={0.35}>
              <p className="mt-6 max-w-2xl text-lg text-white/65 leading-relaxed">
                {tourism.excerpt}
              </p>
            </AnimatedSection>
          )}

          {/* Scroll indicator */}
          <AnimatedSection variant="fadeUp" delay={0.5}>
            <div className="mt-12 animate-bounce">
              <div className="h-8 w-5 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
                <div className="h-2 w-1 rounded-full bg-white/60" />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== HIGHLIGHTS — Aktivitas ==================== */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-14">
              <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                Aktivitas
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Yang Bisa Kamu Lakukan
              </h2>
              <div className="mt-5 h-1 w-16 rounded-full bg-primary mx-auto" />
            </div>
          </AnimatedSection>

          <div className="grid gap-6 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <AnimatedSection
                key={item.title}
                variant="fadeUp"
                delay={index * 0.1}
              >
                <div className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 shadow-sm transition-all hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 lg:p-10">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl transition-all group-hover:bg-primary/10" />

                  <div className="relative">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <item.icon className="h-7 w-7" />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-foreground">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DESCRIPTION — Rich text ==================== */}
      {tourism.description && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeUp">
              <div className="text-center mb-14">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Tentang
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Mengenal {tourism.title}
                </h2>
                <div className="mt-5 h-1 w-16 rounded-full bg-primary mx-auto" />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: tourism.description }}
              />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ==================== GALLERY — Foto Wisata ==================== */}
      {hasGallery && (
        <section className="py-20 lg:py-28 bg-muted/30">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeUp">
              <div className="text-center mb-14">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Galeri
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Foto {tourism.title}
                </h2>
                <div className="mt-5 h-1 w-16 rounded-full bg-primary mx-auto" />
              </div>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
              <TourismGallery
                images={tourism.images}
                tourismTitle={tourism.title}
              />
            </AnimatedSection>
          </div>
        </section>
      )}

      {/* ==================== CTA — Ajakan Berkunjung ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-5" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <AnimatedSection variant="scale">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Tertarik Mengunjungi {tourism.title}?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Rasakan sendiri keindahan alam dan pesona wisata di Desa Balesari.
              Kami siap menyambut kedatangan Anda.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              {tourism.maps_url && (
                <a
                  href={tourism.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-green-900 shadow-lg transition-all hover:bg-white/90 hover:scale-105 active:scale-100"
                >
                  Lihat Lokasi di Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              <Link
                href="/umkm"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20"
              >
                Jelajahi UMKM
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ==================== WISATA LAIN ==================== */}
      {otherTourism.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimatedSection variant="fadeUp">
              <div className="text-center mb-14">
                <span className="inline-block text-sm font-semibold uppercase tracking-wider text-primary mb-2">
                  Destinasi
                </span>
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Jelajahi Wisata Lain
                </h2>
                <div className="mt-5 h-1 w-16 rounded-full bg-primary mx-auto" />
              </div>
            </AnimatedSection>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {otherTourism.map((item, index) => (
                <AnimatedSection key={item.slug} variant="fadeUp" delay={index * 0.08}>
                  <TourismCard
                    title={item.title}
                    slug={item.slug}
                    excerpt={item.excerpt}
                    imageUrl={item.image_url}
                    location={item.location}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
