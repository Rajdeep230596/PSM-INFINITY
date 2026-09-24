export const YACHTS_HERO = {
  left: {
    eyebrow: "Territory / Mediterranean & Polar",
    headline: ["Sovereign", "Waters."],
    cta: "View Fleet Reach",
  },
  right: {
    eyebrow: "Protocol / White-Glove",
    headline: ["Bespoke", "Berths."],
    cta: "Commission Charter",
  },
  center: {
    image: "/assets/yachts/hero-centerpiece.jpg",
    imageAlt: "Black and gold megayacht Aurum Obsidian displayed on a round marble plinth in a palatial hall",
  },
} as const;

export const YACHTS_STRIP = "Curated Tonnage · Verified Classifications";

export const YACHTS_VESSELS = [
  {
    id: "polaris-explorer",
    index: "01",
    title: "The Polaris Explorer",
    eyebrow: "Ice-Class · Helipad · 16 Guests",
    spec: "Submersible bay · Expedition crew · Polar-ready classification",
    image: "/assets/yachts/pedestal-explorer.jpg",
    imageAlt: "Ice-class explorer yacht with helipad on a bronze museum plinth",
  },
  {
    id: "aethereal-cruiser",
    index: "02",
    title: "Aethereal Day Cruiser",
    eyebrow: "24M Length · 40–50 Kn · Sunset Service",
    spec: "Open cockpit · Quilted sunpads · Shadow-boat pairing",
    image: "/assets/yachts/pedestal-day-cruiser.jpg",
    imageAlt: "Bronze open day cruiser on a black marble plinth beneath a palatial arch",
  },
  {
    id: "aethereal-sloop",
    index: "03",
    title: "Aethereal Sloop, Monaco",
    eyebrow: "Carbon Hull · Gold Rig · 8 Guests",
    spec: "Performance spar · Teak cockpit · Closed-loop charter",
    image: "/assets/yachts/pedestal-sloop.jpg",
    imageAlt: "Black carbon sailing yacht with gold fittings on a circular black plinth",
  },
] as const;

export const YACHTS_TIERS = [
  { id: "ice-class", label: "Ice-Class Explorers", icon: "snowflake" as const },
  { id: "mega-yachts", label: "Mega-Yachts (70m+)", icon: "ship" as const },
  { id: "day-cruisers", label: "High-Speed Day Cruisers", icon: "gauge" as const },
] as const;

export const YACHTS_DECK = {
  image: "/assets/yachts/yacht-deck-lounge.jpg",
  imageAlt: "Quilted gold deck lounges facing a sunset over Venetian waters",
  tag: "Deck Protocol",
  title: "Aethereal Sundeck",
} as const;

export const YACHTS_DOSSIER = {
  bow: {
    image: "/assets/yachts/pedestal-yacht-bow.jpg",
    imageAlt: "Aethereal yacht bow with gold lighting on a black stone water plinth",
    caption: "Aethereal bow · Studio plinth",
  },
  specs: [
    {
      id: "bridge",
      image: "/assets/yachts/dossier-bridge.jpg",
      imageAlt: "Backlit onyx helm with dual throttles, crystal decanters, and champagne flutes",
      eyebrow: "Bridge / Throttle",
      title: "Onyx Helm Console",
      meta: "Twin throttles · Night telemetry",
    },
    {
      id: "bar",
      image: "/assets/yachts/dossier-onyx-bar.jpg",
      imageAlt: "Illuminated onyx salon bar with crystal decanter and champagne flutes",
      eyebrow: "Salon / Cellar",
      title: "Backlit Onyx Bar",
      meta: "White-glove provisioning · Aethereal",
    },
  ],
  manifesto:
    "Every yacht allocation includes verified class certificates, private berth securing in Monaco and Amalfi, onboard white-glove cellar provisioning, and synchronized airside transfers.",
  atmosphere: "/assets/yachts/dossier-onyx-bar.jpg",
} as const;
