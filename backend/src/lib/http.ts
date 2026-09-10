import { NextResponse } from "next/server";

export function corsHeaders(origin: string | null) {
  const allowed = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const allowOrigin = origin && allowed.includes(origin) ? origin : allowed[0] || "";

  return {
    "Access-Control-Allow-Origin": allowOrigin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

export function json(data: unknown, init?: ResponseInit, origin?: string | null) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders(origin ?? null),
      ...(init?.headers || {}),
    },
  });
}

export function options(origin: string | null) {
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) });
}
