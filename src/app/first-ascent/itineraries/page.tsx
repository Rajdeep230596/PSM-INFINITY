import type { Metadata } from "next";

import { ItinerariesSalonPageLazy } from "@/components/lazy/salons";

export const metadata: Metadata = {
  title: "Global Itineraries — First Ascent",
  description:
    "Direct private terminal clearances, point-to-point bespoke flight scheduling, and dedicated tarmac escorts worldwide.",
};

export default function ItinerariesPage() {
  return <ItinerariesSalonPageLazy />;
}
