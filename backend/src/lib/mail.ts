type MailInput = {
  to: string;
  subject: string;
  text: string;
};

export async function sendMail(input: MailInput) {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim() || user || "noreply@psminfinity.com";

  if (!host || !user || !pass) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[mail:dev-fallback]", {
        to: input.to,
        subject: input.subject,
        text: input.text,
      });
      return { sent: false, mode: "console" as const };
    }
    const error = new Error("Email is not configured (set SMTP_HOST, SMTP_USER, SMTP_PASS)");
    error.name = "MailConfigError";
    throw error;
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from,
    to: input.to,
    subject: input.subject,
    text: input.text,
  });

  return { sent: true, mode: "smtp" as const };
}
