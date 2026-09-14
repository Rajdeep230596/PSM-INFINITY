import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";
import "../first-ascent/first-ascent.css";

export const metadata: Metadata = {
  title: "Second Ascent — Personal Curation & Living Spaces",
  description:
    "Haute horlogerie, bespoke automotive allocations, couture wardrobe suites, and architectural estate gardens.",
};

export default function SecondAscentLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome>{children}</AscentChrome>;
}
