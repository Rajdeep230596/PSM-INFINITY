import type { Metadata } from "next";

import { VillasSalonPageLazy } from "@/components/lazy/salons";

export const metadata: Metadata = {
  title: "Bespoke Villas — First Ascent",
  description:
    "Discreet private residences, alpine chalets, and secluded island compounds not listed on public markets.",
};

export default function VillasPage() {
  return <VillasSalonPageLazy />;
}
