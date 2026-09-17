import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";

export const metadata: Metadata = {
  title: "First Ascent — Global Travel & High-End Mobility",
  description:
    "Private itineraries, yacht charters, sanctuary villas, and armored chauffeur protocols — commissioned worldwide through PSM Infinity.",
};

export default function FirstAscentLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome>{children}</AscentChrome>;
}
