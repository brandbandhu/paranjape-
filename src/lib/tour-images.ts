import heroTemple from "@/assets/hero-temple.jpg";
import type { ManagedTour } from "@/lib/content.types";
import { buildTourShareImagePath, toAbsoluteSiteUrl } from "@/lib/site-url";

export function isDataImageUrl(value: string) {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value.trim());
}

export function getTourDisplayImage(tour: Pick<ManagedTour, "image">) {
  const image = tour.image.trim();
  return image || heroTemple;
}

export function getTourShareImageUrl(tour: Pick<ManagedTour, "slug" | "image">) {
  const image = tour.image.trim();

  if (isDataImageUrl(image)) {
    return toAbsoluteSiteUrl(buildTourShareImagePath(tour.slug));
  }

  return toAbsoluteSiteUrl(image || heroTemple);
}
