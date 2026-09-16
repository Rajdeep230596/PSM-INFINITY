import type { Metadata } from "next";

import { GroundZeroDetailTemplate } from "@/components/ground-zero/GroundZeroDetailTemplate";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.collectibles;

export const metadata: Metadata = {
  title: "Curated Collectibles — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroCollectiblesPage() {
  return <GroundZeroDetailTemplate page={page} />;
}
