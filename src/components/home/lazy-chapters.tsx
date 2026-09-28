"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ReactNode } from "react";

import { isCompactViewport } from "@/lib/media-capability";

function ChapterFrame() {
  return <div className="home-scrolly-chapter w-full bg-[#0A0A0B]" aria-hidden="true" />;
}

export function DeferredChapter({
  children,
  eager = false,
  rootMargin = "160% 0px",
}: {
  children: ReactNode;
  eager?: boolean;
  rootMargin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(eager);

  useEffect(() => {
    if (show) return;
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShow(true);
        observer.disconnect();
      },
      { rootMargin: isCompactViewport() ? "45% 0px" : rootMargin, threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, show]);

  useEffect(() => {
    if (!show) return;
    let cancelled = false;
    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (!cancelled) ScrollTrigger.refresh();
    });
    return () => {
      cancelled = true;
    };
  }, [show]);

  if (show) return <>{children}</>;
  return <div ref={ref} className="home-scrolly-chapter w-full bg-[#0A0A0B]" aria-hidden="true" />;
}

export const CinematicWalkthroughLazy = dynamic(
  () => import("@/components/home/cinematic-walkthrough").then((module) => module.CinematicWalkthrough),
  { ssr: false, loading: ChapterFrame },
);

export const GroundZeroScrollyLazy = dynamic(
  () => import("@/components/home/ground-zero-scrolly").then((module) => module.GroundZeroScrollySection),
  { ssr: false, loading: ChapterFrame },
);

export const SkyTerraceArrivalLazy = dynamic(
  () => import("@/components/home/sky-terrace-arrival").then((module) => module.SkyTerraceArrival),
  { ssr: false, loading: ChapterFrame },
);

export const FirstAscentGalleryLazy = dynamic(
  () => import("@/components/first-ascent/FirstAscentGallery").then((module) => module.FirstAscentGallery),
  { ssr: false, loading: ChapterFrame },
);

export const SkydeckArrivalLazy = dynamic(
  () => import("@/components/home/skydeck-arrival").then((module) => module.SkydeckArrival),
  { ssr: false, loading: ChapterFrame },
);
