"use client";

import { useState } from "react";
import { enrollmentTiers, LEARN_ENROLL_EMAIL } from "@/lib/learn/enroll";

const inputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-teal-500/25";
const labelClass = "mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300";

type Status = "idle" | "loading" | "success" | "error";

export function EnrollForm({ course }: { course: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("loading");
    setErrorMsg(null);

    const fd = new FormData(form);

    try {
      const res = await fetch("/api/africa/learn/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(fd.get("name") ?? ""),
          email: String(fd.get("email") ?? ""),
          country: String(fd.get("country") ?? ""),
          tier: String(fd.get("tier") ?? ""),
          organisation: String(fd.get("organisation") ?? ""),
          seats: Number(fd.get("seats") ?? 1),
          message: String(fd.get("message") ?? ""),
          course,
        }),
      });

      const data = (await res.json()) as { ok?: boolean; error?: string };

      if (data.ok) {
        setStatus("success");
        form.reset();
        return;
      }

      setStatus("error");
      setErrorMsg(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setStatus("error");
      setErrorMsg(
        `We couldn’t reach the server. Please email ${LEARN_ENROLL_EMAIL} and we’ll hold your seat.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 text-center shadow-xl shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/70">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400">
          <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-zinc-50">You’re on the list</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Thanks — your request is in. Our team will follow up by email about dates, pricing for your
          tier, and how to secure your seat.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 text-sm font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800 dark:text-teal-400"
        >
          Register someone else
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8"
      noValidate
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-teal-500 via-amber-400 to-emerald-500 opacity-20"
      />

      <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
        This reserves your interest — no payment is taken now. We’ll follow up with dates and how to
        pay for your tier.
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <label htmlFor="enroll-name" className={labelClass}>
            Name
          </label>
          <input
            id="enroll-name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            placeholder="Your full name"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="enroll-email" className={labelClass}>
              Email
            </label>
            <input
              id="enroll-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className={inputClass}
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="enroll-country" className={labelClass}>
              Country
            </label>
            <input
              id="enroll-country"
              name="country"
              type="text"
              required
              autoComplete="country-name"
              className={inputClass}
              placeholder="e.g. Kenya"
            />
          </div>
        </div>
        <div>
          <label htmlFor="enroll-tier" className={labelClass}>
            How would you like to join?
          </label>
          <select id="enroll-tier" name="tier" required defaultValue="" className={inputClass}>
            <option value="" disabled>
              Select…
            </option>
            {enrollmentTiers.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="enroll-org" className={labelClass}>
              Organisation{" "}
              <span className="font-normal text-zinc-400">(if institution / sponsor)</span>
            </label>
            <input
              id="enroll-org"
              name="organisation"
              type="text"
              autoComplete="organization"
              className={inputClass}
              placeholder="Organisation name"
            />
          </div>
          <div>
            <label htmlFor="enroll-seats" className={labelClass}>
              Seats
            </label>
            <input
              id="enroll-seats"
              name="seats"
              type="number"
              min={1}
              defaultValue={1}
              inputMode="numeric"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label htmlFor="enroll-message" className={labelClass}>
            Anything we should know?{" "}
            <span className="font-normal text-zinc-400">(optional)</span>
          </label>
          <textarea
            id="enroll-message"
            name="message"
            rows={3}
            className={`${inputClass} min-h-20 resize-y`}
            placeholder="Timing, team size, questions…"
          />
        </div>
        <label className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <input type="checkbox" name="consent" required className="mt-0.5 size-4 text-teal-600" />
          <span>
            I agree RLRI may contact me about this course and store these details for that purpose.
          </span>
        </label>
      </div>

      {errorMsg && (
        <p className="mt-4 rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-teal-700 px-6 text-sm font-bold text-white shadow-lg shadow-teal-900/25 transition hover:from-teal-500 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {status === "loading" ? (
          <>
            <span
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              aria-hidden
            />
            Sending…
          </>
        ) : (
          "Reserve my seat"
        )}
      </button>

      <p className="mt-4 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Prefer email? Write to{" "}
        <a
          href={`mailto:${LEARN_ENROLL_EMAIL}?subject=${encodeURIComponent(`Enrolment: ${course}`)}`}
          className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800 dark:text-teal-400"
        >
          {LEARN_ENROLL_EMAIL}
        </a>
        .
      </p>
    </form>
  );
}
