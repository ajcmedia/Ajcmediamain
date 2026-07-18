import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";
import { DatabaseConfigurationError, getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_BYTES = 8 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif"]);

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File) || !file.size) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (!allowedTypes.has(file.type)) {
    return NextResponse.json({ error: "Upload a JPEG, PNG, WebP, GIF, or AVIF image." }, { status: 400 });
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return NextResponse.json({ error: "Images must be 8 MB or smaller." }, { status: 400 });
  }

  try {
    const database = await getDatabase();
    const bucket = new GridFSBucket(database, { bucketName: "media" });
    const upload = bucket.openUploadStream(file.name, { metadata: { contentType: file.type } });
    const buffer = Buffer.from(await file.arrayBuffer());
    await new Promise<void>((resolve, reject) => {
      upload.once("finish", () => resolve());
      upload.once("error", reject);
      upload.end(buffer);
    });
    return NextResponse.json({ url: `/api/media/${upload.id.toString()}` }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("Image upload failed", error);
    return NextResponse.json({ error: "The image could not be uploaded." }, { status: 500 });
  }
}
