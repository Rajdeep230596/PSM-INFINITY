import { NextRequest } from "next/server";
import { z } from "zod";

import { getAdminEmail, requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { createCompany, listCompanies } from "@/modules/companies/repo";

const createSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  industry_id: z.number().int().positive(),
  summary: z.string().min(1),
  positioning: z.string().nullable().optional(),
  logo_url: z.string().nullable().optional(),
  website_url: z.string().nullable().optional(),
  published: z.boolean().optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const industryId = Number(request.nextUrl.searchParams.get("industryId") || 0) || undefined;
  const email = await getAdminEmail().catch(() => null);
  const rows = await listCompanies({ publishedOnly: !email, industryId });
  return json({ data: rows }, { status: 200 }, origin);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const body = createSchema.parse(await request.json());
    const id = await createCompany(body);
    return json({ id }, { status: 201 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}
