import { AnimatedSection } from "@/components/motion/animated-section";
import { MapPin } from "lucide-react";
import { getContacts } from "@/services/homepage";

export async function MapSection() {
  const contacts = await getContacts();

  if (!contacts || !contacts.maps_embed_url) return null;

  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-primary mb-2">
              <MapPin className="h-4 w-4" />
              Lokasi
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Temukan Kami
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {contacts.address || "Desa Balesari, Kecamatan Windusari, Kabupaten Magelang, Jawa Tengah"}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection variant="fadeUp" delay={0.2}>
          <div className="overflow-hidden rounded-2xl border border-border/50 shadow-lg">
            <iframe
              src={contacts.maps_embed_url}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Desa Balesari"
              className="w-full"
            />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
