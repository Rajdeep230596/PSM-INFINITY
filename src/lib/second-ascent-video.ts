export const SECOND_ASCENT_VIDEO_SRC = "/videos/second-ascent-backdrop.mp4?v=8";
export const SECOND_ASCENT_VIDEO_DURATION = 30.814;
/** Elevator arrival — Level Two ends here; Level Three: Skydeck begins. */
export const SKYDECK_HANDOFF_AT = 14.2;
export const SKYDECK_HANDOFF_PROGRESS = SKYDECK_HANDOFF_AT / SECOND_ASCENT_VIDEO_DURATION;
/** Lounge interior after the lift — first Skydeck room cards appear. */
export const SKYDECK_LOUNGE_AT = 16.15;
/** Outdoor deck / pool — second Skydeck room cards replace the first row. */
export const SKYDECK_POOL_AT = 19.2;
/** Palazzo dissolve — second Skydeck room cards stay until this frame, then fade. */
export const SKYDECK_CARDS_HIDE_AT = 27.05;

const SKYDECK_SPAN = SECOND_ASCENT_VIDEO_DURATION - SKYDECK_HANDOFF_AT;

export function skydeckProgressForTime(time: number) {
  return Math.min(1, Math.max(0, (time - SKYDECK_HANDOFF_AT) / SKYDECK_SPAN));
}

export function mapToLevelTwo(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  return p >= 0.985 ? SKYDECK_HANDOFF_PROGRESS : p * SKYDECK_HANDOFF_PROGRESS;
}

export function mapToSkydeck(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  return SKYDECK_HANDOFF_PROGRESS + p * (1 - SKYDECK_HANDOFF_PROGRESS);
}
