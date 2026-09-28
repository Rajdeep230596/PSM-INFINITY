"use client";

import { useEffect, useState, type RefObject } from "react";

import { isConstrainedNetwork } from "@/lib/media-capability";

const warmed = new Set<string>();
const warmers = new Map<string, HTMLVideoElement>();

/** Warm the media cache without occupying a full download slot. */
export function prefetchVideo(src: string) {
  if (!src || typeof document === "undefined") return;
  if (warmed.has(src) || warmers.has(src)) return;
  if (isConstrainedNetwork()) return;
  warmed.add(src);

  const video = document.createElement("video");
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.preload = "metadata";
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.setAttribute("muted", "");
  video.setAttribute("aria-hidden", "true");
  video.tabIndex = -1;
  Object.assign(video.style, {
    position: "fixed",
    width: "1px",
    height: "1px",
    opacity: "0",
    pointerEvents: "none",
    left: "-9999px",
  });
  video.src = src;
  document.body.append(video);
  video.load();
  warmers.set(src, video);
}

export function releaseVideoPrefetch(src: string) {
  const video = warmers.get(src);
  if (!video) return;
  video.pause();
  video.removeAttribute("src");
  video.load();
  video.remove();
  warmers.delete(src);
}

export function releaseAllVideoPrefetch() {
  for (const src of [...warmers.keys()]) releaseVideoPrefetch(src);
}

export function timeIsBuffered(video: HTMLVideoElement, time: number) {
  const ranges = video.buffered;
  if (ranges.length === 0) return video.readyState >= 2 && time <= 0.08;
  for (let i = 0; i < ranges.length; i += 1) {
    const start = ranges.start(i);
    const end = ranges.end(i);
    if (time >= start && time <= Math.max(start, end - 0.05)) return true;
  }
  return false;
}

export function markVideoReady(video: HTMLVideoElement) {
  video.classList.add("is-ready");
}

export function seekIfBuffered(video: HTMLVideoElement, time: number) {
  if (!Number.isFinite(time) || time < 0) return false;
  if (video.seeking) return false;
  if (!timeIsBuffered(video, time)) return false;
  if (Math.abs(video.currentTime - time) < 1 / 30) return true;
  try {
    video.currentTime = time;
    return true;
  } catch {
    return false;
  }
}

type DeferredOptions = {
  eager?: boolean;
  rootMargin?: string;
  prefetch?: string;
};

export function useDeferredVideoSource(
  targetRef: RefObject<Element | null>,
  src: string,
  eagerOrOptions: boolean | DeferredOptions = false,
) {
  const eager = typeof eagerOrOptions === "boolean" ? eagerOrOptions : Boolean(eagerOrOptions.eager);
  const rootMargin =
    typeof eagerOrOptions === "object" ? (eagerOrOptions.rootMargin ?? "200px 0px") : "200px 0px";
  const prefetch = typeof eagerOrOptions === "object" ? eagerOrOptions.prefetch : undefined;

  const [activeSrc, setActiveSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!eager) return;
    let cancelled = false;
    const arm = () => {
      if (cancelled) return;
      setActiveSrc(src);
      if (prefetch) prefetchVideo(prefetch);
    };
    const paint = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(arm);
    });
    return () => {
      cancelled = true;
      window.cancelAnimationFrame(paint);
    };
  }, [eager, prefetch, src]);

  useEffect(() => {
    if (eager) return;

    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        prefetchVideo(src);
        setActiveSrc(src);
        if (prefetch) prefetchVideo(prefetch);
        observer.disconnect();
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [eager, prefetch, rootMargin, src, targetRef]);

  useEffect(() => {
    if (!activeSrc) return;
    const timer = window.setTimeout(() => releaseVideoPrefetch(activeSrc), 8000);
    return () => window.clearTimeout(timer);
  }, [activeSrc]);

  return activeSrc;
}
