"use client";

import { releaseAllVideoPrefetch } from "@/lib/deferred-video";
import { haltSiteScroll, resumeSiteScroll } from "@/lib/site-lenis";

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

function detachMediaElement(media: HTMLMediaElement) {
  try {
    media.pause();
  } catch {
    // Decoder shutdown is best-effort.
  }
  media.querySelectorAll("source").forEach((source) => source.remove());
  media.removeAttribute("src");
  media.preload = "none";
  try {
    media.load();
  } catch {
    // Aborting an in-flight buffer can throw in older WebKit.
  }
}

function freezePageMedia() {
  document.querySelectorAll("video").forEach((video) => detachMediaElement(video));
  releaseAllVideoPrefetch();
  document
    .querySelectorAll('link[rel="preload"][as="video"], link[data-home-video-preload], link[data-video-prefetch]')
    .forEach((node) => node.remove());
}

/** Abort scroll/video work immediately so the click can be handled on this frame. */
export function beginNavigation() {
  if (navigating) return;
  navigating = true;
  haltSiteScroll();
  for (const teardown of [...teardowns]) {
    try {
      teardown();
    } catch {
      // A failed teardown must not block the rest.
    }
  }
  queueMicrotask(freezePageMedia);
  window.setTimeout(() => {
    if (navigating) endNavigation();
  }, 2500);
}

export function endNavigation() {
  navigating = false;
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
