export const enquiryCategoryOptions = [
  {
    value: "tours-and-walks",
    label: "Tours and Walks",
    description: "Fort trails, temple visits, heritage walks and storyteller-led day trips.",
    organizationLabel: "Organisation / group name",
    organizationRequired: false,
    organizationPlaceholder: "Optional for clubs, families or friend groups",
    subjectLabel: "Tour, destination or theme",
    subjectPlaceholder: "e.g. Shaniwar Wada walk, temple architecture, Maratha history trail",
    scheduleLabel: "Travel date or date range",
    schedulePlaceholder: "e.g. 14 June 2026 or 14 to 16 June 2026",
    groupLabel: "Group size",
    groupPlaceholder: "e.g. 4 adults, 12 participants",
    locationLabel: "Starting city or pickup point",
    locationPlaceholder: "e.g. Pune, Mumbai, Nashik Road",
    messagePlaceholder: "Tell us what you want to explore, your pace preferences, or any questions you already have.",
  },
  {
    value: "school-and-group-plans",
    label: "School and Group Plans",
    description: "Student groups, family outings and custom historical study visits.",
    organizationLabel: "School / college name",
    organizationRequired: true,
    organizationPlaceholder: "e.g. Vidya Pratishthan School",
    subjectLabel: "Class, destination or study theme",
    subjectPlaceholder: "e.g. Grade 8 fort history visit, temple art study tour",
    scheduleLabel: "Preferred travel date or academic window",
    schedulePlaceholder: "e.g. August 2026, after exams, 12 September 2026",
    groupLabel: "Students and accompanying adults",
    groupPlaceholder: "e.g. 42 students + 4 teachers",
    locationLabel: "School / college city",
    locationPlaceholder: "e.g. Pune, Satara, Nashik",
    messagePlaceholder: "Share age group, learning goals, approval timeline, food needs, or supervision requirements.",
  },
  {
    value: "shop-and-gifting",
    label: "Shop and Gifting",
    description: "Books, maps, keepsakes and group gifting bundles from the shop collection.",
    organizationLabel: "Organisation / gifting occasion",
    organizationRequired: false,
    organizationPlaceholder: "Optional for events, schools or bulk gifting",
    subjectLabel: "Product, book or gifting requirement",
    subjectPlaceholder: "e.g. 25 heritage books, custom gift packs, bulk souvenir order",
    scheduleLabel: "Needed by / delivery timeline",
    schedulePlaceholder: "e.g. Before 10 July 2026, this month, event on 2 August",
    groupLabel: "Quantity or order size",
    groupPlaceholder: "e.g. 12 books, 40 gift packs",
    locationLabel: "Delivery city",
    locationPlaceholder: "e.g. Pune, Mumbai, Bengaluru",
    messagePlaceholder: "Mention product preferences, packaging needs, delivery timeline, or whether customization is required.",
  },
  {
    value: "custom-requests",
    label: "Custom Requests",
    description: "Tell us your date, group size and theme, and we will help shape the plan.",
    organizationLabel: "Family / group name",
    organizationRequired: false,
    organizationPlaceholder: "Optional for private groups or special trips",
    subjectLabel: "Trip idea, theme or requirement",
    subjectPlaceholder: "e.g. Family heritage weekend, senior-friendly temple circuit, research visit",
    scheduleLabel: "Preferred date or planning window",
    schedulePlaceholder: "e.g. October break, one-day plan in July, flexible weekends",
    groupLabel: "Family / group size",
    groupPlaceholder: "e.g. 6 family members, 18 guests",
    locationLabel: "Starting city or pickup point",
    locationPlaceholder: "e.g. Pune, Kolhapur, pickup from Mumbai airport",
    messagePlaceholder: "Tell us what you are trying to plan, special requirements, walking comfort, or accessibility needs.",
  },
] as const;

export const preferredContactMethodOptions = [
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

export type EnquiryCategoryValue = (typeof enquiryCategoryOptions)[number]["value"];
export type PreferredContactMethodValue = (typeof preferredContactMethodOptions)[number]["value"];

export type ContactEnquiryInput = {
  fullName: string;
  email: string;
  phone: string;
  categoryValue: EnquiryCategoryValue;
  preferredContactMethod: PreferredContactMethodValue;
  organizationName: string;
  subject: string;
  scheduleDetails: string;
  groupDetails: string;
  locationDetails: string;
  message: string;
};

export function findEnquiryCategoryConfig(value: string) {
  return enquiryCategoryOptions.find((option) => option.value === value);
}

export function getEnquiryCategoryConfig(value?: string) {
  return (value ? findEnquiryCategoryConfig(value) : undefined) ?? enquiryCategoryOptions[0];
}

export function findPreferredContactMethod(value: string) {
  return preferredContactMethodOptions.find((option) => option.value === value);
}
