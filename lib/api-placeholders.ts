import { starterProjects } from "@/data/site";
import type { BookingRequest, PortfolioProject } from "@/types/site";

type MemoryStore = {
  bookings: BookingRequest[];
  projects: PortfolioProject[];
};

const globalForStore = globalThis as typeof globalThis & {
  ajcMediaStore?: MemoryStore;
};

export const memoryStore: MemoryStore = globalForStore.ajcMediaStore ?? {
  bookings: [],
  projects: starterProjects
};

if (!globalForStore.ajcMediaStore) {
  globalForStore.ajcMediaStore = memoryStore;
}

export function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
