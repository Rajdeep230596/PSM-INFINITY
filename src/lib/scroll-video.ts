"use client";

import { armVideoReveal, markVideoReady, timeIsBuffered } from "@/lib/deferred-video";
import { isBootPriming } from "@/lib/film-boot";
import { armInlineVideo, isIosDevice } from "@/lib/media-capability";
import { registerNavYield } from "@/lib/nav-yield";

type ScrollVideoOptions = {
  getProgress: () => number;
  mapProgress?: (progress: number) => number;
  enabled?: boolean;
  /** 0–1. Lower is silkier; higher tracks the scroll more tightly. */
  smoothing?: number;
  /** Match the source frame rate so we do not seek faster than the video can show. */
  frameRate?: number;
  preload?: HTMLVideoElement["preload"];
};

function applySeek(video: HTMLVideoElement, time: number) {
  try {
    video.currentTime = time;
    return true;
  } catch {
    return false;
  }
}

export function attachScrollVideo(
  video: HTMLVideoElement,
  options: ScrollVideoOptions,
): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  armInlineVideo(video);
  video.loop = false;
  video.preload = options.preload ?? "auto";

  if (reduceMotion || options.enabled === false) {
    video.pause();
    const disarm = armVideoReveal(video);
    return () => disarm();
  }

  const ios = isIosDevice();
  const lite = ios || window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
  const requested = options.smoothing ?? 0.22;
  const smoothing = Math.min(requested >= 0.99 ? (lite ? 0.2 : 0.24) : requested, lite ? 0.22 : 0.28);
  const frameRate = lite ? 24 : (options.frameRate ?? 30);
  const minStep = 1 / frameRate;
  const maxStep = (lite ? 4 : 6) / frameRate;
  const frameMs = 1000 / frameRate;
  const rvfc = (
    video as HTMLVideoElement & {
      requestVideoFrameCallback?: (cb: () => void) => number;
    }
  ).requestVideoFrameCallback?.bind(video);

  let duration = 0;
  let displayed = 0;
  let raf = 0;
  let lastPaint = 0;
  let stopped = false;
  let visible = false;
  let allowingPlay = false;
  let pending = Number.NaN;
  let seekStarted = 0;
  let waitingForFrame = false;
  let frameWaitStarted = 0;

  const endTime = () => Math.max(0, duration - minStep);

  const targetFromProgress = () => {
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration <= 0) return 0;
    return progress >= 0.995 ? endTime() : progress * endTime();
  };

  const revealIfPainted = () => {
    if (stopped || video.readyState < 2 || duration <= 0) return;
    markVideoReady(video);
  };

  const freezePlayback = () => {
    if (stopped || allowingPlay || isBootPriming()) return;
    video.pause();
    video.playbackRate = 1;
  };

  const kickLoad = () => {
    if (stopped) return;
    video.muted = true;
    video.playbackRate = 1;
    if (video.readyState >= 2) {
      freezePlayback();
      return;
    }
    allowingPlay = true;
    const play = video.play();
    const settle = () => {
      allowingPlay = false;
      freezePlayback();
    };
    if (play && typeof play.then === "function") {
      play.then(settle).catch(() => {
        allowingPlay = false;
      });
    } else {
      settle();
    }
  };

  const unlockSeek = () => {
    if (stopped) return;
    kickLoad();
  };

  const seekBlocked = () => {
    const now = performance.now();
    if (waitingForFrame) {
      if (!frameWaitStarted) frameWaitStarted = now;
      if (now - frameWaitStarted < 90) return true;
      waitingForFrame = false;
      frameWaitStarted = 0;
    }
    if (!video.seeking) return false;
    if (!seekStarted) seekStarted = now;
    return now - seekStarted < 180;
  };

  const paintSeek = (time: number) => {
    if (!timeIsBuffered(video, time)) return false;
    if (Math.abs(video.currentTime - time) < minStep) {
      markVideoReady(video);
      return true;
    }
    if (!applySeek(video, time)) return false;
    seekStarted = performance.now();
    if (rvfc) {
      waitingForFrame = true;
      frameWaitStarted = performance.now();
      rvfc(() => {
        waitingForFrame = false;
        frameWaitStarted = 0;
        markVideoReady(video);
      });
    }
    return true;
  };

  const tick = () => {
    if (stopped || !visible || duration <= 0) return;
    if (video.readyState < 2) {
      unlockSeek();
      return;
    }

    const target = targetFromProgress();
    const gap = target - displayed;
    if (Math.abs(gap) <= minStep) {
      displayed = target;
    } else {
      const eased = displayed + gap * smoothing;
      const step = eased - displayed;
      displayed += Math.sign(step) * Math.min(Math.abs(step), maxStep);
    }
    displayed = Math.min(endTime(), Math.max(0, displayed));

    if (seekBlocked()) {
      pending = displayed;
      return;
    }
    seekStarted = 0;

    const next = Number.isFinite(pending) ? pending : displayed;
    pending = Number.NaN;
    paintSeek(next);
  };

  const stopClock = () => {
    if (raf) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
  };

  const loopRaf = (now: number) => {
    if (stopped || !visible) {
      raf = 0;
      return;
    }
    raf = window.requestAnimationFrame(loopRaf);
    if (now - lastPaint < frameMs) return;
    lastPaint = now;
    tick();
  };

  const ensureLoop = () => {
    if (stopped || !visible) return;
    if (!raf) raf = window.requestAnimationFrame(loopRaf);
  };

  const onMeta = () => {
    if (stopped) return;
    duration = video.duration || 0;
    displayed = targetFromProgress();
    paintSeek(displayed);
    revealIfPainted();
  };

  const onSeeked = () => {
    seekStarted = 0;
    waitingForFrame = false;
    revealIfPainted();
    if (Number.isFinite(pending)) tick();
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) {
        if (video.readyState < 3) unlockSeek();
        ensureLoop();
      } else {
        stopClock();
        freezePlayback();
      }
    },
    { rootMargin: ios ? "120% 0px" : "200px 0px", threshold: 0 },
  );
  io.observe(video);

  const forceReveal = () => {
    if (!stopped && video.readyState >= 2) markVideoReady(video);
  };

  const syncVisibility = () => {
    const rect = video.getBoundingClientRect();
    const onScreen = rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight;
    if (!onScreen) return;
    visible = true;
    unlockSeek();
    ensureLoop();
  };

  video.addEventListener("loadedmetadata", onMeta);
  video.addEventListener("loadeddata", revealIfPainted);
  video.addEventListener("canplay", revealIfPainted);
  video.addEventListener("seeked", onSeeked);
  const onLoadedDataUnlock = () => {
    if (visible) unlockSeek();
  };

  video.addEventListener("playing", freezePlayback);
  if (video.readyState >= 1) onMeta();
  video.addEventListener("loadeddata", onLoadedDataUnlock, { once: true });
  video.addEventListener("pointerdown", unlockSeek, { passive: true, once: true });
  const revealTimer = window.setTimeout(forceReveal, ios ? 1200 : 360);
  if (video.readyState >= 2) revealIfPainted();
  syncVisibility();

  const stop = () => {
    if (stopped) return;
    stopped = true;
    visible = false;
    stopClock();
    window.clearTimeout(revealTimer);
    io.disconnect();
    allowingPlay = false;
    video.pause();
    video.playbackRate = 1;
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("loadeddata", revealIfPainted);
    video.removeEventListener("canplay", revealIfPainted);
    video.removeEventListener("seeked", onSeeked);
    video.removeEventListener("playing", freezePlayback);
    video.removeEventListener("loadeddata", onLoadedDataUnlock);
    video.removeEventListener("pointerdown", unlockSeek);
  };

  const unregister = registerNavYield(stop);
  return () => {
    unregister();
    stop();
  };
}
