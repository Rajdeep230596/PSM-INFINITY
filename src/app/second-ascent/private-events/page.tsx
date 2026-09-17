import type { Metadata } from "next";

import { SecondAscentDetailTemplate } from "@/components/second-ascent/SecondAscentDetailTemplate";
import { SECOND_ASCENT_PAGES } from "@/content/second-ascent";

const page = SECOND_ASCENT_PAGES["private-events"];

export const metadata: Metadata = {
  title: "Private Events — Second Ascent",
  description: page.subhead,
};

export default function PrivateEventsPage() {
  return <SecondAscentDetailTemplate page={page} />;
}
