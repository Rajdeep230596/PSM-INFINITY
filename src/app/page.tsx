import { CinematicWalkthrough } from "@/components/home/cinematic-walkthrough";
import { HomePreload } from "@/components/home/home-preload";
import {
  DeferredChapter,
  FirstAscentGalleryLazy,
  GroundZeroScrollyLazy,
  SkyTerraceArrivalLazy,
  SkydeckArrivalLazy,
} from "@/components/home/lazy-chapters";

export default function HomePage() {
  return (
    <>
      <HomePreload />
      <CinematicWalkthrough />
      <DeferredChapter>
        <GroundZeroScrollyLazy />
      </DeferredChapter>
      <DeferredChapter>
        <SkyTerraceArrivalLazy />
      </DeferredChapter>
      <DeferredChapter>
        <FirstAscentGalleryLazy hideHero />
      </DeferredChapter>
      <DeferredChapter rootMargin="80% 0px">
        <SkydeckArrivalLazy hideHero />
      </DeferredChapter>
    </>
  );
}
