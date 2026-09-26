"use client";

import {
  PRIVATE_EVENTS_DOSSIER,
  PRIVATE_EVENTS_HERO,
  PRIVATE_EVENTS_SECTIONS,
  PRIVATE_EVENTS_STRIP,
} from "@/content/private-events";

import { EventsSalonPage } from "./EventsSalonPage";

export function PrivateEventsSalonPage() {
  return (
    <EventsSalonPage
      activeHref="/second-ascent/private-events"
      chapter="Second Ascent / 01"
      category="Private Events"
      standingLabel="Private Folio"
      protocolLabel="Host Protocol"
      hero={PRIVATE_EVENTS_HERO}
      strip={PRIVATE_EVENTS_STRIP}
      sections={PRIVATE_EVENTS_SECTIONS}
      dossier={PRIVATE_EVENTS_DOSSIER}
      gridClassName="grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
    />
  );
}
