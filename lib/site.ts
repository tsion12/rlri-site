/**
 * Canonical origin for building absolute URLs in metadata and structured data.
 * Override per-environment with NEXT_PUBLIC_SITE_URL; falls back to the Africa
 * Programs production domain.
 */
const DEFAULT_SITE_URL = "https://africa-programs.reallifeinstitute.org";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_URL).replace(
  /\/+$/,
  "",
);

/** Resolve an app-relative path (or pass through an already-absolute URL). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? "" : "/"}${path}`;
}
