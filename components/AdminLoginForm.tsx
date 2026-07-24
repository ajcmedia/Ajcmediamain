"use client";

import { FormEvent, useState } from "react";

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

      if (!response.ok) {
        setStatus("That password did not unlock the admin room.");
        return;
      }

      setStatus("Access granted. Opening admin...");
      // A full navigation guarantees that the protected request is made only
      // after the browser has committed the session cookie from this response.
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
        <label className="text-sm font-extrabold text-ink/80" htmlFor="admin-password">Admin password</label>
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
            className="absolute inset-y-1.5 right-1.5 min-w-20 border border-white/15 bg-night/85 px-3 text-sm font-black text-cyan transition hover:border-cyan/45"
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
