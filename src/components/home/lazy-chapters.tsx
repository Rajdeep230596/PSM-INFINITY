"use client";

import dynamic from "next/dynamic";

function ScreenFrame() {
  return <div className="h-screen w-full bg-[#0A0A0B]" aria-hidden="true" />;
}

export const CinematicWalkthroughLazy = dynamic(
  () => import("@/components/home/cinematic-walkthrough").then((module) => module.CinematicWalkthrough),
  { ssr: false, loading: ScreenFrame },
);

export const GroundZeroScrollyLazy = dynamic(
  () => import("@/components/home/ground-zero-scrolly").then((module) => module.GroundZeroScrollySection),
  { ssr: false, loading: ScreenFrame },
);

export const SkyTerraceArrivalLazy = dynamic(
  () => import("@/components/home/sky-terrace-arrival").then((module) => module.SkyTerraceArrival),
  { ssr: false, loading: ScreenFrame },
);

export const FirstAscentGalleryLazy = dynamic(
  () => import("@/components/first-ascent/FirstAscentGallery").then((module) => module.FirstAscentGallery),
  { ssr: false, loading: ScreenFrame },
);
