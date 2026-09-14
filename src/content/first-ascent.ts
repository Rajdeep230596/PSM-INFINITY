export const FIRST_ASCENT_LINKS = [
  { href: "/first-ascent/itineraries", label: "Global Itineraries" },
  { href: "/first-ascent/yachts", label: "Yacht Charters" },
  { href: "/first-ascent/villas", label: "Bespoke Villas" },
  { href: "/first-ascent/chauffeur", label: "Chauffeur Fleet" },
] as const;

export type FirstAscentPillar = { title: string; body: string };
export type FirstAscentAsset = {
  name: string;
  eyebrow: string;
  spec: string;
  specMeta: string;
  image: string;
  fallback: string;
  status: string;
};
export type FirstAscentTool = "route" | "voyage" | "estate" | "mobility";

export type FirstAscentPageContent = {
  slug: string;
  code: string;
  heading: string;
  subhead: string;
  cta: string;
  deskTitle: string;
  pillars: FirstAscentPillar[];
  fleet: FirstAscentAsset[];
  tool: FirstAscentTool;
};

const FALLBACK = "/first-ascent/villa-coastal.jpg";

export const FIRST_ASCENT_PAGES: Record<string, FirstAscentPageContent> = {
  itineraries: {
    slug: "itineraries",
    code: "01",
    heading: "Intercontinental Private Itineraries",
    subhead:
      "Direct private terminal clearances, point-to-point bespoke flight scheduling, and dedicated tarmac escorts worldwide.",
    cta: "Commission Flight Route",
    deskTitle: "Flight Route Estimator",
    tool: "route",
    pillars: [
      { title: "Diplomatic Discretion", body: "Closed-loop manifests and identity shielding from public FBO boards." },
      { title: "Tarmac Escorts", body: "Airside transfer teams staged before wheels-down at every destination." },
      { title: "Slot Priority", body: "Preferred window negotiation at congested intercontinental terminals." },
      { title: "Customs Preclearance", body: "Paperwork completed in flight so the cabin door opens onto a cleared path." },
    ],
    fleet: [
      {
        name: "Gulfstream G700",
        eyebrow: "Ultra-long range",
        spec: "7,500 nm",
        specMeta: "19 passengers",
        image: "/first-ascent/jet-wing.jpg",
        fallback: "/first-ascent/jet-private.jpg",
        status: "Slot ready",
      },
      {
        name: "Bombardier Global 7500",
        eyebrow: "Four living spaces",
        spec: "7,700 nm",
        specMeta: "Overnight suite",
        image: "/first-ascent/jet-approach.jpg",
        fallback: "/first-ascent/jet-wing.jpg",
        status: "Allocation",
      },
      {
        name: "Dassault Falcon 10X",
        eyebrow: "Widest cabin",
        spec: "7,500 nm",
        specMeta: "Low-speed approach",
        image: "/first-ascent/jet-private.jpg",
        fallback: "/first-ascent/jet-wing.jpg",
        status: "On request",
      },
    ],
  },
  yachts: {
    slug: "yachts",
    code: "02",
    heading: "Curated Maritime Charters",
    subhead:
      "Access to verified mega-yachts and expedition vessels across the Mediterranean, Caribbean, and remote archipelagos.",
    cta: "Inquire Vessel Allocation",
    deskTitle: "Voyage Configurator",
    tool: "voyage",
    pillars: [
      { title: "Verified Tonnage", body: "ISM-audited yachts with current class certificates and owner references." },
      { title: "Crew Ratio", body: "Officer-to-guest staffing matched to itinerary, not brochure minimums." },
      { title: "Seasonal Routing", body: "Med, Caribbean, and high-latitude windows planned around weather and events." },
      { title: "White-glove Provisioning", body: "Galley, cellar, and toys staged before your party steps aboard." },
    ],
    fleet: [
      {
        name: "60m+ Superyachts",
        eyebrow: "Mediterranean",
        spec: "12–16 guests",
        specMeta: "Helipad · Beach club",
        image: "/first-ascent/yacht-super.jpg",
        fallback: "/first-ascent/yacht-motor.jpg",
        status: "Med season",
      },
      {
        name: "Ice-Class Explorers",
        eyebrow: "Expedition",
        spec: "Polar-ready",
        specMeta: "Submersible garage",
        image: "/first-ascent/yacht-aerial.jpg",
        fallback: "/first-ascent/yacht-super.jpg",
        status: "Expedition",
      },
      {
        name: "High-Speed Day Cruisers",
        eyebrow: "Shadow boat",
        spec: "40–50 kn",
        specMeta: "Sunset service",
        image: "/first-ascent/yacht-day.jpg",
        fallback: "/first-ascent/yacht-motor.jpg",
        status: "Day charter",
      },
    ],
  },
  villas: {
    slug: "villas",
    code: "03",
    heading: "Sanctuary Estates & Private Villas",
    subhead:
      "Discreet private residences, alpine chalets, and secluded island compounds not listed on public markets.",
    cta: "Request Portfolio Lookbook",
    deskTitle: "Estate Filter",
    tool: "estate",
    pillars: [
      { title: "Off-Market Inventory", body: "Residences circulated privately among family offices, never on OTAs." },
      { title: "Staffed Houses", body: "Chefs, security, and house managers already in place on arrival." },
      { title: "Privacy Protocols", body: "NDA-bound access, drone exclusion, and dedicated approach roads." },
      { title: "Lookbook Access", body: "A curated folio of compounds released only after a brief is qualified." },
    ],
    fleet: [
      {
        name: "Coastal Sanctuary",
        eyebrow: "Private cove",
        spec: "8–12 suites",
        specMeta: "Cliff infinity",
        image: "/first-ascent/villa-coastal.jpg",
        fallback: "/first-ascent/villa-modern.jpg",
        status: "Lookbook",
      },
      {
        name: "Mountain Retreat",
        eyebrow: "Alpine chalet",
        spec: "Ski-in staffed",
        specMeta: "Heli pad",
        image: "/first-ascent/villa-mountain.jpg",
        fallback: FALLBACK,
        status: "Winter",
      },
      {
        name: "Private Island",
        eyebrow: "Exclusive use",
        spec: "Boat & air",
        specMeta: "Full estate crew",
        image: "/first-ascent/villa-island.jpg",
        fallback: "/first-ascent/villa-modern.jpg",
        status: "Secluded",
      },
      {
        name: "Tuscan Estate",
        eyebrow: "Working vineyard",
        spec: "Chef's garden",
        specMeta: "12th-c. tower",
        image: "/first-ascent/villa-tuscan.jpg",
        fallback: "/first-ascent/villa-coastal.jpg",
        status: "Harvest",
      },
    ],
  },
  chauffeur: {
    slug: "chauffeur",
    code: "04",
    heading: "On-Demand Chauffeur & Armored Mobility",
    subhead:
      "Vetted diplomatic chauffeurs, armored vehicle configurations (VR7/VR9), and synchronized airport convoys.",
    cta: "Reserve Chauffeur Protocol",
    deskTitle: "Mobility Booking Matrix",
    tool: "mobility",
    pillars: [
      { title: "Diplomatic Drivers", body: "Former protection officers with airside and embassy route credentials." },
      { title: "VR7 / VR9 Armor", body: "Ballistic cabins certified for executive and high-threat corridors." },
      { title: "Convoy Sync", body: "Lead, principal, and chase vehicles timed to FBO and hotel arrivals." },
      { title: "Airport Airside", body: "Meet-and-greet on the tarmac with luggage and protocol already staged." },
    ],
    fleet: [
      {
        name: "Rolls-Royce Phantom VIII",
        eyebrow: "Whisper cabin",
        spec: "Extended wheelbase",
        specMeta: "Executive",
        image: "/first-ascent/car-rolls.jpg",
        fallback: "/first-ascent/car-sedan.jpg",
        status: "City ready",
      },
      {
        name: "Mercedes-Maybach S680",
        eyebrow: "Rear suite",
        spec: "Champagne cooler",
        specMeta: "Executive",
        image: "/first-ascent/car-sedan.jpg",
        fallback: "/first-ascent/car-rolls.jpg",
        status: "Concourse",
      },
      {
        name: "Armored Range Rover Sentinel",
        eyebrow: "VR9 convoy",
        spec: "Run-flat mobility",
        specMeta: "Armored",
        image: "/first-ascent/car-rover.jpg",
        fallback: "/first-ascent/car-sedan.jpg",
        status: "Armored",
      },
    ],
  },
};
