import type { Metadata } from "next";

import { EstatesSalonPage } from "@/components/ground-zero/EstatesSalonPage";

export const metadata: Metadata = {
  title: "Real Estate Portfolios — Ground Zero",
  description:
    "Private international residences, off-market European palazzos, and prime architectural duplexes curated for multi-generational custody.",
};

export default function GroundZeroRealEstatePage() {
  return <EstatesSalonPage />;
}
