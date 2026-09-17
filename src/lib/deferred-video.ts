"use client";

import { useEffect, useState, type RefObject } from "react";

export function useDeferredVideoSource(targetRef: RefObject<Element | null>, src: string, eager = false) {
  const [activeSrc, setActiveSrc] = useState<string | undefined>(eager ? src : undefined);

  useEffect(() => {
    if (eager) {
      setActiveSrc(src);
      return;
    }
    if (activeSrc) return;

    const node = targetRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setActiveSrc(src);
        observer.disconnect();
      },
      { rootMargin: "280px 0px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [activeSrc, eager, src, targetRef]);

  return activeSrc;
}
