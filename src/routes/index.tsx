import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Compass,
  Heart,
  MountainSnow,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { TourCard } from "@/components/site/TourCard";
import { tours, blogPosts } from "@/data/tours";
import heroFort from "@/assets/hero-fort.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import heroWalk from "@/assets/hero-walk.jpg";
import heroStory from "@/assets/hero-story.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Paranjape Tours — Heritage Storytelling Travel in Maharashtra" },
      {
        name: "description",
        content:
          "Curated heritage walks, fort tours, temple journeys and cultural storytelling experiences across Maharashtra.",
      },
      { property: "og:title", content: "Paranjape Tours — Heritage Storytelling" },
      {
        property: "og:description",
        content:
          "Travel through time, not just places. Maharashtra heritage tours led by expert storytellers.",
      },
    ],
  }),
  component: Home,
});

const slides = [
  {
    image: heroFort,
    eyebrow: "Forts of the Sahyadris",
    title: "Explore Maharashtra Beyond Tourism",
    sub: "Walk the ramparts where history was written in stone and courage.",
  },
  {
    image: heroTemple,
    eyebrow: "Ancient Architecture",
    title: "Travel Through Time, Not Just Places",
    sub: "Decode temple sculpture, geometry and the spirit of the artisans.",
  },
  {
    image: heroWalk,
    eyebrow: "Heritage Walks of Pune",
    title: "Stories Hidden in Every Street",
    sub: "Slow walks through old wadas, lanes and forgotten chapters.",
  },
  {
    image: heroStory,
    eyebrow: "Cultural Storytelling",
    title: "Where Every Stone Tells a Story",
    sub: "Travel with expert storytellers, not generic guides.",
  },
];

const whyUs = [
  {
    icon: BookOpen,
    title: "Expert Heritage Guides",
    desc: "Historians and storytellers, not script-readers.",
  },
  {
    icon: Sparkles,
    title: "Storytelling-Based Tours",
    desc: "We turn dates into drama and stones into stories.",
  },
  {
    icon: ShieldCheck,
    title: "Safe & Comfortable Travel",
    desc: "Vetted transport, first-aid and small group sizes.",
  },
  {
    icon: Users,
    title: "Small Group Experiences",
    desc: "Intimate groups so every question is heard.",
  },
  {
    icon: Compass,
    title: "Curated Itineraries",
    desc: "Every minute is designed for depth and delight.",
  },
  {
    icon: Utensils,
    title: "Local Culture & Food",
    desc: "Authentic Maharashtrian flavours along the way.",
  },
];

const testimonials = [
  {
    name: "Anita Joshi",
    role: "Family traveller",
    text: "The Shaniwar Wada walk made history come alive for our kids. We didn't want it to end.",
  },
  {
    name: "Rahul Deshmukh",
    role: "School teacher",
    text: "I've taken three batches of students with Paranjape Tours. The storytelling is exceptional.",
  },
  {
    name: "Meera Kulkarni",
    role: "History enthusiast",
    text: "Sinhagad with their guide felt less like a trek and more like a Maratha epic unfolding.",
  },
  {
    name: "Aniket Patil",
    role: "Corporate group lead",
    text: "Smooth, soulful and genuinely premium. Our team still talks about it.",
  },
];

const featuredTours = [
  { slug: "shivneri-fort-tour", tagLabel: "One Day Tour" },
  { slug: "shaniwar-wada-heritage-walk", tagLabel: "Heritage Walk" },
  { slug: "hampi-badami-heritage-trip", tagLabel: "Multiple Day Tour" },
] as const;

