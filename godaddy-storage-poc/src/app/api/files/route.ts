import { NextResponse } from "next/server";

import { listUploads } from "@/lib/uploads";

export const runtime = "nodejs";

export async function GET() {
  const files = await listUploads();
  return NextResponse.json({ files });
}
