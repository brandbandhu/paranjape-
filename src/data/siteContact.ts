export const whatsappPhoneDigits = "919226335734";

export function createWhatsAppUrl(message: string) {
  return `https://wa.me/${whatsappPhoneDigits}?text=${encodeURIComponent(message)}`;
}

export const siteContact = {
  email: "schoolofindianhistory@gmail.com",
  mailtoHref: "mailto:schoolofindianhistory@gmail.com",
  primaryPhone: "+91 9420010881",
  primaryPhoneHref: "tel:+919420010881",
  whatsappPhone: "+91 9226335734",
  whatsappUrl: createWhatsAppUrl(
    "Hello Paranjape Tours, I would like to enquire about a heritage tour.",
  ),
  address: "Avalon, Anandnagar, Sinhagad Road, Pune",
  mapUrl: "https://maps.google.com/?q=Avalon,+Anandnagar,+Sinhagad+Road,+Pune",
} as const;
