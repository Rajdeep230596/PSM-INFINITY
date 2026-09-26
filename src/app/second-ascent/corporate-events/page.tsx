import type { Metadata } from "next";

import { CorporateEventsSalonPage } from "@/components/second-ascent/CorporateEventsSalonPage";

export const metadata: Metadata = {
  title: "Corporate Events — Second Ascent",
  description:
    "Brand galas, board retreats, and launch evenings composed with the same discretion as a private house — for the company that must be seen, exactly once.",
};

export default function CorporateEventsPage() {
  return <CorporateEventsSalonPage />;
}
