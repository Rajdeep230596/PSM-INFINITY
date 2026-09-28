import { SKYDECK_HANDOFF_AT, SECOND_ASCENT_VIDEO_DURATION } from "@/lib/second-ascent-video";

/** Shared homepage scrollytelling — every chapter uses the same travel and lag. */
export const HOME_SCROLL_SCRUB = 1.05;
export const HOME_VIDEO_SMOOTHING = 0.14;
/** Extra viewport-heights of scroll per second of mapped video. */
export const HOME_EXTRA_VH_PER_SECOND = 20;

export const HOME_CHAPTER_VIDEO_SECONDS = {
  landing: 10,
  groundZero: 12.634,
  firstAscent: 10,
  events: SKYDECK_HANDOFF_AT,
  skydeck: SECOND_ASCENT_VIDEO_DURATION - SKYDECK_HANDOFF_AT,
} as const;

export function homeChapterStyle(videoSeconds: number) {
  const extra = Math.max(8, videoSeconds) * HOME_EXTRA_VH_PER_SECOND;
  return { height: `calc(100vh + ${extra}vh)` };
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
