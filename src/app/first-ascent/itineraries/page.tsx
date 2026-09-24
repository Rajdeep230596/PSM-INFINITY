import type { Metadata } from "next";

import { ItinerariesSalonPage } from "@/components/first-ascent/ItinerariesSalonPage";

export const metadata: Metadata = {
  title: "Global Itineraries — First Ascent",
  description:
    "Direct private terminal clearances, point-to-point bespoke flight scheduling, and dedicated tarmac escorts worldwide.",
};

export default function ItinerariesPage() {
  return <ItinerariesSalonPage />;
}
