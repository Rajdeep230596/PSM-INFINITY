import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function AboutRedirect() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6 pt-32 pb-24">
      <meta httpEquiv="refresh" content="0; url=/our-story/" />
      <a
        href="/our-story/"
        className="inline-flex min-h-11 items-center font-mono text-[10px] tracking-[0.28em] text-[#C5A880] uppercase"
      >
        Continue to Our Story
      </a>
    </div>
  );
}
