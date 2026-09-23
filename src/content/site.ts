import { WHATSAPP_CONFIG, getWhatsAppUrl } from "@/lib/constants";

export const site = {
  name: "PSM Infinity",
  url: "https://www.psminfinity.com",
  description:
    "PSM Infinity is a Kolkata studio for personalised branding, corporate identity, technology, textile, and logistics — composed as one visual experience.",
  phoneDisplay: "+91 90074 31000",
  phoneTel: "+919007431000",
  email: "psminfinity@gmail.com",
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
    { href: "/services", label: "Services" },
    { href: "/locations", label: "Locations" },
    { href: "/our-story", label: "Our Story" },
    { href: "/partner", label: "Partner" },
  ],
} as const;

export function getWhatsAppHref(customMessage?: string) {
  return getWhatsAppUrl(customMessage);
}
