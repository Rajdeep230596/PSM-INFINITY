import { isCompactViewport } from "@/lib/media-capability";

/**
 * Same device-pixel budget as the personal site: css width × dpr with 15%
 * upscale allowed. Save-Data always stays on the lite path.
 */
export function filmNeedPx() {
  const dpr = Math.min(window.devicePixelRatio || 1, 3);
  return Math.round((window.innerWidth || 390) * dpr * 0.85);
}

export function isFilmLite() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (connection?.saveData) return true;
  if (connection?.effectiveType === "slow-2g" || connection?.effectiveType === "2g") return true;
  if (isCompactViewport()) return true;
  return filmNeedPx() <= 1080;
}

export function chapterPreload(lite: boolean): HTMLVideoElement["preload"] {
  return lite ? "metadata" : "auto";
}

let inflight = 0;
const waiters: Array<() => void> = [];
const held = new Map<string, () => void>();

function slotLimit() {
  return isFilmLite() ? 1 : 2;
}

function pump() {
  while (waiters.length && inflight < slotLimit()) {
    const next = waiters.shift();
    next?.();
  }
}

function grantRelease() {
  inflight += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    inflight = Math.max(0, inflight - 1);
    pump();
  };
}

/** Take a download slot now (opening reel). */
export function holdFilmSlot(src: string) {
  releaseFilmSlot(src);
  const release = grantRelease();
  held.set(src, release);
  return () => releaseFilmSlot(src);
}

/** Wait until a slot is free (later reels — one concurrent download on phones). */
export function acquireFilmSlot(src: string) {
  return new Promise<() => void>((resolve) => {
    const tryGrant = () => {
      if (inflight >= slotLimit()) return false;
      releaseFilmSlot(src);
      const release = grantRelease();
      held.set(src, release);
      resolve(() => releaseFilmSlot(src));
      return true;
    };
    if (!tryGrant()) waiters.push(() => tryGrant());
  });
}

export function releaseFilmSlot(src: string) {
  const release = held.get(src);
  if (!release) return;
  held.delete(src);
  release();
}
