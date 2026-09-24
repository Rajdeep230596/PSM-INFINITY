export const ITINERARIES_HERO = {
  left: {
    eyebrow: "Sector / Transatlantic",
    headline: ["Unrestricted", "Corridors."],
    cta: "Explore Reach",
  },
  right: {
    eyebrow: "Protocol / Airside",
    headline: ["Diplomatic", "Clearance."],
    cta: "Commission Route",
  },
  center: {
    image: "/assets/itineraries/hero-centerpiece.jpg",
    imageAlt: "Black and gold private jet displayed on a marble plinth beneath a palatial arch",
  },
} as const;

export const ITINERARIES_STRIP = "Monumental Airframes · Standing Allocations";

export const ITINERARIES_AIRFRAMES = [
  {
    id: "gulfstream-g700",
    index: "01",
    title: "Gulfstream G700 Flagship",
    eyebrow: "Mach 0.925 · 7,500 NM Range",
    spec: "Circadian cabin lighting · Whisper-quiet living · 5 suite zones",
    image: "/assets/itineraries/pedestal-g700.jpg",
    imageAlt: "Gulfstream G700 in a dark hangar with rose-gold livery and air-stair open",
  },
  {
    id: "global-7500",
    index: "02",
    title: "Bombardier Global 7500",
    eyebrow: "Mach 0.925 · 7,700 NM Range",
    spec: "Four living spaces · Overnight principal suite · True intercontinental legs",
    image: "/assets/itineraries/pedestal-falcon-10x.jpg",
    imageAlt: "Bronze-lit private jet in a dark hangar with air-stair open",
  },
  {
    id: "falcon-10x",
    index: "03",
    title: "Dassault Falcon 10X",
    eyebrow: "Widest Cabin · 7,500 NM Range",
    spec: "Low-speed approach · Tallest aisle · Monument allocation lighting",
    image: "/assets/itineraries/pedestal-falcon-monument.jpg",
    imageAlt: "Dassault Falcon 10X under a gold hangar arch with open air-stair",
  },
] as const;

export const ITINERARIES_TIERS = [
  {
    id: "head-of-state",
    label: "Head-of-State ACJ",
    icon: "crown" as const,
  },
  {
    id: "ultra-long-range",
    label: "Ultra Long Range",
    icon: "gauge" as const,
  },
  {
    id: "helicopter-shuttle",
    label: "Helicopter Shuttle",
    icon: "helicopter" as const,
  },
] as const;

export const ITINERARIES_CABIN = {
  image: "/assets/itineraries/leather-cabin-detail.jpg",
  imageAlt: "Quilted champagne leather cabin seat with gold buckle and burl side table",
  tag: "Cabin Protocol",
  title: "Quilted Principal Suite",
} as const;

export const ITINERARIES_DOSSIER = {
  tailfin: {
    image: "/assets/itineraries/pedestal-tailfin.jpg",
    imageAlt: "Blue Global 7500 tailfin with gold crest on a granite museum pedestal",
    caption: "Crested tail · Global 7500",
  },
  specs: [
    {
      id: "throttle",
      image: "/assets/itineraries/dossier-throttle.jpg",
      imageAlt: "Amber-lit flight idle throttle quadrant and avionics pedestal",
      eyebrow: "Avionics / Flight Idle",
      title: "Throttle Quadrant",
      meta: "XPDR 7500 · Autopilot engaged",
    },
    {
      id: "champagne",
      image: "/assets/itineraries/dossier-champagne.jpg",
      imageAlt: "Crystal decanter and champagne flutes on a burl cabin table",
      eyebrow: "Provisioning / Cellar",
      title: "Airside Credenza",
      meta: "Crystal service · Principal cabin",
    },
  ],
  manifesto:
    "Every route requisition is paired with diplomatic airspace clearance, synchronized airside chauffeur transfers, and tailored onboard provisioning.",
  chart: "/assets/itineraries/navigation-chart.jpg",
} as const;
