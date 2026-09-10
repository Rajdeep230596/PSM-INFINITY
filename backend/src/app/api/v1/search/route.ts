import { NextRequest } from "next/server";

import { json, options } from "@/lib/http";
import { searchCatalogue } from "@/modules/companies/repo";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const q = request.nextUrl.searchParams.get("q")?.trim() || "";
  if (q.length < 2) {
    return json({ error: "Query too short" }, { status: 400 }, origin);
  }
  const data = await searchCatalogue(q);
  return json({ data }, { status: 200 }, origin);
}
