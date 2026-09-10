import { NextRequest } from "next/server";
import { z } from "zod";

import { getAdminEmail, requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { getCompanyById } from "@/modules/companies/repo";
import { createProduct, listProducts } from "@/modules/products/repo";

const specSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const createSchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  company_id: z.number().int().positive(),
  industry_id: z.number().int().positive().optional(),
  summary: z.string().min(1),
  destination_url: z.string().nullable().optional(),
  published: z.boolean().optional(),
  specs: z.array(specSchema).optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const industryId = Number(request.nextUrl.searchParams.get("industryId") || 0) || undefined;
  const companyId = Number(request.nextUrl.searchParams.get("companyId") || 0) || undefined;
  const email = await getAdminEmail().catch(() => null);
  const rows = await listProducts({ publishedOnly: !email, industryId, companyId });
  return json({ data: rows }, { status: 200 }, origin);
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const body = createSchema.parse(await request.json());
    const company = await getCompanyById(body.company_id);
    if (!company) return json({ error: "Company not found" }, { status: 400 }, origin);
    const id = await createProduct({
      ...body,
      industry_id: body.industry_id ?? company.industry_id,
    });
    return json({ id }, { status: 201 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}
