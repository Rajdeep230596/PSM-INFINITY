import type { Metadata } from "next";

import { GroundZeroDetailTemplate } from "@/components/ground-zero/GroundZeroDetailTemplate";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.landscaping;

export const metadata: Metadata = {
  title: "Landscaping Masterplans — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroLandscapingPage() {
  return <GroundZeroDetailTemplate page={page} />;
}
