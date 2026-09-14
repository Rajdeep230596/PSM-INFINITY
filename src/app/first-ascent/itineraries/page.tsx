import type { Metadata } from "next";

import { FirstAscentDetailTemplate } from "@/components/first-ascent/FirstAscentDetailTemplate";
import { FIRST_ASCENT_PAGES } from "@/content/first-ascent";

const page = FIRST_ASCENT_PAGES.itineraries;

export const metadata: Metadata = {
  title: "Global Itineraries — First Ascent",
  description: page.subhead,
};

export default function ItinerariesPage() {
  return <FirstAscentDetailTemplate page={page} />;
}
