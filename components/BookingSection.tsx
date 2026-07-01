"use client";

import { FormEvent, useState } from "react";
import { readLocalStore, writeLocalStore } from "@/lib/localStorage";
import type { BookingRequest } from "@/types/site";

const BOOKING_KEY = "ajcMediaBookings";

export function BookingSection() {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const booking: BookingRequest = {
      id: `booking-${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      type: String(data.get("type") || ""),
      date: String(data.get("date") || ""),
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || "")
    };

    writeLocalStore(BOOKING_KEY, [booking, ...readLocalStore<BookingRequest[]>(BOOKING_KEY, [])]);
    form.reset();
    setStatus("Booking request saved. It is now visible on the admin page.");
  }

  return (
    <section className="section-pad grid items-start gap-[clamp(28px,5vw,70px)] lg:grid-cols-[minmax(0,0.82fr)_minmax(320px,1fr)]" id="booking">
      <div>
        <div className="eyebrow">Booking</div>
        <h2 className="section-title">Start with a date, a story, and the kind of coverage needed.</h2>
        <p className="mt-5 body-copy">For the prototype, requests are saved locally and shown in the admin dashboard. The API route is already scaffolded for a future database-backed booking workflow.</p>
        <div className="mt-7 grid gap-2.5">
          {["Instant mock submission", "Admin booking queue", "Gallery-ready project flow"].map((item) => (
            <span key={item} className="border-l-2 border-cyan py-2 pl-4 text-ink/80">{item}</span>
          ))}
        </div>
      </div>

      <form className="glass-panel grid gap-4 p-[clamp(20px,4vw,34px)] md:grid-cols-2" onSubmit={handleSubmit}>
        <FormLabel label="Name"><input className="form-control" name="name" type="text" autoComplete="name" required /></FormLabel>
        <FormLabel label="Email"><input className="form-control" name="email" type="email" autoComplete="email" required /></FormLabel>
        <FormLabel label="Phone"><input className="form-control" name="phone" type="tel" autoComplete="tel" /></FormLabel>
        <FormLabel label="Shoot type">
          <select className="form-control" name="type" required>
            <option value="">Select a service</option>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Baby shower</option>
            <option>Portrait</option>
            <option>Family</option>
            <option>Commercial</option>
          </select>
        </FormLabel>
        <FormLabel label="Preferred date"><input className="form-control" name="date" type="date" required /></FormLabel>
        <FormLabel label="Estimated budget">
          <select className="form-control" name="budget" required>
            <option value="">Select range</option>
            <option>$250 - $500</option>
            <option>$500 - $1,000</option>
            <option>$1,000 - $2,500</option>
            <option>$2,500+</option>
          </select>
        </FormLabel>
        <FormLabel className="md:col-span-2" label="Message">
          <textarea className="form-control min-h-32 resize-y" name="message" rows={5} placeholder="Tell us the location, guest count, and the moments that matter most." required />
        </FormLabel>
        <button className="pill-button pill-button-primary md:col-span-2" type="submit">Send booking request</button>
        <p className="min-h-6 text-green md:col-span-2" role="status">{status}</p>
      </form>
    </section>
  );
}

function FormLabel({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`grid gap-2 text-sm font-extrabold text-ink/80 ${className}`}>
      {label}
      {children}
    </label>
  );
}
