import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { blogPosts } from "@/data/tours";
import heroStory from "@/assets/hero-story.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog - Paranjape Tours Journal" },
      { name: "description", content: "Long-form notes on Maharashtra's forts, temples, lanes and the people who keep them alive." },
      { property: "og:title", content: "Paranjape Tours Blog" },
      { property: "og:description", content: "Heritage essays and travel notes." },
    ],
  }),
  component: Blog,
});

const cardDelayStyle = (index: number): CSSProperties => ({
  "--card-delay": `${index * 90}ms`,
}) as CSSProperties;

function Blog() {
  return (
    <Layout>
      <PageBanner
        title="Blog"
        subtitle="Notes, essays and memories from our heritage circle."
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        image={heroStory}
      />

      <section className="container-prose site-card-grid py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((b, index) => (
          <article
            key={b.slug}
            className="heritage-tile group h-full"
            style={cardDelayStyle(index)}
          >
            <div className="heritage-tile-media">
              <img src={b.image} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
              <span className="heritage-tile-ribbon">{b.date}</span>
              <span className="heritage-tile-fab" aria-hidden="true">
                <ArrowRight size={18} />
              </span>
            </div>
            <div className="heritage-tile-body">
              <p className="heritage-tile-kicker">{b.category}</p>
              <h3 className="mt-3 font-serif text-[1.65rem] leading-[1.08] text-primary">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.excerpt}</p>
              <div className="heritage-tile-footer mt-6">
                <span className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Paranjape Journal</span>
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                  Read More
                  <ArrowRight className="heritage-tile-linkicon" size={14} />
                </span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
