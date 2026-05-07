import { Link, createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { ArrowRight, BookOpen, Gift, Mail, MapPin, Phone, ScrollText, Users } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import heroWalk from "@/assets/hero-walk.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Paranjape Tours" },
      {
        name: "description",
        content:
          "Get in touch with Paranjape Tours for heritage tour enquiries, school groups, shop orders and custom travel plans.",
      },
      { property: "og:title", content: "Contact Paranjape Tours" },
      {
        property: "og:description",
        content:
          "Call, WhatsApp or email Paranjape Tours to plan a heritage journey, group tour or custom enquiry.",
      },
    ],
  }),
  component: Contact,
});

const whatsappUrl =
  "https://wa.me/917020402446?text=" +
  encodeURIComponent("Hello Paranjape Tours, I would like to enquire about a heritage tour.");

const mapUrl = "https://maps.google.com/?q=Avalon,+Anandnagar,+Sinhagad+Road,+Pune";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 9420010881",
    href: "tel:+919420010881",
    action: "Call now",
    note: "Best for quick tour questions, availability checks and booking guidance.",
    valueClassName: "leading-[1.08]",
  },
  {
    icon: WhatsAppIcon,
    title: "WhatsApp",
    value: "+91 7020402446",
    href: whatsappUrl,
    action: "Send a message",
    note: "Share your travel date, group size and interests in one message.",
    valueClassName: "leading-[1.08]",
  },
  {
    icon: Mail,
    title: "Email",
    value: "hello@paranjapetours.in",
    href: "mailto:hello@paranjapetours.in",
    action: "Write to us",
    note: "Useful for school trips, custom itineraries and detailed requests.",
    valueClassName: "break-all text-[1.7rem] leading-[1.04]",
  },
  {
    icon: MapPin,
    title: "Visit / Base",
    value: "Avalon, Anandnagar, Sinhagad Road, Pune",
    href: mapUrl,
    action: "Open in Maps",
    note: "Our heritage planning and tour coordination is managed from Pune.",
    valueClassName: "text-[1.85rem] leading-[1.1]",
  },
] as const;

const enquiryTypes = [
  {
    icon: BookOpen,
    title: "Tours and Walks",
    desc: "Fort trails, temple visits, heritage walks and storyteller-led day trips.",
  },
  {
    icon: Users,
    title: "School and Group Plans",
    desc: "Student groups, family outings and custom historical study visits.",
  },
  {
    icon: Gift,
    title: "Shop and Gifting",
    desc: "Books, maps, keepsakes and group gifting bundles from the shop collection.",
  },
  {
    icon: ScrollText,
    title: "Custom Requests",
    desc: "Tell us your date, group size and theme, and we will help shape the plan.",
  },
] as const;

const planningChecklist = [
  "Your preferred tour, destination or topic of interest",
  "Travel date or date range",
  "Group size and age mix",
  "Starting city or pickup point",
  "Any food, walking or accessibility requirements",
] as const;

const cardDelayStyle = (index: number, offset = 0): CSSProperties => ({
  "--card-delay": `${offset + index * 90}ms`,
}) as CSSProperties;

function Contact() {
  return (
    <Layout>
      <PageBanner
        title="Contact Paranjape Tours"
        subtitle="Call, WhatsApp or email us for heritage tours, school groups, shop orders and custom travel plans."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        image={heroWalk}
      />

      <section className="container-prose py-20 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div>
          <span className="section-eyebrow">Start the Conversation</span>
          <h2 className="mt-4 font-serif text-3xl md:text-5xl text-primary">
            Tell us what kind of journey you want to plan.
          </h2>
          <p className="mt-4 text-foreground/80 leading-relaxed">
            Whether you are planning a heritage walk, a student group visit, a family trip or a gifting enquiry,
            this is the best place to reach us. Share the basics of your plan and we will guide you to the right
            next step.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="tel:+919420010881"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)]"
            >
              Call Now <Phone size={16} />
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium text-primary hover:border-gold"
            >
              WhatsApp Us <WhatsAppIcon size={16} />
            </a>
          </div>
        </div>

        <div
          className="site-card rounded-[2rem] border border-gold/35 bg-[var(--gradient-paper)] p-8 shadow-[var(--shadow-elegant)]"
          style={cardDelayStyle(1)}
        >
          <div className="site-card-content">
            <p className="text-xs uppercase tracking-[0.24em] text-gold-foreground">Helpful to include</p>
            <h3 className="mt-3 font-serif text-3xl text-primary">A quicker reply starts with a clearer enquiry.</h3>
            <ul className="mt-6 space-y-3 text-sm text-foreground/80">
              {planningChecklist.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <ArrowRight size={16} className="mt-0.5 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-[color-mix(in_oklab,var(--secondary)_55%,var(--background))] py-20">
        <div className="container-prose">
          <div className="text-center mb-12">
            <span className="section-eyebrow">Reach Us</span>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-primary">Choose the contact method that fits you best.</h2>
          </div>

          <div className="site-card-grid grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {contactMethods.map((item, index) => (
              <a
                key={item.title}
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="site-card h-full rounded-3xl border border-border bg-card p-7 text-left hover-lift"
                style={cardDelayStyle(index)}
              >
                <div className="site-card-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-primary">
                  <item.icon size={22} />
                </div>
                <div className="site-card-content flex h-full min-w-0 flex-col">
                  <p className="mt-5 text-xs uppercase tracking-[0.24em] text-muted-foreground">{item.title}</p>
                  <h3
                    className={`mt-2 max-w-full font-serif text-2xl text-primary ${item.valueClassName ?? "leading-[1.12]"}`}
                  >
                    {item.value}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
                  <span className="site-card-link mt-auto inline-flex items-center gap-2 pt-5 text-sm font-medium text-primary">
                    {item.action}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-prose py-20 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <span className="section-eyebrow">Enquiries</span>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl text-primary">We can help with more than one kind of request.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            If you are not sure which message to send, just tell us what you are trying to plan. We can help you sort
            out tour fit, group details, logistics and gifting options from one conversation.
          </p>
        </div>

        <div className="site-card-grid grid gap-6 sm:grid-cols-2">
          {enquiryTypes.map((item, index) => (
            <div
              key={item.title}
              className="site-card rounded-3xl border border-border bg-card p-7 hover-lift"
              style={cardDelayStyle(index, 90)}
            >
              <div className="site-card-icon inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gold/15 text-primary">
                <item.icon size={22} />
              </div>
              <div className="site-card-content">
                <h3 className="mt-5 font-serif text-2xl text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-prose text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-gold">Keep Exploring</p>
          <h2 className="mt-3 font-serif text-3xl md:text-5xl">Prefer to browse first?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Explore the tour collection or the heritage shop, then come back with the options that interest you most.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/tours"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-gold-foreground shadow-[var(--shadow-gold)]"
            >
              Browse Tours <ArrowRight size={16} />
            </Link>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-primary-foreground"
            >
              Visit Shop <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
