import { NextResponse } from "next/server";
import {
  MASTER_CLASS_COOKIE,
  masterClassSessionToken,
  passcodeMatches,
} from "@/lib/master-class/gate";

const HUB = "/internal/ai-master-class";

function cookieBase() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  };
}

function redirectToHub(req: Request, search = "") {
  const res = NextResponse.redirect(new URL(`${HUB}${search}`, req.url), 303);
  res.headers.set("Cache-Control", "no-store");
  return res;
}

export async function POST(req: Request) {
  const form = await req.formData();
  const intent = String(form.get("intent") ?? "unlock");

  if (intent === "lock") {
    const res = redirectToHub(req);
    res.cookies.set(MASTER_CLASS_COOKIE, "", { ...cookieBase(), maxAge: 0 });
    return res;
  }

  const passcode = String(form.get("passcode") ?? "");
  const token = masterClassSessionToken();
  if (!token || !passcodeMatches(passcode)) {
    return redirectToHub(req, "?error=1");
  }

  const res = redirectToHub(req);
  res.cookies.set(MASTER_CLASS_COOKIE, token, {
    ...cookieBase(),
    maxAge: 60 * 60 * 24 * 90,
  });
  return res;
}
