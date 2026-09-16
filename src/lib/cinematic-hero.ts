const activeChapters = new Set<string>();

export function setCinematicChapter(id: string, active: boolean) {
  if (typeof document === "undefined") return;
  if (active) activeChapters.add(id);
  else activeChapters.delete(id);
  document.documentElement.classList.toggle("cinematic-hero-active", activeChapters.size > 0);
}
