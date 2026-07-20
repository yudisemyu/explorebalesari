"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface GalleryItem {
  id: string;
  imageUrl: string;
  title?: string | null;
  altText?: string | null;
}

interface GalleryGridProps {
  items: GalleryItem[];
  className?: string;
}

export function GalleryGrid({ items, className }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  return (
    <>
      <div
        className={cn(
          "columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4",
          className
        )}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            className="mb-4 break-inside-avoid"
          >
            <button
              onClick={() => setSelectedImage(item)}
              className="group relative w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={`Lihat foto: ${item.title || item.altText || "Gallery image"}`}
            >
              <div
                className={cn(
                  "relative w-full overflow-hidden",
                  // Vary aspect ratios for masonry effect
                  index % 3 === 0
                    ? "aspect-[3/4]"
                    : index % 3 === 1
                      ? "aspect-square"
                      : "aspect-[4/3]"
                )}
              >
                {item.imageUrl ? (
                  <Image
                    src={item.imageUrl}
                    alt={item.altText || item.title || "Foto Desa Balesari"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                    <span className="text-sm text-muted-foreground">No image</span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
              </div>
              {item.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="text-sm font-medium text-white">{item.title}</p>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              aria-label="Tutup"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-xl"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedImage.imageUrl ? (
                <Image
                  src={selectedImage.imageUrl}
                  alt={selectedImage.altText || selectedImage.title || "Foto Desa Balesari"}
                  width={1200}
                  height={800}
                  className="max-h-[85vh] w-auto object-contain"
                />
              ) : (
                <div className="flex h-[400px] w-[600px] items-center justify-center bg-muted rounded-xl">
                  <span className="text-muted-foreground">No image</span>
                </div>
              )}
              {selectedImage.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-lg font-medium text-white">{selectedImage.title}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
