type SiteLenis = {
  stop: () => void;
  start: () => void;
  scrollTo: (value: number, options?: { immediate?: boolean; force?: boolean }) => void;
};

let siteLenis: SiteLenis | null = null;
let pauseTimer = 0;
let paused = false;

export function setSiteLenis(instance: SiteLenis | null) {
  siteLenis = instance;
}

export function pauseSiteScroll(ms = 1000) {
  if (!siteLenis || paused) return;
  paused = true;
  const lenis = siteLenis;
  const y = window.scrollY;
  lenis.stop();
  pauseTimer = window.setTimeout(() => {
    pauseTimer = 0;
    paused = false;
    if (siteLenis !== lenis) return;
    lenis.start();
    lenis.scrollTo(y, { immediate: true, force: true });
  }, ms);
}

export function clearScrollPause() {
  if (pauseTimer) window.clearTimeout(pauseTimer);
  pauseTimer = 0;
  if (paused) siteLenis?.start();
  paused = false;
}
