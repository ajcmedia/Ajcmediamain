import type { PortfolioProject, PricingPackage, Service } from "@/types/site";

export const navItems = [
  { href: "/#services", label: "Services" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" }
];

export const socials = {
  facebook: "https://www.facebook.com/JayCphotography88",
  instagram: "https://www.instagram.com/ajcmedia.ca/",
  messenger: "https://m.me/JayCphotography88"
};

export const services: Service[] = [
  {
    title: "Wedding Stories",
    description: "Engagements, ceremonies, receptions, portraits, details, and polished highlight galleries.",
    image: "/assets/gallery/wedding-waterfront.png",
    icon: "camera"
  },
  {
    title: "Private Events",
    description: "Birthdays, baby showers, baptisms, anniversaries, and community celebrations with candid energy.",
    image: "/assets/gallery/birthday-candles.png",
    icon: "event"
  },
  {
    title: "Portrait Sessions",
    description: "Personal branding, family, couples, maternity, grad, and creative portrait packages.",
    image: "/assets/gallery/studio-family.png",
    icon: "portrait"
  },
  {
    title: "Content Sets",
    description: "Short-form commercial visuals for social profiles, launch campaigns, and local businesses.",
    image: "/assets/gallery/commercial-cafe.png",
    icon: "content"
  }
];

export const pricingPackages: PricingPackage[] = [
  {
    label: "Portrait Pulse",
    price: "$250",
    description: "Best for personal portraits, couples, grad, or quick brand refreshes.",
    features: ["1 hour session", "25 edited images", "Private online gallery"]
  },
  {
    label: "Event Glow",
    price: "$650",
    description: "Best for birthdays, baby showers, baptisms, and milestone events.",
    features: ["3 hours coverage", "100+ edited images", "48-hour preview set"],
    featured: true
  },
  {
    label: "Wedding Frame",
    price: "$1,850",
    description: "Best for ceremony, portraits, reception, and full gallery delivery.",
    features: ["6 hours coverage", "Engagement add-on", "Edited story gallery"]
  }
];

export const starterProjects: PortfolioProject[] = [
  {
    id: "starter-wedding",
    title: "Waterfront Wedding Glow",
    category: "Wedding",
    image: "/assets/gallery/wedding-waterfront.png",
    description: "A romantic Vancouver waterfront story with city lights, mountain air, and golden-hour portraits."
  },
  {
    id: "starter-birthday",
    title: "Candlelit Birthday Night",
    category: "Event",
    image: "/assets/gallery/birthday-candles.png",
    description: "A warm private celebration captured with candid movement, guest reactions, and ambient venue light."
  },
  {
    id: "starter-family",
    title: "Rain-Kissed Family Session",
    category: "Family",
    image: "/assets/gallery/family-park.png",
    description: "A soft outdoor family portrait set with natural laughter, foliage, and clean lifestyle framing."
  },
  {
    id: "starter-baby",
    title: "Modern Baby Shower",
    category: "Event",
    image: "/assets/gallery/baby-shower.png",
    description: "An intimate shower with floral styling, glowing interiors, and documentary coverage of the room."
  },
  {
    id: "starter-portrait",
    title: "Neon Editorial Portrait",
    category: "Portrait",
    image: "/assets/gallery/neon-portrait.png",
    description: "A high-contrast creative portrait with urban reflections, neon edge light, and cinematic texture."
  },
  {
    id: "starter-engagement",
    title: "Rain Street Engagement",
    category: "Wedding",
    image: "/assets/gallery/rain-engagement.png",
    description: "A rainy evening couples session shaped by reflective streets, umbrellas, and warm city light."
  },
  {
    id: "starter-reception",
    title: "Reception Dance Energy",
    category: "Wedding",
    image: "/assets/gallery/reception-dance.png",
    description: "A high-energy reception scene with motion, music, and color-rich dance floor coverage."
  },
  {
    id: "starter-commercial",
    title: "Local Brand Content",
    category: "Commercial",
    image: "/assets/gallery/commercial-cafe.png",
    description: "A lifestyle content session for a local business, built for social media and campaign refreshes."
  },
  {
    id: "starter-baptism",
    title: "Baptism Family Gathering",
    category: "Event",
    image: "/assets/gallery/baptism-church.png",
    description: "A formal family event captured with soft natural light, reverent details, and candid connection."
  },
  {
    id: "starter-graduation",
    title: "Graduation Day Portraits",
    category: "Portrait",
    image: "/assets/gallery/graduation-family.png",
    description: "A bright graduation session combining family celebration, campus energy, and polished portraits."
  },
  {
    id: "starter-studio-family",
    title: "Studio Family Legacy",
    category: "Family",
    image: "/assets/gallery/studio-family.png",
    description: "A clean multi-generation studio portrait with soft sculpted light and timeless family styling."
  },
  {
    id: "starter-maternity",
    title: "Coastal Maternity Light",
    category: "Family",
    image: "/assets/gallery/coastal-maternity.png",
    description: "A peaceful maternity portrait session with ocean air, sunset rim light, and elegant movement."
  },
  {
    id: "starter-branding",
    title: "Downtown Branding Portrait",
    category: "Commercial",
    image: "/assets/gallery/corporate-branding.png",
    description: "A confident personal-branding portrait made for websites, LinkedIn, and professional campaigns."
  },
  {
    id: "starter-forest",
    title: "Forest Engagement Walk",
    category: "Wedding",
    image: "/assets/gallery/forest-engagement.png",
    description: "A warm couples session on a wooded trail with soft backlight and natural movement."
  },
  {
    id: "starter-details",
    title: "Wedding Detail Flatlay",
    category: "Wedding",
    image: "/assets/gallery/wedding-details.png",
    description: "Macro detail coverage for rings, florals, invitations, and the small pieces that complete the story."
  }
];
