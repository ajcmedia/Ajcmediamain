import { noStoreJson } from "@/lib/api-response";

export const dynamic = "force-dynamic";

export async function GET() {
  return noStoreJson({ ok: true });
}
