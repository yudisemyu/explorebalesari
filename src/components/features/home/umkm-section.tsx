import { SectionTitle } from "@/components/ui/section-title";
import { UmkmCard } from "@/components/ui/umkm-card";
import { AnimatedSection } from "@/components/motion/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedUmkm } from "@/services/umkm";

export async function UmkmSection() {
  const umkmData = await getFeaturedUmkm();

  if (umkmData.length === 0) return null;

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Produk UMKM"
          subtitle="Dukung produk unggulan dari pelaku usaha Desa Balesari"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {umkmData.map((item, index) => (
            <AnimatedSection key={item.slug} variant="fadeUp" delay={index * 0.08}>
              <UmkmCard
                name={item.name}
                slug={item.slug}
                excerpt={item.excerpt}
                imageUrl={item.image_url}
                category={item.category}
                ownerName={item.owner_name}
              />
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection variant="fadeUp" delay={0.3} className="mt-12 text-center">
          <Link
            href="/umkm"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Lihat Semua UMKM
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
