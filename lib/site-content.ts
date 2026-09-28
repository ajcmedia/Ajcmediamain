import "server-only";

import { cloneDefaultSiteContent } from "@/data/site-content";
import { getDatabase, hasMongoConfiguration } from "@/lib/mongodb";
import type { SiteContent } from "@/types/site";

type SiteContentDocument = SiteContent & { _id: "primary" };

const publicCopyUpdates = new Map([
  [
    "Choose a frame—or tap the main image to move forward—and watch the editorial spread recompose around that moment.",
    "From the smallest details to the energy of the reception, every chapter holds its own piece of the day."
  ],
  [
    "The photographer can add more projects from the admin page. The future backend can hydrate this same component from an API or CMS.",
    "Browse the collections, find a feeling, and open any photograph to take a closer look."
  ],
  [
    "A four-scene cut from quiet detail to final delivery. Scroll at your own pace; every beat has room to land.",
    "A four-scene journey from quiet anticipation to the moments that make the celebration unforgettable."
  ],
  [
    "Each portal opens the same gallery from a different emotional doorway—celebration, connection, or character.",
    "Enter through celebration, connection, or character, and discover photographs shaped by each kind of story."
  ],
  [
    "A curated photo wall gives visitors the feeling of stepping inside a private exhibit before they open the full gallery.",
    "A quiet collection of celebrations, portraits, and details, each chosen for the feeling it carries."
  ],
  ["Featured Story / Interactive cut", "Featured Wedding Story"]
]);

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasMongoConfiguration()) {
    return refreshPublicCopy(cloneDefaultSiteContent());
  }

  try {
    const database = await getDatabase();
    const document = await database.collection<SiteContentDocument>("site_content").findOne({ _id: "primary" });
    if (!document) {
      const content = cloneDefaultSiteContent();
      console.error("The CMS database has no primary site content document. Serving built-in content without seeding the database.");
      return refreshPublicCopy(content);
    }

    const { _id: _ignored, ...content } = document;
    return refreshPublicCopy(content);
  } catch (error) {
    console.error("Could not load CMS content; serving the built-in content.", error);
    return refreshPublicCopy(cloneDefaultSiteContent());
  }
}

function refreshPublicCopy(content: SiteContent): SiteContent {
  return replaceCopy(content) as SiteContent;
}

function replaceCopy(value: unknown): unknown {
  if (typeof value === "string") return publicCopyUpdates.get(value) ?? value;
  if (Array.isArray(value)) return value.map(replaceCopy);
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, replaceCopy(entry)]));
  }
  return value;
}

export async function saveSiteContent(content: SiteContent): Promise<SiteContent> {
  const database = await getDatabase();
  await database.collection<SiteContentDocument>("site_content").replaceOne(
    { _id: "primary" },
    { ...content, _id: "primary" } as SiteContentDocument,
    { upsert: true }
  );
  return content;
}
