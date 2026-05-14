import heroTemple from "@/assets/hero-temple.jpg";
import heroStory from "@/assets/hero-story.jpg";
import heroWalk from "@/assets/hero-walk.jpg";
import shaniwar from "@/assets/tour-shaniwar.jpg";
import sinhagad from "@/assets/tour-sinhagad.jpg";
import shivneri from "@/assets/tour-shivneri.jpg";
import { defaultTeamMembers } from "@/data/teamMembers";
import type { ShopItem, TeamMember, Testimonial } from "@/lib/content.types";

export const staticTestimonials: Testimonial[] = [
  {
    name: "Anita Joshi",
    role: "Family traveller",
    text: "The Shaniwar Wada walk made history come alive for our kids. We didn't want it to end.",
    source: "static",
  },
  {
    name: "Rahul Deshmukh",
    role: "School teacher",
    text: "I've taken three batches of students with Paranjape Tours. The storytelling is exceptional.",
    source: "static",
  },
  {
    name: "Meera Kulkarni",
    role: "History enthusiast",
    text: "Sinhagad with their guide felt less like a trek and more like a Maratha epic unfolding.",
    source: "static",
  },
  {
    name: "Aniket Patil",
    role: "Corporate group lead",
    text: "Smooth, soulful and genuinely premium. Our team still talks about it.",
    source: "static",
  },
];

export const staticTeamMembers: TeamMember[] = defaultTeamMembers.map((member) => ({
  ...member,
  source: "static",
}));

export const staticShopItems: ShopItem[] = [
  {
    slug: "pune-heritage-walk-companion",
    image: heroWalk,
    badge: "Bestseller",
    category: "Booklet",
    title: "Pune Heritage Walk Companion",
    price: "Rs. 299",
    description: "A compact storytelling guide to old Pune landmarks, wadas and cultural clues.",
    source: "static",
  },
  {
    slug: "shivneri-explorer-kit",
    image: shivneri,
    badge: "New",
    category: "Study Kit",
    title: "Shivneri Explorer Kit",
    price: "Rs. 649",
    description: "Timeline cards, a site map and activity sheets for students visiting Shivneri.",
    source: "static",
  },
  {
    slug: "temple-detail-postcard-pack",
    image: heroTemple,
    badge: "Gift Pick",
    category: "Print Set",
    title: "Temple Detail Postcard Pack",
    price: "Rs. 399",
    description: "A set of textured art postcards inspired by stone carvings and temple motifs.",
    source: "static",
  },
  {
    slug: "shaniwar-wada-keepsake-box",
    image: shaniwar,
    badge: "Group Order",
    category: "Souvenir",
    title: "Shaniwar Wada Keepsake Box",
    price: "Rs. 899",
    description: "A premium gift box for school groups, cultural events and corporate outings.",
    source: "static",
  },
  {
    slug: "sahyadri-fort-trails-map",
    image: sinhagad,
    badge: "Traveller Favorite",
    category: "Map",
    title: "Sahyadri Fort Trails Map",
    price: "Rs. 349",
    description: "A folded reference map for iconic fort circuits with quick history notes.",
    source: "static",
  },
  {
    slug: "curated-heritage-gift-hamper",
    image: heroStory,
    badge: "Custom",
    category: "Bulk Gifting",
    title: "Curated Heritage Gift Hamper",
    price: "From Rs. 1,499",
    description: "Made-to-order hampers for institutions, family celebrations and hosted groups.",
    source: "static",
  },
];
