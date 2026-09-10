import { compare, hash } from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const COOKIE = "psm_admin";

function secret() {
  const value = process.env.AUTH_SECRET;
  if (!value || value.length < 32) {
    throw new Error("AUTH_SECRET must be at least 32 characters");
  }
  return new TextEncoder().encode(value);
}

export async function hashPassword(plain: string) {
  return hash(plain, 12);
}

export async function verifyPassword(plain: string, passwordHash: string) {
  return compare(plain, passwordHash);
}

export async function createSession(email: string) {
  const token = await new SignJWT({ email, role: "owner" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function getAdminEmail() {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret());
    return typeof payload.email === "string" ? payload.email : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const email = await getAdminEmail();
  if (!email) {
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }
  return email;
}
