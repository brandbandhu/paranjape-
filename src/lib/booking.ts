import type { Tour } from "@/data/tours";

export const tourEnquiryFallbackPath = "/contact";

export function resolveTourBookingHref(tour: Pick<Tour, "bookingUrl">) {
  const bookingUrl = tour.bookingUrl?.trim();
  return bookingUrl || tourEnquiryFallbackPath;
}

export function isExternalLink(href: string) {
  return /^https?:\/\//i.test(href);
}
