import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { TourCard } from "@/components/site/TourCard";
import { tours } from "@/data/tours";
import heroFort from "@/assets/hero-fort.jpg";

export const Route = createFileRoute("/tours/")({
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

const filters = ["All", "Heritage Walk", "Fort Tour", "Temple & Architecture", "Ancient Caves Tour"];

function ToursList() {
  const [active, setActive] = useState("All");
  const list = useMemo(() => active === "All" ? tours : tours.filter((t) => t.category === active), [active]);

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
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active === f ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-gold hover:text-primary"
              }`}>{f}</button>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>
    </Layout>
  );
}
