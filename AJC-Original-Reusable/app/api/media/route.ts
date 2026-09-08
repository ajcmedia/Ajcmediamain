import convertHeic from "heic-convert";
import { GridFSBucket } from "mongodb";
import { NextResponse } from "next/server";
import sharp from "sharp";
import { DatabaseConfigurationError, getDatabase } from "@/lib/mongodb";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const MAX_INPUT_BYTES = 20 * 1024 * 1024;
const MAX_STORED_BYTES = 12 * 1024 * 1024;
const allowedTypes = new Set(["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif", "image/avif", "image/heic", "image/heif"]);
const extensionTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".avif": "image/avif",
  ".heic": "image/heic",
  ".heif": "image/heif"
};

class ImageUploadError extends Error {}

export async function POST(request: Request) {
  const requestId = request.headers.get("X-AJC-Request-Id") || "unavailable";
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File) || !file.size) {
    return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
  }
  if (file.size > MAX_INPUT_BYTES) {
    return NextResponse.json({ error: "Images must be 20 MB or smaller." }, { status: 400 });
  }

  try {
    const normalized = await normalizeImage(file);
    const database = await getDatabase();
    const bucket = new GridFSBucket(database, { bucketName: "media" });
    const upload = bucket.openUploadStream(normalized.fileName, {
      metadata: {
        contentType: normalized.contentType,
        originalName: file.name,
        convertedFromApplePhoto: normalized.converted
      }
    });

    await new Promise<void>((resolve, reject) => {
      upload.once("finish", () => resolve());
      upload.once("error", reject);
      upload.end(normalized.buffer);
    });

    return NextResponse.json({
      url: `/api/media/${upload.id.toString()}`,
      converted: normalized.converted
    }, { status: 201 });
  } catch (error) {
    if (error instanceof ImageUploadError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error(`Image upload failed [${requestId}]`, error);
    return NextResponse.json({ error: "The image could not be processed or uploaded. Try a JPEG or PNG copy." }, { status: 500 });
  }
}

async function normalizeImage(file: File) {
  const extension = getExtension(file.name);
  const input = Buffer.from(await file.arrayBuffer());
  const contentType = detectImageContentType(input, file.type, extension);
  if (!contentType || !allowedTypes.has(contentType)) {
    throw new ImageUploadError("Upload a JPEG, PNG, WebP, GIF, AVIF, HEIC, or HEIF image.");
  }

  const isApplePhoto = contentType === "image/heic" || contentType === "image/heif";
  let buffer = input;
  let outputType = contentType === "image/jpg" ? "image/jpeg" : contentType;
  let outputName = sanitizeFileName(file.name);

  if (outputType === "image/jpeg" && !/\.(jpe?g)$/i.test(outputName)) {
    outputName = replaceExtension(outputName, ".jpg");
  }

  if (isApplePhoto) {
    try {
      const converted = await convertHeic({
        buffer: input,
        format: "JPEG",
        quality: 0.9
      });
      buffer = Buffer.from(converted);
      outputType = "image/jpeg";
      outputName = replaceExtension(outputName, ".jpg");
    } catch {
      throw new ImageUploadError("This iPhone photo could not be converted. In Photos, choose Share → Save to Files or export it as JPEG, then try again.");
    }
  }

  if (outputType !== "image/gif") {
    buffer = await optimizeWebImage(buffer, outputType);
  }

  if (buffer.length > MAX_STORED_BYTES) {
    throw new ImageUploadError("The processed image is still too large. Export a smaller JPEG and try again.");
  }

  return {
    buffer,
    contentType: outputType,
    fileName: outputName,
    converted: isApplePhoto
  };
}

async function optimizeWebImage(input: Buffer, contentType: string) {
  try {
    let pipeline = sharp(input, {
      failOn: "warning",
      limitInputPixels: 80_000_000
    })
      .rotate()
      .resize({
        width: 4096,
        height: 4096,
        fit: "inside",
        withoutEnlargement: true
      });

    if (contentType === "image/jpeg") {
      pipeline = pipeline.jpeg({ quality: 90, mozjpeg: true });
    } else if (contentType === "image/png") {
      pipeline = pipeline.png({ compressionLevel: 9 });
    } else if (contentType === "image/webp") {
      pipeline = pipeline.webp({ quality: 90 });
    } else if (contentType === "image/avif") {
      pipeline = pipeline.avif({ quality: 70, effort: 3 });
    }

    return await pipeline.toBuffer();
  } catch {
    throw new ImageUploadError("The selected image could not be read. Try exporting it as a JPEG or PNG and upload that copy.");
  }
}

function normalizeContentType(type: string, extension: string) {
  const normalized = type.trim().toLowerCase();
  if (allowedTypes.has(normalized)) return normalized;
  return extensionTypes[extension] || "";
}

function detectImageContentType(input: Buffer, declaredType: string, extension: string) {
  if (input.length >= 12) {
    if (input[0] === 0xff && input[1] === 0xd8 && input[2] === 0xff) return "image/jpeg";
    if (input.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";

    const firstTwelve = input.subarray(0, 12).toString("ascii");
    if (firstTwelve.startsWith("GIF87a") || firstTwelve.startsWith("GIF89a")) return "image/gif";
    if (firstTwelve.startsWith("RIFF") && firstTwelve.slice(8, 12) === "WEBP") return "image/webp";

    if (firstTwelve.slice(4, 8) === "ftyp") {
      const brands = input.subarray(8, Math.min(input.length, 40)).toString("ascii");
      if (/\b(?:avif|avis)\b/.test(brands)) return "image/avif";
      if (/(?:heic|heix|hevc|hevx|heim|heis|mif1|msf1)/.test(brands)) return "image/heic";
    }
  }

  return normalizeContentType(declaredType, extension);
}

function getExtension(fileName: string) {
  const match = fileName.toLowerCase().match(/\.[a-z0-9]+$/);
  return match?.[0] || "";
}

function sanitizeFileName(fileName: string) {
  const cleaned = fileName
    .normalize("NFKC")
    .replace(/[^\w.\- ]+/g, "")
    .trim()
    .slice(0, 140);
  return cleaned || "uploaded-image";
}

function replaceExtension(fileName: string, extension: string) {
  return /\.[a-z0-9]+$/i.test(fileName)
    ? fileName.replace(/\.[a-z0-9]+$/i, extension)
    : `${fileName}${extension}`;
}
