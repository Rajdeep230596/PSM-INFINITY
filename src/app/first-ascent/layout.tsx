import type { Metadata } from "next";

import "./first-ascent.css";

export const metadata: Metadata = {
  title: "First Ascent — Personal Curation & Living Spaces",
  description:
    "An architectural buying galleria where haute horlogerie, exotic automobiles, and bespoke wardrobe suites converge. Acquire or reserve worldwide with PSM Infinity.",
};

export default function FirstAscentLayout({ children }: { children: React.ReactNode }) {
  return children;
}