function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ${i === slide ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={s.image}
              alt=""
              className={`h-full w-full object-cover ${i === slide ? "animate-slow-zoom" : ""}`}
            />
            <div className="absolute inset-0 bg-black/35" />
          </div>
        ))}

        <div className="container-prose relative z-10 h-full flex items-center">
          <div className="max-w-2xl text-primary-foreground">
            <span key={slide} className="section-eyebrow animate-fade-in">
              {slides[slide].eyebrow}
            </span>
            <h1
              key={"t" + slide}
              className="mt-4 font-serif text-4xl sm:text-5xl lg:text-7xl leading-[1.05] animate-fade-up"
            >
              {slides[slide].title}
            </h1>
            <p
              key={"s" + slide}
              className="mt-5 text-lg text-primary-foreground/90 max-w-xl animate-fade-up"
            >
              {slides[slide].sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/tours"
                className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)] hover:scale-[1.03] transition-transform"
              >
                Explore Tours <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full border border-primary-foreground/40 backdrop-blur-sm bg-primary-foreground/10 text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary-foreground/20 transition-colors"
              >
                Plan Your Trip
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Slide ${i + 1}`}
              onClick={() => setSlide(i)}
              className={`h-1.5 rounded-full transition-all ${i === slide ? "w-10 bg-gold" : "w-4 bg-primary-foreground/50"}`}
            />
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <Section
        title="Featured Heritage Experiences"
        eyebrow="Curated Journeys"
        subtitle="Six experiences designed for depth, story, and quiet wonder."
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTours.map(({ slug, tagLabel }, i) => {
            const tour = tours.find((item) => item.slug === slug);
            return tour ? (
              <TourCard key={tour.slug} tour={tour} index={i} tagLabel={tagLabel} />
            ) : null;
          })}
        </div>
      </Section>

      {/* ABOUT PREVIEW */}
      <section className="bg-[color-mix(in_oklab,var(--secondary)_50%,var(--background))] py-20">
        <div className="container-prose grid gap-10 md:grid-cols-2 items-center">
          <div className="image-zoom overflow-hidden shadow-[var(--shadow-elegant)]">
            <img
              src={heroStory}
              alt="Storytelling at heritage site"
              className="aspect-[5/4] w-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <span className="section-eyebrow">About Paranjape Tours</span>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-primary">
              A heritage storytelling travel brand.
            </h2>
            <p className="mt-4 text-foreground/80 leading-relaxed">
              We don't just take you to forts and temples — we take you inside their stories.
              Founded by lovers of Maharashtra's living history, Paranjape Tours designs
              small-group, expert-guided journeys for families, students and curious travellers.
            </p>
            <ul className="mt-5 space-y-2 text-sm text-foreground/80">
              {[
                "Expert-guided heritage tours",
                "Deep Maharashtra history",
                "Small group cultural learning",
                "Family & student friendly",
              ].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <Heart size={14} className="text-gold" />
                  {p}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-7 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
            >
              Read Our Story <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <Section title="Why Travel With Us" eyebrow="Our Promise">
        <div className="site-card-grid grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w) => (
            <div
              key={w.title}
              className="site-card group rounded-2xl border border-border bg-card p-6 hover-lift"
            >
              <div className="site-card-icon inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gold/15 text-primary mb-4 group-hover:bg-gold/30 transition-colors">
                <w.icon size={22} />
              </div>
              <div className="site-card-content">
                <h3 className="font-serif text-xl text-primary">{w.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <DecoBg />
        <div className="container-prose relative">
          <div className="text-center">
            <span className="section-eyebrow !text-gold-foreground">Travellers' Voices</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl">
              Stories from our heritage circle
            </h2>
          </div>
          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* BLOG */}
      <Section
        title="Read Our Blogs"
        eyebrow="From the Journal"
        subtitle="Long-form notes on forts, temples, lanes and the people who keep them alive."
      >
        <div className="site-card-grid grid gap-6 md:grid-cols-3">
          {blogPosts.slice(0, 3).map((b) => (
            <Link
              key={b.slug}
              to="/blog"
              className="site-card group rounded-2xl bg-card border border-border overflow-hidden hover-lift"
            >
              <div className="site-card-media image-zoom aspect-[4/3]">
                <img
                  src={b.image}
                  alt={b.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="site-card-content p-5">
                <p className="text-xs uppercase tracking-[0.25em] text-gold">
                  {b.category} • {b.date}
                </p>
                <h3 className="mt-2 font-serif text-xl text-primary leading-snug">{b.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{b.excerpt}</p>
                <span className="site-card-link mt-3 inline-flex items-center gap-1 text-sm text-primary transition-all">
                  Read More <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <section className="relative my-20">
        <div className="container-prose">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-primary-foreground">
            <img
              src={heroFort}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-primary/80" />
            <div className="relative grid md:grid-cols-[1fr_auto] gap-6 items-center">
              <div>
                <span className="section-eyebrow !text-gold-foreground">Ready When You Are</span>
                <h2 className="mt-3 font-serif text-3xl md:text-5xl max-w-2xl">
                  Ready to Experience Maharashtra's Living Heritage?
                </h2>
                <p className="mt-3 text-primary-foreground/85 max-w-xl">
                  Tell us when, where, and who you'd love to bring along — we'll design a journey
                  worth remembering.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://wa.me/910000000000"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-whatsapp text-white px-6 py-3 text-sm font-semibold shadow-[var(--shadow-elegant)]"
                >
                  <WhatsAppIcon size={16} /> WhatsApp Now
                </a>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-gold text-gold-foreground px-6 py-3 text-sm font-semibold shadow-[var(--shadow-gold)]"
                >
                  Send Enquiry <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Section({
  title,
  eyebrow,
  subtitle,
  children,
  tone,
}: {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  children: React.ReactNode;
  tone?: "muted";
}) {
  return (
    <section
      className={`py-20 ${tone === "muted" ? "bg-[color-mix(in_oklab,var(--secondary)_50%,var(--background))]" : ""}`}
    >
      <div className="container-prose">
        <div className="text-center mb-12">
          {eyebrow && <span className="section-eyebrow">{eyebrow}</span>}
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-primary">{title}</h2>
          {subtitle && <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
          <div className="heritage-divider mt-5">
            <MountainSnow size={14} />
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function TestimonialsCarousel({ items }: { items: typeof testimonials }) {
  const [idx, setIdx] = useState(0);
  const ref = useRef<number | null>(null);
  useEffect(() => {
    ref.current = window.setInterval(() => setIdx((i) => (i + 1) % items.length), 5000);
    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [items.length]);
  return (
    <div className="mt-10 max-w-3xl mx-auto text-center">
      {items.map((t, i) => (
        <div key={i} className={`${i === idx ? "block animate-fade-up" : "hidden"}`}>
          <p className="font-serif text-xl md:text-2xl leading-relaxed text-primary-foreground/95">
            "{t.text}"
          </p>
          <p className="mt-5 text-gold text-sm tracking-[0.2em] uppercase">{t.name}</p>
          <p className="text-primary-foreground/70 text-xs">{t.role}</p>
        </div>
      ))}
      <div className="flex justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-8 bg-gold" : "w-3 bg-primary-foreground/40"}`}
          />
        ))}
      </div>
    </div>
  );
}

function DecoBg() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.07]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="mandala" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
          <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="0.7" />
          <path
            d="M60 10 L60 110 M10 60 L110 60 M25 25 L95 95 M95 25 L25 95"
            stroke="currentColor"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mandala)" />
    </svg>
  );
}
