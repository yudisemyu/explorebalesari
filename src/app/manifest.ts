import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Desa Balesari — Pesona Alam & Budaya Desa Wisata",
    short_name: "Desa Balesari",
    description:
      "Jelajahi keindahan Desa Balesari, desa wisata dengan pesona alam pegunungan, budaya yang kaya, dan keramahan masyarakatnya.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf8",
    theme_color: "#2d6a30",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
