"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const PRIMARY_ROUTES = ["/", "/ground-zero/", "/first-ascent/", "/second-ascent/", "/skydeck/"];

export function RoutePrefetch() {
  const router = useRouter();

  useEffect(() => {
    const warm = () => {
      for (const href of PRIMARY_ROUTES) {
        try {
          router.prefetch(href);
        } catch {
          // Prefetch is best-effort on static export.
        }
      }
    };

    if (typeof window.requestIdleCallback === "function") {
      const idle = window.requestIdleCallback(warm, { timeout: 1600 });
      return () => window.cancelIdleCallback(idle);
    }

    const timer = window.setTimeout(warm, 350);
    return () => window.clearTimeout(timer);
  }, [router]);

  return null;
}
