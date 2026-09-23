export const SKYDECK_FIND_US_HREF =
  "https://www.google.com/maps/search/29+Palit+Street+Ballygunge+Kolkata";

export type SkydeckSpace = {
  slug: string;
  code: string;
  tag: string;
  blurb: string;
  heading: string;
  subhead: string;
  image: string;
  pillars: { title: string; body: string }[];
};

const SKYDECK_SPACE_COPY: Omit<SkydeckSpace, "image">[] = [
  {
    slug: "the-sky",
    code: "01",
    tag: "THE SKY",
    blurb: "panoramic lounge",
    heading: "THE SKY",
    subhead:
      "The panoramic lounge — glass, seating, and a horizon that does not close, held above the city.",
    pillars: [
      { title: "Open Horizon", body: "A room composed for the view first — light, glass, and a skyline that stays in the conversation." },
      { title: "Lounge Service", body: "Seating arranged for lingering, not turnover; the bar arrives without a queue." },
      { title: "Quiet Arrival", body: "The lift opens onto the lounge, not a corridor of announcements." },
      { title: "Night Glass", body: "After dark the city becomes the wall — lighting kept low enough to keep it." },
    ],
  },
  {
    slug: "the-deck",
    code: "02",
    tag: "THE DECK",
    blurb: "open-air terrace",
    heading: "THE DECK",
    subhead:
      "The open-air terrace — stone, night air, and tables set to the weather rather than a reservation grid.",
    pillars: [
      { title: "Open Air", body: "No ceiling but the sky; heaters and shade staged so the evening can stay outside." },
      { title: "Terrace Tables", body: "Lounges and dining placed for conversation, not a banquet template." },
      { title: "Weather Honesty", body: "The deck is dressed for the actual night — wind, monsoon, or still heat." },
      { title: "City Edge", body: "The parapet is the room’s far wall; the street stays below it." },
    ],
  },
  {
    slug: "the-vault",
    code: "03",
    tag: "THE VAULT",
    blurb: "private speakeasy",
    heading: "THE VAULT",
    subhead:
      "The private speakeasy — a closed room for a closed list, low light, and no announcement of who is inside.",
    pillars: [
      { title: "Closed Door", body: "Entry by name, not a velvet rope; the room does not appear on a public floor plan." },
      { title: "Private Bar", body: "A cellar and a bartender who already know the table, not a cocktail menu for walk-ins." },
      { title: "Low Light", body: "Sound and lighting held so the evening stays in the room." },
      { title: "Unlisted Guests", body: "No board, no photographer, no raised voice at the threshold." },
    ],
  },
  {
    slug: "the-crown",
    code: "04",
    tag: "THE CROWN",
    blurb: "VIP sky lounge",
    heading: "THE CROWN",
    subhead:
      "The VIP sky lounge — the highest room, a smaller circle, and service that never enters unasked.",
    pillars: [
      { title: "Highest Room", body: "A lounge set above the general terrace, with a longer view and a shorter guest list." },
      { title: "Principal Service", body: "Staff who already know the table; nothing is offered twice." },
      { title: "Held Seating", body: "The room is never released to a walk-in, even when it looks empty." },
      { title: "Quiet Protocol", body: "Arrivals, pours, and departures staged without a floor manager’s circuit." },
    ],
  },
  {
    slug: "the-table",
    code: "05",
    tag: "THE TABLE",
    blurb: "private dining",
    heading: "THE TABLE",
    subhead:
      "Private dining — a single table, a written menu, and a kitchen that cooks for the room rather than a seating.",
    pillars: [
      { title: "One Table", body: "The night is written for the host’s list, not a dining room of strangers." },
      { title: "Written Menu", body: "Courses paced to the conversation; dietary notes taken before the first pour." },
      { title: "Kitchen for the Room", body: "The pass cooks one service, then closes — no second seating behind you." },
      { title: "Discreet Close", body: "The table restored, the cars staged, the night ended without a bill presented in public." },
    ],
  },
  {
    slug: "the-club",
    code: "06",
    tag: "THE CLUB",
    blurb: "members-only",
    heading: "THE CLUB",
    subhead:
      "Members-only — access by introduction. The house, the cellar, and the terrace held for those already known.",
    pillars: [
      { title: "Introduction Only", body: "A name on the book, not a door policy printed for the street." },
      { title: "House Privileges", body: "Cellar, terrace, and rooms that do not open to the night’s general list." },
      { title: "Known Faces", body: "Staff who recognise the member before the coat is taken." },
      { title: "Quiet Book", body: "Reservations held privately; the club does not publish who dined." },
    ],
  },
  {
    slug: "the-cabanas",
    code: "07",
    tag: "THE CABANAS",
    blurb: "private outdoor suites",
    heading: "THE CABANAS",
    subhead:
      "Private outdoor suites — screened rooms along the deck, daybeds, shade, and a door that does not open to the crowd.",
    pillars: [
      { title: "Screened Rooms", body: "Each cabana is a suite with air, not a daybed in a public row." },
      { title: "Dedicated Service", body: "A bell and a runner; the terrace crowd does not pass through." },
      { title: "Day to Night", body: "Shade, linen, and lighting reset so the same room holds afternoon and evening." },
      { title: "Closed Threshold", body: "The door stays shut to everyone not on the suite’s list." },
    ],
  },
  {
    slug: "the-sky-pool",
    code: "08",
    tag: "THE SKY POOL",
    blurb: "infinity pool experience",
    heading: "THE SKY POOL",
    subhead:
      "The infinity pool experience — water at the edge of the roof, pavilion seating, and the city held below the lip.",
    pillars: [
      { title: "Edge Water", body: "The pool meets the skyline; the city stays under the coping." },
      { title: "Pavilion Seating", body: "Lounges and shade composed with the water, not rented as a separate deck." },
      { title: "Night Swim", body: "Lighting kept to the water’s surface so the view remains the room." },
      { title: "Private Hours", body: "The pool can be held for a single party; it is not a hotel lane." },
    ],
  },
  {
    slug: "the-salon",
    code: "09",
    tag: "THE SALON",
    blurb: "private events",
    heading: "THE SALON",
    subhead:
      "Private events — a room dressed for one evening: arrivals, programme, and close written around the host.",
    pillars: [
      { title: "One Evening", body: "The salon is dressed, used, and restored for a single brief — never a standing set." },
      { title: "Host Protocol", body: "Guest list, arrivals, and toasts paced so the room never feels managed." },
      { title: "Programme", body: "Music, menu, and remarks written with the host, not a banquet template." },
      { title: "Quiet Strike", body: "The room returned before morning; nothing of the night lingers in the corridor." },
    ],
  },
  {
    slug: "the-suite",
    code: "10",
    tag: "THE SUITE",
    blurb: "ultra-private celebrations",
    heading: "THE SUITE",
    subhead:
      "Ultra-private celebrations — the most closed reservation: a suite for the few, the night kept off every list.",
    pillars: [
      { title: "Closed Reservation", body: "The suite does not appear beside other rooms; it is offered, not listed." },
      { title: "The Few", body: "A celebration sized to the people in the room, not a capacity chart." },
      { title: "Off the List", body: "No photographer without the host; no mention after the door closes." },
      { title: "Full Hold", body: "Service, kitchen, and arrival held exclusively until the night is finished." },
    ],
  },
];

