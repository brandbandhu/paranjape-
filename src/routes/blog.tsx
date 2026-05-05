import { createFileRoute } from "@tanstack/react-router";
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

function Blog() {
  return (
    <Layout>
      <PageBanner
        title="Blog"
        subtitle="Notes, essays and memories from our heritage circle."
        crumbs={[{ label: "Home", to: "/" }, { label: "Blog" }]}
        image={heroStory}
      />

      <section className="container-prose py-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((b) => (
          <article key={b.slug} className="group rounded-2xl bg-card border border-border overflow-hidden hover-lift">
            <div className="image-zoom aspect-[4/3]"><img src={b.image} alt={b.title} className="h-full w-full object-cover" loading="lazy" /></div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.25em] text-gold">{b.category} - {b.date}</p>
              <h3 className="mt-2 font-serif text-xl text-primary leading-snug">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.excerpt}</p>
              <span className="mt-3 inline-flex items-center text-sm text-primary group-hover:gap-2 gap-1 transition-all">Read More <ArrowRight size={14} /></span>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
