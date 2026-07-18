import { GridFSBucket, ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { DatabaseConfigurationError, getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }

  try {
    const database = await getDatabase();
    const bucket = new GridFSBucket(database, { bucketName: "media" });
    const objectId = new ObjectId(id);
    const file = await database.collection("media.files").findOne({ _id: objectId });
    if (!file) {
      return NextResponse.json({ error: "Image not found." }, { status: 404 });
    }
    const chunks: Buffer[] = [];
    for await (const chunk of bucket.openDownloadStream(objectId)) {
      chunks.push(Buffer.from(chunk));
    }
    return new Response(Buffer.concat(chunks), {
      headers: {
        "Content-Type": String(file.metadata?.contentType || "application/octet-stream"),
        "Cache-Control": "public, max-age=31536000, immutable"
      }
    });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error("Image download failed", error);
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
  try {
    const database = await getDatabase();
    await new GridFSBucket(database, { bucketName: "media" }).delete(new ObjectId(id));
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    return NextResponse.json({ error: "Image not found." }, { status: 404 });
  }
}
