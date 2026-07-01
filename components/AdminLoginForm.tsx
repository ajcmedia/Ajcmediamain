"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
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
        body: JSON.stringify({ password })
      });

      if (!response.ok) {
        setStatus("That password did not unlock the admin room.");
        return;
      }

      setStatus("Access granted. Opening admin...");
      router.push("/admin");
      router.refresh();
    } catch {
      setStatus("Could not verify the password right now.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="glass-panel grid gap-4 p-[clamp(20px,4vw,34px)]" onSubmit={handleSubmit}>
      <label className="grid gap-2 text-sm font-extrabold text-ink/80">
        Admin password
        <input
          className="form-control"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
      </label>
      <button className="pill-button pill-button-primary" type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Unlocking..." : "Unlock admin"}
      </button>
      <p className="min-h-6 text-sm text-muted" role="status">{status}</p>
    </form>
  );
}
