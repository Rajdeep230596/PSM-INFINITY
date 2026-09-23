import type { Metadata } from "next";

import { AscentChrome } from "@/components/first-ascent/AscentChrome";

export const metadata: Metadata = {
  title: "Skydeck — Level Three",
  description:
    "The private rooftop at PSM Infinity — terrace, pool pavilion, and night air held above the city.",
};

export default function SkydeckLayout({ children }: { children: React.ReactNode }) {
  return <AscentChrome htmlClass="skydeck-page">{children}</AscentChrome>;
}
