import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { TourCard } from "@/components/site/TourCard";
import { filterToursByListingType, tourListingFilters, type TourListingFilter } from "@/data/tourFilters";
import { getPublicSiteContent } from "@/lib/content.functions";
import heroFort from "@/assets/hero-fort.jpg";

function isTourListingFilter(value: string): value is TourListingFilter {
  return tourListingFilters.some((filter) => filter.value === value);
}

export const Route = createFileRoute("/tours/")({
  loader: () => getPublicSiteContent(),
  validateSearch: (search: Record<string, unknown>) => ({
    type: typeof search.type === "string" && isTourListingFilter(search.type) ? search.type : "all",
  }),
  head: () => ({
    meta: [
      { title: "Heritage Tours — Paranjape Tours" },
      { name: "description", content: "Browse heritage walks, fort tours, temple journeys and curated experiences across Maharashtra." },
      { property: "og:title", content: "Heritage Tours of Maharashtra" },
      { property: "og:description", content: "Walks, forts, temples and cultural journeys curated by storytellers." },
    ],
  }),
  component: ToursList,
});

function ToursList() {
  const { tours } = Route.useLoaderData();
  const { type } = Route.useSearch();
  const list = useMemo(() => filterToursByListingType(tours, type), [tours, type]);
  const activeFilter = tourListingFilters.find((filter) => filter.value === type) ?? tourListingFilters[0];

  return (
    <Layout>
      <PageBanner
        title="Heritage Tours"
        subtitle="Walks, forts, temples and cultural journeys — designed for depth."
        crumbs={[{ label: "Home", to: "/" }, { label: "Tours" }]}
        image={heroFort}
      />
      <section className="container-prose py-14">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tourListingFilters.map((filter) => (
            <Link
              key={filter.value}
              to="/tours"
              search={filter.value === "all" ? {} : { type: filter.value }}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                type === filter.value ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold hover:text-primary"
              }`}
            >
              {filter.label}
            </Link>
          ))}
        </div>
        {list.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {list.map((t, i) => <TourCard key={t.slug} tour={t} index={i} />)}
          </div>
        ) : (
          <div className="site-card rounded-[2rem] border border-border bg-card px-6 py-12 text-center shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">{activeFilter.label}</p>
            <h2 className="mt-3 font-serif text-3xl text-primary">No tours available in this category yet.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We can help you plan a custom trip while we prepare more journeys for this section.
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
}
