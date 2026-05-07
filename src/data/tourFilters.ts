import type { Tour } from "@/data/tours";

export const tourListingFilters = [
  { value: "all", label: "All Tours" },
  { value: "one-day-tour", label: "One Day Tour" },
  { value: "heritage-walk", label: "Heritage Walk" },
  { value: "multiple-day-tour", label: "Multiple Day Tour" },
] as const;

export type TourListingFilter = (typeof tourListingFilters)[number]["value"];

export function getTourListingType(tour: Tour): Exclude<TourListingFilter, "all"> {
  if (tour.category === "Heritage Walk") return "heritage-walk";
  if (tour.category === "Multiple Day Tour") return "multiple-day-tour";

  const duration = tour.duration.toLowerCase();
  const isMultipleDay =
    /\b\d+\s*days?\b/.test(duration) ||
    duration.includes("multiple day") ||
    duration.includes("multi day");

  return isMultipleDay ? "multiple-day-tour" : "one-day-tour";
}

export function filterToursByListingType(list: Tour[], filter: TourListingFilter) {
  if (filter === "all") return list;
  return list.filter((tour) => getTourListingType(tour) === filter);
}
