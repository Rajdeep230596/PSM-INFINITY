export const SECOND_ASCENT_VIDEO_SRC = "/videos/second-ascent-backdrop.mp4?v=12";
export const SECOND_ASCENT_VIDEO_MOBILE_SRC = "/videos/second-ascent-backdrop-mobile.mp4?v=12";
/** Trimmed Level Two file — elevator handoff is the last frame. */
export const SECOND_ASCENT_VIDEO_DURATION = 14.267;
/** Dedicated Level Three clip — starts at the Skydeck handoff of the shared elevator file. */
export const SKYDECK_VIDEO_SRC = "/videos/skydeck-arrival.mp4?v=4";
export const SKYDECK_VIDEO_MOBILE_SRC = "/videos/skydeck-arrival-mobile.mp4?v=4";
export const SKYDECK_VIDEO_POSTER = "/videos/skydeck-arrival-poster.jpg";
export const SKYDECK_VIDEO_DURATION = 16.6;
/** Elevator arrival — Level Two ends here; Level Three: Skydeck begins. */
export const SKYDECK_HANDOFF_AT = 14.2;
export const SKYDECK_HANDOFF_PROGRESS = Math.min(1, SKYDECK_HANDOFF_AT / SECOND_ASCENT_VIDEO_DURATION);
/** Lounge interior after the lift — first Skydeck room cards appear. */
export const SKYDECK_LOUNGE_AT = 16.15;
/** Outdoor deck / pool — second Skydeck room cards replace the first row. */
export const SKYDECK_POOL_AT = 19.2;
/** Palazzo dissolve — second Skydeck room cards stay until this frame, then fade. */
export const SKYDECK_CARDS_HIDE_AT = 27.05;

/** Card beats were authored on the original 30.8s shared elevator file. */
const SKYDECK_MASTER_DURATION = 30.814;
const SKYDECK_SPAN = SKYDECK_MASTER_DURATION - SKYDECK_HANDOFF_AT;

export function skydeckProgressForTime(time: number) {
  return Math.min(1, Math.max(0, (time - SKYDECK_HANDOFF_AT) / SKYDECK_SPAN));
}

export function mapToLevelTwo(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  return p >= 0.985 ? SKYDECK_HANDOFF_PROGRESS : p * SKYDECK_HANDOFF_PROGRESS;
}

export function mapToSkydeck(progress: number) {
  const p = Math.min(1, Math.max(0, progress));
  const handoff = SKYDECK_HANDOFF_AT / SKYDECK_MASTER_DURATION;
  return handoff + p * (1 - handoff);
}
