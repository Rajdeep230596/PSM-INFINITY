"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

import type { SkydeckSpace } from "@/content/skydeck";

export function SkydeckSpaceTags({
  spaces,
  visible,
}: {
  spaces: readonly SkydeckSpace[];
  visible: boolean;
}) {
  const wave = spaces.map((space) => space.slug).join("-");

  return (
    <nav
      className={`absolute inset-0 z-30 flex items-center justify-center px-6 md:px-10 lg:px-14 ${
        visible ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-label="Skydeck rooms"
      aria-hidden={!visible}
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.ul
            key={wave}
            className="flex w-full max-w-[100rem] flex-wrap items-center justify-center gap-10 sm:gap-12 lg:gap-14"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {spaces.map((space, index) => (
              <motion.li
                key={space.slug}
                className="w-[min(42vw,19rem)] min-w-[13.5rem] max-w-[19rem] flex-1"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link
                  href={`/skydeck/${space.slug}`}
                  prefetch={true}
                  className="group flex aspect-[5/4] w-full flex-col items-center justify-center gap-3 rounded-[1.75rem] border border-white/15 bg-black/55 px-6 text-center shadow-[0_8px_40px_rgba(0,0,0,0.35)] backdrop-blur-2xl transition-colors duration-300 hover:border-white/25 hover:bg-black/70 md:rounded-[2rem]"
                >
                  <span className="font-mono text-xs font-medium tracking-[0.22em] text-white uppercase sm:text-[13px] md:text-sm">
                    {space.tag}
                  </span>
                  <span className="max-w-[12rem] font-sans text-xs leading-snug font-light tracking-wide text-neutral-300 normal-case sm:text-sm">
                    {space.blurb}
                  </span>
                </Link>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
