import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { getEventEndMs } from "@/lib/africa-event-schedule";

type CalendarEvent = Pick<
  AfricaWebinarEvent,
  "title" | "summary" | "isoDate" | "durationMinutes" | "joinHref" | "registerHref"
>;

/** Format a Date as the UTC basic form calendars expect: 20261127T140000Z. */
function toCalendarUtc(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function eventWindow(event: CalendarEvent) {
  return { startMs: new Date(event.isoDate).getTime(), endMs: getEventEndMs(event) };
}

function calendarDescription(event: CalendarEvent): string {
  const lines = [event.summary];
  const link = event.registerHref ?? event.joinHref;
  if (link) lines.push(`Register / join: ${link}`);
  return lines.join("\n\n");
}

const CALENDAR_LOCATION = "Online webinar — Real Life Research Institute";

export function googleCalendarUrl(event: CalendarEvent): string {
  const { startMs, endMs } = eventWindow(event);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${toCalendarUtc(startMs)}/${toCalendarUtc(endMs)}`,
    details: calendarDescription(event),
    location: event.registerHref ?? event.joinHref ?? CALENDAR_LOCATION,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/** Escape text per RFC 5545 (commas, semicolons, backslashes, newlines). */
function escapeIcs(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/[,;]/g, (m) => `\\${m}`).replace(/\r?\n/g, "\\n");
}

export function buildIcs(event: CalendarEvent): string {
  const { startMs, endMs } = eventWindow(event);
  const uid = `${toCalendarUtc(startMs)}-${Math.abs(hashString(event.title))}@reallifeinstitute.org`;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Real Life Research Institute//Africa Webinars//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${toCalendarUtc(Date.now())}`,
    `DTSTART:${toCalendarUtc(startMs)}`,
    `DTEND:${toCalendarUtc(endMs)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(calendarDescription(event))}`,
    `LOCATION:${escapeIcs(event.registerHref ?? event.joinHref ?? CALENDAR_LOCATION)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.join("\r\n");
}

/** Small deterministic hash so each event gets a stable-ish ICS UID. */
function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export function icsFileName(event: CalendarEvent): string {
  const slug = event.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${slug || "rlri-webinar"}.ics`;
}
