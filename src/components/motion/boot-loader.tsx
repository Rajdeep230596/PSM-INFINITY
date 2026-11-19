"use client";

import { useLayoutEffect, useState } from "react";

import { BootMark } from "@/components/layout/boot-mark";
import { completeBootProgress, subscribeBootProgress } from "@/lib/boot-progress";
import { prewarmExperience } from "@/lib/prewarm";

const READY_KEY = "psm-films-ready";

function markRevealed(html: HTMLElement, persist: boolean) {
  html.classList.remove("is-booting");
  html.classList.add("is-revealed");
  if (!persist) return;
  try {
    sessionStorage.setItem(READY_KEY, "1");
  } catch {
    // Private mode can block storage.
  }
}

function filmsAlreadyReady() {
  try {
    return sessionStorage.getItem(READY_KEY) === "1";
  } catch {
    return false;
  }
}

export function BootLoader() {
  const [phase, setPhase] = useState<"booting" | "exiting" | "done">("booting");
  const [percent, setPercent] = useState(0);

  useLayoutEffect(() => {
    return subscribeBootProgress(setPercent);
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (filmsAlreadyReady() || html.classList.contains("is-revealed")) {
      markRevealed(html, true);
      setPhase("done");
      void import("@/lib/film-boot").then(({ primeHomeMedia }) => {
        void primeHomeMedia();
      });
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    html.classList.add("is-booting");

    let cancelled = false;
    let settled = false;
    const fadeMs = reducedMotion ? 0 : 280;

    const finish = (persist: boolean) => {
      if (cancelled || settled || html.classList.contains("is-revealed")) return;
      settled = true;
      window.clearTimeout(failsafe);
      completeBootProgress();
      markRevealed(html, persist);
      if (reducedMotion) {
        setPhase("done");
        return;
      }
      setPhase("exiting");
      window.setTimeout(() => {
        if (!cancelled) setPhase("done");
      }, fadeMs);
    };

    const ios =
      /iPhone|iPod|iPad/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const failsafe = window.setTimeout(() => finish(false), ios ? 50000 : 28000);

    void prewarmExperience({ reducedMotion }).then(
      () => finish(true),
      () => finish(false),
    );

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={phase === "exiting" ? "boot-loader is-exiting" : "boot-loader"}
      aria-busy={phase === "booting"}
      aria-live="polite"
      role="status"
    >
      <BootMark percent={phase === "exiting" ? 100 : percent} />
    </div>
  );
}
