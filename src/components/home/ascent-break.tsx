import Link from "next/link";

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
    <section className="home-video-break flex items-center px-6 text-white md:px-16" aria-label={title}>
      <div className="mx-auto w-full max-w-5xl py-16">
        <p className="mb-3 font-mono text-[10px] font-semibold tracking-[0.35em] text-[#C5A880] uppercase md:text-[11px]">
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl leading-[1.08] font-light tracking-tight sm:text-4xl md:text-6xl">
          {title}
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-relaxed font-light text-neutral-300">{lede}</p>
        <ul className="mt-8 grid gap-x-12 gap-y-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="text-sm tracking-wide text-neutral-200 transition-colors hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
