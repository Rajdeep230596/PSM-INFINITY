import { NextRequest } from "next/server";
import { z } from "zod";

import { getAdminEmail, requireAdmin } from "@/lib/auth";
import { json, options } from "@/lib/http";
import { statusFor } from "@/lib/route-errors";
import { getCompanyById } from "@/modules/companies/repo";
import { deleteProduct, getProductBySlug, listSpecs, updateProduct } from "@/modules/products/repo";

const specSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
});

const patchSchema = z.object({
  slug: z.string().min(1).optional(),
  name: z.string().min(1).optional(),
  company_id: z.number().int().positive().optional(),
  industry_id: z.number().int().positive().optional(),
  summary: z.string().min(1).optional(),
  destination_url: z.string().nullable().optional(),
  published: z.boolean().optional(),
  specs: z.array(specSchema).optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  const { slug } = await context.params;
  const email = await getAdminEmail().catch(() => null);
  const row = await getProductBySlug(slug);
  if (!row || (!row.published && !email)) {
    return json({ error: "Not found" }, { status: 404 }, origin);
  }
  const specs = await listSpecs(row.id);
  return json({ data: { ...row, specs } }, { status: 200 }, origin);
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const { slug } = await context.params;
    const row = await getProductBySlug(slug);
    if (!row) return json({ error: "Not found" }, { status: 404 }, origin);
    const body = patchSchema.parse(await request.json());
    let industryId = body.industry_id;
    if (body.company_id) {
      const company = await getCompanyById(body.company_id);
      if (!company) return json({ error: "Company not found" }, { status: 400 }, origin);
      industryId = industryId ?? company.industry_id;
    }
    const data = await updateProduct(row.id, { ...body, industry_id: industryId });
    const specs = data ? await listSpecs(data.id) : [];
    return json({ data: data ? { ...data, specs } : null }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}

export async function DELETE(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  try {
    await requireAdmin();
    const { slug } = await context.params;
    const row = await getProductBySlug(slug);
    if (!row) return json({ error: "Not found" }, { status: 404 }, origin);
    await deleteProduct(row.id);
    return json({ ok: true }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: statusFor(error) }, origin);
  }
}
