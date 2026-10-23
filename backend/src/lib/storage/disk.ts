import { mkdir, unlink, writeFile } from "fs/promises";
import path from "path";
import { randomBytes } from "crypto";

export const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "uploads");
export const PUBLIC_PREFIX = "/assets/uploads";

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
]);

const MAX_BYTES = Number(process.env.UPLOAD_MAX_BYTES || 8 * 1024 * 1024);

export function publicBaseUrl() {
  return (process.env.BACKEND_PUBLIC_URL || "http://localhost:4000").replace(/\/$/, "");
}

export function toAbsoluteUrl(relativeOrAbsolute: string) {
  if (relativeOrAbsolute.startsWith("http://") || relativeOrAbsolute.startsWith("https://")) {
    return relativeOrAbsolute;
  }
  return `${publicBaseUrl()}${relativeOrAbsolute.startsWith("/") ? "" : "/"}${relativeOrAbsolute}`;
}

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

function extensionFor(mime: string, filename: string) {
  const fromName = path.extname(filename).toLowerCase();
  if (fromName && /^\.[a-z0-9]{1,8}$/i.test(fromName)) return fromName;
  const map: Record<string, string> = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "image/gif": ".gif",
    "video/mp4": ".mp4",
    "video/webm": ".webm",
  };
  return map[mime] || ".bin";
}

export async function saveUpload(input: { filename: string; mime: string; bytes: Buffer }) {
  if (!ALLOWED_MIME.has(input.mime)) {
    const error = new Error("Unsupported file type. Use jpeg, png, webp, gif, mp4, or webm.");
    error.name = "ValidationError";
    throw error;
  }
  if (input.bytes.length === 0 || input.bytes.length > MAX_BYTES) {
    const error = new Error(`File must be between 1 byte and ${MAX_BYTES} bytes`);
    error.name = "ValidationError";
    throw error;
  }

  await ensureUploadDir();
  const ext = extensionFor(input.mime, input.filename);
  const base = path
    .basename(input.filename, path.extname(input.filename))
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .slice(0, 60) || "upload";
  const storedName = `${Date.now()}-${randomBytes(4).toString("hex")}-${base}${ext}`;
  await writeFile(path.join(UPLOAD_DIR, storedName), input.bytes);
  const relativeUrl = `${PUBLIC_PREFIX}/${storedName}`;
  return {
    relativeUrl,
    absoluteUrl: toAbsoluteUrl(relativeUrl),
    storedName,
    kind: input.mime.startsWith("video/") ? ("video" as const) : ("image" as const),
  };
}

export async function deleteStoredFile(relativeUrl: string) {
  if (!relativeUrl.startsWith(`${PUBLIC_PREFIX}/`)) return;
  const name = path.basename(relativeUrl);
  if (!name || name.includes("..")) return;
  try {
    await unlink(path.join(UPLOAD_DIR, name));
  } catch {
    // already gone
  }
}
