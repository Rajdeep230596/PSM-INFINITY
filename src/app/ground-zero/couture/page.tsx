import type { Metadata } from "next";

import { CoutureSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.couture;

export const metadata: Metadata = {
  title: "Haute Couture & Wardrobes — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroCouturePage() {
  return (
    <>
      <LcpPreload src="/assets/couture/hero-gown.jpg" />
      <CoutureSalonPageLazy />
    </>
  );
}
