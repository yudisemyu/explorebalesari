import { SectionTitle } from "@/components/ui/section-title";
import { NewsCard } from "@/components/ui/news-card";
import { AnimatedSection } from "@/components/motion/animated-section";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getLatestNews } from "@/services/news";

export async function NewsSection() {
  const newsData = await getLatestNews(3);

  if (newsData.length === 0) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Berita Terbaru"
          subtitle="Kabar dan informasi terkini seputar Desa Balesari"
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsData.map((item, index) => (
            <AnimatedSection key={item.slug} variant="fadeUp" delay={index * 0.1}>
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

        <AnimatedSection variant="fadeUp" delay={0.3} className="mt-12 text-center">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-8 py-3 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Lihat Semua Berita
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
