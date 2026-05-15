import { createWhatsAppUrl } from "@/data/siteContact";
import { WhatsAppLogo } from "./WhatsAppLogo";

export function WhatsAppFab() {
  const url = createWhatsAppUrl(
    "Hello Paranjape Tours, I want to enquire about your heritage tours.",
  );
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full shadow-[var(--shadow-elegant)] hover:scale-110 transition-transform"
    >
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-25" />
      <WhatsAppLogo size={56} className="relative z-10" />
    </a>
  );
}
