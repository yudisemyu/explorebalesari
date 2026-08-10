import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mountain, Camera, MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/motion/animated-section";
import { getTourismList } from "@/services/tourism";

const highlights = [
  {
    icon: Mountain,
    title: "Trekking",
    description:
      "Jalur pendakian menuju puncak dengan pemandangan pegunungan yang memukau",
  },
  {
    icon: Camera,
    title: "Spot Foto",
    description:
      "Berbagai titik foto instagramable dengan latar belakang alam yang menakjubkan",
  },
];

export async function TourismSection() {
  const tourismData = await getTourismList();

  if (tourismData.length === 0) return null;

  // Ambil wisata pertama (Giyanti)
  const giyanti = tourismData[0];

  return (
    <section className="relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        {giyanti.image_url ? (
          <Image
            src={giyanti.image_url}
            alt={giyanti.title}
            fill
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-emerald-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-28 sm:px-6 lg:px-8 lg:py-36">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — Text content */}
          <div>
            <AnimatedSection variant="fadeUp">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm border border-white/15 mb-6">
                <MapPin className="h-3.5 w-3.5" />
                Destinasi Wisata
              </span>
            </AnimatedSection>

            <AnimatedSection variant="fadeUp" delay={0.1}>
              <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {giyanti.title}
              </h2>
            </AnimatedSection>

            {giyanti.location && (
              <AnimatedSection variant="fadeUp" delay={0.15}>
                <div className="mt-4 flex items-center gap-1.5 text-sm text-white/60">
                  <MapPin className="h-4 w-4" />
                  {giyanti.location}
                </div>
              </AnimatedSection>
            )}

            <AnimatedSection variant="fadeUp" delay={0.2}>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                {giyanti.excerpt ||
                  "Jelajahi keindahan alam dan pesona wisata yang ditawarkan Desa Balesari."}
              </p>
            </AnimatedSection>

            {/* Highlights */}
            <AnimatedSection variant="fadeUp" delay={0.3}>
              <div className="mt-10 grid gap-5 sm:grid-cols-2">
                {highlights.map((item) => (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 rounded-2xl bg-white/[0.07] p-5 backdrop-blur-sm border border-white/10"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <item.icon className="h-5 w-5 text-white/90" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-white/55">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection variant="fadeUp" delay={0.4}>
              <Link
                href={`/wisata/${giyanti.slug}`}
                className="mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-green-900 shadow-lg shadow-black/20 transition-all hover:bg-white/90 hover:scale-105 hover:gap-3.5 active:scale-100"
              >
                Jelajahi Wisata {giyanti.title}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </AnimatedSection>
          </div>

          {/* Right — Decorative image card (visible on larger screens) */}
          <AnimatedSection
            variant="fadeLeft"
            delay={0.3}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Main image card */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-black/40">
                {giyanti.image_url ? (
                  <Image
                    src={giyanti.image_url}
                    alt={giyanti.title}
                    fill
                    className="object-cover"
                    sizes="40vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-green-800 to-emerald-900">
                    <Mountain className="h-16 w-16 text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Floating badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-xl border border-white/15">
                    <p className="text-xs font-medium text-white/60 uppercase tracking-wider">
                      Desa Balesari
                    </p>
                    <p className="mt-1 text-lg font-bold text-white">
                      {giyanti.title}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative blur elements */}
              <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-primary/20 blur-3xl" />
              <div className="absolute -bottom-8 -left-8 h-40 w-40 rounded-full bg-emerald-500/15 blur-3xl" />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
