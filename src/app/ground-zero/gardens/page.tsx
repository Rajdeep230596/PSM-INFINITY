import type { Metadata } from "next";

import { GardensSalonPage } from "@/components/ground-zero/GardensSalonPage";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.gardens;

export const metadata: Metadata = {
  title: "Private Botanical Gardens — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroGardensPage() {
  return <GardensSalonPage />;
}
