import type { Metadata } from "next";
import { getGalleryList } from "@/services/gallery";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { AnimatedSection } from "@/components/motion/animated-section";

export const metadata: Metadata = {
  title: "Galeri Foto",
  description:
    "Galeri foto keindahan alam, budaya, dan kehidupan masyarakat Desa Balesari.",
  openGraph: {
    title: "Galeri Foto Desa Balesari",
    description: "Galeri foto keindahan alam, budaya, dan kehidupan masyarakat Desa Balesari.",
  },
};

export default async function GaleriPage() {
  const galleryList = await getGalleryList();

  const galleryItems = galleryList.map((item) => ({
    id: item.id,
    imageUrl: item.image_url,
    title: item.title,
    altText: item.alt_text,
  }));

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 py-32">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Galeri Foto
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Momen-momen indah yang terekam dari Desa Balesari
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {galleryItems.length > 0 ? (
            <AnimatedSection variant="fadeUp">
              <GalleryGrid items={galleryItems} />
            </AnimatedSection>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Belum ada foto yang tersedia.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
