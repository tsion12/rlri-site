import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { africaRoutes } from "@/lib/africa-routes";

/**
 * RLRI Africa webinars run on the last Friday of each month from February to
 * November. If that Friday is a holiday, the session moves to the Friday before.
 * These helpers let the calendar surface that rhythm — including a "save the
 * date" hold for months whose topic has not been announced yet.
 */

/** Webinar season, as 0-indexed months: February (1) through November (10). */
const SEASON_FIRST_MONTH = 1;
const SEASON_LAST_MONTH = 10;

/**
 * Holidays on the same date every year (month is 0-indexed). A last Friday is
 * always the 22nd or later, so only late-month dates can ever move a webinar;
 * the other fixed public holidays in Canada and Cameroon fall earlier.
 */
const FIXED_HOLIDAYS: ReadonlyArray<{ month: number; day: number; name: string }> = [
  { month: 8, day: 30, name: "the National Day for Truth and Reconciliation" },
];

/**
 * Holidays whose date changes every year and cannot be calculated here
 * (for example Eid al-Fitr and Eid al-Adha). Add them as "YYYY-MM-DD": "Name".
 */
const DATED_HOLIDAYS: Readonly<Record<string, string>> = {};

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function dayKey(year: number, month: number, day: number) {
  return `${year}-${pad2(month + 1)}-${pad2(day)}`;
}

function monthName(year: number, month: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month, 1)),
  );
}

/** Good Friday for a year (two days before Easter Sunday, Gregorian calendar). */
function goodFriday(year: number): { month: number; day: number } {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const easterMonth = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const easterDay = ((h + l - 7 * m + 114) % 31) + 1;
  const friday = new Date(Date.UTC(year, easterMonth, easterDay - 2));
  return { month: friday.getUTCMonth(), day: friday.getUTCDate() };
}

/** Name of the holiday on a given day, or null when it is a normal day. */
function holidayName(year: number, month: number, day: number): string | null {
  const dated = DATED_HOLIDAYS[dayKey(year, month, day)];
  if (dated) return dated;
  const good = goodFriday(year);
  if (good.month === month && good.day === day) return "Good Friday";
  return FIXED_HOLIDAYS.find((h) => h.month === month && h.day === day)?.name ?? null;
}

/** True for the months in which webinars are held (February–November). */
export function isWebinarSeasonMonth(month: number): boolean {
  return month >= SEASON_FIRST_MONTH && month <= SEASON_LAST_MONTH;
}

/** Day-of-month of the last Friday (Fri = day 5). */
export function lastFridayOfMonth(year: number, month: number): number {
  const lastDay = new Date(Date.UTC(year, month + 1, 0));
  const daysBackToFriday = (lastDay.getUTCDay() - 5 + 7) % 7;
  return lastDay.getUTCDate() - daysBackToFriday;
}

export type WebinarSlot = {
  /** Day-of-month the webinar is held. */
  day: number;
  /** Calendar-day key (YYYY-MM-DD). */
  key: string;
  /** Set when the last Friday was a holiday and the session moved a week earlier. */
  movedFrom: { day: number; holiday: string } | null;
};

/**
 * The webinar day for a month: its last Friday, or the Friday before when the
 * last Friday is a holiday. Null outside the February–November season.
 */
export function webinarSlotForMonth(year: number, month: number): WebinarSlot | null {
  if (!isWebinarSeasonMonth(month)) return null;

  const lastFriday = lastFridayOfMonth(year, month);
  const lastFridayHoliday = holidayName(year, month, lastFriday);

  let day = lastFriday;
  while (day > 7 && holidayName(year, month, day)) day -= 7;

  return {
    day,
    key: dayKey(year, month, day),
    movedFrom:
      lastFridayHoliday && day !== lastFriday ? { day: lastFriday, holiday: lastFridayHoliday } : null,
  };
}

/**
 * A tentative, unannounced webinar hold for a month's webinar day, used only to
 * offer a "save the date" calendar entry. Null outside the webinar season.
 * 9:00 AM Ottawa: every slot from March to October falls inside daylight
 * saving time (EDT); February and November slots are on standard time (EST).
 */
export function tentativeWebinarForMonth(year: number, month: number): AfricaWebinarEvent | null {
  const slot = webinarSlotForMonth(year, month);
  if (!slot) return null;

  const easternOffset = month >= 2 && month <= 9 ? "-04:00" : "-05:00";
  const name = monthName(year, month);
  const cadence =
    "We host a free live webinar on the last Friday of each month from February to November.";
  const followUp =
    "The topic and speakers for this session are announced closer to the date — save the slot now and we'll fill in the details.";

  return {
    id: `tentative-${year}-${pad2(month + 1)}`,
    title: "RLRI Africa Webinar — topic to be announced",
    locationDate: slot.movedFrom
      ? `Online webinar | Friday, ${slot.day} ${name} ${year}`
      : `Online webinar | Last Friday of ${name} ${year}`,
    timezoneLine: "9:00 AM Ottawa (EST/EDT) · live across African and North American time zones",
    summary: slot.movedFrom
      ? `${cadence} The last Friday of ${name} ${year} (${slot.movedFrom.day} ${name}) is ${slot.movedFrom.holiday}, so this session is held the Friday before. ${followUp}`
      : `${cadence} ${followUp}`,
    isoDate: `${slot.key}T09:00:00${easternOffset}`,
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
