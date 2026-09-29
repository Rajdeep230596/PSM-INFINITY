"use client";

import { useLayoutEffect, useState } from "react";

import { BootMark } from "@/components/layout/boot-mark";
import { prewarmExperience } from "@/lib/prewarm";

const REVEALED_KEY = "psm-revealed";

function markRevealed(html: HTMLElement) {
  html.classList.remove("is-booting");
  html.classList.add("is-revealed");
  try {
    sessionStorage.setItem(REVEALED_KEY, "1");
  } catch {
    // Private mode can block storage.
  }
}

function alreadyRevealed() {
  try {
    return sessionStorage.getItem(REVEALED_KEY) === "1";
  } catch {
    return false;
  }
}

export function BootLoader() {
  const [phase, setPhase] = useState<"booting" | "exiting" | "done">("booting");

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (alreadyRevealed() || html.classList.contains("is-revealed")) {
      markRevealed(html);
      setPhase("done");
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    html.classList.add("is-booting");

    let cancelled = false;
    const fadeMs = reducedMotion ? 0 : 280;

    const finish = () => {
      if (cancelled || html.classList.contains("is-revealed")) return;
      markRevealed(html);
      if (reducedMotion) {
        setPhase("done");
        return;
      }
      setPhase("exiting");
      window.setTimeout(() => {
        if (!cancelled) setPhase("done");
      }, fadeMs);
    };

    const onResourceError = (event: Event) => {
      const target = event.target;
      if (target instanceof HTMLScriptElement || target instanceof HTMLLinkElement) finish();
    };

    window.addEventListener("error", onResourceError, true);
    const failsafe = window.setTimeout(finish, 1200);

    void prewarmExperience({ reducedMotion })
      .catch(() => undefined)
      .then(finish);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
      window.removeEventListener("error", onResourceError, true);
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
      <BootMark />
    </div>
  );
}
