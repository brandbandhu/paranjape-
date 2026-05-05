import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Calendar, Check, ChevronDown, Clock, MapPin, Mountain, Users, X,
} from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { Breadcrumb } from "@/components/site/Breadcrumb";
import { TourCard } from "@/components/site/TourCard";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { getTour, tours } from "@/data/tours";

export const Route = createFileRoute("/tours/$slug")({
  loader: ({ params }) => {
    const tour = getTour(params.slug);
    if (!tour) throw notFound();
    return tour;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} — Paranjape Tours` },
      { name: "description", content: loaderData.short },
      { property: "og:title", content: loaderData.title },
      { property: "og:description", content: loaderData.short },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <Layout><div className="container-prose py-32 text-center">
      <h1 className="font-serif text-4xl text-primary">Tour not found</h1>
      <Link to="/tours" className="mt-6 inline-flex rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm">Back to Tours</Link>
    </div></Layout>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <Layout><div className="container-prose py-24 text-center">
        <h1 className="font-serif text-3xl text-primary">Something went wrong</h1>
        <p className="mt-2 text-muted-foreground">{error.message}</p>
        <button onClick={() => { router.invalidate(); reset(); }} className="mt-6 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm">Try again</button>
      </div></Layout>
    );
  },
  component: TourDetail,
});

function TourDetail() {
  const tour = Route.useLoaderData();
  const related = tours.filter((t) => t.slug !== tour.slug && t.category === tour.category).slice(0, 3);
  const fallback = tours.filter((t) => t.slug !== tour.slug).slice(0, 3);

  return (
    <Layout>
      {/* HERO */}
      <section className="relative h-[64vh] min-h-[420px] w-full overflow-hidden">
        <img src={tour.image} alt={tour.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background" />
        <div className="container-prose relative z-10 h-full flex flex-col justify-end pb-10 text-primary-foreground">
          <Breadcrumb items={[{ label: "Home", to: "/" }, { label: "Tours", to: "/tours" }, { label: tour.title }]} />
          <span className="mt-3 section-eyebrow w-fit">{tour.category}</span>
          <h1 className="mt-3 font-serif text-4xl md:text-6xl max-w-3xl">{tour.title}</h1>
        </div>
      </section>

      {/* META + CTA */}
      <section className="container-prose -mt-8 relative z-20">
        <div className="rounded-2xl bg-card border border-border shadow-[var(--shadow-elegant)] p-6 md:p-7 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <Meta icon={Clock}    label="Duration"   value={tour.duration} />
            <Meta icon={MapPin}   label="Location"   value={tour.location} />
            <Meta icon={Mountain} label="Difficulty" value={tour.difficulty} />
            <Meta icon={Calendar} label="Best Season" value={tour.bestSeason} />
            <Meta icon={Users}    label="Group Size" value={tour.groupSize} />
            <Meta icon={Check}    label="Price"      value={tour.price} />
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow-[var(--shadow-soft)]">Enquire Now</Link>
            <a href={`https://wa.me/910000000000?text=${encodeURIComponent("I'd like to know more about " + tour.title)}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-whatsapp text-white px-5 py-3 text-sm font-medium">
              <WhatsAppIcon size={16}/> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="container-prose py-16 grid gap-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-12">
          <Block title="Overview"><p className="leading-relaxed text-foreground/85">{tour.overview}</p></Block>
          <Block title="Historical Significance"><p className="leading-relaxed text-foreground/85">{tour.history}</p></Block>

          <Block title="Tour Highlights">
            <ul className="grid sm:grid-cols-2 gap-2">
              {tour.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2 text-foreground/85"><Check className="text-gold mt-0.5" size={16}/>{h}</li>
              ))}
            </ul>
          </Block>

          <Block title="Detailed Itinerary">
            <ol className="relative border-l-2 border-gold/40 pl-6 space-y-6">
              {tour.itinerary.map((it, i) => (
                <li key={i} className="relative">
                  <span className="absolute -left-[34px] top-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-gold text-gold-foreground text-xs font-semibold">{i + 1}</span>
                  <p className="text-xs uppercase tracking-[0.2em] text-gold">{it.time}</p>
                  <h4 className="font-serif text-lg text-primary mt-1">{it.title}</h4>
                  <p className="mt-1 text-sm text-foreground/80">{it.desc}</p>
                </li>
              ))}
            </ol>
          </Block>

          <div className="grid md:grid-cols-2 gap-8">
            <Block title="Inclusions">
              <ul className="space-y-2">{tour.inclusions.map((x) => <li key={x} className="flex gap-2 text-foreground/85"><Check size={16} className="text-gold mt-0.5"/>{x}</li>)}</ul>
            </Block>
            <Block title="Exclusions">
              <ul className="space-y-2">{tour.exclusions.map((x) => <li key={x} className="flex gap-2 text-foreground/85"><X size={16} className="text-destructive mt-0.5"/>{x}</li>)}</ul>
            </Block>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Block title="Things to Carry">
              <ul className="space-y-2">{tour.carry.map((x) => <li key={x} className="flex gap-2 text-foreground/85"><Check size={16} className="text-gold mt-0.5"/>{x}</li>)}</ul>
            </Block>
            <Block title="Who Can Join"><p className="text-foreground/85 leading-relaxed">{tour.whoCanJoin}</p></Block>
          </div>

          <Block title="Photo Gallery">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[tour.image, tour.image, tour.image, tour.image, tour.image, tour.image].map((src, i) => (
                <div key={i} className="image-zoom aspect-square rounded-xl overflow-hidden">
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </Block>

          <Block title="Frequently Asked Questions">
            <div className="space-y-3">
              {tour.faqs.map((f, i) => <Faq key={i} q={f.q} a={f.a} />)}
            </div>
          </Block>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <p className="text-xs uppercase tracking-[0.2em] text-gold">Starting From</p>
            <p className="font-serif text-3xl text-primary mt-1">{tour.price}</p>
            <Link to="/contact" className="mt-5 block text-center rounded-full bg-primary text-primary-foreground px-5 py-3 text-sm font-medium">Send Enquiry</Link>
            <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer" className="mt-3 block text-center rounded-full bg-whatsapp text-white px-5 py-3 text-sm font-medium">WhatsApp Now</a>
          </div>
          <div className="rounded-2xl border border-border bg-[color-mix(in_oklab,var(--secondary)_60%,var(--background))] p-6">
            <h4 className="font-serif text-lg text-primary">Need a custom date?</h4>
            <p className="mt-1 text-sm text-muted-foreground">We design private heritage trips for families, schools and corporate groups.</p>
            <Link to="/contact" className="mt-4 inline-flex text-sm text-primary font-medium">Plan with us →</Link>
          </div>
        </aside>
      </section>

      {/* RELATED */}
      <section className="bg-[color-mix(in_oklab,var(--secondary)_50%,var(--background))] py-16">
        <div className="container-prose">
          <h2 className="font-serif text-3xl text-primary text-center mb-10">Related Tours</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {(related.length ? related : fallback).map((t) => <TourCard key={t.slug} tour={t} />)}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Meta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gold/15 text-primary"><Icon size={16}/></span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-primary">{value}</p>
      </div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-primary">{title}</h2>
      <div className="heritage-divider my-4 max-w-[160px] !mx-0"><span /></div>
      {children}
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between text-left px-5 py-4">
        <span className="font-medium text-primary">{q}</span>
        <ChevronDown size={18} className={`transition-transform ${open ? "rotate-180" : ""} text-gold`} />
      </button>
      {open && <div className="px-5 pb-5 text-sm text-foreground/80 animate-fade-in">{a}</div>}
    </div>
  );
}
