import shaniwarEntrance from "@/assets/gallery/shaniwar-entrance.jpg";
import shaniwarFront from "@/assets/gallery/shaniwar-front.jpg";
import shaniwarSide from "@/assets/gallery/shaniwar-side.jpg";
import sinhagadView from "@/assets/gallery/sinhagad-view.jpg";
import sinhagadRamparts from "@/assets/gallery/sinhagad-ramparts.jpg";
import sinhagadGate from "@/assets/gallery/sinhagad-gate.jpg";
import shivneriMain from "@/assets/gallery/shivneri-main.jpg";
import shivneriView from "@/assets/gallery/shivneri-view.jpg";
import shivneriGate from "@/assets/gallery/shivneri-gate.jpg";
import parvatiHill from "@/assets/gallery/parvati-hill.jpg";
import parvatiEntrance from "@/assets/gallery/parvati-entrance.jpg";
import parvatiShikhara from "@/assets/gallery/parvati-shikhara.jpg";
import kondaneSideView from "@/assets/gallery/kondane-side-view.jpg";
import kondaneChaitya from "@/assets/gallery/kondane-chaitya.jpg";
import kondaneOverview from "@/assets/gallery/kondane-overview.jpg";
import gondeshwarComplex from "@/assets/gallery/gondeshwar-complex.jpg";
import gondeshwarAngle from "@/assets/gallery/gondeshwar-angle.jpg";
import gondeshwarDetail from "@/assets/gallery/gondeshwar-detail.jpg";
import hampiVitthala from "@/assets/gallery/hampi-vitthala.jpg";
import hampiPillars from "@/assets/gallery/hampi-pillars.jpg";
import badamiCave from "@/assets/gallery/badami-cave.jpg";
import pattadakalTemple from "@/assets/gallery/pattadakal-temple.jpg";
import aiholeDurga from "@/assets/gallery/aihole-durga.jpg";
import varanasiMunshiGhat from "@/assets/gallery/varanasi-munshi-ghat.jpg";
import varanasiDashashwamedh from "@/assets/gallery/varanasi-dashashwamedh.jpg";
import prayagrajSangam from "@/assets/gallery/prayagraj-sangam.jpg";

export type GalleryImage = {
  src: string;
  alt: string;
};

export const shaniwarGallery: GalleryImage[] = [
  { src: shaniwarEntrance, alt: "Delhi Darwaza entrance at Shaniwar Wada" },
  { src: shaniwarFront, alt: "Front view of Shaniwar Wada illuminated at night" },
  { src: shaniwarSide, alt: "Side view of Shaniwar Wada walls and gate" },
];

export const sinhagadGallery: GalleryImage[] = [
  { src: sinhagadView, alt: "Wide hilltop view from Sinhagad Fort" },
  { src: sinhagadRamparts, alt: "Ramparts and stone walls at Sinhagad Fort" },
  { src: sinhagadGate, alt: "Historic gate at Sinhagad Fort" },
];

export const shivneriGallery: GalleryImage[] = [
  { src: shivneriMain, alt: "Main structure inside Shivneri Fort" },
  { src: shivneriView, alt: "Green hillside view of Shivneri Fort" },
  { src: shivneriGate, alt: "Mena Gate entrance at Shivneri Fort" },
];

export const parvatiGallery: GalleryImage[] = [
  { src: parvatiHill, alt: "Parvati Hill temple rising above the green hillside" },
  { src: parvatiEntrance, alt: "Entrance to the Parvati Hill temple complex" },
  { src: parvatiShikhara, alt: "Temple shikhara at Parvati Hill" },
];

export const kondaneGallery: GalleryImage[] = [
  { src: kondaneSideView, alt: "Side view of the Kondane cave complex" },
  { src: kondaneChaitya, alt: "Rock-cut chaitya details at Kondane Caves" },
  { src: kondaneOverview, alt: "Overview of the Kondane cave facade" },
];

export const gondeshwarGallery: GalleryImage[] = [
  { src: gondeshwarComplex, alt: "Wide view of the Gondeshwar Temple complex" },
  { src: gondeshwarAngle, alt: "Angled view of Gondeshwar Temple in Sinnar" },
  { src: gondeshwarDetail, alt: "Stone detail and shrine structures at Gondeshwar Temple" },
];

export const hampiBadamiGallery: GalleryImage[] = [
  { src: hampiVitthala, alt: "Stone mandapas at the Vitthala Temple complex in Hampi" },
  { src: hampiPillars, alt: "Carved temple architecture at Hampi" },
  { src: badamiCave, alt: "Rock-cut cave temple at Badami" },
  { src: pattadakalTemple, alt: "Temple view at Pattadakal" },
  { src: aiholeDurga, alt: "Durga Temple at Aihole under a clear sky" },
];

export const ayodhyaVaranasiPrayagrajGallery: GalleryImage[] = [
  { src: varanasiMunshiGhat, alt: "Boats at Munshi Ghat in Varanasi" },
  { src: varanasiDashashwamedh, alt: "Pilgrims and temple steps at Dashashwamedh Ghat in Varanasi" },
  { src: prayagrajSangam, alt: "Boats crossing the Triveni Sangam at Prayagraj" },
];
