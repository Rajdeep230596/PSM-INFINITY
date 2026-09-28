import type { Metadata } from "next";

import { ItinerariesSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { ITINERARIES_HERO } from "@/content/itineraries";

export const metadata: Metadata = {
  title: "Global Itineraries — First Ascent",
  description:
    "Direct private terminal clearances, point-to-point bespoke flight scheduling, and dedicated tarmac escorts worldwide.",
};

export default function ItinerariesPage() {
  return (
    <>
      <LcpPreload src={ITINERARIES_HERO.center.image} />
      <ItinerariesSalonPageLazy />
    </>
  );
}
