import type { Tour } from "@/data/tours";

export type ManagedTour = Tour & {
  id?: number;
  categoryId?: number;
  source?: "database" | "static";
};

export type ContentCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  source?: "database" | "static";
};

export type BlogPost = {
  id?: number;
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  content?: string;
  image: string;
  sourceName?: string;
  sourceUrl?: string;
  source?: "database" | "static";
};

export type Testimonial = {
  id?: number;
  name: string;
  role: string;
  text: string;
  source?: "database" | "static";
};

export type ShopItem = {
  id?: number;
  slug: string;
  image: string;
  badge: string;
  category: string;
  title: string;
  price: string;
  description: string;
  source?: "database" | "static";
};

export type AdminUser = {
  id: number;
  username: string;
  displayName: string;
};

export type PublicSiteContent = {
  tours: ManagedTour[];
  blogPosts: BlogPost[];
  testimonials: Testimonial[];
  shopItems: ShopItem[];
  categories: ContentCategory[];
  databaseAvailable: boolean;
};

export type AdminDashboardData = PublicSiteContent & {
  admin: AdminUser;
};
