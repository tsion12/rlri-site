import { NextResponse } from "next/server";
import {
  buildElementorDonateBody,
  ELEMENTOR_DONATE_AJAX,
  type ElementorDonatePayload,
} from "@/lib/africa-donate-elementor";

function isPaymentMethod(v: string): v is ElementorDonatePayload["paymentMethod"] {
  return ["Credit Card", "Cheque", "Bank Transfer", "Gift Card"].includes(v);
}

function isOrgType(v: string): v is ElementorDonatePayload["organisationOrIndividual"] {
  return v === "Organisation" || v === "Individual";
}

function isDonationType(v: string): v is ElementorDonatePayload["donationType"] {
  return v === "Monetary Donation" || v === "In-kind Donation";
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name : "";
  const email = typeof b.email === "string" ? b.email : "";
  const phone = typeof b.phone === "string" ? b.phone : "";
  const organisationOrIndividual =
    typeof b.organisationOrIndividual === "string" ? b.organisationOrIndividual : "";
  const donationType = typeof b.donationType === "string" ? b.donationType : "";
  const description = typeof b.description === "string" ? b.description : "";
  const paymentMethod = typeof b.paymentMethod === "string" ? b.paymentMethod : "";
  const comments = typeof b.comments === "string" ? b.comments : "";

  if (!name.trim() || !email.trim() || !phone.trim()) {
    return NextResponse.json({ ok: false, error: "Name, email, and phone are required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 400 });
  }
  if (!description.trim()) {
    return NextResponse.json({ ok: false, error: "Description of donation is required." }, { status: 400 });
  }
  if (!isOrgType(organisationOrIndividual)) {
    return NextResponse.json({ ok: false, error: "Invalid organisation type." }, { status: 400 });
  }
  if (!isDonationType(donationType)) {
    return NextResponse.json({ ok: false, error: "Invalid donation type." }, { status: 400 });
  }
  if (!isPaymentMethod(paymentMethod)) {
    return NextResponse.json({ ok: false, error: "Invalid payment method." }, { status: 400 });
  }

  const payload: ElementorDonatePayload = {
    name,
    email,
    phone,
    organisationOrIndividual,
    donationType,
    description,
    paymentMethod,
    comments,
  };

  const params = buildElementorDonateBody(payload);

  try {
    const res = await fetch(ELEMENTOR_DONATE_AJAX, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        Referer: "https://cms-programs.reallifeinstitute.or/get-involved/donations/",
        Origin: "https://cms-programs.reallifeinstitute.or",
      },
      body: params.toString(),
    });

    const text = await res.text();
    let parsed: { success?: boolean; data?: { message?: string; errors?: Record<string, string> } };
    try {
      parsed = JSON.parse(text) as typeof parsed;
    } catch {
      return NextResponse.json(
        { ok: false, error: "Unexpected response from donation service." },
        { status: 502 },
      );
    }

    if (parsed.success === true) {
      return NextResponse.json({
        ok: true,
        message: parsed.data?.message ?? "Thank you — your request was sent.",
        elementor: parsed,
      });
    }

    const fieldErrors = parsed.data?.errors;
    const msg =
      parsed.data?.message?.replace(/<br\s*\/?>/gi, " ") ??
      "Your submission could not be completed. Please try again or email contact-africa@reallifeinstitute.org.";

    return NextResponse.json({
      ok: false,
      error: msg,
      fieldErrors: fieldErrors && Object.keys(fieldErrors).length > 0 ? fieldErrors : undefined,
      elementor: parsed,
    });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the donation service. Please try again later." },
      { status: 502 },
    );
  }
}
