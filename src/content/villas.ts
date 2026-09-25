export const VILLAS_HERO = {
  left: {
    eyebrow: "Off-Market Inventory",
    headline: ["Secluded", "Estates."],
    cta: "Explore Folio",
  },
  right: {
    eyebrow: "Staffed Households",
    headline: ["Discreet", "Sanctuary."],
    cta: "Request Access",
  },
  center: {
    image: "/assets/villas/hero-centerpiece.jpg",
    imageAlt: "Cascades Villa Compound architectural model on a marble plinth beneath a gilded arch",
  },
} as const;

export const VILLAS_STRIP = "Confidential Holdings · Fully Staffed Arrivals";

export const VILLAS_ESTATES = [
  {
    id: "cascades",
    index: "01",
    title: "The Cascades Villa Compound",
    eyebrow: "Cliff Infinity · Private Cove · 8–12 Suites",
    spec: "Off-market coastal sanctuary · Staffed household · Dedicated approach road",
    image: "/assets/villas/pedestal-cascades.jpg",
    imageAlt: "Cascades Villa Compound architectural model with terraced pools on a black marble plinth",
  },
  {
    id: "les-cimes",
    index: "02",
    title: "Les Cimes Chalet, Megève",
    eyebrow: "Ski-In · Helipad · Winter Household",
    spec: "Fire terrace · Heated plunge · NDA-bound alpine arrival",
    image: "/assets/villas/pedestal-chalet.jpg",
    imageAlt: "Les Cimes Chalet architectural model in snow beneath a palatial arch",
  },
  {
    id: "palazzo-ulivi",
    index: "03",
    title: "Palazzo Degli Ulivi, Florence",
    eyebrow: "Courtyard · Olive Groves · Full Estate Crew",
    spec: "Private palazzo · Exclusive-use compound · Drone-exclusion perimeter",
    image: "/assets/villas/pedestal-palazzo.jpg",
    imageAlt: "Palazzo Degli Ulivi architectural model on a bronze museum plinth",
  },
] as const;

export const VILLAS_TIERS = [
  { id: "coastal", label: "Coastal Sanctuaries", icon: "waves" as const },
  { id: "alpine", label: "Alpine Chalets", icon: "mountain" as const },
  { id: "islands", label: "Private Islands", icon: "treePalm" as const },
] as const;

export const VILLAS_LOUNGE = {
  image: "/assets/villas/suite-terrace-lounge.jpg",
  imageAlt: "Suite terrace lounge at Palazzo Degli Ulivi opening onto a cypress allée at dusk",
  tag: "Suite Protocol",
  title: "Suite Terrace Lounge",
} as const;

export const VILLAS_DOSSIER = {
  colonnade: {
    image: "/assets/villas/pedestal-colonnade.jpg",
    imageAlt: "Stone colonnade and reflecting plunge at Palazzo Degli Ulivi",
    caption: "Colonnade plinth · Heritage holding",
  },
  specs: [
    {
      id: "biometric",
      image: "/assets/villas/dossier-biometric.jpg",
      imageAlt: "Palazzo Degli Ulivi biometric keypad and master key on a leather tray",
      eyebrow: "Access / Perimeter",
      title: "Biometric Security",
      meta: "Fingerprint arming · Master-key custody",
    },
    {
      id: "chef",
      image: "/assets/villas/dossier-chef.jpg",
      imageAlt: "Private chef plating scallops in the Palazzo Degli Ulivi kitchen",
      eyebrow: "Household / Galley",
      title: "Private Chef Service",
      meta: "Resident kitchen · White-glove dining",
    },
  ],
  manifesto:
    "Every villa allocation includes NDA-bound access, fully staffed households already in place on arrival, drone-exclusion perimeters, and a confidential folio released only after the brief is qualified.",
  atmosphere: "/assets/villas/dossier-blueprint.jpg",
} as const;
