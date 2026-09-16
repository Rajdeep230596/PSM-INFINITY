import type { Metadata } from "next";

import { GroundZeroDetailTemplate } from "@/components/ground-zero/GroundZeroDetailTemplate";
import { GROUND_ZERO_PAGES } from "@/content/ground-zero";

const page = GROUND_ZERO_PAGES.shopping;

export const metadata: Metadata = {
  title: "Personal Premium Shopping — Ground Zero",
  description: page.subhead,
};

export default function GroundZeroShoppingPage() {
  return <GroundZeroDetailTemplate page={page} />;
}
