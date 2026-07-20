"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import imageCompression from "browser-image-compression";

interface ImageUploadProps {
  value: string | null;
  onChange: (url: string) => void;
  bucket: "profile" | "wisata" | "umkm" | "berita" | "gallery";
  folder?: string;
  className?: string;
  label?: string;
}

export function ImageUpload({
  value,
  onChange,
  bucket,
  folder,
  className = "",
  label = "Upload Gambar",
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size before compression just as a sanity check (e.g. max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("Ukuran gambar terlalu besar (Maks 10MB sebelum kompresi)");
      return;
    }

    // Validate type
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar (JPG/PNG/WebP)");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Compress and convert to WebP
      const options = {
        maxSizeMB: 1, // Target size 1MB max
        maxWidthOrHeight: 1920, // Max width/height
        useWebWorker: true,
        fileType: "image/webp" as string,
        initialQuality: 0.8,
      };

      const compressedFile = await imageCompression(file, options);
      
      // Ensure the compressed file doesn't exceed our strict 2MB backend limit
      if (compressedFile.size > 2 * 1024 * 1024) {
        throw new Error("Gambar masih terlalu besar setelah dikompresi. Gunakan gambar yang lebih kecil.");
      }

      const formData = new FormData();
      formData.append("file", compressedFile, compressedFile.name.replace(/\.[^/.]+$/, ".webp"));
      formData.append("bucket", bucket);
      if (folder) {
        formData.append("folder", folder);
      }

      // We need to create an API route for handling uploads to keep the service role secret
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Gagal mengupload gambar");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUploading(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleRemove = () => {
    onChange("");
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <span className="text-sm font-medium">{label}</span>
      
      {value ? (
        <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-border/50 bg-muted/30">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="group relative flex aspect-video w-full max-w-sm cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-muted/10 transition-colors hover:border-primary/50 hover:bg-muted/30"
        >
          {isUploading ? (
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
              <span className="text-sm">Mengupload...</span>
            </div>
          ) : (
            <>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <Upload className="h-5 w-5" />
              </div>
              <div className="text-center text-sm">
                <p className="font-semibold text-foreground">Klik untuk upload</p>
                <p className="text-muted-foreground mt-1">JPG, PNG, WebP (Max 2MB)</p>
              </div>
            </>
          )}
        </div>
      )}

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
