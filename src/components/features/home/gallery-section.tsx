import { SectionTitle } from "@/components/ui/section-title";
import { GalleryGrid } from "@/components/ui/gallery-grid";
import { AnimatedSection } from "@/components/motion/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getGalleryList } from "@/services/gallery";

export async function GallerySection() {
  const galleryList = await getGalleryList();
  
  if (galleryList.length === 0) return null;
  
  const galleryItems = galleryList.slice(0, 8).map((item) => ({
    id: item.id,
    imageUrl: item.image_url,
    title: item.title,
    altText: item.alt_text,
  }));

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Galeri Foto"
          subtitle="Momen-momen indah yang terekam dari Desa Balesari"
        />

        <AnimatedSection variant="fadeUp">
          <GalleryGrid items={galleryItems} />
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.2} className="mt-12 text-center">
          <Link
            href="/galeri"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Lihat Galeri Lengkap
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
