import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Clock, Mail, MapPin, Phone, Send } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageBanner } from "@/components/site/PageBanner";
import { WhatsAppIcon } from "@/components/site/WhatsAppIcon";
import { tours } from "@/data/tours";
import heroFort from "@/assets/hero-fort.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Paranjape Tours" },
      { name: "description", content: "Plan your Maharashtra heritage journey. Talk to our team via phone, email or WhatsApp." },
      { property: "og:title", content: "Contact Paranjape Tours" },
      { property: "og:description", content: "We'd love to design your next heritage trip." },
    ],
  }),
  component: Contact,
});

const faqs = [
  { q: "How do I book a tour?", a: "Send an enquiry through this form or WhatsApp us. Our team confirms within a few hours." },
  { q: "Do you offer custom private tours?", a: "Yes - for families, schools and corporate groups. Just tell us your dates and group size." },
  { q: "Are tours kid-friendly?", a: "Most heritage walks are. Each tour page lists the recommended age." },
  { q: "What if it rains?", a: "Monsoon adds magic to many tours. We provide guidance on what to carry and reschedule if conditions are unsafe." },
];

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <Layout>
      <PageBanner
        title="Get in Touch"
        subtitle="Tell us where your curiosity is taking you next."
        crumbs={[{ label: "Home", to: "/" }, { label: "Contact" }]}
        image={heroFort}
      />

      <section className="container-prose py-16 grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl bg-card border border-border p-7 md:p-9 shadow-[var(--shadow-soft)]"
        >
          <span className="section-eyebrow">Send Enquiry</span>
          <h2 className="mt-3 font-serif text-3xl text-primary">Plan your heritage journey</h2>
          <div className="grid gap-5 mt-7 sm:grid-cols-2">
            <Field label="Full Name" name="name" required />
            <Field label="Email" name="email" type="email" required />
            <Field label="Phone" name="phone" type="tel" />
            <div>
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Tour Interested In</label>
              <select className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40">
                <option>Any / Need recommendation</option>
                {tours.map((t) => (
                  <option key={t.slug}>{t.title}</option>
                ))}
              </select>
            </div>
            <Field label="Preferred Date" name="date" type="date" />
            <Field label="Number of People" name="people" type="number" />
            <div className="sm:col-span-2">
              <label className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">Message</label>
              <textarea
                rows={4}
                className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                placeholder="Tell us a little about who's travelling and what you'd love to experience..."
              />
            </div>
          </div>
          <button type="submit" className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium shadow-[var(--shadow-soft)]">
            <Send size={16} /> Send Enquiry
          </button>
          {sent && <p className="mt-4 text-sm text-primary animate-fade-in">Thank you - we'll get back to you shortly.</p>}
        </form>

        <div className="space-y-5">
          <InfoCard icon={Phone} title="Call Us" lines={["+91 9420010881", "Mon - Sat, 10am - 7pm"]} />
          <InfoCard icon={WhatsAppIcon} title="WhatsApp" lines={["+91 7020402446", "Personal / fastest way to reach us"]} />
          <InfoCard icon={Mail} title="Email" lines={["hello@paranjapetours.in"]} />
          <InfoCard icon={MapPin} title="Office" lines={["Avalon, Anandnagar,", "Sinhagad Road, Pune"]} />
          <InfoCard icon={Clock} title="Working Hours" lines={["Office Timings: 11 AM - 4 PM", "Sunday: by appointment"]} />
        </div>
      </section>

      <section className="container-prose pb-16">
        <div className="rounded-2xl overflow-hidden border border-border aspect-[16/7] bg-secondary">
          <iframe
            title="Office location"
            src="https://www.openstreetmap.org/export/embed.html?bbox=73.83%2C18.50%2C73.88%2C18.55&layer=mapnik"
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container-prose pb-20">
        <h2 className="font-serif text-3xl md:text-4xl text-primary text-center">Frequently Asked Questions</h2>
        <div className="heritage-divider my-5"><span /></div>
        <div className="grid gap-4 md:grid-cols-2 max-w-4xl mx-auto">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-5">
              <h3 className="font-medium text-primary">{f.q}</h3>
              <p className="mt-2 text-sm text-foreground/80">{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-2">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="w-full rounded-md border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
      />
    </div>
  );
}

function InfoCard({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 flex gap-4">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-primary shrink-0">
        <Icon size={18} />
      </span>
      <div>
        <h4 className="font-serif text-lg text-primary">{title}</h4>
        {lines.map((line, i) => (
          <p key={i} className="text-sm text-foreground/80">{line}</p>
        ))}
      </div>
    </div>
  );
}
