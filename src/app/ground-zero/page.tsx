import Link from "next/link";

import { GroundZeroScrollyLazy } from "@/components/home/lazy-chapters";
import { GROUND_ZERO_LINKS } from "@/content/ground-zero";

export default function GroundZeroPortalPage() {
  return (
    <div className="first-ascent first-ascent-flush min-h-screen bg-[#0A0A0B] text-neutral-100">
      <GroundZeroScrollyLazy />
      <section className="mx-auto max-w-5xl px-8 py-28 text-center md:py-36">
        <p className="mb-4 font-sans text-[11px] tracking-[0.4em] text-amber-300/80 uppercase">
          Ground Zero — Foundation Tier
        </p>
        <h1 className="font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] md:text-6xl">
          Five desks. One atelier.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed font-light text-neutral-400">
          Wardrobe, residence, landscape, gardens, and collectibles — commissioned as a living foundation before
          travel ever begins.
        </p>
        <div className="mt-16 grid gap-8 text-left sm:grid-cols-2">
          {GROUND_ZERO_LINKS.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              className="group rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-[transform,opacity,color,background-color,border-color,box-shadow] duration-500 hover:border-amber-400/30"
            >
              <p className="font-mono text-[10px] tracking-widest text-amber-400/60 uppercase">0{index + 1}</p>
              <h2 className="mt-3 font-serif text-2xl font-light tracking-tight text-[#F5F2EC]">{item.label}</h2>
              <p className="mt-6 text-xs font-light text-neutral-500 transition-colors group-hover:text-[#E8D8C8]">
                Open desk ↗
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
