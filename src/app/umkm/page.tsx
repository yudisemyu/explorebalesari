import type { Metadata } from "next";
import { getUmkmList } from "@/services/umkm";
import { UmkmCard } from "@/components/ui/umkm-card";
import { AnimatedSection } from "@/components/motion/animated-section";

export const metadata: Metadata = {
  title: "UMKM",
  description:
    "Temukan produk unggulan dari pelaku UMKM Desa Balesari — kopi, batik, makanan khas, dan kerajinan lokal.",
  openGraph: {
    title: "UMKM Desa Balesari",
    description: "Temukan produk unggulan dari pelaku UMKM Desa Balesari.",
  },
};

export default async function UmkmPage() {
  const umkmList = await getUmkmList();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 py-32">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Produk UMKM
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Dukung produk unggulan dari pelaku usaha Desa Balesari
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* List */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {umkmList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {umkmList.map((item, index) => (
                <AnimatedSection key={item.id} variant="fadeUp" delay={index * 0.06}>
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
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Belum ada UMKM yang terdaftar.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
