import type { Metadata } from "next";
import { AnimatedSection } from "@/components/motion/animated-section";
import { SectionTitle } from "@/components/ui/section-title";
import { Mountain, Users, BookOpen, MapPin, Eye, Heart } from "lucide-react";
import { getVillageProfile } from "@/services/profile";

export const metadata: Metadata = {
  title: "Profil Desa",
  description:
    "Mengenal Desa Balesari — sejarah, visi misi, potensi, dan kehidupan masyarakat desa wisata di lereng Gunung Sumbing, Kabupaten Magelang.",
  openGraph: {
    title: "Profil Desa Balesari",
    description: "Mengenal Desa Balesari — sejarah, visi misi, potensi, dan kehidupan masyarakat desa wisata.",
  },
};

export default async function ProfilPage() {
  const profile = await getVillageProfile();

  return (
    <>
      {/* Hero Banner */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-emerald-900">
        <div className="absolute inset-0 bg-[url('/hero-pattern.svg')] opacity-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8 py-32">
          <AnimatedSection variant="fadeUp" delay={0.2}>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Profil Desa Balesari
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70">
              Mengenal lebih dekat desa wisata yang kaya akan potensi alam, budaya, dan keramahan masyarakatnya
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Dynamic Profile Content (Tiptap HTML) */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <AnimatedSection variant="fadeUp">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
                Profil & Sejarah Desa
              </h2>
            </div>
          </AnimatedSection>

          <AnimatedSection variant="fadeUp" delay={0.1}>
            {profile?.content ? (
              <div
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: profile.content }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center border border-border/50 rounded-2xl bg-muted/20">
                <p className="text-muted-foreground">Profil desa sedang dalam tahap pembaruan.</p>
              </div>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* Geografi */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Kondisi Geografis"
            subtitle="Letak dan karakteristik wilayah Desa Balesari"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: MapPin,
                title: "Lokasi",
                value: "Kec. Windusari, Kab. Magelang",
              },
              {
                icon: Mountain,
                title: "Ketinggian",
                value: "800 — 1.200 mdpl",
              },
              {
                icon: Users,
                title: "Populasi",
                value: "± 3.500 jiwa",
              },
            ].map((item, index) => (
              <AnimatedSection key={item.title} variant="fadeUp" delay={index * 0.1}>
                <div className="rounded-2xl border border-border/50 bg-card p-8 text-center shadow-sm">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xl font-bold text-foreground">
                    {item.value}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Peta */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Peta Desa"
            subtitle="Lokasi Desa Balesari di Kecamatan Windusari, Kabupaten Magelang"
          />

          <AnimatedSection variant="fadeUp">
            <div className="overflow-hidden rounded-2xl border border-border/50 shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15816.567!2d110.0788!3d-7.3831!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a9e2b1b0b0b0b%3A0x0!2sBalesari%2C+Windusari%2C+Magelang!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Peta Desa Balesari"
                className="w-full"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
