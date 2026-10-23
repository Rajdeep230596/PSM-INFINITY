import { NextRequest } from "next/server";
import { z } from "zod";

import { json, options } from "@/lib/http";
import { buildWhatsAppUrl, searchCatalogueForChat } from "@/modules/chat/knowledge";
import { runConcierge, type ChatMessage } from "@/modules/chat/openai";

const bodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
  includeWhatsApp: z.boolean().optional(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const body = bodySchema.parse(await request.json());
    const messages = body.messages as ChatMessage[];
    const latestUser = [...messages].reverse().find((message) => message.role === "user")?.content || "";
    const query = latestUser.trim().slice(0, 120) || "catalogue";
    const matches = await searchCatalogueForChat(query);

    const reply = await runConcierge(messages, matches);
    const summary = [
      "PSM Infinity enquiry via website concierge:",
      latestUser.slice(0, 400),
      matches.length
        ? `Possible matches: ${matches
            .slice(0, 5)
            .map((item) => `${item.name} (${item.type}/${item.slug})`)
            .join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    return json(
      {
        data: {
          message: reply,
          links: matches.slice(0, 8),
          whatsappUrl: body.includeWhatsApp === false ? null : buildWhatsAppUrl(summary),
          aiConfigured: Boolean(process.env.OPENAI_API_KEY?.trim()),
        },
      },
      { status: 200 },
      origin,
    );
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Chat failed" }, { status: 400 }, origin);
  }
}
