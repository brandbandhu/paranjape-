import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { getPublicSiteContent } from "@/lib/content.functions";
import heroStory from "@/assets/hero-story.jpg";

export const Route = createFileRoute("/gallery")({
  loader: () => getPublicSiteContent(),
  head: () => ({
    meta: [
      { title: "Gallery - Paranjape Tours" },
      {
        name: "description",
        content: "Glimpses from our heritage journeys across forts, temples, walks and sacred landscapes.",
      },
      { property: "og:title", content: "Paranjape Tours Gallery" },
      {
        property: "og:description",
        content: "Explore visual highlights from our curated heritage tours and storytelling walks.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { galleryItems } = Route.useLoaderData();

  return (
    <Layout>
      <PageBanner
        title="Gallery"
        subtitle="Moments from forts, temples, old cities, and living heritage trails."
        crumbs={[{ label: "Home", to: "/" }, { label: "Gallery" }]}
        image={heroStory}
      />

      <section className="container-prose py-16">
        {galleryItems.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card px-6 py-12 text-center shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.22em] text-gold">Gallery</p>
            <h2 className="mt-3 font-serif text-3xl text-primary">Photos coming soon.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We are curating new visual stories from our upcoming journeys.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {galleryItems.map((item) => (
              <article
                key={item.slug}
                className="site-card group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
              >
                <div className="site-card-media image-zoom aspect-[4/3] overflow-hidden">
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="site-card-content p-5">
                  <h3 className="font-serif text-xl text-primary">{item.title}</h3>
                  {item.description.trim() ? (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
