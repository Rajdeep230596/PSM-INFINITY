import Link from "next/link";

import { SkyTerraceArrivalLazy } from "@/components/home/lazy-chapters";
import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";

export default function FirstAscentPortalPage() {
  return (
    <div className="first-ascent first-ascent-flush min-h-screen bg-[#0A0A0B] text-neutral-100">
      <SkyTerraceArrivalLazy />
      <section className="mx-auto max-w-5xl px-8 py-28 text-center md:py-36">
        <p className="mb-4 font-sans text-[11px] tracking-[0.4em] text-amber-300/80 uppercase">
          First Ascent — Global Travel & High-End Mobility
        </p>
        <h1 className="font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] md:text-6xl">
          Four desks. One concierge.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed font-light text-neutral-400">
          Private air, sea, sanctuary, and armored ground — commissioned as a single itinerary or as discrete
          allocations.
        </p>
        <div className="mt-16 grid gap-8 text-left sm:grid-cols-2">
          {FIRST_ASCENT_LINKS.map((item, index) => (
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
