const READY_TIMEOUT_MS = 8000;
const VIDEO_WARM_MS = 1200;

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });
}

function whenReady(signal: AbortSignal) {
  if (document.readyState === "complete") return Promise.resolve();
  return new Promise<void>((resolve) => {
    const onLoad = () => resolve();
    window.addEventListener("load", onLoad, { once: true });
    signal.addEventListener(
      "abort",
      () => {
        window.removeEventListener("load", onLoad);
        resolve();
      },
      { once: true },
    );
  });
}

async function whenFontsReady() {
  try {
    await Promise.race([document.fonts.ready, wait(2000)]);
    await Promise.race([document.fonts.load('400 16px "Dune Rise"'), wait(600)]);
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

function compileGpu() {
  const host = document.createElement("div");
  host.setAttribute("aria-hidden", "true");
  host.style.cssText =
    "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;transform:translate3d(0,0,0);will-change:transform,opacity;backface-visibility:hidden;";

  const glCanvas = document.createElement("canvas");
  glCanvas.width = 64;
  glCanvas.height = 64;
  const gl = glCanvas.getContext("webgl2", { antialias: false, alpha: true }) ?? glCanvas.getContext("webgl");
  if (gl) {
    gl.viewport(0, 0, 64, 64);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.flush();
  }

  const drawCanvas = document.createElement("canvas");
  drawCanvas.width = 64;
  drawCanvas.height = 64;
  const ctx = drawCanvas.getContext("2d");
  if (ctx) {
    ctx.fillStyle = "#e8d8c8";
    ctx.fillRect(0, 0, 64, 64);
    ctx.fillText("PSM", 8, 36);
  }

  host.append(glCanvas, drawCanvas);
  document.body.append(host);
  host.getBoundingClientRect();
  return () => host.remove();
}

async function warmVideo(src: string) {
  const video = document.createElement("video");
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.preload = "auto";
  video.src = src;
  video.setAttribute("aria-hidden", "true");
  video.style.cssText =
    "position:fixed;left:0;top:0;width:2px;height:2px;opacity:0;pointer-events:none;transform:translate3d(0,0,0);";
  document.body.append(video);

  await Promise.race([
    new Promise<void>((resolve) => {
      video.addEventListener("canplay", () => resolve(), { once: true });
      video.addEventListener("error", () => resolve(), { once: true });
    }),
    wait(VIDEO_WARM_MS),
  ]);

  try {
    const play = video.play();
    if (play) await Promise.race([play, wait(240)]);
    video.pause();
  } catch {
    // Autoplay lock is fine; decode still warms the pipeline.
  }

  try {
    const decode = (video as HTMLVideoElement & { decode?: () => Promise<void> }).decode;
    if (decode) await Promise.race([decode.call(video), wait(400)]);
  } catch {
    // decode() is optional.
  }

  video.remove();
}

export async function prewarmExperience(options: { reducedMotion: boolean }) {
  const controller = new AbortController();
  const cap = wait(READY_TIMEOUT_MS).then(() => controller.abort());

  await Promise.race([
    (async () => {
      await whenReady(controller.signal);
      await whenFontsReady();
      if (options.reducedMotion) return;
      const dispose = compileGpu();
      await warmVideo("/media/backdrop.mp4?v=7");
      document.querySelectorAll<HTMLElement>(".gpu-layer, .gpu-media, .page-backdrop, .hero-sticky").forEach((node) => {
        node.getBoundingClientRect();
      });
      await paintFrames(3);
      dispose();
    })(),
    cap,
  ]);
}
