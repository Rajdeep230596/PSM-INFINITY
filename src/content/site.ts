export const site = {
  name: "PSM Infinity",
  url: "https://www.psminfinity.com",
  description:
    "PSM Infinity is a Kolkata studio for personalised branding, corporate identity, technology, textile, and logistics — composed as one visual experience.",
  phoneDisplay: "090073 31000",
  phoneTel: "+919007331000",
  email: "psminfinity@gmail.com",
  whatsappE164: "919007331000",
  whatsappPrefill: "Hello PSM Infinity — I would like to discuss a business enquiry.",
  hours: "Mon–Sat, 10:00 am – 8:00 pm",
  addressLines: [
    "29 Palit Street, Flat 3A (Amritkunj)",
    "Opp. Maddox Square Park North gate",
    "Kolkata 700019",
  ],
  navigation: [
    { href: "/", label: "Home" },
    { href: "/first-ascent", label: "First Ascent" },
    { href: "/services", label: "Services" },
    { href: "/locations", label: "Locations" },
    { href: "/about", label: "Our Story" },
    { href: "/partner", label: "Partner" },
  ],
} as const;

export function getWhatsAppHref() {
  const params = new URLSearchParams({ text: site.whatsappPrefill });
  return `https://wa.me/${site.whatsappE164}?${params.toString()}`;
}
