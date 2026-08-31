"use client";

import { useState, type FormEvent } from "react";
import { business } from "@/content/site-content";

type Status = "idle" | "submitting" | "success" | "error" | "unconfigured";

export function InquiryForm({ submitLabel }: { submitLabel: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 503) {
        setStatus("unconfigured");
        return;
      }
      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-2xl border-2 border-brand-pink-deep bg-brand-pink-tint p-6 text-lg font-semibold text-brand-ink"
      >
        Thank you. We&rsquo;ve received your message and will follow up soon.
        For anything urgent, call us at{" "}
        <a href={business.phoneHref} className="underline">
          {business.phone}
        </a>
        .
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
      {(status === "error" || status === "unconfigured") && (
        <div
          role="alert"
          className="rounded-xl border-2 border-brand-pink-deep bg-brand-pink-tint p-4 text-brand-ink"
        >
          {status === "unconfigured"
            ? "Online form submission isn't fully set up on this site yet. "
            : "Something went wrong sending your message. "}
          Please call {business.phone} or email{" "}
          <a href={`mailto:${business.email}`} className="font-bold underline">
            {business.email}
          </a>{" "}
          directly and we&rsquo;ll help right away.
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-name" className="text-lg font-bold text-brand-ink">
          Name
        </label>
        <input
          id="contact-name"
          name="name"
          type="text"
          required
          autoComplete="name"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-phone" className="text-lg font-bold text-brand-ink">
          Phone
        </label>
        <input
          id="contact-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-email" className="text-lg font-bold text-brand-ink">
          Email <span className="font-medium text-brand-slate">(optional)</span>
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="min-h-[52px] rounded-xl border-2 border-brand-slate bg-white px-4 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="contact-message" className="text-lg font-bold text-brand-ink">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          className="rounded-xl border-2 border-brand-slate bg-white px-4 py-3 text-lg text-brand-ink focus-visible:border-brand-pink-deep"
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 inline-flex min-h-[52px] items-center justify-center whitespace-nowrap rounded-full bg-brand-pink-deep px-5 font-heading text-base font-bold text-white transition-colors hover:bg-[#93043f] disabled:opacity-60 sm:px-7 sm:text-lg"
      >
        {status === "submitting" ? "Sending…" : submitLabel}
      </button>
    </form>
  );
}
