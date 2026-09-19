import type { Metadata } from "next";

import { CoutureSalonPage } from "@/components/ground-zero/CoutureSalonPage";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.couture;

export const metadata: Metadata = {
  title: "Haute Couture & Wardrobes — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroCouturePage() {
  return <CoutureSalonPage />;
}
