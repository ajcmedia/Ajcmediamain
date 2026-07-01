import { NextResponse } from "next/server";
import { createId, memoryStore } from "@/lib/api-placeholders";
import type { PortfolioProject } from "@/types/site";

export async function GET() {
  return NextResponse.json({ projects: memoryStore.projects });
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Omit<PortfolioProject, "id">;
  const project: PortfolioProject = {
    id: createId("project"),
    title: payload.title,
    category: payload.category,
    image: payload.image,
    description: payload.description
  };

  memoryStore.projects.unshift(project);
  return NextResponse.json({ project }, { status: 201 });
}
