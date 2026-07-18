import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { DatabaseConfigurationError } from "@/lib/mongodb";
import { getSiteContent, saveSiteContent } from "@/lib/site-content";
import { validateSiteContent } from "@/lib/site-content-validation";
import type { PortfolioProject } from "@/types/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json({ projects: content.gallery.projects });
}

export async function POST(request: Request) {
  const payload = (await request.json().catch(() => null)) as Omit<PortfolioProject, "id"> | null;
  if (!payload?.title || !payload.image || !payload.categoryId || !payload.description) {
    return NextResponse.json({ error: "Missing required project fields." }, { status: 400 });
  }

  try {
    const content = await getSiteContent();
    const project: PortfolioProject = { ...payload, id: randomUUID(), visible: payload.visible !== false };
    content.gallery.projects.unshift(project);
    const validation = validateSiteContent(content);
    if (!validation.content) {
      return NextResponse.json({ error: validation.errors[0] }, { status: 400 });
    }
    await saveSiteContent(validation.content);
    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    if (error instanceof DatabaseConfigurationError) {
      return NextResponse.json({ error: error.message }, { status: 503 });
    }
    return NextResponse.json({ error: "The project could not be saved." }, { status: 500 });
  }
}
