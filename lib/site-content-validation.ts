import type { SiteContent } from "@/types/site";

const MAX_CONTENT_BYTES = 2_000_000;

export function validateSiteContent(input: unknown): { content?: SiteContent; errors: string[] } {
  const errors: string[] = [];

  if (!isRecord(input)) {
    return { errors: ["Site content must be an object."] };
  }

  if (JSON.stringify(input).length > MAX_CONTENT_BYTES) {
    return { errors: ["Site content is too large. Upload images instead of pasting image data."] };
  }

  const content = input as SiteContent;
  const requiredSections = ["hero", "about", "experience", "portals", "services", "featuredStory", "beforeAfter", "pricing", "editorial", "gallery"] as const;
  requiredSections.forEach((section) => {
    if (!isRecord(content[section])) {
      errors.push(`Missing ${section} content.`);
    }
  });

  if (errors.length) {
    return { errors };
  }

  if (!Array.isArray(content.hero.showcaseFrames) || content.hero.showcaseFrames.length !== 4) {
    errors.push("The hero must contain exactly four showcase images.");
  }
  if (!Array.isArray(content.hero.thumbnailFrames) || content.hero.thumbnailFrames.length !== 4) {
    errors.push("The hero must contain exactly four thumbnail images.");
  }
  if (!Array.isArray(content.portals.items) || content.portals.items.length !== 3) {
    errors.push("Exactly three Gallery Portals must be published.");
  }
  if (!Array.isArray(content.gallery.categories) || !content.gallery.categories.length) {
    errors.push("At least one Gallery category is required.");
  }
  if (!Array.isArray(content.gallery.projects)) {
    errors.push("Gallery projects must be a list.");
  }
  if (!Array.isArray(content.experience.scenes) || !content.experience.scenes.length) {
    errors.push("At least one experience scene is required.");
  }
  if (!Array.isArray(content.services.items) || !content.services.items.length) {
    errors.push("At least one service is required.");
  }
  if (!Array.isArray(content.featuredStory.frames) || !content.featuredStory.frames.length) {
    errors.push("At least one Featured Story frame is required.");
  }
  if (!Array.isArray(content.pricing.packages) || !content.pricing.packages.length) {
    errors.push("At least one pricing package is required.");
  }
  if (!Array.isArray(content.editorial.frames) || !content.editorial.frames.length) {
    errors.push("At least one Editorial Wall frame is required.");
  }

  if (errors.length) {
    return { errors };
  }

  const itemLists: Array<{ label: string; items: unknown[] }> = [
    { label: "hero showcase frame", items: content.hero.showcaseFrames },
    { label: "hero thumbnail", items: content.hero.thumbnailFrames },
    { label: "experience scene", items: content.experience.scenes },
    { label: "Gallery Portal", items: content.portals.items },
    { label: "service", items: content.services.items },
    { label: "Featured Story frame", items: content.featuredStory.frames },
    { label: "pricing package", items: content.pricing.packages },
    { label: "Editorial Wall frame", items: content.editorial.frames },
    { label: "Gallery category", items: content.gallery.categories },
    { label: "Gallery project", items: content.gallery.projects }
  ];
  itemLists.forEach(({ label, items }) => {
    items.forEach((item, index) => {
      if (!isRecord(item)) errors.push(`${label} ${index + 1} is invalid.`);
    });
  });
  if (errors.length) {
    return { errors };
  }

  const requiredText: Array<[string, unknown]> = [
    ["About image description", content.about.portraitAlt],
    ["Experience eyebrow", content.experience.eyebrow],
    ["Experience title", content.experience.title],
    ["Experience introduction", content.experience.description],
    ["Gallery Portals eyebrow", content.portals.eyebrow],
    ["Gallery Portals title", content.portals.title],
    ["Gallery Portals introduction", content.portals.description],
    ["Featured Story eyebrow", content.featuredStory.eyebrow],
    ["Featured Story title", content.featuredStory.title],
    ["Featured Story introduction", content.featuredStory.description],
    ["Pricing eyebrow", content.pricing.eyebrow],
    ["Pricing title", content.pricing.title],
    ["Pricing introduction", content.pricing.description],
    ["Editorial Wall eyebrow", content.editorial.eyebrow],
    ["Editorial Wall title", content.editorial.title],
    ["Editorial Wall introduction", content.editorial.description],
    ["Gallery eyebrow", content.gallery.eyebrow],
    ["Gallery title", content.gallery.title],
    ["Gallery introduction", content.gallery.description]
  ];
  requiredText.forEach(([label, value]) => {
    if (!isNonEmptyString(value)) errors.push(`${label} cannot be empty.`);
  });

  content.hero.showcaseFrames.forEach((item, index) => {
    if (!isNonEmptyString(item.id) || !isNonEmptyString(item.alt)) errors.push(`Hero showcase frame ${index + 1} needs an ID and image description.`);
  });
  content.hero.thumbnailFrames.forEach((item, index) => {
    if (!isNonEmptyString(item.id) || !isNonEmptyString(item.alt)) errors.push(`Hero thumbnail ${index + 1} needs an ID and image description.`);
  });
  content.experience.scenes.forEach((item, index) => {
    if (![item.id, item.label, item.title, item.copy].every(isNonEmptyString)) errors.push(`Experience scene ${index + 1} has an empty required field.`);
  });
  content.portals.items.forEach((item, index) => {
    if (![item.id, item.categoryId, item.title, item.label].every(isNonEmptyString)) errors.push(`Gallery Portal ${index + 1} has an empty required field.`);
    if (!["cyan", "gold", "rose"].includes(item.color)) errors.push(`Gallery Portal ${index + 1} has an invalid accent color.`);
  });
  content.services.items.forEach((item, index) => {
    if (![item.id, item.title, item.description].every(isNonEmptyString)) errors.push(`Service ${index + 1} has an empty required field.`);
  });
  content.featuredStory.frames.forEach((item, index) => {
    if (![item.id, item.chapter, item.eyebrow, item.title, item.copy].every(isNonEmptyString)) errors.push(`Featured Story frame ${index + 1} has an empty required field.`);
  });
  content.pricing.packages.forEach((item, index) => {
    if (![item.id, item.label, item.price, item.description].every(isNonEmptyString) || !item.features.length || item.features.some((feature) => !isNonEmptyString(feature))) errors.push(`Pricing package ${index + 1} has an empty required field.`);
  });
  content.editorial.frames.forEach((item, index) => {
    if (![item.id, item.title].every(isNonEmptyString)) errors.push(`Editorial Wall frame ${index + 1} has an empty required field.`);
  });
  content.gallery.projects.forEach((item, index) => {
    if (![item.id, item.title, item.categoryId, item.description].every(isNonEmptyString)) errors.push(`Gallery project ${index + 1} has an empty required field.`);
  });

  const categoryIds = new Set<string>();
  content.gallery.categories.forEach((category, index) => {
    if (!isNonEmptyString(category.id) || !isNonEmptyString(category.label)) {
      errors.push(`Gallery category ${index + 1} needs an ID and label.`);
    }
    if (categoryIds.has(category.id)) {
      errors.push(`Gallery category ID ${category.id} is duplicated.`);
    }
    categoryIds.add(category.id);
  });

  const portalCategoryIds = new Set<string>();
  content.portals.items.forEach((portal, index) => {
    if (!categoryIds.has(portal.categoryId)) {
      errors.push(`Portal ${index + 1} is not connected to a valid Gallery category.`);
    }
    if (portalCategoryIds.has(portal.categoryId)) {
      errors.push("Each Gallery Portal must connect to a different category.");
    }
    portalCategoryIds.add(portal.categoryId);
  });

  content.gallery.projects.forEach((project, index) => {
    if (!categoryIds.has(project.categoryId)) {
      errors.push(`Gallery item ${index + 1} is assigned to a missing category.`);
    }
  });

  const imageReferences = [
    content.hero.backgroundImage,
    content.about.portraitImage,
    content.beforeAfter.image,
    ...content.hero.showcaseFrames.map((item) => item.image),
    ...content.hero.thumbnailFrames.map((item) => item.image),
    ...content.experience.scenes.map((item) => item.image),
    ...content.portals.items.map((item) => item.image),
    ...content.services.items.map((item) => item.image),
    ...content.featuredStory.frames.map((item) => item.image),
    ...content.editorial.frames.map((item) => item.image),
    ...content.gallery.projects.map((item) => item.image)
  ];
  if (imageReferences.some((image) => !isImageReference(image))) {
    errors.push("Every image must be an uploaded image path.");
  }

  if (errors.length) {
    return { errors };
  }

  const normalized = structuredClone(content);
  normalized.version = 1;
  normalized.updatedAt = new Date().toISOString();
  return { content: normalized, errors: [] };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && Boolean(value.trim());
}

function isImageReference(value: unknown): value is string {
  return typeof value === "string" && value.length <= 2_048 && /^\/(?!\/)/.test(value);
}
