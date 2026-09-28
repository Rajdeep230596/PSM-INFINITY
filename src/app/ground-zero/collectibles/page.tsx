import type { Metadata } from "next";

import { CollectiblesSalonPageLazy } from "@/components/lazy/salons";

export const metadata: Metadata = {
  title: "Curated Collectibles — Ground Zero",
  description:
    "Off-market grand complications, museum-grade historic timepieces, and limited-allocation coachbuilt hypercars.",
};

export default function GroundZeroCollectiblesPage() {
  return <CollectiblesSalonPageLazy />;
}
