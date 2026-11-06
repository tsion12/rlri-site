import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { africaRoutes } from "@/lib/africa-routes";

/**
 * RLRI Africa webinars run on the last Friday of every month. These helpers let
 * the calendar surface that rhythm — including a "save the date" hold for months
 * whose topic has not been announced yet.
 */

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Day-of-month of the last Friday (Fri = day 5). */
export function lastFridayOfMonth(year: number, month: number): number {
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysBackToFriday = (lastDay.getUTCDay() - 5 + 7) % 7;
  return lastDay.getUTCDate() - daysBackToFriday;
}

/** Calendar-day key (YYYY-MM-DD) of a month's last-Friday webinar slot. */
export function lastFridayKey(year: number, month: number): string {
  return `${year}-${pad2(month + 1)}-${pad2(lastFridayOfMonth(year, month))}`;
}

/**
 * A tentative, unannounced webinar hold for a month's last Friday, used only to
 * offer a "save the date" calendar entry. 9:00 AM Ottawa; the offset tracks
 * US/Eastern daylight saving closely enough for a save-the-date (EDT ~Mar–Nov).
 */
export function tentativeWebinarForMonth(year: number, month: number): AfricaWebinarEvent {
  const day = lastFridayOfMonth(year, month);
  const easternOffset = month >= 2 && month <= 10 ? "-04:00" : "-05:00";
  const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month, 1)),
  );

  return {
    id: `tentative-${year}-${pad2(month + 1)}`,
    title: "RLRI Africa Webinar — topic to be announced",
    locationDate: `Online webinar | Last Friday of ${monthName} ${year}`,
    timezoneLine: "9:00 AM Ottawa (EST/EDT) · live across African and North American time zones",
    summary:
      "We host a free live webinar on the last Friday of every month. The topic and speakers for this session are announced closer to the date — save the slot now and we'll fill in the details.",
    isoDate: `${year}-${pad2(month + 1)}-${pad2(day)}T09:00:00${easternOffset}`,
    durationMinutes: 90,
    time: "9:00 AM (Ottawa) · 90 min",
    format: "Monthly Webinar",
    href: africaRoutes.events,
    registerHref: null,
    supportProgram: "03",
    tags: [],
    policyBriefHref: null,
    recordingHref: null,
  };
}
