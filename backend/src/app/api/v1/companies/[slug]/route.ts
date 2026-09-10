import { NextRequest } from "next/server";

import { json, options } from "@/lib/http";
import { getCompanyBySlug } from "@/modules/companies/repo";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const origin = request.headers.get("origin");
  const { slug } = await context.params;
  const row = await getCompanyBySlug(slug);
  if (!row || !row.published) {
    return json({ error: "Not found" }, { status: 404 }, origin);
  }
  return json({ data: row }, { status: 200 }, origin);
}
