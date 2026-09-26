"use client";

import {
  CORPORATE_EVENTS_DOSSIER,
  CORPORATE_EVENTS_HERO,
  CORPORATE_EVENTS_SECTIONS,
  CORPORATE_EVENTS_STRIP,
} from "@/content/corporate-events";

import { EventsSalonPage } from "./EventsSalonPage";

export function CorporateEventsSalonPage() {
  return (
    <EventsSalonPage
      activeHref="/second-ascent/corporate-events"
      chapter="Second Ascent / 02"
      category="Corporate Events"
      standingLabel="House Allocation"
      protocolLabel="Board Protocol"
      hero={CORPORATE_EVENTS_HERO}
      strip={CORPORATE_EVENTS_STRIP}
      sections={CORPORATE_EVENTS_SECTIONS}
      dossier={CORPORATE_EVENTS_DOSSIER}
      gridClassName="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    />
  );
}
