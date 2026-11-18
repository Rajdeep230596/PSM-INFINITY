import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";

type AscentLink = { href: string; label: string };

export function AscentBreak({
  eyebrow,
  title,
  lede,
  links,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  links: readonly AscentLink[];
}) {
  return (
    <section className="home-video-break flex items-center px-5 text-white md:px-16" aria-label={title}>
      <div className="mx-auto w-full max-w-5xl py-14">
        <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-[#C5A880] uppercase md:text-[11px]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-[1.08] font-light tracking-tight sm:text-4xl md:text-6xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed font-light text-neutral-300">{lede}</p>
        <AscentCardGrid className="mt-8">
          {links.map((link, index) => (
            <AscentCard key={link.href} href={link.href} index={index + 1} title={link.label} action="Enter" />
          ))}
        </AscentCardGrid>
      </div>
    </section>
  );
}
