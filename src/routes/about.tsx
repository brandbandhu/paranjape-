import { createFileRoute } from "@tanstack/react-router";
import { Award, Compass, Heart, Sparkles, UserRound, Users } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import heroStory from "@/assets/hero-story.jpg";
import founderPortrait from "@/assets/gallery/WhatsApp Image 2026-05-11 at 11.10.11 PM.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us - Paranjape Tours" },
      { name: "description", content: "A heritage storytelling travel brand designing meaningful journeys." },
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

const guides = [{ name: "Atul P." }, { name: "Snehal K." }, { name: "Rohan M." }, { name: "Priya D." }];

function About() {
  return (
    <Layout>
      <PageBanner
        title="About Paranjape Tours"
        subtitle="A heritage storytelling travel experience brand."
        crumbs={[{ label: "Home", to: "/" }, { label: "About Us" }]}
        image={heroStory}
      />

      <section className="container-prose grid gap-12 py-20 md:grid-cols-2 md:items-start">
        <div className="image-zoom overflow-hidden shadow-[var(--shadow-elegant)] md:self-start">
          <img
            src={founderPortrait}
            alt="Founder of Paranjape Tours standing outdoors near a waterfall viewpoint"
            className="h-[420px] w-full object-cover object-center sm:h-[480px] md:h-[540px] lg:h-[580px]"
            loading="lazy"
          />
        </div>
        <div>
          <span className="section-eyebrow">From the Founder</span>
          <h2 className="mt-3 font-serif text-4xl text-primary">
            Born from a love for history, architecture and lived experience.
          </h2>
          <p className="mt-4 text-justify leading-relaxed text-foreground/80">
            I started Paranjape Tours & Travels with a simple belief: forts, temples and old cities
            deserve to be understood, not just visited. What began as a personal passion for
            historical research and Indian temple architecture gradually became a venture built around
            careful storytelling, field study and meaningful travel.
          </p>
          <p className="mt-4 text-justify leading-relaxed text-foreground/80">
            My work draws from years of reading, site visits and close attention to how architecture,
            politics, devotion and daily life shape one another. That is why our journeys move beyond
            sightseeing into interpretation - helping travellers notice not only what they see, but
            why it matters.
          </p>
          <p className="mt-4 text-justify leading-relaxed text-foreground/80">
            Today, we design thoughtful small-group heritage walks, fort trails, architecture studies
            and educational journeys for families, students, researchers and curious travellers who
            want to experience history with depth, accuracy and wonder.
          </p>
        </div>
      </section>

      <section className="bg-[color-mix(in_oklab,var(--secondary)_50%,var(--background))] py-20">
        <div className="container-prose site-card-grid grid gap-6 md:grid-cols-3">
          {[
            {
              icon: Compass,
              title: "Our Vision",
              desc: "To preserve and present historical heritage through meaningful tourism experiences that connect travellers with the stories, culture and architectural legacy of India.",
            },
            {
              icon: Sparkles,
              title: "Our Mission",
              desc: "To educate people through highly curated, historically grounded travel experiences and local walks rooted in deep research.",
            },
            {
              icon: Heart,
              title: "Our Tour Philosophy",
              desc: "We believe every journey should honour place, scholarship and memory - with depth over checklist tourism.",
            },
          ].map((card) => (
            <div key={card.title} className="site-card rounded-2xl border border-border bg-card p-7 hover-lift">
              <div className="site-card-icon mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-primary">
                <card.icon size={22} />
              </div>
              <div className="site-card-content">
                <h3 className="font-serif text-xl text-primary">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20">
        <div className="mb-12 text-center">
          <span className="section-eyebrow">Meet Our Guides</span>
          <h2 className="mt-3 font-serif text-3xl text-primary md:text-4xl">Storytellers, not script-readers.</h2>
        </div>
        <div className="site-card-grid grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {guides.map((guide) => (
            <div key={guide.name} className="site-card rounded-2xl border border-border bg-card p-6 text-center hover-lift">
              <div className="site-card-icon mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/15 text-primary">
                <UserRound size={30} />
              </div>
              <div className="site-card-content">
                <h3 className="mt-4 font-serif text-lg text-primary">{guide.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Heritage Guide</p>
                <p className="mt-2 text-sm text-foreground/75">10+ years guiding heritage circuits with depth and care.</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-prose grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.l}>
              <div className="font-serif text-5xl text-gold">{stat.v}</div>
              <div className="mt-2 text-xs uppercase tracking-[0.2em] text-primary-foreground/80">{stat.l}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-prose py-20 text-center">
        <Award className="mx-auto text-gold" size={36} />
        <h2 className="mt-4 font-serif text-3xl text-primary md:text-4xl">Travel that stays with you.</h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Whether you're a parent, a teacher, a student, or simply curious - there is a Paranjape
          journey waiting for you.
        </p>
        <Users className="mx-auto mt-8 text-primary/40" size={20} />
      </section>
    </Layout>
  );
}
