import { createHmac, timingSafeEqual } from "node:crypto";

export const MASTER_CLASS_COOKIE = "rlri-mc";

/** Shared cohort passcode unless MASTER_CLASS_PASSCODE is set. */
export const DEFAULT_MASTER_CLASS_PASSCODE = "rlri-learn";

export function masterClassPasscode() {
  const fromEnv = process.env.MASTER_CLASS_PASSCODE?.trim();
  return fromEnv && fromEnv.length > 0 ? fromEnv : DEFAULT_MASTER_CLASS_PASSCODE;
}

export function masterClassSessionToken() {
  return createHmac("sha256", masterClassPasscode())
    .update("rlri-master-class-session")
    .digest("hex");
}

export function isMasterClassUnlocked(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  return cookieValue === masterClassSessionToken();
}

export function passcodeMatches(input: string) {
  const expected = masterClassPasscode();
  const a = Buffer.from(input.trim());
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}
