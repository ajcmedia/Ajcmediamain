export type PortalTone = "cyan" | "gold" | "rose";

export type GalleryCategory = {
  id: string;
  label: string;
};

export type ImagePosition = {
  x: number;
  y: number;
  zoom?: number;
};

export type GalleryCropAspect = "original" | "landscape" | "square" | "portrait";

export type PortfolioProject = {
  id: string;
  title: string;
  categoryId: string;
  image: string;
  description: string;
  visible: boolean;
  position?: ImagePosition;
  cropAspect?: GalleryCropAspect;
};

export type GalleryPortal = {
  id: string;
  categoryId: string;
  title: string;
  label: string;
  image: string;
  color: PortalTone;
  position?: ImagePosition;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: "camera" | "event" | "portrait" | "content";
  position?: ImagePosition;
};

export type PricingPackage = {
  id: string;
  label: string;
  price: string;
  description: string;
  features: string[];
  featured: boolean;
};

export type ImageSlot = {
  id: string;
  image: string;
  alt: string;
  position?: ImagePosition;
};

export type ExperienceScene = {
  id: string;
  label: string;
  title: string;
  copy: string;
  image: string;
  position?: ImagePosition;
};

export type StoryFrame = {
  id: string;
  chapter: string;
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  position?: ImagePosition;
};

export type EditorialFrame = {
  id: string;
  title: string;
  image: string;
  position?: ImagePosition;
};

export type SiteContent = {
  version: 1;
  updatedAt: string;
  hero: {
    backgroundImage: string;
    backgroundPosition?: ImagePosition;
    showcaseFrames: ImageSlot[];
    thumbnailFrames: ImageSlot[];
  };
  about: {
    portraitImage: string;
    portraitAlt: string;
    portraitPosition?: ImagePosition;
  };
  experience: {
    eyebrow: string;
    title: string;
    description: string;
    scenes: ExperienceScene[];
  };
  portals: {
    eyebrow: string;
    title: string;
    description: string;
    items: GalleryPortal[];
  };
  services: {
    items: Service[];
  };
  featuredStory: {
    eyebrow: string;
    title: string;
    description: string;
    frames: StoryFrame[];
  };
  beforeAfter: {
    image: string;
    position?: ImagePosition;
  };
  pricing: {
    eyebrow: string;
    title: string;
    description: string;
    packages: PricingPackage[];
  };
  editorial: {
    eyebrow: string;
    title: string;
    description: string;
    frames: EditorialFrame[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    description: string;
    categories: GalleryCategory[];
    projects: PortfolioProject[];
  };
};

export type BookingStatus = "new" | "in-progress" | "completed" | "archived";

export type BookingRequest = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  date: string;
  budget: string;
  message: string;
  status: BookingStatus;
  internalNotes: string;
  emailSent: boolean;
};
