"use client";

export function isCompactViewport() {
  return window.matchMedia("(max-width: 700px)").matches;
}

export function isCoarsePointer() {
  return window.matchMedia("(pointer: coarse)").matches;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** True on phones, Save-Data, or slow cellular — skip extra media work. */
export function isConstrainedNetwork() {
  if (isCompactViewport()) return true;
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } })
    .connection;
  if (!connection) return false;
  if (connection.saveData) return true;
  return connection.effectiveType === "slow-2g" || connection.effectiveType === "2g";
}

export function shouldLoopScrollVideo() {
  return prefersReducedMotion();
}
