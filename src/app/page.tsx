import { HomePreload } from "@/components/home/home-preload";
import {
  CinematicWalkthroughLazy,
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
      <CinematicWalkthroughLazy />
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
