export const GROUND_ZERO_LINKS = [
  { href: "/ground-zero/couture", label: "Haute Couture & Wardrobes" },
  { href: "/ground-zero/real-estate", label: "Real Estate Portfolios" },
  { href: "/ground-zero/landscaping", label: "Landscaping Masterplans" },
  { href: "/ground-zero/gardens", label: "Private Botanical Gardens" },
  { href: "/ground-zero/collectibles", label: "Curated Collectibles" },
] as const;

export type GroundZeroPageContent = {
  slug: string;
  code: string;
  heading: string;
  subhead: string;
  cta: string;
  pillars: { title: string; body: string }[];
};

export const GROUND_ZERO_PAGES: Record<string, GroundZeroPageContent> = {
  couture: {
    slug: "couture",
    code: "01",
    heading: "Haute Couture & Wardrobes",
    subhead:
      "Private salon appointments, archive runway acquisitions, and a styling concierge that works from the person, not the rack.",
    cta: "Open Wardrobe Brief",
    pillars: [
      { title: "Closed Atelier Access", body: "Maison allocations and archive pieces circulated privately, never on public e-commerce." },
      { title: "Fit Ritual", body: "In-residence or studio fittings with a dresser who already knows the calendar." },
      { title: "Seasonal Retainers", body: "Wardrobe programmes built around travel, events, and climate rather than lookbooks." },
      { title: "Discreet Delivery", body: "Pressed, labelled, and staged — to the suite, the jet, or the house." },
    ],
  },
  "real-estate": {
    slug: "real-estate",
    code: "02",
    heading: "Real Estate Portfolios",
    subhead:
      "Prime architectural estates, private duplexes, and off-market residential holdings assembled as a living portfolio.",
    cta: "Request Portfolio Lookbook",
    pillars: [
      { title: "Off-Market Holdings", body: "Residences introduced through family offices and architects, not listing portals." },
      { title: "Architectural Vetting", body: "Structure, light, and staff flow reviewed before a viewing is ever offered." },
      { title: "Multi-City Books", body: "A coherent set of houses across cities, not a scatter of unrelated keys." },
      { title: "Quiet Approach", body: "Viewings staged without boards, drones, or a public showing calendar." },
    ],
  },
  landscaping: {
    slug: "landscaping",
    code: "03",
    heading: "Landscaping Masterplans",
    subhead:
      "Integrated architectural terrain, estate hardscaping, and indoor-outdoor living drawn as one composition with the house.",
    cta: "Commission Estate Grounds",
    pillars: [
      { title: "Garden as Architecture", body: "Axes, water, and canopy planned with the same discipline as the house." },
      { title: "Climate Honesty", body: "Planting that holds in the actual weather, not a catalogue of wishful exotics." },
      { title: "Staffed Grounds", body: "A grounds programme the house team can live with after the designers leave." },
      { title: "Night Rooms", body: "Lighting and scent considered for evening use, not only the daytime photograph." },
    ],
  },
  gardens: {
    slug: "gardens",
    code: "04",
    heading: "Private Botanical Gardens",
    subhead:
      "Manicured emerald lawns, sculpted groves, water sanctuaries, and curated flora held as a private outdoor room.",
    cta: "Open Garden Mandate",
    pillars: [
      { title: "The Grand Lawn", body: "A quiet, exact plane of green sized for evening gatherings, not a public park." },
      { title: "Water Courts", body: "Still pools and rills placed to catch light and cool the rooms that face them." },
      { title: "Sculpted Groves", body: "Trees and understorey composed as architecture — shade, scent, and privacy in one." },
      { title: "Seasonal Flora", body: "A planting calendar the house can live with, refreshed without a public showing." },
    ],
  },
  collectibles: {
    slug: "collectibles",
    code: "05",
    heading: "Curated Collectibles",
    subhead:
      "Ultra-rare horological masterworks paired with bespoke hypercars and limited coachbuilt chassis.",
    cta: "Open Acquisition Mandate",
    pillars: [
      { title: "Provenance First", body: "Papers, service history, and ownership chain completed before a price is discussed." },
      { title: "Global Sourcing", body: "Dealers, houses, and private collectors introduced only when the brief is exact." },
      { title: "Quiet Custody", body: "Transport, bonding, and vaulting arranged so the object never sits in a public queue." },
      { title: "Long Memory", body: "A desk that remembers the last allocation so the next one does not repeat it." },
    ],
  },
};
