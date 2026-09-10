import { NextRequest } from "next/server";
import { z } from "zod";

import { createSession, verifyPassword } from "@/lib/auth";
import { getPool } from "@/lib/db";
import { json, options } from "@/lib/http";

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const body = bodySchema.parse(await request.json());
    const pool = getPool();
    const [rows] = await pool.query("SELECT email, password_hash FROM admins WHERE email = ? LIMIT 1", [body.email]);
    const admin = (rows as Array<{ email: string; password_hash: string }>)[0];
    if (!admin || !(await verifyPassword(body.password, admin.password_hash))) {
      return json({ error: "Invalid credentials" }, { status: 401 }, origin);
    }
    await createSession(admin.email);
    return json({ email: admin.email }, { status: 200 }, origin);
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Login failed" }, { status: 400 }, origin);
  }
}
