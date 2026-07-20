import { AnimatedSection } from "@/components/motion/animated-section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { getContacts } from "@/services/homepage";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export async function ContactSection() {
  const contacts = await getContacts();

  if (!contacts) return null;

  const contactItems: {
    icon: React.ElementType;
    title: string;
    content: string;
  }[] = [
    {
      icon: MapPin,
      title: "Alamat",
      content: contacts.address || "-",
    },
    {
      icon: Phone,
      title: "Telepon",
      content: contacts.phone || "-",
    },
    {
      icon: Mail,
      title: "Email",
      content: contacts.email || "-",
    },
  ];

  if (contacts.instagram) {
    contactItems.push({
      icon: InstagramIcon,
      title: "Instagram",
      content: contacts.instagram.replace("https://instagram.com/", "@"),
    });
  } else if (contacts.facebook) {
    contactItems.push({
      icon: FacebookIcon,
      title: "Facebook",
      content: "Desa Balesari",
    });
  } else {
    contactItems.push({
      icon: Clock,
      title: "Jam Pelayanan",
      content: "Senin - Jumat, 08:00 - 16:00 WIB",
    });
  }

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection variant="fadeUp">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Hubungi Kami
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Jangan ragu untuk menghubungi kami jika ada pertanyaan
            </p>
            <div className="mt-6 h-1 w-16 rounded-full bg-primary mx-auto" />
          </div>
        </AnimatedSection>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item, index) => (
            <AnimatedSection key={item.title} variant="fadeUp" delay={index * 0.1}>
              <div className="rounded-2xl border border-border/50 bg-card p-6 text-center shadow-sm h-full flex flex-col items-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.content}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
