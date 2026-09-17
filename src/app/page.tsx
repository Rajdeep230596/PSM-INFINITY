import {
  CinematicWalkthroughLazy,
  FirstAscentGalleryLazy,
  GroundZeroScrollyLazy,
  SkyTerraceArrivalLazy,
} from "@/components/home/lazy-chapters";

export default function HomePage() {
  return (
    <>
      <CinematicWalkthroughLazy />
      <GroundZeroScrollyLazy />
      <SkyTerraceArrivalLazy />
      <FirstAscentGalleryLazy hideHero />
    </>
  );
}
