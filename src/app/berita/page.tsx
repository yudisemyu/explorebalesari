import type { Metadata } from "next";
import { getNewsList } from "@/services/news";
import { NewsCard } from "@/components/ui/news-card";
import { AnimatedSection } from "@/components/motion/animated-section";

export const metadata: Metadata = {
  title: "Berita",
  description:
    "Kabar dan informasi terkini seputar Desa Balesari — kegiatan, pembangunan, dan peristiwa penting.",
  openGraph: {
    title: "Berita Desa Balesari",
    description: "Kabar dan informasi terkini seputar Desa Balesari.",
  },
};

export default async function BeritaPage() {
  const newsList = await getNewsList();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 py-32">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Berita & Informasi
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/70">
              Kabar terbaru seputar Desa Balesari
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* List */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {newsList.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {newsList.map((item, index) => (
                <AnimatedSection key={item.id} variant="fadeUp" delay={index * 0.06}>
                  <NewsCard
                    title={item.title}
                    slug={item.slug}
                    excerpt={item.excerpt}
                    imageUrl={item.image_url}
                    publishedAt={item.published_at}
                    author={item.author}
                  />
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">
                Belum ada berita yang dipublikasikan.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
