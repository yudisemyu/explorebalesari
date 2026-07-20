import { createAdminClient } from "./admin";

type StorageBucket = "profile" | "wisata" | "umkm" | "berita" | "gallery";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/**
 * Upload an image to a Supabase Storage bucket.
 * Returns the public URL of the uploaded image.
 */
export async function uploadImage(
  bucket: StorageBucket,
  file: File,
  folder?: string
): Promise<string> {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Ukuran file melebihi batas maksimal 2 MB.");
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error("Format file tidak didukung. Gunakan JPEG, PNG, WebP, atau GIF.");
  }

  const supabase = createAdminClient();

  // Generate unique filename
  const ext = file.name.split(".").pop() || "webp";
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  const fileName = `${timestamp}-${randomId}.${ext}`;
  const filePath = folder ? `${folder}/${fileName}` : fileName;

  const { error } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    throw new Error(`Gagal mengunggah gambar: ${error.message}`);
  }

  return getPublicUrl(bucket, filePath);
}

/**
 * Delete an image from Supabase Storage.
 */
export async function deleteImage(
  bucket: StorageBucket,
  imageUrl: string
): Promise<void> {
  const supabase = createAdminClient();

  // Extract file path from the full URL
  const path = extractPathFromUrl(bucket, imageUrl);
  if (!path) return;

  const { error } = await supabase.storage
    .from(bucket)
    .remove([path]);

  if (error) {
    console.error(`Failed to delete image from ${bucket}:`, error.message);
  }
}

/**
 * Get the public URL for a file in Supabase Storage.
 */
export function getPublicUrl(bucket: StorageBucket, path: string): string {
  const supabase = createAdminClient();

  const { data } = supabase.storage
    .from(bucket)
    .getPublicUrl(path);

  return data.publicUrl;
}

/**
 * Extract the storage path from a full public URL.
 */
function extractPathFromUrl(bucket: StorageBucket, url: string): string | null {
  try {
    const marker = `/storage/v1/object/public/${bucket}/`;
    const index = url.indexOf(marker);
    if (index === -1) return null;
    return decodeURIComponent(url.substring(index + marker.length));
  } catch {
    return null;
  }
}
