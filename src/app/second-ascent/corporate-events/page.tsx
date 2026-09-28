import type { Metadata } from "next";

import { CorporateEventsSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { CORPORATE_EVENTS_HERO } from "@/content/corporate-events";

export const metadata: Metadata = {
  title: "Corporate Events — Second Ascent",
  description:
    "Brand galas, board retreats, and launch evenings composed with the same discretion as a private house — for the company that must be seen, exactly once.",
};

export default function CorporateEventsPage() {
  return (
    <>
      <LcpPreload src={CORPORATE_EVENTS_HERO.center.image} />
      <CorporateEventsSalonPageLazy />
    </>
  );
}
