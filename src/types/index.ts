export type Language = 'en' | 'bn';
export type Theme = 'dark' | 'light';

export type NavPage = 'home' | 'services' | 'portfolio' | 'team' | 'pricing' | 'contact';

export interface ServiceItem {
  id: string;
  iconName: string;
  titleKey: string;
  taglineKey: string;
  descriptionKey: string;
  featuresKey: string[];
  technologies: string[];
  deliverablesKey: string[];
  estimatedTimeline: string;
  startingPrice: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'saas' | 'wordpress' | 'web' | 'uiux' | 'ai';
  tagline: { en: string; bn: string };
  description: { en: string; bn: string };
  client: string;
  year: string;
  techStack: string[];
  metrics: { label: { en: string; bn: string }; value: string }[];
  features: { en: string[]; bn: string[] };
  demoUrl?: string;
  gradient: string;
  accentColor: string;
}

export interface Founder {
  id: string;
  name: string;
  avatarUrl?: string;
  role: { en: string; bn: string };
  title: { en: string; bn: string };
  bio: { en: string; bn: string };
  avatarSeed: string;
  facebookUrl: string;
  email: string;
  location: { en: string; bn: string };
  experienceYears: number;
  skills: { name: string; level: number; category: 'frontend' | 'backend' | 'cms' | 'tools' }[];
  highlights: { en: string; bn: string }[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  country: string;
  quote: { en: string; bn: string };
  rating: number;
  projectType: string;
  avatarSeed: string;
}

export interface PricingPlan {
  id: string;
  name: { en: string; bn: string };
  badge?: { en: string; bn: string };
  popular?: boolean;
  priceUSD: number;
  priceBDT: number;
  deliveryTime: { en: string; bn: string };
  idealFor: { en: string; bn: string };
  features: { en: string[]; bn: string[] };
}
