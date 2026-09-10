import { NextRequest } from "next/server";

import { getAdminEmail } from "@/lib/auth";
import { json, options } from "@/lib/http";

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");
  const email = await getAdminEmail();
  if (!email) {
    return json({ error: "Unauthorized" }, { status: 401 }, origin);
  }
  return json({ email, role: "owner" }, { status: 200 }, origin);
}
