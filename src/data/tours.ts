import shaniwar from "@/assets/tour-shaniwar.jpg";
import sinhagad from "@/assets/tour-sinhagad.jpg";
import shivneri from "@/assets/tour-shivneri.jpg";
import parvati from "@/assets/tour-parvati.jpg";
import kondane from "@/assets/tour-kondane.jpg";
import gondeshwar from "@/assets/tour-gondeshwar.jpg";

export type Tour = {
  slug: string;
  title: string;
  category: string;
  location: string;
  duration: string;
  difficulty: string;
  bestFor: string;
  bestSeason: string;
  groupSize: string;
  price: string;
  image: string;
  short: string;
  overview: string;
  history: string;
  highlights: string[];
  itinerary: { time: string; title: string; desc: string }[];
  inclusions: string[];
  exclusions: string[];
  carry: string[];
  whoCanJoin: string;
  faqs: { q: string; a: string }[];
};

export const tours: Tour[] = [
  {
    slug: "shaniwar-wada-heritage-walk",
    title: "Shaniwar Wada Heritage Walk",
    category: "Heritage Walk",
    location: "Pune",
    duration: "2 – 3 Hours",
    difficulty: "Easy",
    bestFor: "Families, students, history lovers",
    bestSeason: "October – March",
    groupSize: "6 – 20 people",
    price: "₹ — / person",
    image: shaniwar,
    short: "Step inside the Peshwa-era heart of Pune through stories, legends and stone.",
    overview:
      "A guided storytelling walk that unfolds the rise of the Peshwas, the daily rhythm of 18th-century Pune, and the architectural choices that shaped Shaniwar Wada. We walk slowly, look closely, and listen to history breathe.",
    history:
      "Built in 1732 by Bajirao I, Shaniwar Wada was once the seat of Maratha power. Its seven-storeyed wooden palaces, fountains and audience halls saw alliances, intrigues and the famous cry that still echoes — 'Kaka mala vachva'.",
    highlights: [
      "Expert storyteller guide",
      "Walk through Delhi Darwaza & Mastani Darwaza",
      "Decoding Peshwa architecture",
      "Hidden lanes of old Pune",
      "Photo stops & cultural anecdotes",
    ],
    itinerary: [
      { time: "Hour 1", title: "Gateway Stories", desc: "Meet at Delhi Darwaza. Introduction to Peshwa Pune." },
      { time: "Hour 2", title: "Inside the Wada", desc: "Walk the foundations, fountain courtyard and fire-scarred halls." },
      { time: "Hour 3", title: "Old Pune Lanes", desc: "Short walk into surrounding peths and traditional wadas." },
    ],
    inclusions: ["Heritage guide", "Entry tickets", "Bottled water", "Story handout"],
    exclusions: ["Travel to meeting point", "Personal expenses", "Food & beverages"],
    carry: ["Comfortable walking shoes", "Cap & sunglasses", "Water bottle", "Curiosity"],
    whoCanJoin: "Suitable for ages 8+. Friendly for families and senior citizens.",
    faqs: [
      { q: "Is this walk suitable for children?", a: "Yes — we keep storytelling engaging for ages 8 and above." },
      { q: "Will there be a lot of walking?", a: "Around 1.5 – 2 km at an easy pace, with frequent stops." },
    ],
  },
  {
    slug: "sinhagad-fort-heritage-trail",
    title: "Sinhagad Fort Heritage Trail",
    category: "Fort Tour",
    location: "Pune",
    duration: "Half Day",
    difficulty: "Moderate",
    bestFor: "Trek lovers, families, history enthusiasts",
    bestSeason: "June – February",
    groupSize: "8 – 25 people",
    price: "₹ — / person",
    image: sinhagad,
    short: "Walk the ramparts where Tanaji Malusare wrote his name into legend.",
    overview:
      "From the Pune Darwaza to Kalyan Darwaza, this trail blends a gentle climb with deep storytelling around the 1670 Battle of Sinhagad and Maratha military genius.",
    history:
      "Originally Kondhana, this fort guarded a vital route into the Deccan. Tanaji's night assault gave Shivaji Maharaj a victory remembered in the line — 'Gad ala pan Sinha gela'.",
    highlights: [
      "Tanaji Malusare memorial",
      "Pune & Kalyan Darwaza walk",
      "Sahyadri viewpoints",
      "Local kanda bhaji & taak experience",
      "Battle storytelling on-site",
    ],
    itinerary: [
      { time: "Morning", title: "Drive & Ascent", desc: "Drive from Pune; light climb to the fort." },
      { time: "Mid-day", title: "Fort Walk", desc: "Walk the ramparts with on-site storytelling." },
      { time: "Afternoon", title: "Local Lunch", desc: "Traditional pithla bhakri at the fort." },
    ],
    inclusions: ["Transport from Pune", "Heritage guide", "Light snacks", "First-aid"],
    exclusions: ["Lunch", "Personal expenses"],
    carry: ["Trekking shoes", "Rain jacket (monsoon)", "Water (1 L)", "Light backpack"],
    whoCanJoin: "Anyone reasonably fit, ages 10+.",
    faqs: [
      { q: "How tough is the climb?", a: "Moderate — about 45 minutes of steady walking." },
      { q: "Is monsoon a good time?", a: "Yes, but expect mist, slippery rocks and wet shoes." },
    ],
  },
  {
    slug: "shivneri-fort-tour",
    title: "Shivneri Fort Tour",
    category: "Fort Tour",
    location: "Junnar",
    duration: "Full Day",
    difficulty: "Moderate",
    bestFor: "History lovers, students, families",
    bestSeason: "October – February",
    groupSize: "8 – 25 people",
    price: "₹ — / person",
    image: shivneri,
    short: "Walk through the birthplace of Chhatrapati Shivaji Maharaj.",
    overview:
      "A full-day journey to Shivneri — the fort where a young Shivaji absorbed the lessons of Jijabai. We explore the seven gates, water cisterns and the very rooms that shaped Maratha history.",
    history:
      "A hill fort dating back to the 1st century, Shivneri rose to historical importance in 1630 when Chhatrapati Shivaji Maharaj was born here. Its design is a textbook of Deccan fortification.",
    highlights: [
      "Seven darwazas walk",
      "Shivai Devi temple",
      "Birthplace chamber",
      "Storytelling on Jijabai's parenting",
      "Junnar caves viewpoint",
    ],
    itinerary: [
      { time: "07:00", title: "Depart Pune", desc: "Comfortable drive to Junnar." },
      { time: "10:30", title: "Fort Climb", desc: "Walk through all seven gates with stories." },
      { time: "13:30", title: "Local Lunch", desc: "Traditional Junnar thali." },
      { time: "16:00", title: "Return", desc: "Drive back to Pune." },
    ],
    inclusions: ["AC transport", "Guide", "Breakfast & lunch", "Entry fees"],
    exclusions: ["Personal expenses", "Tips"],
    carry: ["Walking shoes", "Cap", "Water", "ID proof"],
    whoCanJoin: "Ages 10+. Reasonable fitness needed.",
    faqs: [
      { q: "Is food included?", a: "Yes, breakfast and a traditional thali lunch are included." },
    ],
  },
  {
    slug: "parvati-hill-heritage-walk",
    title: "Parvati Hill Heritage Walk",
    category: "Heritage Walk",
    location: "Pune",
    duration: "2 Hours",
    difficulty: "Easy to Moderate",
    bestFor: "Families, senior citizens, students",
    bestSeason: "Year-round",
    groupSize: "6 – 20 people",
    price: "₹ — / person",
    image: parvati,
    short: "A sunrise climb into Pune's spiritual and Peshwa-era memory.",
    overview:
      "An easy heritage climb to Parvati's temple complex — one of Pune's oldest. We unpack the Peshwa connection, the Devdeveshwar shrine and the panoramic story the city tells from above.",
    history:
      "Built between 1749 and 1758 by Nanasaheb Peshwa, Parvati hill houses the Devdeveshwar, Vishnu, Vitthal and Kartikeya shrines and the Peshwa museum.",
    highlights: [
      "Sunrise city panorama",
      "Devdeveshwar shrine stories",
      "Peshwa museum visit",
      "Heritage architecture talk",
      "Easy climb of 103 steps",
    ],
    itinerary: [
      { time: "06:00", title: "Meet at base", desc: "Brief introduction & warm-up." },
      { time: "06:30", title: "Climb", desc: "Easy ascent with story stops." },
      { time: "07:30", title: "Temple complex", desc: "Visit shrines and museum." },
    ],
    inclusions: ["Guide", "Story handout"],
    exclusions: ["Travel", "Refreshments"],
    carry: ["Walking shoes", "Water", "Light jacket"],
    whoCanJoin: "All ages. Senior-citizen friendly with breaks.",
    faqs: [{ q: "Is it safe early morning?", a: "Yes, the route is well-lit and busy with regular walkers." }],
  },
  {
    slug: "kondane-caves-exploration",
    title: "Kondane Caves Exploration",
    category: "Ancient Caves Tour",
    location: "Karjat",
    duration: "Full Day",
    difficulty: "Moderate",
    bestFor: "Adventure and heritage lovers",
    bestSeason: "July – February",
    groupSize: "8 – 20 people",
    price: "₹ — / person",
    image: kondane,
    short: "Step into 2nd-century BCE Buddhist rock-cut wonders.",
    overview:
      "A full-day exploration of the Kondane caves — a beautifully carved chaitya and viharas tucked in the Sahyadris. We blend a short trek, ancient trade-route history and rock-cut architecture.",
    history:
      "Carved around the 2nd century BCE, Kondane sat on an ancient trade route linking the Konkan to the Deccan. Its chaitya hall is among the earliest examples of Buddhist rock architecture in India.",
    highlights: [
      "Chaitya hall walk-through",
      "Vihara cells exploration",
      "Trade-route storytelling",
      "Waterfall viewpoint (monsoon)",
      "Local village interaction",
    ],
    itinerary: [
      { time: "06:30", title: "Depart", desc: "Drive from Pune / Mumbai." },
      { time: "10:00", title: "Trek", desc: "1.5 hr trek to caves." },
      { time: "12:30", title: "Caves tour", desc: "On-site storytelling and exploration." },
      { time: "15:00", title: "Return", desc: "Drive back." },
    ],
    inclusions: ["Transport", "Guide", "Breakfast", "First-aid"],
    exclusions: ["Lunch", "Personal expenses"],
    carry: ["Trekking shoes", "Water (2 L)", "Snacks", "Rain gear (monsoon)"],
    whoCanJoin: "Ages 12+. Should be comfortable with light trekking.",
    faqs: [{ q: "Is the trek difficult?", a: "Moderate. ~3 km one way with some rocky patches." }],
  },
  {
    slug: "gondeshwar-temple-architecture-tour",
    title: "Gondeshwar Temple Architecture Tour",
    category: "Temple & Architecture",
    location: "Sinnar",
    duration: "Full Day",
    difficulty: "Easy",
    bestFor: "Architecture lovers, photographers, families",
    bestSeason: "October – March",
    groupSize: "8 – 25 people",
    price: "₹ — / person",
    image: gondeshwar,
    short: "A masterpiece of Hemadpanthi architecture, decoded stone by stone.",
    overview:
      "A guided study of the 12th-century Gondeshwar temple complex — five shrines arranged in panchayatana style, with sculpture, geometry and mythology decoded by an expert.",
    history:
      "Built in the 11–12th century by the Yadava rulers, Gondeshwar is among the finest surviving Hemadpanthi temples — assembled in stone without mortar.",
    highlights: [
      "Panchayatana layout walk",
      "Sculptural iconography",
      "Yadava-era history",
      "Photography session",
      "Local Sinnar lunch",
    ],
    itinerary: [
      { time: "07:00", title: "Depart", desc: "Drive from Pune to Sinnar." },
      { time: "11:00", title: "Temple study", desc: "Detailed guided tour." },
      { time: "14:00", title: "Lunch", desc: "Traditional Maharashtrian thali." },
      { time: "17:00", title: "Return", desc: "Drive back." },
    ],
    inclusions: ["Transport", "Expert guide", "Breakfast & lunch"],
    exclusions: ["Personal expenses", "Tips"],
    carry: ["Comfortable shoes", "Camera", "Water", "Cap"],
    whoCanJoin: "All ages. No fitness barrier.",
    faqs: [{ q: "Can we photograph inside?", a: "Yes — Gondeshwar is photographer-friendly." }],
  },
];

