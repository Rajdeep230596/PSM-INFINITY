"use client";

import { useEffect, useState, type ReactNode, type RefObject } from "react";

import { SiteImage } from "@/components/media/site-image";
import { chapterPreload, holdFilmSlot, isFilmLite, releaseFilmSlot } from "@/lib/film-load";

type HomeFilmStageProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  wrapRef?: RefObject<HTMLDivElement | null>;
  src?: string;
  poster?: string;
  posterPriority?: boolean;
  className?: string;
  children: ReactNode;
};

/** 16:9 film on top, black remainder for copy — same contain letterbox as the personal site. */
export function HomeFilmStage({
  videoRef,
  wrapRef,
  src,
  poster,
  posterPriority = false,
  className = "",
  children,
}: HomeFilmStageProps) {
  const [lite, setLite] = useState(true);

  useEffect(() => {
    setLite(isFilmLite());
  }, []);

  useEffect(() => {
    if (!src) return;
    if (posterPriority) holdFilmSlot(src);
    const video = videoRef.current;
    const done = () => releaseFilmSlot(src);
    if (video && video.readyState >= 2) done();
    video?.addEventListener("loadeddata", done);
    return () => {
      video?.removeEventListener("loadeddata", done);
      releaseFilmSlot(src);
    };
  }, [posterPriority, src, videoRef]);

  const preload = src ? (posterPriority && !lite ? "auto" : chapterPreload(lite)) : "none";

  return (
    <div
      ref={wrapRef}
      className={`home-stage sticky top-0 z-0 w-full overflow-hidden bg-[#050607] gpu-layer ${className}`.trim()}
    >
      <div className="home-film-frame">
        {poster ? (
          <SiteImage
            src={poster}
            alt=""
            aria-hidden="true"
            priority={posterPriority}
            className="home-film home-film-poster"
          />
        ) : null}
        <video
          ref={videoRef}
          src={src}
          muted
          playsInline
          disablePictureInPicture
          preload={preload}
          className="home-film gpu-media"
        />
        <div className="home-film-shade pointer-events-none" />
      </div>
      <div className="home-film-rest">{children}</div>
    </div>
  );
}
