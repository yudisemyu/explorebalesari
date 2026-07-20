import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getUmkmBySlug } from "@/services/umkm";
import { AnimatedSection } from "@/components/motion/animated-section";
import { ArrowLeft, Phone, MapPin, Store, User, ExternalLink } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const umkm = await getUmkmBySlug(slug);
  if (!umkm) return { title: "UMKM Tidak Ditemukan" };

  return {
    title: umkm.name,
    description: umkm.excerpt || `Produk UMKM ${umkm.name} dari Desa Balesari.`,
    openGraph: {
      title: umkm.name,
      description: umkm.excerpt || undefined,
      images: umkm.image_url ? [{ url: umkm.image_url }] : undefined,
    },
  };
}


export default async function UmkmDetailPage({ params }: Props) {
  const { slug } = await params;
  const umkm = await getUmkmBySlug(slug);

  if (!umkm) notFound();

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[45vh] items-end overflow-hidden">
        {umkm.image_url ? (
          <Image
            src={umkm.image_url}
            alt={umkm.name}
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
              href="/umkm"
              className="inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke UMKM
            </Link>
            {umkm.category && (
              <span className="inline-flex items-center rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white/90 mb-3">
                {umkm.category}
              </span>
            )}
            <h1 className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              {umkm.name}
            </h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection variant="fadeUp">
                {umkm.description ? (
                  <div
                    className="prose-content"
                    dangerouslySetInnerHTML={{ __html: umkm.description }}
                  />
                ) : umkm.excerpt ? (
                  <p className="text-lg leading-relaxed text-muted-foreground">{umkm.excerpt}</p>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <Store className="h-12 w-12 text-muted-foreground/30 mb-4" />
                    <p className="text-muted-foreground">Deskripsi belum tersedia.</p>
                  </div>
                )}
              </AnimatedSection>
            </div>

            {/* Sidebar info */}
            <div>
              <AnimatedSection variant="fadeUp" delay={0.1}>
                <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm space-y-5">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    Informasi
                  </h3>

                  {umkm.owner_name && (
                    <div className="flex items-start gap-3">
                      <User className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Pemilik</p>
                        <p className="text-sm font-medium text-foreground">{umkm.owner_name}</p>
                      </div>
                    </div>
                  )}

                  {umkm.phone && (
                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Telepon</p>
                        <p className="text-sm font-medium text-foreground">{umkm.phone}</p>
                      </div>
                    </div>
                  )}

                  {umkm.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Alamat</p>
                        <p className="text-sm font-medium text-foreground">{umkm.address}</p>
                        
                        {umkm.maps_url && (
                          <a 
                            href={umkm.maps_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                          >
                            <ExternalLink className="h-3 w-3" />
                            Buka di Google Maps
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
