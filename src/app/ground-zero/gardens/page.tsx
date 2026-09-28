import type { Metadata } from "next";

import { GardensSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.gardens;

export const metadata: Metadata = {
  title: "Private Botanical Gardens — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroGardensPage() {
  return (
    <>
      <LcpPreload src="/assets/gardens/hero-estate-garden.jpg" />
      <GardensSalonPageLazy />
    </>
  );
}
