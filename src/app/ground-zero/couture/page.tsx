import type { Metadata } from "next";

import { GroundZeroDetailTemplate } from "@/components/ground-zero/GroundZeroDetailTemplate";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.couture;

export const metadata: Metadata = {
  title: "Haute Couture & Wardrobes — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroCouturePage() {
  return <GroundZeroDetailTemplate page={page} />;
}
