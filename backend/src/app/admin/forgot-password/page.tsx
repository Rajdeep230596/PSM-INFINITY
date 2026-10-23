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
    <main className="admin-auth">
      <div className="admin-auth-card">
        <h1>Forgot password</h1>
        <p className="lede">We will email a one-hour reset link if the owner account exists.</p>
        <form onSubmit={onSubmit} className="admin-form">
          <label className="admin-field">
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <div className="admin-actions">
            <button type="submit" className="admin-btn">
              Send reset link
            </button>
          </div>
        </form>
        {message ? <p className="admin-muted" style={{ marginTop: 16 }}>{message}</p> : null}
        {debugLink ? (
          <p className="admin-muted" style={{ marginTop: 8 }}>
            Dev link: <Link href={debugLink}>{debugLink}</Link>
          </p>
        ) : null}
        <p className="admin-muted" style={{ marginTop: 18 }}>
          <Link href="/admin/login">Back to login</Link>
        </p>
      </div>
    </main>
  );
}
