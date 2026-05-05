import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { Award, Compass, Heart, Sparkles, UserRound, Users } from "lucide-react";
import heroStory from "@/assets/hero-story.jpg";
import heroTemple from "@/assets/hero-temple.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Paranjape Tours" },
      { name: "description", content: "A heritage storytelling travel brand designing meaningful Maharashtra journeys." },
      { property: "og:title", content: "About Paranjape Tours" },
      { property: "og:description", content: "Our story, mission and tour philosophy." },
    ],
  }),
  component: About,
});

const stats = [
  { v: "4000+", l: "Happy Travellers" },
  { v: "100+", l: "Heritage Locations" },
  { v: "300+", l: "Number Of Tours" },
  { v: "4.5", l: "Experience Rating" },
];

const guides = [
  { name: "Atul P." },
  { name: "Snehal K." },
  { name: "Rohan M." },
  { name: "Priya D." },
];

function About() {
  return (
    <Layout>
      <PageBanner
        title="About Paranjape Tours"
        subtitle="A heritage storytelling travel experience brand."
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
        image={heroStory}
      />

      <section className="container-prose py-20 grid gap-12 md:grid-cols-2 md:items-stretch">
        <div className="image-zoom h-full overflow-hidden shadow-[var(--shadow-elegant)]">
          <img src={heroTemple} alt="" className="h-full min-h-full w-full object-cover" loading="lazy" />
        </div>
        <div>
          <span className="section-eyebrow">Our Story</span>
          <h2 className="mt-3 font-serif text-4xl text-primary">Born from a love for Maharashtra's living history.</h2>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Paranjape Tours was started by a small group of historians, walkers and storytellers who believed Maharashtra's heritage deserved more than a checklist. Every fort, temple and lane carries a story - and we wanted those stories to be told slowly, accurately and with heart.
          </p>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Today, we run small-group heritage walks, fort trails, temple architecture studies and curated educational tours for families, students and seekers from across India.
          </p>
        </div>
      </section>

      <section className="bg-[color-mix(in_oklab,var(--secondary)_50%,var(--background))] py-20">
        <div className="container-prose grid gap-6 md:grid-cols-3">
          {[
            { icon: Compass, title: "Our Mission", desc: "To make Maharashtra's heritage accessible, emotional and memorable for every traveller." },
            { icon: Sparkles, title: "What Makes Us Different", desc: "Storytelling first. Small groups always. Authentic local culture, not generic itineraries." },
            { icon: Heart, title: "Our Tour Philosophy", desc: "Travel slowly. Listen carefully. Leave a place better than you found it." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-card border border-border p-7 hover-lift">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-primary mb-4"><c.icon size={22} /></div>
              <h3 className="font-serif text-xl text-primary">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Meet Our Guides</span>
          <h2 className="mt-3 font-serif text-3xl md:text-4xl text-primary">Storytellers, not script-readers.</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {guides.map((guide) => (
            <div key={guide.name} className="rounded-2xl bg-card border border-border p-6 text-center hover-lift">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-primary">
                <UserRound size={30} />
              </div>
              <h3 className="mt-4 font-serif text-lg text-primary">{guide.name}</h3>
              <p className="text-xs text-muted-foreground tracking-[0.2em] uppercase mt-1">Heritage Guide</p>
              <p className="mt-2 text-sm text-foreground/75">10+ years guiding heritage circuits across Maharashtra.</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container-prose grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((s) => (
            <div key={s.l}>
              <div className="font-serif text-5xl text-gold">{s.v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20 text-center">
        <Award className="mx-auto text-gold" size={36} />
        <h2 className="mt-4 font-serif text-3xl md:text-4xl text-primary">Travel that stays with you.</h2>
        <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">Whether you're a parent, a teacher, a student, or simply curious - there is a Paranjape journey waiting for you.</p>
        <Users className="mx-auto mt-8 text-primary/40" size={20} />
      </section>
    </Layout>
  );
}
