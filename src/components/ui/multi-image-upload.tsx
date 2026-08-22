"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Plus } from "lucide-react";
import imageCompression from "browser-image-compression";

interface MultiImageUploadProps {
  images: { id?: string; image_url: string; sort_order: number }[];
  onAdd: (url: string) => void;
  onRemove: (index: number) => void;
  maxImages?: number;
  bucket: "profile" | "wisata" | "umkm" | "berita" | "gallery";
}

export function MultiImageUpload({
  images,
  onAdd,
  onRemove,
  maxImages = 3,
  bucket,
}: MultiImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length < maxImages;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar (Maks 10MB sebelum kompresi)");
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG/PNG/WebP)");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: "image/webp" as string,
        initialQuality: 0.8,
      };

      const compressedFile = await imageCompression(file, options);

      if (compressedFile.size > 2 * 1024 * 1024) {
        throw new Error(
          "Gambar masih terlalu besar setelah dikompresi. Gunakan gambar yang lebih kecil."
        );
      }

      const formData = new FormData();
      formData.append(
        "file",
        compressedFile,
        compressedFile.name.replace(/\.[^/.]+$/, ".webp")
      );
      formData.append("bucket", bucket);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengupload gambar");
      }

      const data = await res.json();
      onAdd(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Foto Tambahan ({images.length}/{maxImages})
        </span>
        {images.length > 0 && (
          <span className="text-xs text-muted-foreground">
            Klik × untuk menghapus
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {/* Existing images */}
        {images.map((img, index) => (
          <div
            key={img.id || img.image_url}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border/50 bg-muted/30"
          >
            <Image
              src={img.image_url}
              alt={`Foto ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:bg-destructive"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <div className="absolute bottom-2 left-2 rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
              {index + 1}
            </div>
          </div>
        ))}

        {/* Add button */}
        {canAddMore && (
          <div
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className="group relative flex aspect-[4/3] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/10 transition-colors hover:border-primary/50 hover:bg-muted/30"
          >
            {isUploading ? (
              <div className="flex flex-col items-center gap-1.5 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <span className="text-xs">Mengupload...</span>
              </div>
            ) : (
              <>
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Plus className="h-4 w-4" />
                </div>
                <span className="text-xs text-muted-foreground">
                  Tambah Foto
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleUpload}
        accept="image/jpeg, image/png, image/webp, image/gif"
        className="hidden"
      />
    </div>
  );
}
