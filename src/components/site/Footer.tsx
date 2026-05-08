import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { siteContact } from "@/data/siteContact";
import { WhatsAppIcon } from "./WhatsAppIcon";

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/peshwehistory/", label: "Facebook" },
  { icon: Youtube, href: "#", label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-[color-mix(in_oklab,var(--secondary)_60%,var(--background))]">
      <div className="container-prose py-14 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-serif">
              &#2346;&#2366;
            </span>
            <span className="font-serif text-xl text-primary">Paranjape Tours</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            A heritage storytelling travel experience brand &mdash; helping you rediscover Maharashtra through forts,
            temples, walks and stories.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-lg text-primary mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[
              ["Home", "/"],
              ["About", "/about"],
              ["Tours", "/tours"],
              ["Shop", "/shop"],
              ["Blog", "/blog"],
              ["Contact", "/contact"],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to as string} className="text-foreground/75 hover:text-primary transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-primary mb-4">Tour Categories</h4>
          <ul className="space-y-2 text-sm text-foreground/75">
            <li>Heritage Walks</li>
            <li>Fort Exploration Tours</li>
            <li>Temple &amp; Architecture Tours</li>
            <li>Educational Student Tours</li>
            <li>Custom Family Tours</li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-lg text-primary mb-4">Get in Touch</h4>
          <ul className="space-y-3 text-sm text-foreground/80">
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gold" />
              <a href={siteContact.primaryPhoneHref} className="transition-colors hover:text-primary">
                {siteContact.primaryPhone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <WhatsAppIcon size={16} className="text-gold" />
              <a
                href={siteContact.whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary"
              >
                Personal: {siteContact.whatsappPhone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-gold" />
              <a href={siteContact.mailtoHref} className="break-all transition-colors hover:text-primary">
                {siteContact.email}
              </a>
            </li>
            <li className="flex items-start gap-2">
              <MapPin size={16} className="text-gold mt-0.5" />
              <a
                href={siteContact.mapUrl}
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-primary"
              >
                {siteContact.address}
              </a>
            </li>
          </ul>
          <div className="flex gap-3 mt-5">
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target={href === "#" ? undefined : "_blank"}
                rel={href === "#" ? undefined : "noreferrer"}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition-colors"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Paranjape Tours. Crafted with reverence for Maharashtra&apos;s heritage.
      </div>
    </footer>
  );
}
