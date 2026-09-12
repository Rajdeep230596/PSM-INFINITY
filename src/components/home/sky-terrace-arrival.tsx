"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Car, Globe, House, Ship } from "lucide-react";
import { useRef, useState } from "react";

import { attachScrollVideo } from "@/lib/scroll-video";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const SERVICES = [
  {
    id: "itineraries",
    label: "Global Itineraries",
    icon: Globe,
    href: "/locations",
  },
  {
    id: "yachts",
    label: "Yacht Charters",
    icon: Ship,
    href: "/services",
  },
  {
    id: "villas",
    label: "Bespoke Villas",
    icon: House,
    href: "/first-ascent",
  },
  {
    id: "chauffeur",
    label: "Chauffeur Fleet",
    icon: Car,
    href: "/first-ascent",
  },
] as const;

export function SkyTerraceArrival() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);
  const revealed = progress >= 0.72;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const video = videoRef.current;
      if (!section || !video) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      const compact = window.matchMedia("(max-width: 700px)").matches;
      const loopFallback = reduceMotion || coarse || compact;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.05,
        onUpdate: (self) => setProgress(self.progress),
      });

      if (loopFallback) {
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        const play = video.play();
        if (play && typeof play.then === "function") play.catch(() => {});
        return () => trigger.kill();
      }

      const detach = attachScrollVideo(video, {
        getProgress: () => trigger.progress,
        smoothing: 0.14,
      });

      return () => {
        detach();
        trigger.kill();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative h-[350vh] bg-black" aria-label="Sky terrace arrival">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/sky-terrace-arrival.mp4" type="video/mp4" />
        </video>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

        <div className="relative z-10 mx-auto flex w-full max-w-6xl items-center justify-center px-6 md:px-10">
          <div className="grid w-full grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
            {SERVICES.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.a
                  key={service.id}
                  href={service.href}
                  initial={false}
                  animate={
                    revealed
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0, y: 28, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.7,
                    delay: revealed ? index * 0.08 : 0,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex aspect-square flex-col items-center justify-center gap-5 rounded-[1.75rem] border border-white/25 bg-white/12 px-4 text-center shadow-[0_8px_40px_rgba(0,0,0,0.18)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/40 hover:bg-white/18 md:rounded-[2rem]"
                >
                  <Icon
                    size={36}
                    strokeWidth={1.15}
                    className="text-white transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="max-w-[9rem] text-[13px] font-light tracking-wide text-white md:text-sm">
                    {service.label}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
