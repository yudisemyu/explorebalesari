import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getTourismBySlug } from "@/services/tourism";
import { AnimatedSection } from "@/components/motion/animated-section";
import { MapPin, ArrowLeft, Mountain, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tourism = await getTourismBySlug(slug);
  if (!tourism) return { title: "Wisata Tidak Ditemukan" };

  return {
    title: tourism.title,
    description: tourism.excerpt || `Destinasi wisata ${tourism.title} di Desa Balesari.`,
    openGraph: {
      title: tourism.title,
      description: tourism.excerpt || undefined,
      images: tourism.image_url ? [{ url: tourism.image_url }] : undefined,
    },
  };
}


export default async function WisataDetailPage({ params }: Props) {
  const { slug } = await params;
  const tourism = await getTourismBySlug(slug);

  if (!tourism) notFound();

  return (
    <>
      {/* Hero Image */}
      <section className="relative flex min-h-[50vh] items-end overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-4 pb-12 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <Link
              href="/wisata"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Wisata
            </Link>
            {tourism.location && (
              <div className="flex flex-col items-start gap-2 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-white/70">
                  <MapPin className="h-4 w-4" />
                  {tourism.location}
                </div>
                {tourism.maps_url && (
                  <a 
                    href={tourism.maps_url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Buka di Google Maps
                  </a>
                )}
              </div>
            )}
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {tourism.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            {tourism.description ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: tourism.description }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Mountain className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Deskripsi belum tersedia.</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
