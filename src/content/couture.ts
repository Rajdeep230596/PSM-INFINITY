export const COUTURE_HERO = {
  heading: "Private Salon & Haute Couture",
  subhead:
    "Bespoke commissions, archive runway acquisitions, and private salon wardrobe allocations.",
  cta: "Enter the Salon",
} as const;

export const COUTURE_TRUST = [
  { id: "delivery", label: "White-Glove Delivery" },
  { id: "certificate", label: "Archival Certificate" },
  { id: "fitting", label: "Private Fitting Protocol" },
] as const;

export const COUTURE_CATEGORIES = [
  { id: "evening-gowns", label: "Evening Gowns", icon: "gowns" },
  { id: "tailored-suits", label: "Tailored Suits", icon: "suits" },
  { id: "runway-archives", label: "Runway Archives", icon: "archives" },
  { id: "atelier-outerwear", label: "Atelier Outerwear", icon: "outerwear" },
  { id: "accessories", label: "Accessories", icon: "accessories" },
  { id: "rare-silks", label: "Rare Silks", icon: "silks" },
  { id: "private-salon", label: "Private Salon", icon: "salon" },
] as const;

export const COUTURE_SPOTLIGHTS = [
  {
    id: "runway-archives",
    tag: "New",
    title: "Runway Archives",
    body: "Pieces held after the show, never released to the floor.",
    action: "Explore",
    image: "/assets/couture/spotlight-archives.jpg",
    imageAlt: "Haute couture silk jacket with gold embroidery on museum plinth",
  },
  {
    id: "private-salon",
    tag: "Best Seller",
    title: "Private Salon Pieces",
    body: "Evening silhouettes fitted in the atelier, not the shop.",
    action: "Discover",
    image: "/assets/couture/spotlight-salon.jpg",
    imageAlt: "Black silk slip gown with gold lace, suspended in studio light",
  },
  {
    id: "accessories",
    tag: "Limited Offer",
    title: "Atelier Accessories",
    body: "Hardware, skins, and evening minaudières in closed allocation.",
    action: "Request",
    image: "/assets/couture/spotlight-accessories.jpg",
    imageAlt: "Black crocodile evening bag with brushed gold hardware",
  },
] as const;

export const COUTURE_ALLOCATIONS = [
  {
    id: "midnight-dinner-jacket",
    title: "Midnight Dinner Jacket",
    spec: "Wool Barathea & Satin Peak Lapel",
    classification: "Private Allocation",
    rating: "5.0",
    image: "/assets/couture/allocation-jacket.jpg",
    imageAlt: "Black double-breasted dinner jacket on a bronze dress form",
    category: "tailored-suits",
  },
  {
    id: "gilded-pleat-sculpture",
    title: "Gilded Pleat Sculpture",
    spec: "Lamé Accordion & Hand-Pleating",
    classification: "Atelier Commission",
    rating: "5.0",
    image: "/assets/couture/allocation-pleated.jpg",
    imageAlt: "Gold pleated couture gown on a wire atelier mannequin",
    category: "evening-gowns",
  },
  {
    id: "ivory-pearl-corset",
    title: "Ivory Pearl Corset",
    spec: "Silk Satin & Seed-Pearl Work",
    classification: "Private Allocation",
    rating: "5.0",
    image: "/assets/couture/allocation-corset.jpg",
    imageAlt: "Ivory silk corset with pearl embroidery on a stand",
    category: "rare-silks",
  },
  {
    id: "goldwork-tuxedo",
    title: "Gold-Work Tuxedo",
    spec: "Super 150s & Gold Bullion",
    classification: "Maison Allocation",
    rating: "5.0",
    image: "/assets/couture/allocation-tuxedo.jpg",
    imageAlt: "Black tuxedo with gold embroidered lapels and cuffs",
    category: "atelier-outerwear",
  },
] as const;

export const COUTURE_JOURNAL = [
  {
    id: "commission-wardrobe",
    tag: "Guide",
    title: "How to Commission a Salon Wardrobe",
    image: "/assets/couture/journal-atelier.jpg",
    imageAlt: "Private fitting salon with a black evening gown before a gold mirror",
  },
  {
    id: "reading-goldwork",
    tag: "Recommended",
    title: "Reading Goldwork in the Atelier",
    image: "/assets/couture/journal-embroidery.jpg",
    imageAlt: "Hands embroidering gold bullion onto black silk in an atelier",
  },
  {
    id: "private-closet",
    tag: "Insight",
    title: "The Private Closet as Architecture",
    image: "/assets/couture/journal-wardrobe.jpg",
    imageAlt: "Glass-lined couture wardrobe corridor with warm lighting",
  },
] as const;

export const COUTURE_PILLARS = [
  {
    id: "craft",
    title: "Crafted to Perfection",
    body: "Hand-finished in the atelier, never from a public rack.",
  },
  {
    id: "confidentiality",
    title: "Strict Confidentiality",
    body: "Allocations move privately — no boards, no public showing.",
  },
  {
    id: "stylist",
    title: "Private Atelier Stylist",
    body: "A dresser who already knows the calendar, not a lookbook.",
  },
  {
    id: "archives",
    title: "Global Archival Access",
    body: "Maison archives and closed collections, introduced by brief.",
  },
] as const;
