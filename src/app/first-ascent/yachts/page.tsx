import type { Metadata } from "next";

import { YachtsSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { YACHTS_HERO } from "@/content/yachts";

export const metadata: Metadata = {
  title: "Yacht Charters — First Ascent",
  description:
    "Access to verified mega-yachts and expedition vessels across the Mediterranean, Caribbean, and remote archipelagos.",
};

export default function YachtsPage() {
  return (
    <>
      <LcpPreload src={YACHTS_HERO.center.image} />
      <YachtsSalonPageLazy />
    </>
  );
}
