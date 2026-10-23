import { NextRequest } from "next/server";
import { z } from "zod";

import { requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { saveUpload, toAbsoluteUrl } from "@/lib/storage/disk";
import { createMedia, listMedia, type MediaOwnerType } from "@/modules/media/repo";

const ownerSchema = z.enum(["industry", "company", "product"]);

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const ownerType = request.nextUrl.searchParams.get("ownerType");
    const ownerId = Number(request.nextUrl.searchParams.get("ownerId") || 0) || undefined;
    const rows = await listMedia({
      ownerType: ownerType ? ownerSchema.parse(ownerType) : undefined,
      ownerId,
    });
    return json(
      {
        data: rows.map((row) => ({
          ...row,
          absolute_url: toAbsoluteUrl(row.url),
        })),
      },
      { status: 200 },
      origin,
    );
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File) || file.size === 0) {
      return json({ error: "Choose a file" }, { status: 400 }, origin);
    }

    const ownerType = ownerSchema.parse(String(form.get("ownerType") || ""));
    const ownerId = z.coerce.number().int().positive().parse(form.get("ownerId"));
    const alt = String(form.get("alt") || "");

    const bytes = Buffer.from(await file.arrayBuffer());
    const stored = await saveUpload({
      filename: file.name,
      mime: file.type || "application/octet-stream",
      bytes,
    });

    const id = await createMedia({
      owner_type: ownerType as MediaOwnerType,
      owner_id: ownerId,
      url: stored.relativeUrl,
      original_name: file.name,
      mime_type: file.type || null,
      file_size: bytes.length,
      alt,
      kind: stored.kind,
    });

    return json(
      {
        id,
        url: stored.relativeUrl,
        absolute_url: stored.absoluteUrl,
        kind: stored.kind,
      },
      { status: 201 },
      origin,
    );
  } catch (error) {
    const status = error instanceof Error && error.name === "ValidationError" ? 400 : statusFor(error);
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status }, origin);
  }
}
