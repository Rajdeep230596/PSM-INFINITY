"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { beginNavigation, endNavigation, isInternalRouteChange } from "@/lib/nav-yield";

const CORE_ROUTES = [
  "/",
  "/ground-zero",
  "/first-ascent",
  "/second-ascent",
  "/skydeck",
  "/services",
  "/locations",
  "/our-story",
  "/partner",
] as const;

export function RouteProgress() {
  const pathname = usePathname();
  const router = useRouter();
  const [phase, setPhase] = useState<"idle" | "active" | "finishing">("idle");

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalRouteChange(anchor, event)) return;
      beginNavigation();
      setPhase("active");
    };

    const onPop = () => {
      beginNavigation();
      setPhase("active");
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
    };
  }, []);

  useEffect(() => {
    CORE_ROUTES.forEach((href) => {
      try {
        router.prefetch(href);
      } catch {
        // Prefetch is opportunistic.
      }
    });
  }, [router]);

  useEffect(() => {
    if (phase !== "active") return;
    const timer = window.setTimeout(() => setPhase("finishing"), 4000);
    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    endNavigation();
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
