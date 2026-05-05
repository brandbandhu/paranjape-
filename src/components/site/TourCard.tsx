import { Link } from "@tanstack/react-router";
import { Clock, MapPin, TrendingUp } from "lucide-react";
import type { Tour } from "@/data/tours";

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <article className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift shadow-[var(--shadow-soft)]">
      <div className="image-zoom relative aspect-[4/3]">
        <img src={tour.image} alt={tour.title} className="h-full w-full object-cover" loading="lazy" />
        <span className="absolute top-3 left-3 section-eyebrow">{tour.category}</span>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-xl text-primary leading-snug">{tour.title}</h3>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{tour.short}</p>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-foreground/70">
          <span className="inline-flex items-center gap-1"><MapPin size={12} className="text-gold"/>{tour.location}</span>
          <span className="inline-flex items-center gap-1"><Clock size={12} className="text-gold"/>{tour.duration}</span>
          <span className="inline-flex items-center gap-1"><TrendingUp size={12} className="text-gold"/>{tour.difficulty}</span>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <span className="font-serif text-lg text-primary">{tour.price}</span>
          <Link
            to="/tours/$slug"
            params={{ slug: tour.slug }}
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-4 py-2 text-xs font-medium hover:bg-[color-mix(in_oklab,var(--primary)_85%,black)] transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}
