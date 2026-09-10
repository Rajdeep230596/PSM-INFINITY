import { NextResponse } from "next/server";

import { saveUpload } from "@/lib/uploads";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "Choose an image file." }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const url = await saveUpload(file.name, bytes);

  return NextResponse.json({ ok: true, url });
}
