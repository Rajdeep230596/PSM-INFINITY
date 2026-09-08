"use client";

import Link from "next/link";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function HeroScrolly() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const lineNodes = [...section.querySelectorAll<HTMLElement>(".hero-line")];

      const applyVisual = (progress: number) => {
        section.classList.toggle("is-scrolled", progress > 0.04);
        lineNodes.forEach((line) => {
          const at = Number(line.dataset.at || 0);
          line.classList.toggle("is-in", progress >= at);
        });
      };

      if (reduceMotion) {
        applyVisual(1);
        lineNodes.forEach((line) => line.classList.add("is-in"));
        return;
      }

      applyVisual(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => applyVisual(self.progress),
      });

      return () => {
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section className="hero-scrolly" id="heroScrolly" ref={sectionRef}>
      <div className="hero-sticky">
        <div className="hero-inner">
          <p className="hero-line hero-kicker" data-at="0.28">
            Your World. Personally Curated
          </p>
          <p className="hero-line hero-script" data-at="0.42">
            <span>One Request.</span>
            <span>A World of</span>
            <span>Possibilities.</span>
          </p>
        </div>
        <div className="hero-foot">
          <p className="hero-line hero-copy" data-at="0.58">
            Personal branding. Corporate identity. Technology, textile, and logistics — composed as one studio.
          </p>
          <div className="hero-line hero-actions" data-at="0.72">
            <Link className="btn btn-light" href="/locations">
              Find the Ballygunge studio
            </Link>
            <Link className="btn btn-outline-light" href="/services">
              See the services
            </Link>
          </div>
        </div>
        <p className="hero-scroll-hint" aria-hidden="true">
          Scroll
        </p>
      </div>
    </section>
  );
}
