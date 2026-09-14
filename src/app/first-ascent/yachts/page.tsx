import type { Metadata } from "next";

import { FirstAscentDetailTemplate } from "@/components/first-ascent/FirstAscentDetailTemplate";
import { FIRST_ASCENT_PAGES } from "@/content/first-ascent";

const page = FIRST_ASCENT_PAGES.yachts;

export const metadata: Metadata = {
  title: "Yacht Charters — First Ascent",
  description: page.subhead,
};

export default function YachtsPage() {
  return <FirstAscentDetailTemplate page={page} />;
}
