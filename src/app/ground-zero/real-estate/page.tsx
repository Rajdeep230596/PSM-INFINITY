import type { Metadata } from "next";

import { GroundZeroDetailTemplate } from "@/components/ground-zero/GroundZeroDetailTemplate";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES["real-estate"];

export const metadata: Metadata = {
  title: "Real Estate Portfolios — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroRealEstatePage() {
  return <GroundZeroDetailTemplate page={page} />;
}
