import { SectionTitle } from "@/components/ui/section-title";
import { TourismCard } from "@/components/ui/tourism-card";
import { AnimatedSection } from "@/components/motion/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedTourism } from "@/services/tourism";

export async function TourismSection() {
  const tourismData = await getFeaturedTourism();

  if (tourismData.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Destinasi Wisata"
          subtitle="Jelajahi pesona alam dan wisata menarik yang ditawarkan Desa Balesari"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {tourismData.map((item, index) => (
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

        <AnimatedSection variant="fadeUp" delay={0.4} className="mt-12 text-center">
          <Link
            href="/wisata"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Lihat Semua Wisata
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