export const getTour = (slug: string) => tours.find((t) => t.slug === slug);

export const upcomingTours = [
  { slug: "shaniwar-wada-heritage-walk", date: "May 11, 2026", seats: 8 },
  { slug: "sinhagad-fort-heritage-trail", date: "May 17, 2026", seats: 12 },
  { slug: "shivneri-fort-tour", date: "May 24, 2026", seats: 14 },
  { slug: "parvati-hill-heritage-walk", date: "June 1, 2026", seats: 10 },
  { slug: "kondane-caves-exploration", date: "June 14, 2026", seats: 9 },
  { slug: "gondeshwar-temple-architecture-tour", date: "June 28, 2026", seats: 16 },
];

export const blogPosts = [
  {
    slug: "legacy-of-maharashtra-forts",
    title: "The Legacy of Maharashtra Forts",
    date: "April 12, 2026",
    category: "Forts",
    excerpt: "From Sahyadri ridges to coastal sea-forts — why these stones still speak to us today.",
    image: sinhagad,
  },
  {
    slug: "why-heritage-walks-matter",
    title: "Why Heritage Walks Are Important",
    date: "April 02, 2026",
    category: "Heritage Walks",
    excerpt: "Walking slowly through history changes how we see our cities. Here's why.",
    image: shaniwar,
  },
  {
    slug: "hidden-temples-around-pune",
    title: "Hidden Temples Around Pune",
    date: "March 22, 2026",
    category: "Temples",
    excerpt: "Five lesser-known temples around Pune that tell big stories.",
    image: gondeshwar,
  },
  {
    slug: "storytelling-makes-travel-memorable",
    title: "How Storytelling Makes Travel Memorable",
    date: "March 10, 2026",
    category: "Culture",
    excerpt: "Memory clings to story. Here's how we design tours people remember for years.",
    image: parvati,
  },
  {
    slug: "student-heritage-tours",
    title: "Student Heritage Tours in Maharashtra",
    date: "Feb 28, 2026",
    category: "Education",
    excerpt: "How a well-designed heritage trip can change a student's relationship with history.",
    image: shivneri,
  },
];
