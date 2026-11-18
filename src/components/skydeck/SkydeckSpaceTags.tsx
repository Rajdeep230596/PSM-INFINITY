"use client";

import type { SkydeckSpace } from "@/content/skydeck";
import { AscentCard, AscentCardGrid } from "@/components/media/ascent-card";

export function SkydeckSpaceTags({
  spaces,
  visible,
}: {
  spaces: readonly SkydeckSpace[];
  visible: boolean;
}) {
  return (
    <nav
      className={`absolute inset-0 z-30 flex items-center justify-center px-4 md:px-10 lg:px-14 ${
        visible ? "is-revealed pointer-events-auto" : "pointer-events-none"
      }`}
      aria-label="Skydeck rooms"
      aria-hidden={!visible}
    >
      <AscentCardGrid>
        {spaces.map((space, index) => (
          <AscentCard
            key={space.slug}
            href={`/skydeck/${space.slug}`}
            index={Number(space.code) || index + 1}
            title={space.tag}
            eyebrow={space.blurb}
            revealed={visible}
            revealDelay={index * 0.06}
          />
        ))}
      </AscentCardGrid>
    </nav>
  );
}
