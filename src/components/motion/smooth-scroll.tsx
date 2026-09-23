"use client";

import { useEffect } from "react";

import { setSiteLenis } from "@/lib/site-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let teardown = () => {};

    void Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        const lenis = new Lenis({
          duration: 1.35,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 0.82,
          touchMultiplier: 1.05,
        });
        lenis.on("scroll", ScrollTrigger.update);
        setSiteLenis(lenis);
        const ticker = (time: number) => {
          lenis.raf(time * 1000);
        };
        gsap.ticker.add(ticker);
        gsap.ticker.lagSmoothing(0);
        teardown = () => {
          setSiteLenis(null);
          gsap.ticker.remove(ticker);
          lenis.destroy();
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
      },
    );

    return () => {
      cancelled = true;
      teardown();
    };
  }, []);

  return children;
}
