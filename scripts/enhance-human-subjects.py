"""Apply 40% Lightroom-style clarity and sharpness to human subjects only."""

from __future__ import annotations

import os
import subprocess
import sys
import tempfile
from pathlib import Path

import cv2
import numpy as np
from PIL import Image

import mediapipe as mp
from mediapipe.tasks.python import BaseOptions
from mediapipe.tasks.python.vision import (
    ImageSegmenter,
    ImageSegmenterOptions,
    ObjectDetector,
    ObjectDetectorOptions,
    RunningMode,
)

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MODEL_DIR = Path(os.environ.get("TEMP", tempfile.gettempdir())) / "psm-mp-models"
AMOUNT = 0.40
PERSON_MIN_COVERAGE = 0.0015
SKIP_NAME_PARTS = ("logo", "wordmark", "favicon")
IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".webp"}
FFMPEG = r"C:\Users\RISHA\AppData\Local\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.1.2-full_build\bin\ffmpeg.exe"
FFPROBE = str(Path(FFMPEG).with_name("ffprobe.exe"))


def _mp_image(rgb: np.ndarray) -> mp.Image:
    return mp.Image(image_format=mp.ImageFormat.SRGB, data=np.ascontiguousarray(rgb))


def build_tools(running_mode: RunningMode):
    segmenter = ImageSegmenter.create_from_options(
        ImageSegmenterOptions(
            base_options=BaseOptions(model_asset_path=str(MODEL_DIR / "selfie_multiclass_256x256.tflite")),
            running_mode=running_mode,
            output_category_mask=True,
            output_confidence_masks=False,
        )
    )
    detector = ObjectDetector.create_from_options(
        ObjectDetectorOptions(
            base_options=BaseOptions(model_asset_path=str(MODEL_DIR / "efficientdet_lite0.tflite")),
            running_mode=running_mode,
            score_threshold=0.32,
            category_allowlist=["person"],
            max_results=12,
        )
    )
    return segmenter, detector


