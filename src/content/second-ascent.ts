export const SECOND_ASCENT_LINKS = [
  { href: "/second-ascent/private-events", label: "Private Events" },
  { href: "/second-ascent/corporate-events", label: "Corporate Events" },
] as const;

export type SecondAscentPageContent = {
  slug: string;
  code: string;
  heading: string;
  subhead: string;
  cta: string;
  pillars: { title: string; body: string }[];
};

export const SECOND_ASCENT_PAGES: Record<string, SecondAscentPageContent> = {
  "private-events": {
    slug: "private-events",
    code: "01",
    heading: "Private Events",
    subhead:
      "Intimate dinners, milestone celebrations, and closed-door gatherings staged as a single composition — guest list, room, and ritual.",
    cta: "Commission a Private Event",
    pillars: [
      { title: "Closed Guest Lists", body: "Invitations, arrivals, and seating handled so the evening never feels managed." },
      { title: "Residence or Venue", body: "The house, a borrowed palazzo, or a room we dress for one night only." },
      { title: "Table & Programme", body: "Menu, music, and pacing written around the host, not a banquet template." },
      { title: "Discreet Close", body: "The room restored, the cars staged, the night ended without a raised voice." },
    ],
  },
  "corporate-events": {
    slug: "corporate-events",
    code: "02",
    heading: "Corporate Events",
    subhead:
      "Brand galas, board retreats, and launch evenings composed with the same discretion as a private house — for the company that must be seen, exactly once.",
    cta: "Commission a Corporate Event",
    pillars: [
      { title: "House Identity", body: "The evening carries the brand’s mark without collapsing into a trade-show set." },
      { title: "Principal Protocol", body: "Arrivals, seating, and press lines written for principals, not a general crowd." },
      { title: "Venue Architecture", body: "Rooms chosen and dressed so the company feels hosted, not hired." },
      { title: "Quiet Close", body: "Logistics dissolve after the last toast; nothing lingers that should not." },
    ],
  },
};
