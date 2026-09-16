import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";
import "../first-ascent/first-ascent.css";

export const metadata: Metadata = {
  title: "Ground Zero — Atelier, Estates & Collectibles",
  description:
    "Personal premium shopping, real estate portfolios, landscaping masterplans, and curated collectibles — the foundational desks of PSM Infinity.",
};

export default function GroundZeroLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome>{children}</AscentChrome>;
}
