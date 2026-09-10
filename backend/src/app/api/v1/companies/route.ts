import { NextRequest } from "next/server";

import { json, options } from "@/lib/http";
import { listCompanies } from "@/modules/companies/repo";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const industryId = Number(request.nextUrl.searchParams.get("industryId") || 0) || undefined;
  const rows = await listCompanies({ publishedOnly: true, industryId });
  return json({ data: rows }, { status: 200 }, origin);
}
