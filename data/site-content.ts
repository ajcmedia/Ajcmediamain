import type { SiteContent } from "@/types/site";

const categories = [
  { id: "category-wedding", label: "Wedding" },
  { id: "category-event", label: "Event" },
  { id: "category-portrait", label: "Portrait" },
  { id: "category-family", label: "Family" },
  { id: "category-commercial", label: "Commercial" }
];

export const defaultSiteContent: SiteContent = {
  version: 1,
  updatedAt: "2026-07-17T00:00:00.000Z",
  hero: {
    backgroundImage: "/assets/gallery/hero-lens.png",
    showcaseFrames: [
      { id: "hero-showcase-1", image: "/assets/gallery/reception-dance.png", alt: "Wedding reception photography sample" },
      { id: "hero-showcase-2", image: "/assets/gallery/wedding-waterfront.png", alt: "Waterfront wedding photography sample" },
      { id: "hero-showcase-3", image: "/assets/gallery/family-park.png", alt: "Family photography sample" },
      { id: "hero-showcase-4", image: "/assets/gallery/corporate-branding.png", alt: "Brand portrait photography sample" }
    ],
    thumbnailFrames: [
      { id: "hero-thumbnail-1", image: "/assets/gallery/baby-shower.png", alt: "Baby shower photography sample" },
      { id: "hero-thumbnail-2", image: "/assets/gallery/neon-portrait.png", alt: "Creative portrait photography sample" },
      { id: "hero-thumbnail-3", image: "/assets/gallery/graduation-family.png", alt: "Graduation photography sample" },
      { id: "hero-thumbnail-4", image: "/assets/gallery/forest-engagement.png", alt: "Engagement photography sample" }
    ]
  },
  about: {
    portraitImage: "/assets/brand/jayson-photo.jpg",
    portraitAlt: "Jayson of AJC Media"
  },
  experience: {
    eyebrow: "Experience Reel",
    title: "Feel the day before you book it.",
    description: "A four-scene cut from quiet detail to final delivery. Scroll at your own pace; every beat has room to land.",
    scenes: [
      { id: "experience-1", label: "Scene 01", title: "The anticipation", copy: "Soft details, quiet nerves, and the first frames that set the emotional tone.", image: "/assets/gallery/wedding-details.png" },
      { id: "experience-2", label: "Scene 02", title: "The moment opens", copy: "Movement, reactions, and the real atmosphere of the day captured without feeling staged.", image: "/assets/gallery/wedding-waterfront.png" },
      { id: "experience-3", label: "Scene 03", title: "The room comes alive", copy: "Color, music, candlelight, family energy, and the images that make the night feel vivid again.", image: "/assets/gallery/reception-dance.png" },
      { id: "experience-4", label: "Scene 04", title: "The final gallery", copy: "A polished story delivered as a complete visual memory, from raw light to finished emotion.", image: "/assets/gallery/rain-engagement.png" }
    ]
  },
  portals: {
    eyebrow: "Gallery Portals",
    title: "Choose a story. Step through the frame.",
    description: "Each portal opens the same gallery from a different emotional doorway—celebration, connection, or character.",
    items: [
      { id: "portal-wedding", categoryId: "category-wedding", title: "Wedding", label: "Vows, dance floors, details", image: "/assets/gallery/wedding-waterfront.png", color: "cyan" },
      { id: "portal-event", categoryId: "category-event", title: "Events", label: "Birthdays, baptisms, showers", image: "/assets/gallery/birthday-candles.png", color: "gold" },
      { id: "portal-portrait", categoryId: "category-portrait", title: "Portraits", label: "Families, grads, branding", image: "/assets/gallery/neon-portrait.png", color: "rose" }
    ]
  },
  services: {
    items: [
      { id: "service-weddings", title: "Wedding Stories", description: "Engagements, ceremonies, receptions, portraits, details, and polished highlight galleries.", image: "/assets/gallery/wedding-waterfront.png", icon: "camera" },
      { id: "service-events", title: "Private Events", description: "Birthdays, baby showers, baptisms, anniversaries, and community celebrations with candid energy.", image: "/assets/gallery/birthday-candles.png", icon: "event" },
      { id: "service-portraits", title: "Portrait Sessions", description: "Personal branding, family, couples, maternity, grad, and creative portrait packages.", image: "/assets/gallery/studio-family.png", icon: "portrait" },
      { id: "service-content", title: "Content Sets", description: "Short-form commercial visuals for social profiles, launch campaigns, and local businesses.", image: "/assets/gallery/commercial-cafe.png", icon: "content" }
    ]
  },
  featuredStory: {
    eyebrow: "Featured Story / Interactive cut",
    title: "One wedding day, told like a cinematic magazine spread.",
    description: "Choose a frame—or tap the main image to move forward—and watch the editorial spread recompose around that moment.",
    frames: [
      { id: "story-1", chapter: "Chapter 01 / Details", eyebrow: "The quiet setup", title: "Details before the aisle.", copy: "Rings, florals, fabric, and the small decisions that establish the visual language of the day.", image: "/assets/gallery/wedding-details.png" },
      { id: "story-2", chapter: "Chapter 02 / Portraits", eyebrow: "A sense of place", title: "Portraits with room to breathe.", copy: "A waterfront pause that keeps the couple, the light, and the city connected in one complete frame.", image: "/assets/gallery/wedding-waterfront.png" },
      { id: "story-3", chapter: "Chapter 03 / Reception", eyebrow: "The room ignites", title: "Energy after the vows.", copy: "Fast movement, changing light, and real reactions captured without losing the atmosphere of the room.", image: "/assets/gallery/reception-dance.png" },
      { id: "story-4", chapter: "Chapter 04 / In between", eyebrow: "A quiet exhale", title: "The frames between the big ones.", copy: "Unscripted movement and soft pauses give the final gallery its pacing, honesty, and emotional texture.", image: "/assets/gallery/forest-engagement.png" }
    ]
  },
  beforeAfter: {
    image: "/assets/gallery/rain-engagement.png"
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple starting points for a sales-ready conversation.",
    description: "These starting packages make it easy to choose a direction, then refine coverage based on the event, location, and final deliverables.",
    packages: [
      { id: "pricing-portrait", label: "Portrait Pulse", price: "$250", description: "Best for personal portraits, couples, grad, or quick brand refreshes.", features: ["1 hour session", "25 edited images", "Private online gallery"], featured: false },
      { id: "pricing-event", label: "Event Glow", price: "$650", description: "Best for birthdays, baby showers, baptisms, and milestone events.", features: ["3 hours coverage", "100+ edited images", "48-hour preview set"], featured: true },
      { id: "pricing-wedding", label: "Wedding Frame", price: "$1,850", description: "Best for ceremony, portraits, reception, and full gallery delivery.", features: ["6 hours coverage", "Engagement add-on", "Edited story gallery"], featured: false }
    ]
  },
  editorial: {
    eyebrow: "Editorial Wall",
    title: "An illuminated archive of real moments.",
    description: "A curated photo wall gives visitors the feeling of stepping inside a private exhibit before they open the full gallery.",
    frames: [
      { id: "editorial-1", title: "Reception Dance Energy", image: "/assets/gallery/reception-dance.png" },
      { id: "editorial-2", title: "Waterfront Wedding Glow", image: "/assets/gallery/wedding-waterfront.png" },
      { id: "editorial-3", title: "Studio Family Legacy", image: "/assets/gallery/studio-family.png" },
      { id: "editorial-4", title: "Graduation Day Portraits", image: "/assets/gallery/graduation-family.png" },
      { id: "editorial-5", title: "Rain Street Engagement", image: "/assets/gallery/rain-engagement.png" },
      { id: "editorial-6", title: "Local Brand Content", image: "/assets/gallery/commercial-cafe.png" },
      { id: "editorial-7", title: "Baptism Family Gathering", image: "/assets/gallery/baptism-church.png" },
      { id: "editorial-8", title: "Wedding Detail Flatlay", image: "/assets/gallery/wedding-details.png" }
    ]
  },
  gallery: {
    eyebrow: "Gallery",
    title: "Featured projects with a click-to-view lightbox.",
    description: "The photographer can add more projects from the admin page. The future backend can hydrate this same component from an API or CMS.",
    categories,
    projects: [
      { id: "starter-wedding", title: "Waterfront Wedding Glow", categoryId: "category-wedding", image: "/assets/gallery/wedding-waterfront.png", description: "A romantic Vancouver waterfront story with city lights, mountain air, and golden-hour portraits.", visible: true },
      { id: "starter-birthday", title: "Candlelit Birthday Night", categoryId: "category-event", image: "/assets/gallery/birthday-candles.png", description: "A warm private celebration captured with candid movement, guest reactions, and ambient venue light.", visible: true },
      { id: "starter-family", title: "Rain-Kissed Family Session", categoryId: "category-family", image: "/assets/gallery/family-park.png", description: "A soft outdoor family portrait set with natural laughter, foliage, and clean lifestyle framing.", visible: true },
      { id: "starter-baby", title: "Modern Baby Shower", categoryId: "category-event", image: "/assets/gallery/baby-shower.png", description: "An intimate shower with floral styling, glowing interiors, and documentary coverage of the room.", visible: true },
      { id: "starter-portrait", title: "Neon Editorial Portrait", categoryId: "category-portrait", image: "/assets/gallery/neon-portrait.png", description: "A high-contrast creative portrait with urban reflections, neon edge light, and cinematic texture.", visible: true },
      { id: "starter-engagement", title: "Rain Street Engagement", categoryId: "category-wedding", image: "/assets/gallery/rain-engagement.png", description: "A rainy evening couples session shaped by reflective streets, umbrellas, and warm city light.", visible: true },
      { id: "starter-reception", title: "Reception Dance Energy", categoryId: "category-wedding", image: "/assets/gallery/reception-dance.png", description: "A high-energy reception scene with motion, music, and color-rich dance floor coverage.", visible: true },
      { id: "starter-commercial", title: "Local Brand Content", categoryId: "category-commercial", image: "/assets/gallery/commercial-cafe.png", description: "A lifestyle content session for a local business, built for social media and campaign refreshes.", visible: true },
      { id: "starter-baptism", title: "Baptism Family Gathering", categoryId: "category-event", image: "/assets/gallery/baptism-church.png", description: "A formal family event captured with soft natural light, reverent details, and candid connection.", visible: true },
      { id: "starter-graduation", title: "Graduation Day Portraits", categoryId: "category-portrait", image: "/assets/gallery/graduation-family.png", description: "A bright graduation session combining family celebration, campus energy, and polished portraits.", visible: true },
      { id: "starter-studio-family", title: "Studio Family Legacy", categoryId: "category-family", image: "/assets/gallery/studio-family.png", description: "A clean multi-generation studio portrait with soft sculpted light and timeless family styling.", visible: true },
      { id: "starter-maternity", title: "Coastal Maternity Light", categoryId: "category-family", image: "/assets/gallery/coastal-maternity.png", description: "A peaceful maternity portrait session with ocean air, sunset rim light, and elegant movement.", visible: true },
      { id: "starter-branding", title: "Downtown Branding Portrait", categoryId: "category-commercial", image: "/assets/gallery/corporate-branding.png", description: "A confident personal-branding portrait made for websites, LinkedIn, and professional campaigns.", visible: true },
      { id: "starter-forest", title: "Forest Engagement Walk", categoryId: "category-wedding", image: "/assets/gallery/forest-engagement.png", description: "A warm couples session on a wooded trail with soft backlight and natural movement.", visible: true },
      { id: "starter-details", title: "Wedding Detail Flatlay", categoryId: "category-wedding", image: "/assets/gallery/wedding-details.png", description: "Macro detail coverage for rings, florals, invitations, and the small pieces that complete the story.", visible: true }
    ]
  }
};

export function cloneDefaultSiteContent(): SiteContent {
  return structuredClone(defaultSiteContent);
}
