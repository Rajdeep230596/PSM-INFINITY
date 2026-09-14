import type { Metadata } from "next";

import { FirstAscentDetailTemplate } from "@/components/first-ascent/FirstAscentDetailTemplate";
import { FIRST_ASCENT_PAGES } from "@/content/first-ascent";

const page = FIRST_ASCENT_PAGES.villas;

export const metadata: Metadata = {
  title: "Bespoke Villas — First Ascent",
  description: page.subhead,
};

export default function VillasPage() {
  return <FirstAscentDetailTemplate page={page} />;
}
