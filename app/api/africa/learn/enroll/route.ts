import { NextResponse } from "next/server";
import {
  deliverEnrollmentLead,
  LEARN_ENROLL_EMAIL,
  validateEnrollment,
} from "@/lib/learn/enroll";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = validateEnrollment(body);
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
  }

  const delivery = await deliverEnrollmentLead(parsed.value);

  if (delivery.ok) {
    return NextResponse.json({
      ok: true,
      message: "Thank you — your request is in. Our team will follow up by email.",
    });
  }

  // Delivery channel not live yet (or upstream failed): don't lose the lead —
  // tell the learner to email us directly. TODO(backend): remove once
  // LEARN_ENROLL_WEBHOOK_URL is configured (see lib/learn/enroll.ts).
  return NextResponse.json(
    {
      ok: false,
      error: `We couldn’t submit automatically. Please email ${LEARN_ENROLL_EMAIL} and we’ll hold your seat.`,
      contactEmail: LEARN_ENROLL_EMAIL,
    },
    { status: 503 },
  );
}
