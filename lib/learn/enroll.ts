/**
 * Pre-sale enrolment: shared types, validation, and lead delivery.
 *
 * This is interest capture, not checkout — no payment is taken here. A learner
 * or institution tells us they want a seat; the team follows up to invoice or
 * collect payment once the provider is live (Paystack / Flutterwave).
 *
 * Delivery is isolated in `deliverEnrollmentLead` so wiring the real backend is
 * one function, not a rewrite of the route. See TODO(backend) below.
 */

export const enrollmentTiers = [
  { value: "student", label: "Student / youth" },
  { value: "african-professional", label: "African professional" },
  { value: "international", label: "International" },
  { value: "institution", label: "Institution (team / invoice)" },
  { value: "sponsor", label: "Sponsor-a-seat" },
  { value: "scholarship", label: "Scholarship applicant" },
] as const;

export type EnrollmentTier = (typeof enrollmentTiers)[number]["value"];

const TIER_VALUES = new Set<string>(enrollmentTiers.map((t) => t.value));

export type EnrollmentPayload = {
  name: string;
  email: string;
  /** Course title or slug the learner is enrolling interest in. */
  course: string;
  tier: EnrollmentTier;
  country: string;
  /** Organisation name — required for institution/sponsor tiers. */
  organisation: string;
  /** Number of seats (institutions / team packs); 1 otherwise. */
  seats: number;
  message: string;
};

export type EnrollmentValidation =
  | { ok: true; value: EnrollmentPayload }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

export function validateEnrollment(body: unknown): EnrollmentValidation {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request." };
  }
  const b = body as Record<string, unknown>;

  const name = asString(b.name);
  const email = asString(b.email);
  const course = asString(b.course);
  const tier = asString(b.tier);
  const country = asString(b.country);
  const organisation = asString(b.organisation);
  const message = asString(b.message);

  if (!name) return { ok: false, error: "Please enter your name." };
  if (!email) return { ok: false, error: "Please enter your email." };
  if (!EMAIL_RE.test(email)) return { ok: false, error: "Please enter a valid email address." };
  if (!course) return { ok: false, error: "A course is required." };
  if (!TIER_VALUES.has(tier)) return { ok: false, error: "Please choose how you’d like to join." };
  if (!country) return { ok: false, error: "Please tell us your country." };

  const needsOrg = tier === "institution" || tier === "sponsor";
  if (needsOrg && !organisation) {
    return { ok: false, error: "Please enter your organisation name." };
  }

  const rawSeats = Number(b.seats);
  const seats = Number.isFinite(rawSeats) && rawSeats >= 1 ? Math.floor(rawSeats) : 1;
  if (seats > 500) return { ok: false, error: "Please contact us directly for more than 500 seats." };

  return {
    ok: true,
    value: {
      name,
      email,
      course,
      tier: tier as EnrollmentTier,
      country,
      organisation,
      seats,
      message,
    },
  };
}

export type DeliveryResult =
  | { ok: true }
  | { ok: false; reason: "not_configured" | "upstream_error" };

/**
 * Send a validated lead to the follow-up channel.
 *
 * TODO(backend): point this at the enrolment destination. Default plan is to
 * reuse the Africa Program WordPress (Elementor Pro) channel, same as
 * `lib/africa-donate-elementor.ts`, with its own form. That needs a form_id +
 * field-id map we don't have yet, so it's read from env:
 *   LEARN_ENROLL_WEBHOOK_URL   — endpoint that accepts the JSON lead
 * When unset, delivery is "not_configured": the route tells the learner to
 * email us so no lead is lost. Replace the body here once the channel exists.
 */
export async function deliverEnrollmentLead(
  lead: EnrollmentPayload,
): Promise<DeliveryResult> {
  const endpoint = process.env.LEARN_ENROLL_WEBHOOK_URL?.trim();
  if (!endpoint) {
    return { ok: false, reason: "not_configured" };
  }

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) return { ok: false, reason: "upstream_error" };
    return { ok: true };
  } catch {
    return { ok: false, reason: "upstream_error" };
  }
}

/** Inbox learners are directed to when automated delivery isn't available. */
export const LEARN_ENROLL_EMAIL = "programs_coord@reallifeinstitute.org";
