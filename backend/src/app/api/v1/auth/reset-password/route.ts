import { NextRequest } from "next/server";
import { z } from "zod";

import { json, options } from "@/lib/http";
import { consumePasswordResetToken } from "@/modules/auth/password-reset";

const bodySchema = z.object({
  token: z.string().min(20),
  password: z.string().min(8),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const body = bodySchema.parse(await request.json());
    const ok = await consumePasswordResetToken(body.token, body.password);
    if (!ok) {
      return json({ error: "Invalid or expired reset token" }, { status: 400 }, origin);
    }
    return json({ ok: true }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 }, origin);
  }
}
