import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-32 pb-24 text-center">
      <p className="mb-4 font-mono text-[11px] tracking-[0.35em] text-[#C5A880] uppercase">404</p>
      <h1 className="max-w-xl font-serif text-3xl font-light tracking-tight text-white md:text-5xl">
        This desk is not on the floor.
      </h1>
      <p className="mt-4 max-w-md font-sans text-sm font-light text-neutral-400">
        The page you requested is not part of the current allocation.
      </p>
      <Link
        href="/"
        className="mt-10 inline-flex min-h-11 items-center rounded-full bg-[#C5A880] px-8 py-3 font-mono text-[11px] tracking-wider text-black uppercase"
      >
        Return home
      </Link>
    </div>
  );
}
