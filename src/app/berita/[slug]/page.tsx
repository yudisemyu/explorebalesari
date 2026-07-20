import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getNewsBySlug } from "@/services/news";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ArrowLeft, Calendar, User, Newspaper } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  if (!news) return { title: "Berita Tidak Ditemukan" };

  return {
    title: news.title,
    description: news.excerpt || `Baca berita: ${news.title}`,
    openGraph: {
      title: news.title,
      description: news.excerpt || undefined,
      type: "article",
      publishedTime: news.published_at || undefined,
      authors: news.author ? [news.author] : undefined,
      images: news.image_url ? [{ url: news.image_url }] : undefined,
    },
  };
}


export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) notFound();

  const formattedDate = news.published_at
    ? new Date(news.published_at).toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        {news.image_url ? (
          <Image
            src={news.image_url}
            alt={news.title}
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
              href="/berita"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/60 mb-3">
              {formattedDate && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formattedDate}
                </span>
              )}
              {news.author && (
                <span className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {news.author}
                </span>
              )}
            </div>
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-tight">
              {news.title}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            {news.content ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Newspaper className="h-12 w-12 text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">Konten belum tersedia.</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
