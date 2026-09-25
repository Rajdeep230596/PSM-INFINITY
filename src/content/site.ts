import { WHATSAPP_CONFIG, getWhatsAppUrl } from "@/lib/constants";

export const site = {
  name: "PSM Infinity",
  url: "https://www.psminfinity.com",
  description:
    "PSM Infinity is a Kolkata studio for personalised branding, corporate identity, technology, textile, and logistics — composed as one visual experience.",
  tagline: "Your world, thoughtfully curated.",
  phoneDisplay: "+91 90073 31000",
  phoneTel: "+919007331000",
  whatsappDisplay: "+91 90074 31000",
  whatsappHref: "https://wa.me/919007431000",
  email: "psminfinity@gmail.com",
  emailIndia: "psminfinityindia@gmail.com",
  telegramHandle: "@psminfinity",
  telegramHref: "https://t.me/psminfinity",
  whatsappE164: WHATSAPP_CONFIG.phoneNumber,
  whatsappPrefill: WHATSAPP_CONFIG.defaultMessage,
  hours: "Mon–Sat, 10:00 am – 8:00 pm",
  addressLines: [
    "29 Palit Street, Flat 3A (Amritkunj)",
    "Opp. Maddox Square Park North gate",
    "Kolkata 700019",
  ],
  navigation: [
    { href: "/", label: "Home" },
    { href: "/ground-zero", label: "Ground Zero" },
    { href: "/first-ascent", label: "First Ascent" },
    { href: "/second-ascent", label: "Second Ascent" },
    { href: "/skydeck", label: "Skydeck" },
    { href: "/services", label: "Services" },
    { href: "/locations", label: "Locations" },
    { href: "/our-story", label: "Our Story" },
    { href: "/partner", label: "Partner" },
  ],
} as const;

export const FOOTER_MANIFESTO = {
  eyebrow: "Profile / Manifesto",
  titleLead: "PSM INFINITY",
  titleAccent: "Personal Curated Concierge",
  tagline: "Your world, thoughtfully curated.",
  paragraphs: [
    "A discreet, personalised concierge service designed around your lifestyle, preferences and every little detail that matters.",
    "From exclusive experiences and dining to travel, events, celebrations, lifestyle requests and hard-to-find arrangements — PSM INFINITY takes care of the details, so you can simply enjoy the experience.",
  ],
  signoff: "Private. Personal. Precise.",
  pledge: "Your request. Our expertise. Your experience.",
} as const;

export const FOOTER_DOMAINS = [
  { href: "/ground-zero", label: "Ground Zero — Duplex Atelier" },
  { href: "/ground-zero/couture", label: "Haute Couture & Wardrobes" },
  { href: "/ground-zero/real-estate", label: "Architectural Portfolios" },
  { href: "/ground-zero/gardens", label: "Private Botanical Gardens" },
  { href: "/ground-zero/collectibles", label: "Curated Collectibles & Chassis" },
  { href: "/first-ascent/itineraries", label: "First Ascent — Private Aviation" },
  { href: "/first-ascent/yachts", label: "Curated Maritime Charters" },
  { href: "/first-ascent/villas", label: "Sanctuary Estates & Villas" },
  { href: "/first-ascent/chauffeur", label: "Diplomatic & Armored Chauffeur" },
  { href: "/second-ascent", label: "Second Ascent — Private Events" },
  { href: "/skydeck", label: "Skydeck" },
  { href: "/locations", label: "Locations" },
  { href: "/our-story", label: "Our Story" },
  { href: "/partner", label: "Work with the studio" },
] as const;

export const FOOTER_SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/psminfinity?igsi=MWtjdjNuM2R3ZWlsbQ==",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1HkT3pWfU4/?mibextid=wwXIfr",
  },
  {
    label: "FB Business",
    href: "https://www.facebook.com/share/1DYonNgQs2/?mibextid=wwXIfr",
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@psminfinity?si=Q9FvV7QZ-hZA44O4",
  },
  {
    label: "Telegram",
    href: "https://t.me/psminfinity",
  },
] as const;

export function getWhatsAppHref(customMessage?: string) {
  return getWhatsAppUrl(customMessage);
}
