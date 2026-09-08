import { NextResponse } from "next/server";

export const noStoreHeaders = {
  "Cache-Control": "private, no-store, no-cache, max-age=0, must-revalidate",
  Expires: "0",
  Pragma: "no-cache"
} as const;

export function createRequestId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function noStoreJson<T>(body: T, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  Object.entries(noStoreHeaders).forEach(([name, value]) => headers.set(name, value));
  return NextResponse.json(body, { ...init, headers });
}
