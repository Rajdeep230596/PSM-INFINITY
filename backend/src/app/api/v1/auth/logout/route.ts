import { NextRequest } from "next/server";

import { clearSession } from "@/lib/auth";
import { json, options } from "@/lib/http";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  await clearSession();
  return json({ ok: true }, { status: 200 }, request.headers.get("origin"));
}
