import { NextRequest } from "next/server";
import { z } from "zod";

import { getAdminEmail, requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { deleteIndustry, getIndustryBySlug, updateIndustry } from "@/modules/industries/repo";

const patchSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  description: z.string().nullable().optional(),
  hero_media_url: z.string().nullable().optional(),
  sort_order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  const { slug } = await context.params;
  const email = await getAdminEmail().catch(() => null);
  const row = await getIndustryBySlug(slug);
  if (!row || (!row.published && !email)) {
    return json({ error: "Not found" }, { status: 404 }, origin);
  }
  return json({ data: row }, { status: 200 }, origin);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const { slug } = await context.params;
    const row = await getIndustryBySlug(slug);
    if (!row) return json({ error: "Not found" }, { status: 404 }, origin);
    const body = patchSchema.parse(await request.json());
    const data = await updateIndustry(row.id, body);
    return json({ data }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const { slug } = await context.params;
    const row = await getIndustryBySlug(slug);
    if (!row) return json({ error: "Not found" }, { status: 404 }, origin);
    await deleteIndustry(row.id);
    return json({ ok: true }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}
