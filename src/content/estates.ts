export const ESTATES_HERO = {
  heading: "Architectural Sanctums & Off-Market Estates",
  subhead:
    "Private international residences, off-market European palazzos, and prime architectural duplexes curated for multi-generational custody.",
  cta: "Request Private Folio",
} as const;

export const ESTATES_TRUST = [
  { id: "confidentiality", label: "Off-Market Confidentiality" },
  { id: "title", label: "Verified Title & Provenance" },
  { id: "protocol", label: "Family Office Protocol" },
] as const;

export const ESTATES_CATEGORIES = [
  { id: "alpine-chalets", label: "Alpine Chalets", icon: "alpine" },
  { id: "coastal-sanctuaries", label: "Coastal Sanctuaries", icon: "coastal" },
  { id: "sky-duplexes", label: "Sky Duplexes", icon: "sky" },
  { id: "historic-palazzos", label: "Historic Palazzos", icon: "historic" },
  { id: "equestrian-manors", label: "Equestrian Manors", icon: "equestrian" },
  { id: "private-islands", label: "Private Islands", icon: "islands" },
  { id: "modernist-pavilions", label: "Modernist Pavilions", icon: "modernist" },
] as const;

export const ESTATES_SPOTLIGHTS = [
  {
    id: "historic-palazzos",
    tag: "Heritage",
    title: "Historic Châteaux & Manors",
    body: "Restored limestone compounds and private European estates.",
    action: "View Heritage",
    image: "/assets/estates/feature-chateau.jpg",
    imageAlt: "French château illuminated at dusk with reflecting parterre pool",
  },
  {
    id: "modernist-pavilions",
    tag: "Minimalism",
    title: "Modernist Glass Villas",
    body: "Cantilevered structures, subterranean parking, and floor-to-ceiling vistas.",
    action: "Explore Modernist",
    image: "/assets/estates/feature-modernist.jpg",
    imageAlt: "Charcoal cantilevered house in a fogged pine forest",
  },
  {
    id: "sky-duplexes",
    tag: "Urban Horizon",
    title: "Sky Duplexes & Penthouses",
    body: "Private residential sky towers with dedicated high-speed car elevators.",
    action: "Discover Sky",
    image: "/assets/estates/feature-penthouse.jpg",
    imageAlt: "Double-height penthouse living room overlooking a night skyline",
  },
] as const;

export const ESTATES_COMMISSIONS = [
  {
    id: "balearic-cliff-pavilion",
    title: "The Balearic Cliff Pavilion",
    spec: "Mallorca · 1,450 m² · Private Mooring",
    classification: "Off-Market Allocation",
    rating: "5.0",
    image: "/assets/estates/showcase-cliff.jpg",
    imageAlt: "Concrete cliff villa with infinity pool and stairs to the sea",
    category: "coastal-sanctuaries",
  },
  {
    id: "venetian-canal-palazzo",
    title: "The Venetian Canal Palazzo",
    spec: "San Marco · 890 m² · Private Water Gate",
    classification: "Off-Market Allocation",
    rating: "5.0",
    image: "/assets/estates/showcase-palazzo.jpg",
    imageAlt: "Venetian palazzo façade glowing over a canal at night",
    category: "historic-palazzos",
  },
  {
    id: "sonoran-horizon-house",
    title: "The Sonoran Horizon House",
    spec: "Palm Springs · 1,100 m² · Reflecting Basin",
    classification: "Off-Market Allocation",
    rating: "5.0",
    image: "/assets/estates/showcase-desert.jpg",
    imageAlt: "Corten desert pavilion with black reflecting pool at dusk",
    category: "modernist-pavilions",
  },
  {
    id: "engadine-night-chalet",
    title: "The Engadine Night Chalet",
    spec: "Verbier · 840 m² · Fire Court & Plunge",
    classification: "Off-Market Allocation",
    rating: "5.0",
    image: "/assets/estates/showcase-chalet.jpg",
    imageAlt: "Black timber alpine chalet with terrace fire pit and mountain views",
    category: "alpine-chalets",
  },
] as const;

export const ESTATES_JOURNAL = [
  {
    id: "land-banking",
    tag: "Monograph",
    title: "The Geopolitics of Prime Residential Land Banking",
    action: "Read Monograph",
    image: "/assets/estates/journal-plans.jpg",
    imageAlt: "Architectural plans and Nero Marquina samples on a private desk",
  },
  {
    id: "safe-havens",
    tag: "Security",
    title: "Integrating Subterranean Safe Havens in Ultra-Prime Architecture",
    action: "Read Briefing",
    image: "/assets/estates/journal-helipad.jpg",
    imageAlt: "Hillside helipad, collector garage, and harbour at dusk",
  },
  {
    id: "atrium-lighting",
    tag: "Design",
    title: "Lighting Protocols for Multi-Tier Private Art Atriums",
    action: "View Guide",
    image: "/assets/estates/journal-atrium.jpg",
    imageAlt: "Private gallery with sculpture niches and a courtyard garden",
  },
] as const;

export const ESTATES_PILLARS = [
  {
    id: "provenance",
    title: "Verified Off-Market Provenance",
    body: "Title, chain of custody, and prior stewardship reviewed before a viewing is ever offered.",
  },
  {
    id: "discretion",
    title: "Sovereign & Family Office Discretion",
    body: "Introductions staged through counsel and family offices, never through listing portals.",
  },
  {
    id: "audits",
    title: "Full Architectural Audits Conducted",
    body: "Structure, light, staff flow, and security envelope documented before any mandate proceeds.",
  },
  {
    id: "transfers",
    title: "Turnkey Tarmac-to-Estate Transfers",
    body: "Helipad, berth, and motor-court protocols arranged so arrival remains a private sequence.",
  },
] as const;
