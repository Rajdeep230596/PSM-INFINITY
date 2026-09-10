import { NextRequest } from "next/server";

import { json, options } from "@/lib/http";
import { listProducts } from "@/modules/products/repo";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const industryId = Number(request.nextUrl.searchParams.get("industryId") || 0) || undefined;
  const companyId = Number(request.nextUrl.searchParams.get("companyId") || 0) || undefined;
  const rows = await listProducts({ publishedOnly: true, industryId, companyId });
  return json({ data: rows }, { status: 200 }, origin);
}
