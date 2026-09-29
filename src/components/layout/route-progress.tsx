"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { commitFullNavigation, endNavigation, isInternalRouteChange } from "@/lib/nav-yield";

export function RouteProgress() {
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "active" | "finishing">("idle");
  const seenPath = useRef(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalRouteChange(anchor, event)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setPhase("active");
      commitFullNavigation(anchor.href);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!seenPath.current) {
      seenPath.current = true;
      return;
    }
    endNavigation({ resetScroll: true });
    setPhase((current) => (current === "active" ? "finishing" : "idle"));
  }, [pathname]);

  useEffect(() => {
    if (phase !== "finishing") return;
    const timer = window.setTimeout(() => setPhase("idle"), 220);
    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div
      className={
        phase === "active"
          ? "route-progress is-active"
          : phase === "finishing"
            ? "route-progress is-finishing"
            : "route-progress"
      }
      aria-hidden="true"
    />
  );
}
