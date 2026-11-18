import { SkyTerraceArrivalLazy } from "@/components/home/lazy-chapters";
import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";
import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";

export default function FirstAscentPortalPage() {
  return (
    <div className="first-ascent first-ascent-flush min-h-screen bg-[#0A0A0B] text-neutral-100">
      <SkyTerraceArrivalLazy />
      <section className="mx-auto max-w-5xl px-8 py-28 text-center md:py-36">
        <p className="mb-4 font-sans text-[11px] tracking-[0.4em] text-[#C5A880] uppercase">
          First Ascent — Global Travel & High-End Mobility
        </p>
        <h1 className="font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] md:text-6xl">
          Four desks. One concierge.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed font-light text-neutral-400">
          Private air, sea, sanctuary, and armored ground — commissioned as a single itinerary or as discrete
          allocations.
        </p>
        <AscentCardGrid className="mt-16">
          {FIRST_ASCENT_LINKS.map((item, index) => (
            <AscentCard key={item.href} href={item.href} index={index + 1} title={item.label} action="Open desk" />
          ))}
        </AscentCardGrid>
      </section>
    </div>
  );
}
