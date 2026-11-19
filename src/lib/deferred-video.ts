"use client";

import { useEffect, useState, type RefObject } from "react";

import { acquireFilmSlot } from "@/lib/film-load";
import { armInlineVideo, isConstrainedNetwork } from "@/lib/media-capability";

const warmed = new Set<string>();
const warmers = new Map<string, HTMLVideoElement>();

/** Warm the media cache without occupying a full download slot. */
export function prefetchVideo(src: string, options?: { force?: boolean }) {
  if (!src || typeof document === "undefined") return;
  if (warmers.has(src)) return;
  if (!options?.force && (warmed.has(src) || isConstrainedNetwork())) return;
  warmed.add(src);

  const video = document.createElement("video");
  armInlineVideo(video);
  video.preload = "auto";
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

export function getPrefetchVideo(src: string) {
  return warmers.get(src) ?? null;
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

/** Reveal as soon as a frame exists. Never wait on canplaythrough — cache restores skip it. */
export function armVideoReveal(video: HTMLVideoElement) {
  const reveal = () => markVideoReady(video);
  if (video.readyState >= 2) {
    reveal();
    return () => {};
  }
  video.addEventListener("loadeddata", reveal);
  video.addEventListener("canplay", reveal);
  const timer = window.setTimeout(reveal, 360);
  return () => {
    video.removeEventListener("loadeddata", reveal);
    video.removeEventListener("canplay", reveal);
    window.clearTimeout(timer);
  };
}

export function playMutedLoop(video: HTMLVideoElement) {
  video.loop = true;
  video.muted = true;
  video.playsInline = true;
  video.disablePictureInPicture = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  const disarm = armVideoReveal(video);
  const play = video.play();
  if (play && typeof play.then === "function") play.catch(() => {});
  return () => {
    disarm();
    video.pause();
  };
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

/** Hold the last good frame until the scroll target is actually buffered. */
export function seekToward(video: HTMLVideoElement, time: number) {
  return seekIfBuffered(video, time);
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
    if (!src || !eager) return;
    setActiveSrc(src);
    if (prefetch) prefetchVideo(prefetch);
  }, [eager, prefetch, src]);

  useEffect(() => {
    if (!src || eager) return;

    const node = targetRef.current;
    if (!node) return;
    let cancelled = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();
        void acquireFilmSlot(src).then((release) => {
          if (cancelled) {
            release();
            return;
          }
          setActiveSrc(src);
          if (prefetch) prefetchVideo(prefetch);
        });
      },
      { rootMargin, threshold: 0 },
    );

    observer.observe(node);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [eager, prefetch, rootMargin, src, targetRef]);

  useEffect(() => {
    if (!activeSrc) return;
    const timer = window.setTimeout(() => releaseVideoPrefetch(activeSrc), 180000);
    return () => window.clearTimeout(timer);
  }, [activeSrc]);

  return activeSrc;
}
