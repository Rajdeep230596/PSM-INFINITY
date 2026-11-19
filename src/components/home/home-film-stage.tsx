"use client";

import { useEffect, type ReactNode, type RefObject } from "react";

import { SiteImage } from "@/components/media/site-image";
import { registerBootVideo } from "@/lib/film-boot";
import { holdFilmSlot, releaseFilmSlotWhenHeadReady } from "@/lib/film-load";
import { armFilmSharpness, armInlineVideo } from "@/lib/media-capability";

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
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    armInlineVideo(video);
    if (posterPriority) registerBootVideo(video);
    return armFilmSharpness(video);
  }, [posterPriority, videoRef]);

  useEffect(() => {
    if (!src) return;
    if (posterPriority) holdFilmSlot(src);
    const video = videoRef.current;
    if (!video) return;
    armInlineVideo(video);
    return releaseFilmSlotWhenHeadReady(video, src);
  }, [posterPriority, src, videoRef]);

  const preload = src ? "auto" : "none";

  return (
    <div
      ref={wrapRef}
      className={`home-stage sticky top-0 z-0 w-full overflow-hidden bg-[#050607] ${className}`.trim()}
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
          width={1920}
          height={1080}
          muted
          playsInline
          disablePictureInPicture
          preload={preload}
          className="home-film gpu-media"
          {...{ "webkit-playsinline": "true" }}
        />
        <div className="home-film-shade pointer-events-none" />
      </div>
      <div className="home-film-rest">{children}</div>
    </div>
  );
}
