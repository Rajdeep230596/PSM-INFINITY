import { mkdir, readdir, writeFile } from "fs/promises";
import path from "path";

export const UPLOAD_DIR = path.join(process.cwd(), "public", "assets", "uploads");
export const PUBLIC_PREFIX = "/assets/uploads";

export async function ensureUploadDir() {
  await mkdir(UPLOAD_DIR, { recursive: true });
}

export async function saveUpload(filename: string, bytes: Buffer) {
  await ensureUploadDir();
  const safe = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const stamped = `${Date.now()}-${safe}`;
  const dest = path.join(UPLOAD_DIR, stamped);
  await writeFile(dest, bytes);
  return `${PUBLIC_PREFIX}/${stamped}`;
}

export async function listUploads() {
  await ensureUploadDir();
  const names = await readdir(UPLOAD_DIR);
  return names
    .filter((name) => name !== ".gitkeep")
    .map((name) => ({ name, url: `${PUBLIC_PREFIX}/${name}` }));
}
