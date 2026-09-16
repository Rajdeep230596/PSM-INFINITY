"use client";

import { AnimatePresence, motion } from "framer-motion";

export type EditorialBeat = {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string[];
  subtext?: string;
};

export function beatVisibility(progress: number, start: number, end: number) {
  if (progress < start || progress > end) return 0;
  const span = Math.max(0.001, end - start);
  const t = (progress - start) / span;
  const fadeIn = start <= 0 ? 0 : 0.16;
  const fadeOut = 0.16;
  if (fadeIn > 0 && t < fadeIn) return t / fadeIn;
  if (t > 1 - fadeOut) return Math.max(0, (1 - t) / fadeOut);
  return 1;
}

export function activeBeat<T extends { start: number; end: number }>(progress: number, beats: T[]) {
  let current: T | null = null;
  let visibility = 0;
  for (const beat of beats) {
    const next = beatVisibility(progress, beat.start, beat.end);
    if (next >= visibility) {
      visibility = next;
      current = beat;
    }
  }
  if (visibility <= 0.02) return { beat: null as T | null, visibility: 0 };
  return { beat: current, visibility };
}

export function EditorialMilestone({
  beat,
  cta,
}: {
  beat: EditorialBeat | null;
  cta?: { label: string; onClick: () => void };
}) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-end">
      <div className="mx-auto w-full max-w-7xl px-8 pb-28 md:px-16 md:pb-36 lg:px-20">
        <div className="relative max-w-xl text-left">
          <div className="pointer-events-none absolute -inset-10 -z-10 bg-gradient-to-tr from-black/85 via-black/40 to-transparent blur-3xl" />
          <AnimatePresence mode="wait">
            {beat ? (
              <motion.div
                key={beat.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12, transition: { duration: 0.4, ease: "easeIn" } }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <span className="mb-3 block font-mono text-[10px] font-semibold tracking-[0.35em] text-rose-400 uppercase drop-shadow-md md:text-[11px]">
                  {beat.eyebrow}
                </span>
                <h2 className="font-serif text-3xl leading-[1.08] font-light tracking-tight text-white drop-shadow-xl sm:text-4xl md:text-6xl">
                  {beat.headline.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </h2>
                {beat.subtext ? (
                  <p className="mt-4 max-w-lg font-sans text-xs leading-relaxed font-light text-neutral-300 drop-shadow-md md:text-sm">
                    {beat.subtext}
                  </p>
                ) : null}
                {cta ? (
                  <button
                    type="button"
                    onClick={cta.onClick}
                    className="pointer-events-auto mt-8 rounded-full bg-white px-5 py-2.5 text-xs font-semibold tracking-tight text-black shadow-[0_2px_16px_rgba(255,255,255,0.18)] transition-colors hover:bg-neutral-200"
                  >
                    {cta.label}
                  </button>
                ) : null}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
