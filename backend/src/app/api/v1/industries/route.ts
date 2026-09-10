import { NextRequest } from "next/server";
import { z } from "zod";

import { getAdminEmail, requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { createIndustry, listIndustries } from "@/modules/industries/repo";

const createSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().optional(),
  hero_media_url: z.string().optional(),
  sort_order: z.number().int().optional(),
  published: z.boolean().optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const email = await getAdminEmail().catch(() => null);
    const rows = await listIndustries(!email);
    return json({ data: rows }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: 500 }, origin);
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const body = createSchema.parse(await request.json());
    const id = await createIndustry(body);
    return json({ id }, { status: 201 }, origin);
  } catch (error) {
    const status = error instanceof Error && error.name === "UnauthorizedError" ? 401 : 400;
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status }, origin);
  }
}
