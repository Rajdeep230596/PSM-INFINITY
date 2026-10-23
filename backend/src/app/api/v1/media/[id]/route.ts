import { NextRequest } from "next/server";

import { requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { deleteStoredFile } from "@/lib/storage/disk";
import { deleteMedia, getMediaById } from "@/modules/media/repo";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const { id: raw } = await context.params;
    const id = Number(raw);
    if (!Number.isFinite(id) || id < 1) {
      return json({ error: "Invalid id" }, { status: 400 }, origin);
    }
    const row = await getMediaById(id);
    if (!row) return json({ error: "Not found" }, { status: 404 }, origin);
    await deleteMedia(id);
    await deleteStoredFile(row.url);
    return json({ ok: true }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}
