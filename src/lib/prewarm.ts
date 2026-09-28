const READY_TIMEOUT_MS = 2400;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function whenReady(signal: AbortSignal) {
  if (document.readyState === "complete" || document.readyState === "interactive") return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onReady = () => resolve();
    document.addEventListener("DOMContentLoaded", onReady, { once: true });
    window.addEventListener("load", onReady, { once: true });
    signal.addEventListener(
      "abort",
      () => {
        document.removeEventListener("DOMContentLoaded", onReady);
        window.removeEventListener("load", onReady);
        resolve();
      },
      { once: true },
    );
  });
}

async function whenFontsReady() {
  try {
    await Promise.race([document.fonts.ready, wait(900)]);
  } catch {
    // Fonts are best-effort; never block the reveal on a failed face.
  }
}

function paintFrames(count: number) {
  return new Promise<void>((resolve) => {
    let remaining = count;
    const tick = () => {
      remaining -= 1;
      if (remaining <= 0) resolve();
      else requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

export async function prewarmExperience(options: { reducedMotion: boolean }) {
  const controller = new AbortController();
  const cap = wait(READY_TIMEOUT_MS).then(() => controller.abort());

  await Promise.race([
    (async () => {
      await whenReady(controller.signal);
      await whenFontsReady();
      if (options.reducedMotion) return;
      await paintFrames(2);
    })(),
    cap,
  ]);
}