export const SKYDECK_SPACES: SkydeckSpace[] = SKYDECK_SPACE_COPY.map((space) => ({
  ...space,
  image: `/skydeck/${space.slug}.jpg`,
}));

export const SKYDECK_PAGES: Record<string, SkydeckSpace> = Object.fromEntries(
  SKYDECK_SPACES.map((space) => [space.slug, space]),
);

const BACKDROP_FIRST_SLUGS = ["the-sky", "the-deck", "the-vault", "the-crown", "the-table"];

/** First card row on the Skydeck video backdrop. */
export const SKYDECK_BACKDROP_FIRST = SKYDECK_SPACES.filter((space) =>
  BACKDROP_FIRST_SLUGS.includes(space.slug),
);

/** Replaces the first row later in the Skydeck scroll. */
export const SKYDECK_BACKDROP_SECOND = SKYDECK_SPACES.filter(
  (space) => !BACKDROP_FIRST_SLUGS.includes(space.slug),
);

export const SKYDECK_LINKS = [
  { href: "/skydeck", label: "Skydeck" },
  ...SKYDECK_SPACES.map((space) => ({ href: `/skydeck/${space.slug}`, label: space.tag })),
] as const;

export function getSkydeckSpace(slug: string) {
  return SKYDECK_PAGES[slug];
}
