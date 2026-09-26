export const CORPORATE_EVENTS_HERO = {
  left: {
    eyebrow: "House Identity",
    headline: ["Board", "Protocol."],
    cta: "Enquire",
  },
  right: {
    eyebrow: "Venue Architecture",
    headline: ["Quiet", "Close."],
    cta: "Enquire",
  },
  center: {
    image: "/assets/corporate-events/hero-centerpiece.jpg",
    imageAlt: "Black and gold corporate ballroom staged for a private launch evening",
  },
} as const;

export const CORPORATE_EVENTS_STRIP = "Brand Galas · Launch Evenings";

export const CORPORATE_EVENTS_SECTIONS = [
  {
    id: "conference-hall-booking",
    index: "01",
    title: "Conference Hall Booking",
    eyebrow: "Board Theatre · Closed Session",
    spec: "A hall dressed for principals — seating, press lines, and AV written for the company that must be seen exactly once.",
    image: "/assets/corporate-events/section-conference.jpg",
    imageAlt: "Empty black conference hall with gold lighting and a marble podium",
  },
  {
    id: "hotel-bookings",
    index: "02",
    title: "Hotel Bookings",
    eyebrow: "Floor Buyout · Principal Suites",
    spec: "Rooms held as a household, not a block — arrivals staggered, keys issued, and the corridor kept quiet.",
    image: "/assets/corporate-events/section-hotel.jpg",
    imageAlt: "Luxury hotel suite corridor in black marble with gold sconces",
  },
  {
    id: "product-launches",
    index: "03",
    title: "Booking for Product Launches",
    eyebrow: "Reveal Evening · Brand Mark",
    spec: "The evening carries the house identity without collapsing into a trade-show set — one reveal, one close.",
    image: "/assets/corporate-events/section-launch.jpg",
    imageAlt: "Product on a gold-lit black pedestal in an empty launch gallery",
  },
  {
    id: "trade-shows",
    index: "04",
    title: "Trade Shows",
    eyebrow: "Pavilion · Private Salon",
    spec: "A stand composed as a salon — meetings, hospitality, and the brand’s mark held to the same discretion as a private house.",
    image: "/assets/corporate-events/section-trade.jpg",
    imageAlt: "Luxury exhibition booth in black and gold with empty marble floor",
  },
  {
    id: "team-building",
    index: "05",
    title: "Team Building Activities",
    eyebrow: "Retreat · Shared Table",
    spec: "A programme for the inner company — rooms, movement, and a table that feels hosted, not hired.",
    image: "/assets/corporate-events/section-team.jpg",
    imageAlt: "Rooftop terrace lounge seating in a circle under gold lanterns",
  },
  {
    id: "appreciation-ceremonies",
    index: "06",
    title: "Appreciation Ceremonies",
    eyebrow: "Honour Evening · Quiet Toast",
    spec: "Awards and acknowledgements staged with principal protocol — the room restored after the last name is spoken.",
    image: "/assets/corporate-events/section-appreciation.jpg",
    imageAlt: "Gold award trophy on a black pedestal in an empty ceremony hall",
  },
] as const;

export const CORPORATE_EVENTS_DOSSIER = {
  colonnade: {
    image: "/assets/corporate-events/section-conference.jpg",
    imageAlt: "Black conference hall with gold lighting and marble podium",
    caption: "Conference hall · Principal protocol",
  },
  specs: [
    {
      id: "hotel",
      image: "/assets/corporate-events/section-hotel.jpg",
      imageAlt: "Luxury hotel corridor in black marble",
      eyebrow: "Stay / Floor Buyout",
      title: "Hotel Holdings",
      meta: "Principal suites · Quiet corridor",
    },
    {
      id: "launch",
      image: "/assets/corporate-events/section-launch.jpg",
      imageAlt: "Product launch pedestal in a dark gallery",
      eyebrow: "Reveal / Brand Mark",
      title: "Launch Evening",
      meta: "One reveal · One close",
    },
  ],
  manifesto:
    "Brand galas, board retreats, and launch evenings composed with the same discretion as a private house — for the company that must be seen, exactly once. Logistics dissolve after the last toast.",
  atmosphere: "/assets/corporate-events/section-trade.jpg",
} as const;
