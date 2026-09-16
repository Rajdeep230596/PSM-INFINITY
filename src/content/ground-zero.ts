export const GROUND_ZERO_LINKS = [
  { href: "/ground-zero/shopping", label: "Personal Shopping" },
  { href: "/ground-zero/real-estate", label: "Real Estate Portfolios" },
  { href: "/ground-zero/landscaping", label: "Landscaping Masterplans" },
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
  shopping: {
    slug: "shopping",
    code: "01",
    heading: "Personal Premium Shopping",
    subhead:
      "Private haute couture allocations, runway archives, and a styling concierge that works from the person, not the rack.",
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
      "Prime architectural estates, private duplexes, and international residential holdings assembled as a living portfolio.",
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
      "Estate grounds, botanical courts, and indoor-outdoor living drawn as one composition with the architecture.",
    cta: "Commission Estate Grounds",
    pillars: [
      { title: "Garden as Architecture", body: "Axes, water, and canopy planned with the same discipline as the house." },
      { title: "Climate Honesty", body: "Planting that holds in the actual weather, not a catalogue of wishful exotics." },
      { title: "Staffed Grounds", body: "A grounds programme the house team can live with after the designers leave." },
      { title: "Night Rooms", body: "Lighting and scent considered for evening use, not only the daytime photograph." },
    ],
  },
  collectibles: {
    slug: "collectibles",
    code: "04",
    heading: "Curated Collectibles",
    subhead:
      "Ultra-rare timepieces, bespoke hypercars, and unlisted museum-grade objects sourced as a single acquisition desk.",
    cta: "Open Acquisition Mandate",
    pillars: [
      { title: "Provenance First", body: "Papers, service history, and ownership chain completed before a price is discussed." },
      { title: "Global Sourcing", body: "Dealers, houses, and private collectors introduced only when the brief is exact." },
      { title: "Quiet Custody", body: "Transport, bonding, and vaulting arranged so the object never sits in a public queue." },
      { title: "Long Memory", body: "A desk that remembers the last allocation so the next one does not repeat it." },
    ],
  },
};
