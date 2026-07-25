import { NextResponse } from "next/server";
import { noStoreHeaders } from "@/lib/api-response";
import { DatabaseConfigurationError, hasMongoConfiguration } from "@/lib/mongodb";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import { validateSiteContent } from "@/lib/site-content-validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json(
    { content, databaseConfigured: hasMongoConfiguration() },
    { headers: noStoreHeaders }
  );
}

export async function PUT(request: Request) {
  const requestId = request.headers.get("X-AJC-Request-Id") || "unavailable";
  const payload = await request.json().catch(() => null);
  const validation = validateSiteContent(payload);
  if (!validation.content) {
    return NextResponse.json({ error: validation.errors[0], errors: validation.errors }, { status: 400 });
  }

  try {
    return NextResponse.json({ content: await saveSiteContent(validation.content) });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    console.error(`Could not save CMS content [${requestId}]`, error);
    return NextResponse.json({ error: "The CMS content could not be saved." }, { status: 500 });
  }
}
