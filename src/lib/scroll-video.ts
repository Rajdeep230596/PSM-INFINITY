"use client";

import { armVideoReveal, markVideoReady, seekIfBuffered, seekToward, timeIsBuffered } from "@/lib/deferred-video";
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

export function attachScrollVideo(
  video: HTMLVideoElement,
  options: ScrollVideoOptions,
): () => void {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  armInlineVideo(video);
  video.loop = false;
  video.preload = options.preload ?? video.preload ?? "auto";

  if (reduceMotion || options.enabled === false) {
    video.pause();
    const disarm = armVideoReveal(video);
    return () => disarm();
  }

  const ios = isIosDevice();
  const lite = ios || window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
  const smoothing = lite ? Math.min(options.smoothing ?? 0.2, 0.22) : (options.smoothing ?? 0.16);
  const frameRate = ios ? 12 : lite ? 12 : (options.frameRate ?? 30);
  const minStep = 1 / frameRate;
  const frameMs = 1000 / frameRate;
  let duration = 0;
  let displayed = 0;
  let raf = 0;
  let timer = 0;
  let lastPaint = 0;
  let unlocked = false;
  let stopped = false;
  let visible = false;

  const endTime = () => Math.max(0, duration - minStep);

  const targetFromProgress = () => {
    const raw = Math.min(1, Math.max(0, options.getProgress()));
    const progress = options.mapProgress ? options.mapProgress(raw) : raw;
    if (duration <= 0) return 0;
    return progress >= 0.995 ? endTime() : progress * endTime();
  };

  const revealIfPainted = () => {
    if (stopped || video.readyState < 2 || duration <= 0) return;
    const target = targetFromProgress();
    if (timeIsBuffered(video, target) && Math.abs(video.currentTime - target) < 0.45) {
      markVideoReady(video);
    }
  };

  /** Keep the iOS decoder in play-mode so scrub frames stay full-res, not poster thumbnails. */
  const holdDecoder = () => {
    if (!ios || stopped || !visible) return;
    video.muted = true;
    video.playbackRate = 0.0001;
    const play = video.play();
    if (play && typeof play.then === "function") play.catch(() => {});
  };

  const unlockSeek = () => {
    if (stopped || unlocked) return;
    unlocked = true;
    if (ios) {
      holdDecoder();
      return;
    }
    const play = video.play();
    const finish = () => {
      if (!stopped) video.pause();
    };
    if (play && typeof play.then === "function") {
      play.then(finish).catch(() => {});
    } else {
      finish();
    }
  };

  const tick = () => {
    if (stopped || !visible || duration <= 0 || video.readyState < 2) return;
    if (ios) holdDecoder();

    const target = targetFromProgress();
    displayed = smoothing >= 1 ? target : displayed + (target - displayed) * smoothing;
    if (Math.abs(target - displayed) < minStep) displayed = target;
    if (video.seeking) return;
    if (Math.abs(video.currentTime - displayed) < minStep) {
      markVideoReady(video);
      return;
    }
    try {
      video.currentTime = displayed;
      markVideoReady(video);
    } catch {
      seekToward(video, displayed);
    }
  };

  const stopClock = () => {
    if (raf) {
      window.cancelAnimationFrame(raf);
      raf = 0;
    }
    if (timer) {
      window.clearTimeout(timer);
      timer = 0;
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

  const loopTimeout = () => {
    if (stopped || !visible) {
      timer = 0;
      return;
    }
    tick();
    timer = window.setTimeout(loopTimeout, frameMs);
  };

  const ensureLoop = () => {
    if (stopped || !visible) return;
    if (ios) {
      if (!timer) loopTimeout();
      return;
    }
    if (!raf) raf = window.requestAnimationFrame(loopRaf);
  };

  const onMeta = () => {
    if (stopped) return;
    duration = video.duration || 0;
    displayed = targetFromProgress();
    seekIfBuffered(video, displayed);
    revealIfPainted();
  };

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = Boolean(entry?.isIntersecting);
      if (visible) {
        holdDecoder();
        ensureLoop();
      } else {
        stopClock();
        video.pause();
        video.playbackRate = 1;
      }
    },
    { rootMargin: ios ? "80px 0px" : "200px 0px", threshold: 0 },
  );
  io.observe(video);

  const forceReveal = () => {
    if (!stopped && video.readyState >= 2) markVideoReady(video);
  };

  video.addEventListener("loadedmetadata", onMeta);
  video.addEventListener("loadeddata", revealIfPainted);
  video.addEventListener("canplay", revealIfPainted);
  video.addEventListener("seeked", revealIfPainted);
  if (video.readyState >= 1) onMeta();
  video.addEventListener("loadeddata", unlockSeek, { once: true });
  video.addEventListener("pointerdown", unlockSeek, { passive: true, once: true });
  const revealTimer = window.setTimeout(forceReveal, ios ? 1200 : 360);
  if (video.readyState >= 2) revealIfPainted();
  unlockSeek();

  const stop = () => {
    if (stopped) return;
    stopped = true;
    visible = false;
    stopClock();
    window.clearTimeout(revealTimer);
    io.disconnect();
    video.pause();
    video.playbackRate = 1;
    video.removeEventListener("loadedmetadata", onMeta);
    video.removeEventListener("loadeddata", revealIfPainted);
    video.removeEventListener("canplay", revealIfPainted);
    video.removeEventListener("seeked", revealIfPainted);
    video.removeEventListener("loadeddata", unlockSeek);
    video.removeEventListener("pointerdown", unlockSeek);
  };

  const unregister = registerNavYield(stop);
  return () => {
    unregister();
    stop();
  };
}
