export const COLLECTIBLES_HERO = {
  heading: "Rare Calibres & Bespoke Chassis",
  subhead:
    "Off-market grand complications, museum-grade historic timepieces, and limited-allocation coachbuilt hypercars.",
  cta: "Request Acquisition Folio",
} as const;

export const COLLECTIBLES_TRUST = [
  { id: "papers", label: "Verified Provenance & Papers" },
  { id: "custody", label: "Escrow & Vault Custody" },
  { id: "logistics", label: "Global Enclosed Logistics" },
] as const;

export const COLLECTIBLES_CATEGORIES = [
  { id: "grand-complications", label: "Grand Complications", icon: "complications" },
  { id: "coachbuilt-hypercars", label: "Coachbuilt Hypercars", icon: "hypercars" },
  { id: "vintage-chronographs", label: "Vintage Chronographs", icon: "vintage" },
  { id: "track-only-chassis", label: "Track-Only Chassis", icon: "track" },
  { id: "minute-repeaters", label: "Minute Repeaters", icon: "repeaters" },
  { id: "historic-legends", label: "Historic Legends", icon: "legends" },
  { id: "factory-allocations", label: "Factory Allocations", icon: "allocations" },
] as const;

export const COLLECTIBLES_SPOTLIGHTS = [
  {
    id: "grand-complications",
    tag: "Horology",
    title: "Grand Complications",
    body: "Split-seconds chronographs, perpetual calendars, and tourbillons.",
    action: "View Calibres",
    image: "/assets/collectibles/feature-complications.jpg",
    imageAlt: "Platinum perpetual-calendar chronograph on a slate plinth",
  },
  {
    id: "coachbuilt-hypercars",
    tag: "Hypercar",
    title: "Coachbuilt Chassis",
    body: "Ultra-rare limited production hypercars and bespoke one-off builds.",
    action: "Explore Fleet",
    image: "/assets/collectibles/feature-hypercar.jpg",
    imageAlt: "Matte carbon coachbuilt hypercar with an exposed rear wing",
  },
  {
    id: "historic-legends",
    tag: "Heritage",
    title: "Historic Racing Icons",
    body: "Numbers-matching vintage sports cars with documented competitive pedigree.",
    action: "Discover Icons",
    image: "/assets/collectibles/feature-vintage.jpg",
    imageAlt: "British racing-green vintage roadster in a private garage",
  },
] as const;

export const COLLECTIBLES_COMMISSIONS = [
  {
    id: "tourbillon-skeleton-calibre",
    title: "Tourbillon Skeleton Calibre",
    spec: "Openworked Titanium · 1 of 8 Produced Globally",
    classification: "Private Vault Allocation",
    rating: "5.0",
    image: "/assets/collectibles/showcase-skeleton.jpg",
    imageAlt: "Skeleton minute-repeater tourbillon in a black ceramic case",
    category: "minute-repeaters",
  },
  {
    id: "v12-prototype-chassis",
    title: "V12 Prototype Chassis",
    spec: "Factory Allocation · Matte Carbon · Left-Hand Drive",
    classification: "Private Vault Allocation",
    rating: "5.0",
    image: "/assets/collectibles/showcase-v12.jpg",
    imageAlt: "Matte grey V12 coupe staged under a concrete pavilion at dusk",
    category: "factory-allocations",
  },
  {
    id: "tropical-chronograph",
    title: "Tropical Chronograph, 1960s",
    spec: "Gilt Case · Tropical Dial · Extract of Archive",
    classification: "Private Vault Allocation",
    rating: "5.0",
    image: "/assets/collectibles/showcase-chrono.jpg",
    imageAlt: "Aged gilt chronograph on a distressed brown leather strap",
    category: "vintage-chronographs",
  },
  {
    id: "open-top-hypercar",
    title: "Open-Top Silver Hypercar",
    spec: "Coachbuilt Roadster · Carbon Tub · 1 of 100",
    classification: "Private Vault Allocation",
    rating: "5.0",
    image: "/assets/collectibles/showcase-pagani.jpg",
    imageAlt: "Silver open-top hypercar under studio lighting",
    category: "track-only-chassis",
  },
] as const;

export const COLLECTIBLES_JOURNAL = [
  {
    id: "split-seconds",
    tag: "Monograph",
    title: "The Sovereign Value of Historical Split-Seconds Calibres",
    action: "Read Monograph",
    image: "/assets/collectibles/journal-watchmaker.jpg",
    imageAlt: "Master watchmaker assembling a movement under a brass lamp",
  },
  {
    id: "future-vintage",
    tag: "Analysis",
    title: "Future Vintage: Modern Hypercars as Inflationary Hedges",
    action: "Read Analysis",
    image: "/assets/collectibles/journal-aero.jpg",
    imageAlt: "Aero wing clay model and carbon part on a design-studio table",
  },
  {
    id: "family-vault",
    tag: "Curation",
    title: "Establishing a Dual Calibre & Automotive Family Vault",
    action: "View Protocol",
    image: "/assets/collectibles/journal-provenance.jpg",
    imageAlt: "Provenance certificates and factory build sheets under review",
  },
] as const;

export const COLLECTIBLES_PILLARS = [
  {
    id: "factory",
    title: "Direct Factory & Provenance Verification",
    body: "Extracts, build sheets, and prior custody reviewed before a viewing is ever staged.",
  },
  {
    id: "transport",
    title: "Armored Transport & Bonded Custody",
    body: "Enclosed, bonded movement from workshop to vault, never through a public dock.",
  },
  {
    id: "escrow",
    title: "Anonymous Escrow Settlement",
    body: "Title and funds exchange through counsel so neither desk is exposed in the room.",
  },
  {
    id: "audits",
    title: "Condition Audits by Certified Masters",
    body: "Calibre, chassis, and originality signed off by appointed watchmakers and marque specialists.",
  },
] as const;
