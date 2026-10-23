"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        password: form.get("password"),
      }),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setError(payload.error || "Login failed");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <main className="admin-auth">
      <div className="admin-auth-card">
        <h1>PSM Infinity</h1>
        <p className="lede">Owner login for the catalogue console.</p>
        <form onSubmit={onSubmit} className="admin-form">
          <label className="admin-field">
            <span>Email</span>
            <input name="email" type="email" required autoComplete="username" />
          </label>
          <label className="admin-field">
            <span>Password</span>
            <input name="password" type="password" required minLength={8} autoComplete="current-password" />
          </label>
          <div className="admin-actions">
            <button type="submit" className="admin-btn">
              Sign in
            </button>
          </div>
          {error ? <p className="admin-error">{error}</p> : null}
        </form>
        <p className="admin-muted" style={{ marginTop: 18 }}>
          <Link href="/admin/forgot-password">Forgot password?</Link>
        </p>
      </div>
    </main>
  );
}
