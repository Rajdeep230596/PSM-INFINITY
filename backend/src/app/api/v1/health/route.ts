import { NextRequest } from "next/server";

import { json, options } from "@/lib/http";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export function GET(request: NextRequest) {
  return json({ ok: true, service: "psm-infinity-backend" }, { status: 200 }, request.headers.get("origin"));
}
