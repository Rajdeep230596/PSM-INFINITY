import { NextRequest } from "next/server";
import { z } from "zod";

import { json, options } from "@/lib/http";
import { sendMail } from "@/lib/mail";
import {
  createPasswordResetToken,
  getAdminByEmail,
  resetLinkFor,
} from "@/modules/auth/password-reset";

const bodySchema = z.object({
  email: z.string().email(),
});

export function OPTIONS(request: NextRequest) {
  return options(request.headers.get("origin"));
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  try {
    const body = bodySchema.parse(await request.json());
    const admin = await getAdminByEmail(body.email);

    // Always return the same shape to avoid email enumeration.
    if (admin) {
      const token = await createPasswordResetToken(admin.id);
      const link = resetLinkFor(token);
      try {
        const mail = await sendMail({
          to: admin.email,
          subject: "PSM Infinity admin password reset",
          text: `Use this link within one hour to reset your password:\n\n${link}\n\nIf you did not request this, ignore this email.`,
        });
        return json(
          {
            ok: true,
            message:
              mail.mode === "console"
                ? "Reset prepared. Email is not configured — use the debug link locally."
                : "If that email exists, a reset link has been sent.",
            ...(mail.mode === "console" || process.env.NODE_ENV !== "production" ? { debugLink: link } : {}),
          },
          { status: 200 },
          origin,
        );
      } catch (error) {
        if (error instanceof Error && error.name === "MailConfigError") {
          return json(
            {
              ok: true,
              message: "Reset prepared, but email is not configured on this server.",
              ...(process.env.NODE_ENV !== "production" ? { debugLink: link } : {}),
            },
            { status: 200 },
            origin,
          );
        }
        throw error;
      }
    }

    return json(
      { ok: true, message: "If that email exists, a reset link has been sent." },
      { status: 200 },
      origin,
    );
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Failed" }, { status: 400 }, origin);
  }
}
