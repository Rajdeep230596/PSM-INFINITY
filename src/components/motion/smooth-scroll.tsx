"use client";

import { useEffect } from "react";

import { registerNavYield } from "@/lib/nav-yield";
import { setScrollTriggerKiller, setSiteLenis } from "@/lib/site-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cancelled = false;
    let teardown = () => {};
    let stopForNav = () => {};

    void import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      if (cancelled) return;
      setScrollTriggerKiller(() => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      });
    });

    const skipLenis =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(max-width: 700px)").matches;

    if (!skipLenis) {
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
          stopForNav = () => {
            lenis.stop();
          };
          teardown = () => {
            setSiteLenis(null);
            gsap.ticker.remove(ticker);
            lenis.destroy();
          };
        },
      );
    }

    const unregister = registerNavYield(() => stopForNav());

    return () => {
      cancelled = true;
      unregister();
      setScrollTriggerKiller(null);
      teardown();
    };
  }, []);

  return children;
}