def person_mask(rgb: np.ndarray, segmenter, detector, timestamp_ms: int | None = None) -> np.ndarray:
    h, w = rgb.shape[:2]
    image = _mp_image(rgb)
    det_mask = np.zeros((h, w), dtype=np.float32)
    seg_mask = np.zeros((h, w), dtype=np.float32)
    skin_mask = np.zeros((h, w), dtype=np.float32)

    if timestamp_ms is None:
        seg = segmenter.segment(image)
        det = detector.detect(image)
    else:
        seg = segmenter.segment_for_video(image, timestamp_ms)
        det = detector.detect_for_video(image, timestamp_ms)

    if seg.category_mask is not None:
        category = seg.category_mask.numpy_view()
        if category.shape != (h, w):
            category = cv2.resize(category, (w, h), interpolation=cv2.INTER_NEAREST)
        # 1 hair, 2 body-skin, 3 face-skin, 4 clothes — ignore background.
        seg_mask = np.isin(category, (1, 2, 3, 4)).astype(np.float32)
        skin_mask = np.isin(category, (1, 2, 3)).astype(np.float32)

    for detection in det.detections:
        category = detection.categories[0]
        if category.category_name != "person":
            continue
        box = detection.bounding_box
        x0 = max(0, int(box.origin_x))
        y0 = max(0, int(box.origin_y))
        x1 = min(w, int(box.origin_x + box.width))
        y1 = min(h, int(box.origin_y + box.height))
        if x1 <= x0 or y1 <= y0:
            continue
        area_frac = ((x1 - x0) * (y1 - y0)) / float(w * h)
        skin_frac = float(skin_mask[y0:y1, x0:x1].mean()) if skin_mask.size else 0.0
        # Furniture and empty rooms: medium boxes, weak score.
        if 0.025 <= area_frac < 0.55 and category.score < 0.55:
            continue
        # Mannequins and floating gowns: large boxes with almost no skin/hair.
        if area_frac >= 0.08 and skin_frac < 0.025:
            continue
        px0 = max(0, int(box.origin_x - box.width * 0.12))
        py0 = max(0, int(box.origin_y - box.height * 0.12))
        px1 = min(w, int(box.origin_x + box.width * 1.12))
        py1 = min(h, int(box.origin_y + box.height * 1.18))
        roi = np.zeros((py1 - py0, px1 - px0), dtype=np.float32)
        cv2.ellipse(
            roi,
            ((px1 - px0) // 2, (py1 - py0) // 2),
            (max(1, (px1 - px0) // 2), max(1, (py1 - py0) // 2)),
            0,
            0,
            360,
            1.0,
            -1,
        )
        det_mask[py0:py1, px0:px1] = np.maximum(det_mask[py0:py1, px0:px1], roi)

    if float(det_mask.mean()) < PERSON_MIN_COVERAGE:
        return np.zeros((h, w), dtype=np.float32)

    dilated = cv2.dilate((det_mask > 0.05).astype(np.uint8), np.ones((21, 21), np.uint8), iterations=1)
    mask = np.maximum(det_mask, seg_mask * dilated.astype(np.float32))

    sigma = max(3.0, min(w, h) * 0.008)
    mask = cv2.GaussianBlur(mask, (0, 0), sigma)
    return np.clip(mask, 0, 1)


def enhance_bgr(bgr: np.ndarray, mask: np.ndarray) -> np.ndarray:
    if mask.max() < PERSON_MIN_COVERAGE:
        return bgr
    img = bgr.astype(np.float32)
    clarity_blur = cv2.GaussianBlur(img, (0, 0), max(8.0, min(img.shape[:2]) * 0.012))
    clarified = np.clip(img + (img - clarity_blur) * AMOUNT, 0, 255)
    sharp_blur = cv2.GaussianBlur(clarified, (0, 0), 1.05)
    sharpened = np.clip(clarified + (clarified - sharp_blur) * AMOUNT, 0, 255)
    alpha = mask[..., None].astype(np.float32)
    out = img * (1.0 - alpha) + sharpened * alpha
    return np.clip(out, 0, 255).astype(np.uint8)


def enhance_pil(image: Image.Image, mask: np.ndarray) -> Image.Image:
    rgb = np.array(image.convert("RGB"))
    bgr = cv2.cvtColor(rgb, cv2.COLOR_RGB2BGR)
    out = enhance_bgr(bgr, mask)
    rgb_out = cv2.cvtColor(out, cv2.COLOR_BGR2RGB)
    result = Image.fromarray(rgb_out)
    if image.mode == "RGBA":
        result = result.convert("RGBA")
        result.putalpha(image.getchannel("A"))
    return result


def save_image(path: Path, image: Image.Image) -> None:
    suffix = path.suffix.lower()
    tmp = path.with_suffix(path.suffix + ".tmp")
    if suffix in {".jpg", ".jpeg"}:
        image.convert("RGB").save(tmp, format="JPEG", quality=95, subsampling=1, optimize=True)
    elif suffix == ".webp":
        image.convert("RGB").save(tmp, format="WEBP", quality=90, method=6)
    else:
        image.save(tmp)
    tmp.replace(path)


def emit_webp(jpg_path: Path) -> None:
    webp = jpg_path.with_suffix(".webp")
    if not webp.exists() or not Path(FFMPEG).exists():
        return
    subprocess.run(
        [FFMPEG, "-y", "-loglevel", "error", "-i", str(jpg_path), "-c:v", "libwebp", "-q:v", "86", str(webp)],
        check=False,
    )


def iter_images() -> list[Path]:
    files: list[Path] = []
    for path in PUBLIC.rglob("*"):
        if path.suffix.lower() not in IMAGE_EXTS:
            continue
        if any(part in path.name.lower() for part in SKIP_NAME_PARTS):
            continue
        if path.suffix.lower() == ".webp" and (
            path.with_suffix(".jpg").exists() or path.with_suffix(".jpeg").exists()
        ):
            continue
        files.append(path)
    return sorted(files)


def process_images(segmenter, detector) -> list[Path]:
    changed: list[Path] = []
    skip_webp = set()
    for path in iter_images():
        if path.suffix.lower() == ".webp" and path.with_suffix(".jpg") in skip_webp:
            continue
        image = Image.open(path)
        rgb = np.array(image.convert("RGB"))
        mask = person_mask(rgb, segmenter, detector)
        coverage = float(mask.mean())
        if coverage < PERSON_MIN_COVERAGE:
            print(f"skip  {coverage:.4f}  {path.relative_to(ROOT)}")
            continue
        enhanced = enhance_pil(image, mask)
        save_image(path, enhanced)
        changed.append(path)
        print(f"edit  {coverage:.4f}  {path.relative_to(ROOT)}")
        if path.suffix.lower() in {".jpg", ".jpeg"}:
            skip_webp.add(path)
            emit_webp(path)
    return changed


def probe_video(path: Path) -> tuple[float, int, int]:
    cmd = [
        FFPROBE,
        "-v",
        "error",
        "-select_streams",
        "v:0",
        "-show_entries",
        "stream=width,height,avg_frame_rate",
        "-of",
        "default=noprint_wrappers=1:nokey=0",
        str(path),
    ]
    out = subprocess.check_output(cmd, text=True)
    meta = dict(line.split("=", 1) for line in out.splitlines() if "=" in line)
    num, den = meta["avg_frame_rate"].split("/")
    fps = float(num) / float(den or 1)
    return fps, int(meta["width"]), int(meta["height"])


def video_has_person(path: Path, segmenter, detector) -> bool:
    cap = cv2.VideoCapture(str(path))
    total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
    samples = [i / 20 for i in range(21)]
    found = False
    for frac in samples:
        cap.set(cv2.CAP_PROP_POS_FRAMES, int(total * frac) if total else 0)
        ok, frame = cap.read()
        if not ok:
            continue
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        mask = person_mask(rgb, segmenter, detector)
        if float(mask.mean()) >= PERSON_MIN_COVERAGE:
            found = True
            break
    cap.release()
    return found


def process_video(path: Path) -> bool:
    fps, width, height = probe_video(path)
    cap = cv2.VideoCapture(str(path))
    tmp = path.with_suffix(".enhanced.mp4")
    cmd = [
        FFMPEG,
        "-y",
        "-loglevel",
        "error",
        "-f",
        "rawvideo",
        "-pix_fmt",
        "bgr24",
        "-s",
        f"{width}x{height}",
        "-r",
        f"{fps:.4f}",
        "-i",
        "pipe:0",
        "-an",
        "-c:v",
        "libx264",
        "-preset",
        "medium",
        "-crf",
        "17",
        "-pix_fmt",
        "yuv420p",
        "-movflags",
        "+faststart",
        str(tmp),
    ]
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    assert proc.stdin is not None
    segmenter, detector = build_tools(RunningMode.VIDEO)
    frame_index = 0
    try:
        while True:
            ok, frame = cap.read()
            if not ok:
                break
            if frame.shape[1] != width or frame.shape[0] != height:
                frame = cv2.resize(frame, (width, height), interpolation=cv2.INTER_AREA)
            rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            ts = int(round(frame_index * 1000.0 / max(fps, 1.0))) + 1
            mask = person_mask(rgb, segmenter, detector, timestamp_ms=ts)
            out = enhance_bgr(frame, mask)
            proc.stdin.write(out.tobytes())
            frame_index += 1
            if frame_index % 30 == 0:
                print(f"  {path.name} frame {frame_index}")
    finally:
        cap.release()
        segmenter.close()
        detector.close()
        proc.stdin.close()
        code = proc.wait()
    if code != 0 or not tmp.exists() or tmp.stat().st_size < 1000:
        if tmp.exists():
            tmp.unlink()
        print(f"fail  {path.relative_to(ROOT)}")
        return False
    tmp.replace(path)
    print(f"edit  video {frame_index}f  {path.relative_to(ROOT)}")
    return True


def iter_videos() -> list[Path]:
    files: list[Path] = []
    for folder in (PUBLIC / "media", PUBLIC / "videos"):
        if not folder.exists():
            continue
        for path in folder.glob("*.mp4"):
            if path.name.endswith(".enhanced.mp4"):
                continue
            files.append(path)
    return sorted(set(files))


def main() -> int:
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"
    if mode in {"all", "stills"}:
        still_seg, still_det = build_tools(RunningMode.IMAGE)
        try:
            print("=== stills ===")
            process_images(still_seg, still_det)
        finally:
            still_seg.close()
            still_det.close()

    if mode not in {"all", "videos"}:
        return 0

    print("=== videos ===")
    probe_seg, probe_det = build_tools(RunningMode.IMAGE)
    try:
        targets = []
        for path in iter_videos():
            has_person = video_has_person(path, probe_seg, probe_det)
            if not has_person:
                print(f"skip  video  {path.relative_to(ROOT)}")
                continue
            print(f"scan  video  {path.relative_to(ROOT)}")
            targets.append(path)
    finally:
        probe_seg.close()
        probe_det.close()
    for path in targets:
        process_video(path)
    return 0


if __name__ == "__main__":
    sys.exit(main())
