export type ProjectCategory = "Wedding" | "Event" | "Portrait" | "Family" | "Commercial";

export type PortfolioProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  image: string;
  description: string;
};

export type Service = {
  title: string;
  description: string;
  image: string;
  icon: "camera" | "event" | "portrait" | "content";
};

export type PricingPackage = {
  label: string;
  price: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export type BookingRequest = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  date: string;
  budget: string;
  message: string;
};
