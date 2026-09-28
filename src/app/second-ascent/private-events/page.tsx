import type { Metadata } from "next";

import { PrivateEventsSalonPageLazy } from "@/components/lazy/salons";
import { LcpPreload } from "@/components/media/site-image";
import { PRIVATE_EVENTS_HERO } from "@/content/private-events";

export const metadata: Metadata = {
  title: "Private Events — Second Ascent",
  description:
    "Intimate dinners, milestone celebrations, and closed-door gatherings staged as a single composition — guest list, room, and ritual.",
};

export default function PrivateEventsPage() {
  return (
    <>
      <LcpPreload src={PRIVATE_EVENTS_HERO.center.image} />
      <PrivateEventsSalonPageLazy />
    </>
  );
}
