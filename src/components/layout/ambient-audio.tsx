"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SRC = "/audio/the-amber-gate.mp3";
const VOLUME = 0.38;

function stopAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.removeAttribute("src");
}

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const wantPlayback = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = VOLUME;
    audio.preload = "none";

    let pendingUnlock = true;

    const teardownUnlock = () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    const unlock = () => {
      if (!pendingUnlock) return;
      if (!audio.src) audio.src = SRC;
      void audio
        .play()
        .then(() => {
          pendingUnlock = false;
          wantPlayback.current = true;
          setPlaying(true);
          teardownUnlock();
        })
        .catch(() => {});
    };

    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    const onVisibility = () => {
      if (document.hidden) {
        audio.pause();
        return;
      }
      if (wantPlayback.current && audio.src) {
        void audio.play().catch(() => {});
      }
    };

    const onPageHide = () => {
      audio.pause();
    };

    const onUnload = () => {
      stopAudio(audio);
      wantPlayback.current = false;
    };

    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", onPageHide);
    window.addEventListener("beforeunload", onUnload);

    return () => {
      teardownUnlock();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", onPageHide);
      window.removeEventListener("beforeunload", onUnload);
      wantPlayback.current = false;
      stopAudio(audio);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      if (!audio.src) audio.src = SRC;
      audio.volume = VOLUME;
      wantPlayback.current = true;
      void audio.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }
    wantPlayback.current = false;
    audio.pause();
    setPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} loop preload="none" playsInline />
      <button
        type="button"
        className="ambient-audio-toggle"
        onClick={toggle}
        aria-pressed={!playing}
        aria-label={playing ? "Mute background music" : "Play background music"}
      >
        {playing ? <Volume2 size={16} strokeWidth={1.6} /> : <VolumeX size={16} strokeWidth={1.6} />}
      </button>
    </>
  );
}
