import type { Metadata } from "next";
import { outfit, nunitoSans, geistMono } from "@/lib/fonts";
import { PublicShell } from "@/components/layout/public-shell";
import "./globals.css";

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "Desa Balesari" }],
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
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
