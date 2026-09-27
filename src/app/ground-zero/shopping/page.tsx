import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function GroundZeroShoppingRedirect() {
  return (
    <main className="flex min-h-[40vh] items-center justify-center px-6 pt-32 pb-24">
      <meta httpEquiv="refresh" content="0; url=/ground-zero/couture/" />
      <a
        href="/ground-zero/couture/"
        className="font-mono text-[10px] tracking-[0.28em] text-[#C5A880] uppercase"
      >
        Continue to Haute Couture
      </a>
    </main>
  );
}
