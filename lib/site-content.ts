import "server-only";

import { cloneDefaultSiteContent } from "@/data/site-content";
import { getDatabase, hasMongoConfiguration } from "@/lib/mongodb";
import type { SiteContent } from "@/types/site";

type SiteContentDocument = SiteContent & { _id: "primary" };

export async function getSiteContent(): Promise<SiteContent> {
  if (!hasMongoConfiguration()) {
    return cloneDefaultSiteContent();
  }

  try {
    const database = await getDatabase();
    const document = await database.collection<SiteContentDocument>("site_content").findOne({ _id: "primary" });
    if (!document) {
      const content = cloneDefaultSiteContent();
      await database.collection<SiteContentDocument>("site_content").insertOne({ ...content, _id: "primary" } as SiteContentDocument);
      return content;
    }

    const { _id: _ignored, ...content } = document;
    return content;
  } catch (error) {
    console.error("Could not load CMS content; serving the built-in content.", error);
    return cloneDefaultSiteContent();
  }
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
