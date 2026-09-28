"use client";

import dynamic from "next/dynamic";

import { RouteShell } from "@/components/layout/route-shell";

export const ItinerariesSalonPageLazy = dynamic(
  () => import("@/components/first-ascent/ItinerariesSalonPage").then((module) => module.ItinerariesSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const YachtsSalonPageLazy = dynamic(
  () => import("@/components/first-ascent/YachtsSalonPage").then((module) => module.YachtsSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const VillasSalonPageLazy = dynamic(
  () => import("@/components/first-ascent/VillasSalonPage").then((module) => module.VillasSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const ChauffeurSalonPageLazy = dynamic(
  () => import("@/components/first-ascent/ChauffeurSalonPage").then((module) => module.ChauffeurSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const CoutureSalonPageLazy = dynamic(
  () => import("@/components/ground-zero/CoutureSalonPage").then((module) => module.CoutureSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const EstatesSalonPageLazy = dynamic(
  () => import("@/components/ground-zero/EstatesSalonPage").then((module) => module.EstatesSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const GardensSalonPageLazy = dynamic(
  () => import("@/components/ground-zero/GardensSalonPage").then((module) => module.GardensSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const CollectiblesSalonPageLazy = dynamic(
  () => import("@/components/ground-zero/CollectiblesSalonPage").then((module) => module.CollectiblesSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const PrivateEventsSalonPageLazy = dynamic(
  () => import("@/components/second-ascent/PrivateEventsSalonPage").then((module) => module.PrivateEventsSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);

export const CorporateEventsSalonPageLazy = dynamic(
  () => import("@/components/second-ascent/CorporateEventsSalonPage").then((module) => module.CorporateEventsSalonPage),
  { ssr: false, loading: () => <RouteShell /> },
);
