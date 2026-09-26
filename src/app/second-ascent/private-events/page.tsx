import type { Metadata } from "next";

import { PrivateEventsSalonPage } from "@/components/second-ascent/PrivateEventsSalonPage";

export const metadata: Metadata = {
  title: "Private Events — Second Ascent",
  description:
    "Intimate dinners, milestone celebrations, and closed-door gatherings staged as a single composition — guest list, room, and ritual.",
};

export default function PrivateEventsPage() {
  return <PrivateEventsSalonPage />;
}
