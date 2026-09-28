"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const SRC = "/audio/the-amber-gate.mp3";
const VOLUME = 0.38;

export function AmbientAudio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = VOLUME;

    let pendingUnlock = true;

    const teardown = () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
      window.removeEventListener("touchstart", unlock);
    };

    const unlock = () => {
      if (!pendingUnlock) return;
      void audio
        .play()
        .then(() => {
          pendingUnlock = false;
          setPlaying(true);
          teardown();
        })
        .catch(() => {});
    };

    unlock();
    window.addEventListener("pointerdown", unlock);
    window.addEventListener("keydown", unlock);
    window.addEventListener("touchstart", unlock, { passive: true });

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);

    return () => {
      teardown();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, []);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.volume = VOLUME;
      void audio.play().then(() => setPlaying(true)).catch(() => {});
      return;
    }
    audio.pause();
    setPlaying(false);
  }

  return (
    <>
      <audio ref={audioRef} src={SRC} autoPlay loop preload="auto" playsInline />
      <button
        type="button"
        className="ambient-audio-toggle"
        onClick={toggle}
        aria-pressed={!playing}
        aria-label={playing ? "Mute background music" : "Unmute background music"}
      >
        {playing ? <Volume2 size={15} strokeWidth={1.6} /> : <VolumeX size={15} strokeWidth={1.6} />}
        <span>{playing ? "Mute" : "Unmute"}</span>
      </button>
    </>
  );
}
