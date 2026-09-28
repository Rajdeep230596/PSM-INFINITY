import type { Metadata } from "next";

import { VillasSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { VILLAS_HERO } from "@/content/villas";

export const metadata: Metadata = {
  title: "Bespoke Villas — First Ascent",
  description:
    "Discreet private residences, alpine chalets, and secluded island compounds not listed on public markets.",
};

export default function VillasPage() {
  return (
    <>
      <LcpPreload src={VILLAS_HERO.center.image} />
      <VillasSalonPageLazy />
    </>
  );
}
