import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";

export const metadata: Metadata = {
  title: "Second Ascent — Event Management",
  description:
    "Haute horlogerie, bespoke automotive allocations, couture wardrobe suites, and architectural estate gardens.",
};

export default function SecondAscentLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome>{children}</AscentChrome>;
}
