import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import shaniwar from "@/assets/tour-shaniwar.jpg";
import sinhagad from "@/assets/tour-sinhagad.jpg";
import shivneri from "@/assets/tour-shivneri.jpg";
import parvati from "@/assets/tour-parvati.jpg";
import kondane from "@/assets/tour-kondane.jpg";
import gondeshwar from "@/assets/tour-gondeshwar.jpg";
import heroFort from "@/assets/hero-fort.jpg";
import heroTemple from "@/assets/hero-temple.jpg";
import heroWalk from "@/assets/hero-walk.jpg";
import heroStory from "@/assets/hero-story.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Past Tours & Gallery — Paranjape Tours" },
      { name: "description", content: "Moments from our heritage walks, fort trails and cultural journeys across Maharashtra." },
      { property: "og:title", content: "Our Heritage Journey So Far" },
      { property: "og:description", content: "A visual story of trails walked and stories shared." },
    ],
  }),
  component: Gallery,
});

const items = [
  { src: sinhagad,   cat: "Forts",          title: "Sinhagad Trail",      caption: "Walking where Tanaji wrote history." },
  { src: shaniwar,   cat: "Heritage Walks", title: "Shaniwar Wada",       caption: "Peshwa-era stories at the gate." },
  { src: shivneri,   cat: "Forts",          title: "Shivneri Birthplace", caption: "Where a young Shivaji listened to Jijabai." },
  { src: gondeshwar, cat: "Temples",        title: "Gondeshwar",          caption: "12th century stone, still standing tall." },
  { src: parvati,    cat: "Heritage Walks", title: "Parvati Sunrise",     caption: "Pune wakes up below us." },
  { src: kondane,    cat: "Culture",        title: "Kondane Caves",       caption: "2nd century BCE craftsmanship." },
  { src: heroFort,   cat: "Forts",          title: "Sahyadri Sunsets",    caption: "When walls glow in golden hour." },
  { src: heroTemple, cat: "Temples",        title: "Temple Detail",       caption: "Sculpture that breathes." },
  { src: heroWalk,   cat: "Heritage Walks", title: "Old Pune Lanes",      caption: "Wadas, lanterns and stories." },
  { src: heroStory,  cat: "Groups",         title: "Our Travel Family",   caption: "Strangers who became friends." },
  { src: shivneri,   cat: "Groups",         title: "Junnar Trip",         caption: "Group memories that last." },
  { src: kondane,    cat: "Culture",        title: "Cultural Moments",    caption: "Local stories, local food." },
];
const cats = ["All", "Forts", "Temples", "Heritage Walks", "Groups", "Culture"];

function Gallery() {
  const [c, setC] = useState("All");
  const list = useMemo(() => c === "All" ? items : items.filter((i) => i.cat === c), [c]);

  return (
    <Layout>
      <PageBanner title="Past Tours & Gallery" subtitle="Trails walked, friendships made, stories collected."
        crumbs={[{ label: "Home", to: "/" }, { label: "Past Tours" }]} image={heroWalk} />

      <section className="container-prose py-14">
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {cats.map((cat) => (
            <button key={cat} onClick={() => setC(cat)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                c === cat ? "bg-primary text-primary-foreground border-primary" : "border-border hover:border-gold hover:text-primary"
              }`}>{cat}</button>
          ))}
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {list.map((it, i) => (
            <figure key={i} className="image-zoom mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-[var(--shadow-soft)] relative group">
              <img src={it.src} alt={it.title} className="w-full h-auto object-cover" loading="lazy" />
              <figcaption className="absolute inset-0 bg-gradient-to-t from-primary/85 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-primary-foreground">
                <p className="text-xs uppercase tracking-[0.2em] text-gold">{it.cat}</p>
                <h3 className="font-serif text-xl">{it.title}</h3>
                <p className="text-sm text-primary-foreground/85">{it.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-20">
        <div className="container-prose text-center max-w-3xl">
          <span className="section-eyebrow !text-gold-foreground">Our Journey So Far</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Hundreds of travellers. One love — Maharashtra.</h2>
          <p className="mt-4 text-primary-foreground/85">From schoolchildren to senior citizens, families to corporate groups — every traveller who walked with us added a story to ours.</p>
        </div>
      </section>
    </Layout>
  );
}
