import { createHmac, timingSafeEqual } from "node:crypto";

export const MASTER_CLASS_COOKIE = "rlri-mc";

/** Local preview only — production must set MASTER_CLASS_PASSCODE. */
export const DEFAULT_MASTER_CLASS_PASSCODE = "rlri-learn";

export function masterClassPasscode(): string | null {
  const fromEnv = process.env.MASTER_CLASS_PASSCODE?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return null;
  return DEFAULT_MASTER_CLASS_PASSCODE;
}

export function masterClassSessionToken() {
  const secret = masterClassPasscode();
  if (!secret) return null;
  return createHmac("sha256", secret).update("rlri-master-class-session").digest("hex");
}

export function isMasterClassUnlocked(cookieValue: string | undefined) {
  const token = masterClassSessionToken();
  if (!token || !cookieValue) return false;
  return cookieValue === token;
}

export function passcodeMatches(input: string) {
  const expected = masterClassPasscode();
  if (!expected) return false;
  const a = Buffer.from(input.trim());
  const b = Buffer.from(expected);
  if (a.length !== b.length) {
    timingSafeEqual(b, b);
    return false;
  }
  return timingSafeEqual(a, b);
}
