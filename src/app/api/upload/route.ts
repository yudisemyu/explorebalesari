import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { uploadImage } from "@/lib/supabase/storage";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const bucket = formData.get("bucket") as any;
    const folder = formData.get("folder") as string | undefined;

    if (!file || !bucket) {
      return NextResponse.json(
        { error: "File dan bucket wajib diisi" },
        { status: 400 }
      );
    }

    // Use the admin service to upload the file (bypassing RLS)
    const url = await uploadImage(bucket, file, folder);

    return NextResponse.json({ url });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Gagal mengupload file" },
      { status: 500 }
    );
  }
}
