"use client";

import { useEffect, useState } from "react";

import { BootMark } from "@/components/layout/boot-mark";
import { prewarmExperience } from "@/lib/prewarm";

export function BootLoader() {
  const [phase, setPhase] = useState<"booting" | "exiting" | "done">("booting");

  useEffect(() => {
    const html = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    html.classList.add("is-booting");

    let cancelled = false;
    const fadeMs = reducedMotion ? 0 : 560;

    void prewarmExperience({ reducedMotion }).then(() => {
      if (cancelled) return;
      html.classList.remove("is-booting");
      html.classList.add("is-revealed");
      if (reducedMotion) {
        setPhase("done");
        return;
      }
      setPhase("exiting");
      window.setTimeout(() => {
        if (!cancelled) setPhase("done");
      }, fadeMs);
    });

    return () => {
      cancelled = true;
      html.classList.remove("is-booting");
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
