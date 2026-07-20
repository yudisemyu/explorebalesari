import { createClient } from "@/lib/supabase/client";

/**
 * Extracts the bucket name and file path from a Supabase Storage public URL.
 * E.g. https://xxx.supabase.co/storage/v1/object/public/wisata/abc.webp
 * → { bucket: "wisata", path: "abc.webp" }
 */
function parseStorageUrl(url: string): { bucket: string; path: string } | null {
  try {
    const match = url.match(/\/storage\/v1\/object\/public\/([^/]+)\/(.+)$/);
    if (!match) return null;
    return { bucket: match[1], path: match[2] };
  } catch {
    return null;
  }
}

/**
 * Delete an image from Supabase Storage given its public URL.
 * Silently fails if the URL can't be parsed or the file doesn't exist.
 */
export async function deleteStorageFile(imageUrl: string | null | undefined) {
  if (!imageUrl) return;
  
  const parsed = parseStorageUrl(imageUrl);
  if (!parsed) return;

  const supabase = createClient();
  await supabase.storage.from(parsed.bucket).remove([parsed.path]);
}

/**
 * Delete multiple storage files.
 */
export async function deleteStorageFiles(imageUrls: (string | null | undefined)[]) {
  const tasks = imageUrls.filter(Boolean).map((url) => deleteStorageFile(url));
  await Promise.allSettled(tasks);
}
