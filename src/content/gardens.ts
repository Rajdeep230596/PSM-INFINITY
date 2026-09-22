export const GARDENS_HERO = {
  heading: "Sculpted Earth & Living Architecture",
  subhead:
    "Private botanical masterplans, century-old specimen groves, and bespoke estate water sanctuaries.",
  cta: "Commission Grounds",
} as const;

export const GARDENS_TRUST = [
  { id: "provenance", label: "Specimen Provenance" },
  { id: "climate", label: "Climate-Adaptive Design" },
  { id: "maintenance", label: "Turnkey Maintenance Protocol" },
] as const;

export const GARDENS_CATEGORIES = [
  { id: "formal-topiary", label: "Formal Topiary", icon: "topiary" },
  { id: "water-sanctuaries", label: "Water Sanctuaries", icon: "water" },
  { id: "specimen-groves", label: "Specimen Groves", icon: "groves" },
  { id: "zen-terraces", label: "Zen Terraces", icon: "zen" },
  { id: "glasshouses", label: "Glasshouses", icon: "glasshouses" },
  { id: "courtyards", label: "Courtyards", icon: "courtyards" },
  { id: "estate-masterplans", label: "Estate Masterplans", icon: "masterplans" },
] as const;

export const GARDENS_SPOTLIGHTS = [
  {
    id: "formal-topiary",
    tag: "Masterplan",
    title: "Formal Topiary & Lawns",
    body: "Laser-sculpted boxwood lines and pure creeping bentgrass turf.",
    action: "Explore Layouts",
    image: "/assets/gardens/feature-topiary.jpg",
    imageAlt: "Geometric boxwood parterre on a misted estate lawn",
  },
  {
    id: "water-sanctuaries",
    tag: "Hydraulics",
    title: "Living Water Sanctuaries",
    body: "Reflecting infinity ponds, cascade basins, and basalt stone fountains.",
    action: "Discover Waters",
    image: "/assets/gardens/feature-water.jpg",
    imageAlt: "Basalt stone fountain with a sheet of falling water",
  },
  {
    id: "glasshouses",
    tag: "Orangery",
    title: "Botanical Glasshouses",
    body: "Climate-stabilized architectural sanctuaries for rare sub-tropical flora.",
    action: "View Glasshouses",
    image: "/assets/gardens/feature-glasshouse.jpg",
    imageAlt: "Steel-and-glass orangery glowing at dusk among palms",
  },
] as const;

export const GARDENS_COMMISSIONS = [
  {
    id: "century-olive-courtyard",
    title: "Century Olive Courtyard",
    spec: "300-Year-Old Olea Europaea · Travertine Paving",
    classification: "Private Commission",
    rating: "5.0",
    image: "/assets/gardens/commission-olive.jpg",
    imageAlt: "Ancient olive trees in bronze planters within a stone courtyard",
    category: "courtyards",
  },
  {
    id: "kinetic-zen-terrace",
    title: "Kinetic Zen Terrace",
    spec: "Raked Basalt Gravel · Cloud Pine & Maple",
    classification: "Atelier Commission",
    rating: "5.0",
    image: "/assets/gardens/commission-zen.jpg",
    imageAlt: "Raked gravel zen garden with bonsai against a modern house",
    category: "zen-terraces",
  },
  {
    id: "wisteria-night-pavilion",
    title: "Wisteria Night Pavilion",
    spec: "Hand-Hewn Oak · Cascading Wisteria",
    classification: "Private Commission",
    rating: "5.0",
    image: "/assets/gardens/commission-pavilion.jpg",
    imageAlt: "Oak pavilion with wisteria, fire table, and evening seating",
    category: "specimen-groves",
  },
  {
    id: "hydro-acoustic-path",
    title: "Hydro-Acoustic Path",
    spec: "Corten Planters · Path Lighting Protocol",
    classification: "Estate Allocation",
    rating: "5.0",
    image: "/assets/gardens/commission-path.jpg",
    imageAlt: "Night garden path with brass path lights and corten planters",
    category: "estate-masterplans",
  },
] as const;

export const GARDENS_JOURNAL = [
  {
    id: "specimen-trees",
    tag: "Guide",
    title: "Selecting Century-Old Specimen Trees for Private Sanctuaries",
    action: "Read Monograph",
    image: "/assets/gardens/journal-specimen.jpg",
    imageAlt: "Arborists planting a rare specimen tree on a private lawn",
  },
  {
    id: "kinetic-basins",
    tag: "Case Study",
    title: "Integrating Kinetic Water Basins into Travertine Terraces",
    action: "View Case Study",
    image: "/assets/gardens/journal-masterplan.jpg",
    imageAlt: "Landscape architects drawing an estate masterplan at a studio table",
  },
  {
    id: "hydro-acoustic-lighting",
    tag: "Insight",
    title: "Sub-Surface Hydro-Acoustic Lighting in Modern Topiary",
    action: "Read Insight",
    image: "/assets/gardens/journal-terrace.jpg",
    imageAlt: "Sunken fire court set into a fern garden at dusk",
  },
] as const;

export const GARDENS_PILLARS = [
  {
    id: "arborists",
    title: "Master Arborists On Staff",
    body: "A grounds team that already knows the trees, not a rotating contractor.",
  },
  {
    id: "quarantine",
    title: "Rare Specimen Quarantine Clearance",
    body: "Provenance, phytosanitary papers, and quiet arrival before a pit is dug.",
  },
  {
    id: "execution",
    title: "Discreet Architectural Execution",
    body: "Hardscape, water, and canopy composed with the house — never as an afterthought.",
  },
  {
    id: "stewardship",
    title: "Lifetime Horticultural Stewardship",
    body: "A planting calendar the house can live with, refreshed without a public showing.",
  },
] as const;
