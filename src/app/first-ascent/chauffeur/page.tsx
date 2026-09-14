import type { Metadata } from "next";

import { FirstAscentDetailTemplate } from "@/components/first-ascent/FirstAscentDetailTemplate";
import { FIRST_ASCENT_PAGES } from "@/content/first-ascent";

const page = FIRST_ASCENT_PAGES.chauffeur;

export const metadata: Metadata = {
  title: "Chauffeur Fleet — First Ascent",
  description: page.subhead,
};

export default function ChauffeurPage() {
  return <FirstAscentDetailTemplate page={page} />;
}
