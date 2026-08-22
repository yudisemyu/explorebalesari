import type { Metadata } from "next";
import { outfit, nunitoSans, geistMono } from "@/lib/fonts";
import { PublicShell } from "@/components/layout/public-shell";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://explorebalesari.online"),
  title: {
    default: "Desa Balesari — Pesona Alam & Budaya Desa Wisata",
    template: "%s | Desa Balesari",
  },
  description:
    "Jelajahi keindahan Desa Balesari, desa wisata dengan pesona alam pegunungan, budaya yang kaya, dan keramahan masyarakatnya. Kunjungi destinasi wisata, temukan produk UMKM lokal, dan nikmati pengalaman desa yang tak terlupakan.",
  keywords: [
    "Desa Balesari",
    "desa wisata",
    "wisata Magelang",
    "wisata Jawa Tengah",
    "desa wisata alam",
    "UMKM desa",
    "Windusari",
    "Gunung Sumbing",
    "wisata alam Magelang",
    "desa wisata Jawa Tengah",
    "Balesari Windusari",
  ],
  authors: [{ name: "Desa Balesari" }],
  creator: "Desa Balesari",
  publisher: "Pemerintah Desa Balesari",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: "Desa Balesari",
    title: "Desa Balesari — Pesona Alam & Budaya Desa Wisata",
    description:
      "Jelajahi keindahan Desa Balesari, desa wisata dengan pesona alam pegunungan, budaya yang kaya, dan keramahan masyarakatnya.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desa Balesari — Pesona Alam & Budaya Desa Wisata",
    description:
      "Jelajahi keindahan Desa Balesari, desa wisata dengan pesona alam pegunungan dan budaya yang kaya.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${nunitoSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <PublicShell footer={<Footer />}>{children}</PublicShell>
      </body>
    </html>
  );
}
