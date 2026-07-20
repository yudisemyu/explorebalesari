import type { Metadata } from "next";
import { getTourismList } from "@/services/tourism";
import { TourismCard } from "@/components/ui/tourism-card";
import { AnimatedSection } from "@/components/motion/animated-section";

export const metadata: Metadata = {
  title: "Destinasi Wisata",
  description:
    "Jelajahi berbagai destinasi wisata menarik di Desa Balesari — air terjun, jalur trekking, kebun kopi, dan pemandangan alam pegunungan.",
  openGraph: {
    title: "Destinasi Wisata Desa Balesari",
    description: "Jelajahi berbagai destinasi wisata menarik di Desa Balesari.",
  },
};

export default async function WisataPage() {
  const tourismList = await getTourismList();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 py-32">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Destinasi Wisata
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Temukan keindahan alam dan wisata menarik yang ditawarkan Desa Balesari
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* List */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {tourismList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tourismList.map((item, index) => (
                <AnimatedSection key={item.id} variant="fadeUp" delay={index * 0.06}>
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
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Belum ada destinasi wisata yang tersedia.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
