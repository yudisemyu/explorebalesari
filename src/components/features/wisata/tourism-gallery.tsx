"use client";

import { useState } from "react";
import Image from "next/image";
import { Lightbox } from "@/components/ui/lightbox";

interface GalleryImage {
  id: string;
  image_url: string;
}

interface TourismGalleryProps {
  images: GalleryImage[];
  tourismTitle: string;
}

export function TourismGallery({ images, tourismTitle }: TourismGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const lightboxImages = images.map((img, i) => ({
    url: img.image_url,
    alt: `${tourismTitle} foto ${i + 1}`,
  }));

  return (
    <>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
        {images.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => {
              setLightboxIndex(index);
              setLightboxOpen(true);
            }}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            <Image
              src={img.image_url}
              alt={`${tourismTitle} foto ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/20">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/0 text-white opacity-0 transition-all group-hover:bg-white/20 group-hover:opacity-100">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        images={lightboxImages}
        initialIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
}
