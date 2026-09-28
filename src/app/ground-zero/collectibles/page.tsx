import type { Metadata } from "next";

import { CollectiblesSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";

export const metadata: Metadata = {
  title: "Curated Collectibles — Ground Zero",
  description:
    "Off-market grand complications, museum-grade historic timepieces, and limited-allocation coachbuilt hypercars.",
};

export default function GroundZeroCollectiblesPage() {
  return (
    <>
      <LcpPreload src="/assets/collectibles/hero-watch-hypercar.jpg" />
      <CollectiblesSalonPageLazy />
    </>
  );
}
