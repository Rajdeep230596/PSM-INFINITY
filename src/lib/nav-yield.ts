"use client";

import { clearCinematicChapters } from "@/lib/cinematic-hero";
import { releaseAllVideoPrefetch } from "@/lib/deferred-video";
import { haltSiteScroll, resetRouteScroll, resumeSiteScroll } from "@/lib/site-lenis";

type Teardown = () => void;

const teardowns = new Set<Teardown>();
let navigating = false;

export function registerNavYield(teardown: Teardown) {
  teardowns.add(teardown);
  return () => {
    teardowns.delete(teardown);
  };
}

/** Run cleanup on the next internal navigation, and again on unmount. Safe to call twice. */
export function bindNavYield(cleanup: Teardown) {
  let done = false;
  const once = () => {
    if (done) return;
    done = true;
    cleanup();
  };
  const unregister = registerNavYield(once);
  return () => {
    unregister();
    once();
  };
}

export function isNavigating() {
  return navigating;
}

function pauseMediaElement(media: HTMLMediaElement) {
  try {
    media.pause();
  } catch {
    // Decoder shutdown is best-effort.
  }
}

function freezePageMedia() {
  document.querySelectorAll("video").forEach(pauseMediaElement);
  releaseAllVideoPrefetch();
  document
    .querySelectorAll('link[rel="preload"][as="video"], link[data-home-video-preload], link[data-video-prefetch]')
    .forEach((node) => node.remove());
}

function stopScrollWork() {
  clearCinematicChapters();
  document.documentElement.classList.remove("is-booting");
  document.documentElement.classList.add("is-revealed");
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
  for (const teardown of [...teardowns]) {
    try {
      teardown();
    } catch {
      // A failed teardown must not block the rest.
    }
  }
  freezePageMedia();
  haltSiteScroll();
}

/**
 * Static export + scroll-video cannot complete App Router client transitions.
 * Direct HTML loads are already fast — use those instead of the SPA router.
 */
export function commitFullNavigation(url: string) {
  if (navigating) return;
  navigating = true;
  stopScrollWork();
  window.location.assign(url);
}

export function beginNavigation() {
  if (navigating) return;
  navigating = true;
  stopScrollWork();
}

export function endNavigation(options?: { resetScroll?: boolean }) {
  navigating = false;
  if (options?.resetScroll !== false && !window.location.hash) resetRouteScroll();
  resumeSiteScroll();
}

export function isInternalRouteChange(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented) return false;
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;
  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  let url: URL;
  try {
    url = new URL(anchor.href, window.location.href);
  } catch {
    return false;
  }
  if (url.origin !== window.location.origin) return false;
  return url.pathname !== window.location.pathname || url.search !== window.location.search;
}
