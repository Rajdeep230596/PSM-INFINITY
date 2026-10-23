import { createHash, randomBytes } from "crypto";

import { getPool } from "@/lib/db";
import { hashPassword } from "@/lib/auth";

function hashToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export async function getAdminByEmail(email: string) {
  const pool = getPool();
  const [rows] = await pool.query("SELECT id, email FROM admins WHERE email = ? LIMIT 1", [email]);
  return (rows as Array<{ id: number; email: string }>)[0] ?? null;
}

export async function createPasswordResetToken(adminId: number) {
  const pool = getPool();
  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
  await pool.execute(
    `INSERT INTO password_reset_tokens (admin_id, token_hash, expires_at) VALUES (?, ?, ?)`,
    [adminId, tokenHash, expiresAt],
  );
  return token;
}

export async function consumePasswordResetToken(token: string, newPassword: string) {
  const pool = getPool();
  const tokenHash = hashToken(token);
  const [rows] = await pool.query(
    `SELECT id, admin_id FROM password_reset_tokens
     WHERE token_hash = ? AND used_at IS NULL AND expires_at > NOW()
     LIMIT 1`,
    [tokenHash],
  );
  const row = (rows as Array<{ id: number; admin_id: number }>)[0];
  if (!row) return false;

  const passwordHash = await hashPassword(newPassword);
  await pool.execute("UPDATE admins SET password_hash = ? WHERE id = ?", [passwordHash, row.admin_id]);
  await pool.execute("UPDATE password_reset_tokens SET used_at = NOW() WHERE id = ?", [row.id]);
  return true;
}

export function resetLinkFor(token: string) {
  const base = (process.env.BACKEND_PUBLIC_URL || "http://localhost:4000").replace(/\/$/, "");
  return `${base}/admin/reset-password?token=${encodeURIComponent(token)}`;
}
