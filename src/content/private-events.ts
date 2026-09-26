export const PRIVATE_EVENTS_HERO = {
  left: {
    eyebrow: "Closed Guest Lists",
    headline: ["Intimate", "Evenings."],
    cta: "Enquire",
  },
  right: {
    eyebrow: "Confidential Hosting",
    headline: ["Discreet", "Close."],
    cta: "Enquire",
  },
  center: {
    image: "/assets/private-events/hero-centerpiece.jpg",
    imageAlt: "Candlelit private dining hall in black and gold beneath a palatial arch",
  },
} as const;

export const PRIVATE_EVENTS_STRIP = "Closed Guest Lists · Intimate Rituals";

export const PRIVATE_EVENTS_SECTIONS = [
  {
    id: "music-events",
    index: "01",
    title: "Music Events",
    eyebrow: "Salon Recitals · Private Sets",
    spec: "A closed-door programme — musicians, acoustics, and pacing written around the host, never a public bill.",
    image: "/assets/private-events/section-music.jpg",
    imageAlt: "Grand piano under gold spotlight in an empty black salon",
  },
  {
    id: "private-dinner-party",
    index: "02",
    title: "Private Dinner Party",
    eyebrow: "Table for Twelve · Chef’s Sequence",
    spec: "A single composition of room, menu, and guest list — seating handled so the evening never feels managed.",
    image: "/assets/private-events/section-dinner.jpg",
    imageAlt: "Long candlelit dining table set in black and gold with empty chairs",
  },
  {
    id: "live-concert",
    index: "03",
    title: "Live Concert",
    eyebrow: "House Stage · Invitation Only",
    spec: "A one-night stage in a borrowed palazzo or a private hall — sound, light, and arrivals composed as one.",
    image: "/assets/private-events/section-concert.jpg",
    imageAlt: "Empty concert hall with gold-lit stage and black velvet seats",
  },
  {
    id: "private-dining-reservation",
    index: "04",
    title: "Private Dining Reservation",
    eyebrow: "Chef’s Table · Closed Room",
    spec: "A reserved room, a sequenced menu, and service that dissolves after the last course.",
    image: "/assets/private-events/section-dining.jpg",
    imageAlt: "Chef’s table in a dark private dining room with gold place settings",
  },
  {
    id: "marriage",
    index: "05",
    title: "Marriage",
    eyebrow: "Ceremony · Reception · Close",
    spec: "Vows, arrivals, and the table written as a private rite — the house dressed for one day only.",
    image: "/assets/private-events/section-marriage.jpg",
    imageAlt: "Gold wedding arch in an empty black hall with candlelight",
  },
  {
    id: "anniversary",
    index: "06",
    title: "Anniversary",
    eyebrow: "Milestone Table · Quiet Toast",
    spec: "An evening scaled to two or to the inner circle — flowers, cellar, and a room restored by morning.",
    image: "/assets/private-events/section-anniversary.jpg",
    imageAlt: "Two champagne flutes on black linen with gold roses",
  },
  {
    id: "birthday",
    index: "07",
    title: "Birthday",
    eyebrow: "Landmark Year · Private Fête",
    spec: "A celebration without a template — guest list, music, and the close staged so nothing lingers that should not.",
    image: "/assets/private-events/section-birthday.jpg",
    imageAlt: "Gold cake stand and candles in a dark salon",
  },
  {
    id: "funerals",
    index: "08",
    title: "Funerals",
    eyebrow: "Memorial · Quiet Protocol",
    spec: "A composed farewell — arrivals, the room, and the rite handled with the same discretion as a private house.",
    image: "/assets/private-events/section-funerals.jpg",
    imageAlt: "Single gold candle and white flowers on a black pedestal",
  },
] as const;

export const PRIVATE_EVENTS_DOSSIER = {
  colonnade: {
    image: "/assets/private-events/section-marriage.jpg",
    imageAlt: "Gold ceremonial arch in an empty black hall",
    caption: "Ceremony hall · Closed guest list",
  },
  specs: [
    {
      id: "table",
      image: "/assets/private-events/section-dining.jpg",
      imageAlt: "Private chef’s table with gold service",
      eyebrow: "Table / Programme",
      title: "Menu & Seating",
      meta: "Chef’s sequence · Named place cards",
    },
    {
      id: "music",
      image: "/assets/private-events/section-concert.jpg",
      imageAlt: "Gold-lit private concert stage",
      eyebrow: "Sound / Stage",
      title: "Private Programme",
      meta: "Invitation only · House acoustics",
    },
  ],
  manifesto:
    "Every private evening is staged as a single composition — guest list, room, and ritual. Invitations, arrivals, and the close are handled so the night never feels managed.",
  atmosphere: "/assets/private-events/section-music.jpg",
} as const;
