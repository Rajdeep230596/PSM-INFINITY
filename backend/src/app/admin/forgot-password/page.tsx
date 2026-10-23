"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [message, setMessage] = useState("");
  const [debugLink, setDebugLink] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setDebugLink("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: form.get("email") }),
    });
    const payload = (await response.json()) as { message?: string; error?: string; debugLink?: string };
    setMessage(payload.message || payload.error || "Request sent");
    if (payload.debugLink) setDebugLink(payload.debugLink);
  };

  return (
    <main style={{ maxWidth: 420, margin: "12vh auto", padding: 24 }}>
      <h1>Forgot password</h1>
      <p>We will email a one-hour reset link if the owner account exists.</p>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input name="email" type="email" required style={{ width: "100%", padding: 8 }} />
        </label>
        <button type="submit">Send reset link</button>
      </form>
      {message ? <p>{message}</p> : null}
      {debugLink ? (
        <p>
          Dev link: <Link href={debugLink}>{debugLink}</Link>
        </p>
      ) : null}
      <p>
        <Link href="/admin/login">Back to login</Link>
      </p>
    </main>
  );
}
