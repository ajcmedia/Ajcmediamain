"use client";

import { FormEvent, useState } from "react";

type LoginResult = { error?: string; requestId?: string };

export function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("Checking access...");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        credentials: "same-origin",
        body: JSON.stringify({ password })
      });

      const result = (await response.json().catch(() => ({}))) as LoginResult;
      if (!response.ok) {
        const reference = result.requestId || response.headers.get("X-AJC-Request-Id");
        setStatus(`${result.error || "That password did not unlock the admin room."}${reference ? ` Reference: ${reference}` : ""}`);
        return;
      }

      setStatus("Access granted. Confirming the Safari session...");
      if (!(await confirmSessionCookie())) {
        setStatus("Safari did not retain the admin session. Open this page directly in Safari (not Private Browsing or an in-app browser), allow website data for ajcmedia.ca, then try again.");
        return;
      }

      setStatus("Access confirmed. Opening admin...");
      window.location.replace("/admin");
    } catch {
      setStatus("Could not verify the password right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="glass-panel grid gap-4 p-[clamp(20px,4vw,34px)]" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label className="text-sm font-medium text-ink/80" htmlFor="admin-password">Admin password</label>
        <div className="relative">
          <input
            id="admin-password"
            className="form-control pr-24"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            className="absolute inset-y-1.5 right-1.5 min-w-20 border border-ink/15 bg-night/85 px-3 text-sm font-medium text-cyan transition hover:border-cyan/45"
            type="button"
            aria-label={showPassword ? "Hide admin password" : "Show admin password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((visible) => !visible)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      </div>
      <button className="pill-button pill-button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Unlocking..." : "Unlock admin"}
      </button>
      <p className="min-h-6 text-sm text-muted" role="status">{status}</p>
    </form>
  );
}

async function confirmSessionCookie() {
  const delays = [0, 150, 450];
  for (const delay of delays) {
    if (delay) await new Promise((resolve) => window.setTimeout(resolve, delay));

    const response = await fetch(`/api/admin/session?check=${Date.now()}`, {
      method: "GET",
      cache: "no-store",
      credentials: "same-origin",
      headers: { Accept: "application/json" }
    }).catch(() => null);

    if (response?.ok) return true;
  }

  return false;
}
