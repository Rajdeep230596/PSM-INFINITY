import type { Metadata } from "next";

import { EstatesSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";

export const metadata: Metadata = {
  title: "Real Estate Portfolios — Ground Zero",
  description:
    "Private international residences, off-market European palazzos, and prime architectural duplexes curated for multi-generational custody.",
};

export default function GroundZeroRealEstatePage() {
  return (
    <>
      <LcpPreload src="/assets/estates/hero-lake-como.jpg" />
      <EstatesSalonPageLazy />
    </>
  );
}
