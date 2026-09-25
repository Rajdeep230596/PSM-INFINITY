export const CHAUFFEUR_HERO = {
  left: {
    eyebrow: "Armored Protocol",
    headline: ["Ballistic", "Security."],
    cta: "View Armor Specs",
  },
  right: {
    eyebrow: "Diplomatic Escort",
    headline: ["Airside", "Tarmac."],
    cta: "Reserve Convoy",
  },
  center: {
    image: "/assets/chauffeur/hero-centerpiece.jpg",
    imageAlt: "Rolls-Royce Phantom VIII on a circular marble plinth beneath a palatial gold arch",
  },
} as const;

export const CHAUFFEUR_STRIP = "Tactical Chassis · Former Protection Officers";

export const CHAUFFEUR_FLEET = [
  {
    id: "maybach-s680",
    index: "01",
    title: "Mercedes-Maybach S680",
    eyebrow: "Rear Executive Suite · Champagne Cooler",
    spec: "Two-tone collection · Reclining lounge · Partition glass",
    image: "/assets/chauffeur/pedestal-maybach.jpg",
    imageAlt: "Two-tone Mercedes-Maybach S680 on a black marble studio plinth",
  },
  {
    id: "sentinel",
    index: "02",
    title: "Range Rover Sentinel VR8",
    eyebrow: "VR8 Ballistic Cabin · Run-Flat Mobility",
    spec: "Satin deep grey · Former protection officers · Chase vehicle",
    image: "/assets/chauffeur/pedestal-sentinel.jpg",
    imageAlt: "Range Rover Sentinel VR8 ballistic edition on a bronze museum plinth",
  },
  {
    id: "escalade",
    index: "03",
    title: "Cadillac Escalade Armored",
    eyebrow: "Ballistic Glass · Blacked-Out Trim",
    spec: "Armored executive edition · VR7/VR9 convoy pairing · Airside ready",
    image: "/assets/chauffeur/pedestal-escalade.jpg",
    imageAlt: "Matte-black armored Cadillac Escalade on a circular gold-lit marble plinth",
  },
] as const;

export const CHAUFFEUR_TIERS = [
  { id: "diplomatic", label: "Diplomatic Chauffeur", icon: "shield" as const },
  { id: "armored", label: "VR7/VR9 Armored Convoys", icon: "car" as const },
  { id: "airside", label: "Airport Airside Tarmac Transfers", icon: "plane" as const },
] as const;

export const CHAUFFEUR_LOUNGE = {
  image: "/assets/chauffeur/maybach-lounge-interior.jpg",
  imageAlt: "Maybach rear lounge with champagne flutes, walnut desk, and quilted cream leather",
  tag: "Cabin Protocol",
  title: "Maybach Lounge Interior",
} as const;

export const CHAUFFEUR_DOSSIER = {
  mascot: {
    image: "/assets/chauffeur/pedestal-spirit-ecstasy.jpg",
    imageAlt: "Illuminated Spirit of Ecstasy on a stone and grille museum plinth",
    caption: "Spirit of Ecstasy · Principal chassis",
  },
  specs: [
    {
      id: "gloves",
      image: "/assets/chauffeur/dossier-gloves.jpg",
      imageAlt: "White-gloved chauffeur at a Rolls-Royce wheel with crystal Spirit of Ecstasy",
      eyebrow: "Cockpit / Protocol",
      title: "Chauffeur Cockpit Gloves",
      meta: "White-glove cabin · Quiet dispatch",
    },
    {
      id: "ballistic",
      image: "/assets/chauffeur/dossier-ballistic.jpg",
      imageAlt: "Certified VR7/VR9 ballistic glass door seam with etched armor diagram",
      eyebrow: "Armor / Seam",
      title: "Ballistic Door Seam",
      meta: "VR7/VR9 cabin · Run-flat mobility",
    },
  ],
  manifesto:
    "Every mobility dispatch includes former protection officers with airside credentials, VR7/VR9 ballistic cabins, convoy timing to FBO and hotel arrivals, and luggage protocol staged before wheels-down.",
  atmosphere: "/assets/chauffeur/dossier-telemetry.jpg",
} as const;
