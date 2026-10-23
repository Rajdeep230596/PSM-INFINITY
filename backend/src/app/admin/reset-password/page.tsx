"use client";

import { FormEvent, Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token") || "";
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") || "");
    const confirm = String(form.get("confirm") || "");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    const response = await fetch("/api/v1/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Reset failed");
      return;
    }
    router.push("/admin/login");
  };

  if (!token) {
    return <p className="admin-error">Missing reset token.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="admin-form">
      <label className="admin-field">
        <span>New password</span>
        <input name="password" type="password" required minLength={8} />
      </label>
      <label className="admin-field">
        <span>Confirm password</span>
        <input name="confirm" type="password" required minLength={8} />
      </label>
      <div className="admin-actions">
        <button type="submit" className="admin-btn">
          Update password
        </button>
      </div>
      {error ? <p className="admin-error">{error}</p> : null}
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <h1>Reset password</h1>
        <p className="lede">Choose a new password for the owner account.</p>
        <Suspense fallback={<p className="admin-muted">Loading…</p>}>
          <ResetForm />
        </Suspense>
        <p className="admin-muted" style={{ marginTop: 18 }}>
          <Link href="/admin/login">Back to login</Link>
        </p>
      </div>
    </main>
  );
}
