"use client";

import { gsap } from "gsap";

type ScrollVideoOptions = {
  getProgress: () => number;
  mapProgress?: (progress: number) => number;
  enabled?: boolean;
  /** 0–1. Lower is silkier; higher tracks the scroll more tightly. */
  smoothing?: number;
};

export function attachScrollVideo(
  video: HTMLVideoElement,
  options: ScrollVideoOptions,
): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.loop = false;
  video.preload = "auto";
  video.disablePictureInPicture = true;

  if (reduceMotion || options.enabled === false) {
    video.pause();
    return () => {};
  }

  const smoothing = options.smoothing ?? 0.16;
  const minStep = 1 / 60;
  let duration = 0;
  let displayed = 0;

  const endTime = () => Math.max(0, duration - minStep);

  const targetFromProgress = () => {
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration <= 0) return 0;
    return progress >= 0.995 ? endTime() : progress * endTime();
  };

  const unlockSeek = () => {
    const play = video.play();
    if (play && typeof play.then === "function") {
      play
        .then(() => {
          video.pause();
        })
        .catch(() => {});
    } else {
      video.pause();
    }
  };

  const tick = () => {
    if (duration <= 0 || video.readyState < 1) return;

    const target = targetFromProgress();
    displayed += (target - displayed) * smoothing;
    if (Math.abs(target - displayed) < minStep) displayed = target;

    if (Math.abs(video.currentTime - displayed) < minStep) return;
    if (video.seeking) return;
    try {
      video.currentTime = displayed;
    } catch {
      // Safari can throw if a seek lands before the buffer is ready.
    }
  };

  const onMeta = () => {
    duration = video.duration || 0;
    displayed = targetFromProgress();
    if (duration > 0) video.currentTime = displayed;
  };

  video.addEventListener("loadedmetadata", onMeta);
  if (video.readyState >= 1) onMeta();
  video.addEventListener("loadeddata", unlockSeek, { once: true });
  document.addEventListener("touchstart", unlockSeek, { once: true, passive: true });
  document.addEventListener("click", unlockSeek, { once: true });
  gsap.ticker.add(tick);

  return () => {
    gsap.ticker.remove(tick);
    video.removeEventListener("loadedmetadata", onMeta);
  };
}
