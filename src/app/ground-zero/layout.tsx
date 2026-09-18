import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";

export const metadata: Metadata = {
  title: "Ground Zero — Couture, Estates, Gardens & Collectibles",
  description:
    "Haute couture wardrobes, real estate portfolios, landscaping masterplans, private botanical gardens, and curated collectibles — the foundational desks of PSM Infinity.",
};

export default function GroundZeroLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome>{children}</AscentChrome>;
}
