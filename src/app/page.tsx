import { AscentBreak } from "@/components/home/ascent-break";
import { CinematicWalkthrough } from "@/components/home/cinematic-walkthrough";
import { HomePreload } from "@/components/home/home-preload";
import {
  DeferredChapter,
  FirstAscentGalleryLazy,
  GroundZeroScrollyLazy,
  SkyTerraceArrivalLazy,
  SkydeckArrivalLazy,
} from "@/components/home/lazy-chapters";
import { FIRST_ASCENT_LINKS } from "@/content/first-ascent";
import { GROUND_ZERO_LINKS } from "@/content/ground-zero";
import { SECOND_ASCENT_LINKS } from "@/content/second-ascent";
import { SKYDECK_SPACES } from "@/content/skydeck";

const SKYDECK_BREAK_LINKS = SKYDECK_SPACES.map((space) => ({
  href: `/skydeck/${space.slug}`,
  label: space.tag,
}));

export default function HomePage() {
  return (
    <>
      <HomePreload />
      <CinematicWalkthrough />
      <AscentBreak
        eyebrow="Ground Zero"
        title="The Private Atelier."
        lede="Wardrobe, residence, garden, and the objects kept closest to the house."
        links={GROUND_ZERO_LINKS}
      />
      <DeferredChapter>
        <GroundZeroScrollyLazy />
      </DeferredChapter>
      <AscentBreak
        eyebrow="First Ascent"
        title="Global Mobility."
        lede="The passage outward — air, water, sanctuary, and the car that meets you."
        links={FIRST_ASCENT_LINKS}
      />
      <DeferredChapter>
        <SkyTerraceArrivalLazy />
      </DeferredChapter>
      <AscentBreak
        eyebrow="Level Two"
        title="Events."
        lede="Private evenings and corporate gatherings, composed as one floor."
        links={SECOND_ASCENT_LINKS}
      />
      <DeferredChapter>
        <FirstAscentGalleryLazy hideHero />
      </DeferredChapter>
      <AscentBreak
        eyebrow="Level Three"
        title="Skydeck."
        lede="The private rooftop, room by room, above the city."
        links={SKYDECK_BREAK_LINKS}
      />
      <DeferredChapter rootMargin="80% 0px">
        <SkydeckArrivalLazy hideHero />
      </DeferredChapter>
    </>
  );
}
