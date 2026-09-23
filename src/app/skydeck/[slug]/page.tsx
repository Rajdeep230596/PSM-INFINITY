import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SkydeckDetailTemplate } from "@/components/skydeck/SkydeckDetailTemplate";
import { SKYDECK_SPACES, getSkydeckSpace } from "@/content/skydeck";

type SkydeckSpaceParams = { slug: string };

export function generateStaticParams() {
  return SKYDECK_SPACES.map((space) => ({ slug: space.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<SkydeckSpaceParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getSkydeckSpace(slug);
  if (!page) return { title: "Skydeck" };
  return {
    title: `${page.tag} — Skydeck`,
    description: page.subhead,
  };
}

export default async function SkydeckSpacePage({
  params,
}: {
  params: Promise<SkydeckSpaceParams>;
}) {
  const { slug } = await params;
  const page = getSkydeckSpace(slug);
  if (!page) notFound();
  return <SkydeckDetailTemplate page={page} />;
}
