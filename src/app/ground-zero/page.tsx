import { GroundZeroScrollyLazy } from "@/components/home/lazy-chapters";
import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";
import { GROUND_ZERO_LINKS } from "@/content/ground-zero";

export default function GroundZeroPortalPage() {
  return (
    <div className="first-ascent first-ascent-flush min-h-screen bg-[#0A0A0B] text-neutral-100">
      <GroundZeroScrollyLazy />
      <section className="mx-auto max-w-5xl px-8 py-28 text-center md:py-36">
        <p className="mb-4 font-sans text-[11px] tracking-[0.4em] text-[#C5A880] uppercase">
          Ground Zero — Foundation Tier
        </p>
        <h1 className="font-serif text-4xl leading-[1.1] font-light tracking-tight text-[#F5F2EC] md:text-6xl">
          Four desks. One atelier.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-base leading-relaxed font-light text-neutral-400">
          Wardrobe, residence, gardens, and collectibles — commissioned as a living foundation before
          travel ever begins.
        </p>
        <AscentCardGrid className="mt-16">
          {GROUND_ZERO_LINKS.map((item, index) => (
            <AscentCard key={item.href} href={item.href} index={index + 1} title={item.label} action="Open desk" />
          ))}
        </AscentCardGrid>
      </section>
    </div>
  );
}
