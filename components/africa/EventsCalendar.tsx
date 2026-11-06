"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { AfricaWebinarEvent, WebinarProgramOrdinal } from "@/lib/africa-events";
import { getEventEndMs } from "@/lib/africa-event-schedule";
import { PROGRAM_META, PROGRAM_ORDINALS } from "@/lib/africa-program-meta";
import { africaEmails } from "@/lib/africa-routes";
import { lastFridayKey, tentativeWebinarForMonth } from "@/lib/africa-webinar-cadence";
import { AddToCalendarButton } from "@/components/africa/AddToCalendarButton";

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

/** Authored calendar day of an event, tz-free, matching the date labels on the page. */
function eventDayKey(isoDate: string) {
  return isoDate.slice(0, 10);
}

function monthLabel(year: number, month: number) {
  return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(Date.UTC(year, month, 1)),
  );
}

type Cell = { key: string; day: number; inMonth: boolean };

/** Full Monday-first weeks covering the given month. */
function buildMonthCells(year: number, month: number): Cell[] {
  const first = new Date(Date.UTC(year, month, 1));
  const lead = (first.getUTCDay() + 6) % 7; // 0 = Monday
  const start = new Date(Date.UTC(year, month, 1 - lead));
  const cells: Cell[] = [];
  for (let i = 0; i < 42; i += 1) {
    const d = new Date(start.getTime() + i * 24 * 60 * 60 * 1000);
    const y = d.getUTCFullYear();
    const m = d.getUTCMonth();
    const day = d.getUTCDate();
    cells.push({ key: `${y}-${pad2(m + 1)}-${pad2(day)}`, day, inMonth: m === month });
    if (i >= 34 && m !== month) break; // stop after the last week that still touches the month
  }
  return cells;
}

function todayKey(nowMs: number) {
  const now = new Date(nowMs);
  return `${now.getFullYear()}-${pad2(now.getMonth() + 1)}-${pad2(now.getDate())}`;
}

export function EventsCalendar({
  events,
  programFilter,
  initialIso,
  nowMs,
}: {
  events: AfricaWebinarEvent[];
  programFilter: WebinarProgramOrdinal | null;
  initialIso: string;
  nowMs: number;
}) {
  const [view, setView] = useState(() => ({
    year: Number(initialIso.slice(0, 4)),
    month: Number(initialIso.slice(5, 7)) - 1,
  }));
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  const visibleEvents = useMemo(
    () => (programFilter ? events.filter((e) => e.supportProgram === programFilter) : events),
    [events, programFilter],
  );

  const eventsByDay = useMemo(() => {
    const map = new Map<string, AfricaWebinarEvent[]>();
    for (const event of visibleEvents) {
      const key = eventDayKey(event.isoDate);
      const list = map.get(key);
      if (list) list.push(event);
      else map.set(key, [event]);
    }
    return map;
  }, [visibleEvents]);

  const cells = useMemo(() => buildMonthCells(view.year, view.month), [view]);
  const monthPrefix = `${view.year}-${pad2(view.month + 1)}`;

  const firstEventKeyInMonth = useMemo(() => {
    const keys = [...eventsByDay.keys()].filter((k) => k.startsWith(monthPrefix)).sort();
    return keys[0] ?? null;
  }, [eventsByDay, monthPrefix]);

  const today = todayKey(nowMs);

  // Webinars recur on the last Friday of each month. Surface upcoming months
  // that have no confirmed topic yet (hidden while a program filter is active,
  // since a "topic TBA" slot belongs to no single program).
  const lastFriKey = lastFridayKey(view.year, view.month);
  const recurringKey =
    !programFilter && !eventsByDay.has(lastFriKey) && lastFriKey >= today ? lastFriKey : null;

  const canSelect = (key: string) => eventsByDay.has(key) || key === recurringKey;
  const activeKey =
    selectedKey && selectedKey.startsWith(monthPrefix) && canSelect(selectedKey)
      ? selectedKey
      : firstEventKeyInMonth ?? recurringKey;
  const activeEvents = activeKey ? eventsByDay.get(activeKey) ?? [] : [];
  const showSaveTheDate = activeKey != null && activeKey === recurringKey && activeEvents.length === 0;
  const tentativeEvent = showSaveTheDate ? tentativeWebinarForMonth(view.year, view.month) : null;

  function shiftMonth(delta: number) {
    setSelectedKey(null);
    setView((v) => {
      const d = new Date(Date.UTC(v.year, v.month + delta, 1));
      return { year: d.getUTCFullYear(), month: d.getUTCMonth() };
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-start">
      <div className="rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {monthLabel(view.year, view.month)}
          </h3>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => shiftMonth(-1)}
              aria-label="Previous month"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
                <path d="M12.7 15.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4l4.6-4.6a1 1 0 1 1 1.4 1.4L8.8 10l3.9 3.9a1 1 0 0 1 0 1.4Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => shiftMonth(1)}
              aria-label="Next month"
              className="inline-flex size-9 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
                <path d="M7.3 4.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4l-4.6 4.6a1 1 0 0 1-1.4-1.4L11.2 10 7.3 6.1a1 1 0 0 1 0-1.4Z" />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wide text-zinc-400 dark:text-zinc-500">
          {WEEKDAYS.map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        <div className="mt-1 grid grid-cols-7 gap-1">
          {cells.map((cell) => {
            const dayEvents = eventsByDay.get(cell.key) ?? [];
            const hasEvents = dayEvents.length > 0;
            const isRecurring = cell.key === recurringKey;
            const isActive = cell.key === activeKey;
            const isToday = cell.key === today;
            const isPastDay = cell.key < today;

            const base =
              "relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm transition";
            const tone = !cell.inMonth
              ? "text-zinc-300 dark:text-zinc-600"
              : isPastDay
                ? "text-zinc-400 dark:text-zinc-500"
                : "text-zinc-700 dark:text-zinc-200";

            if (!hasEvents && !isRecurring) {
              return (
                <div key={cell.key} className={`${base} ${tone}`}>
                  <span className={isToday ? "font-semibold text-teal-700 dark:text-teal-300" : ""}>
                    {cell.day}
                  </span>
                  {isToday ? (
                    <span className="absolute inset-x-3 bottom-1.5 h-px rounded bg-teal-500/70" />
                  ) : null}
                </div>
              );
            }

            if (!hasEvents && isRecurring) {
              return (
                <button
                  key={cell.key}
                  type="button"
                  onClick={() => setSelectedKey(cell.key)}
                  aria-pressed={isActive}
                  aria-label={`Monthly webinar day — topic to be announced — on ${cell.key}`}
                  className={`${base} ${tone} cursor-pointer ${
                    isActive
                      ? "bg-teal-700 text-white dark:bg-teal-600 dark:text-white"
                      : "bg-teal-50/70 hover:bg-teal-100/80 dark:bg-teal-500/10 dark:hover:bg-teal-500/20"
                  }`}
                >
                  <span
                    className={
                      isToday && !isActive ? "font-semibold text-teal-700 dark:text-teal-300" : undefined
                    }
                  >
                    {cell.day}
                  </span>
                  <span className="absolute inset-x-0 bottom-1.5 flex justify-center">
                    <span
                      className={`size-1.5 rounded-full border ${
                        isActive ? "border-white/90" : "border-teal-500 dark:border-teal-400"
                      }`}
                    />
                  </span>
                </button>
              );
            }

            return (
              <button
                key={cell.key}
                type="button"
                onClick={() => setSelectedKey(cell.key)}
                aria-pressed={isActive}
                aria-label={`${dayEvents.length} webinar${dayEvents.length > 1 ? "s" : ""} on ${cell.key}`}
                className={`${base} ${tone} cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  isActive
                    ? "bg-teal-700 text-white hover:bg-teal-700 dark:bg-teal-600 dark:text-white"
                    : ""
                }`}
              >
                <span className={isToday && !isActive ? "font-semibold text-teal-700 dark:text-teal-300" : ""}>
                  {cell.day}
                </span>
                <span className="absolute inset-x-0 bottom-1.5 flex justify-center gap-0.5">
                  {dayEvents.slice(0, 3).map((event, i) => (
                    <span
                      key={`${event.id}-${i}`}
                      className={`size-1.5 rounded-full ${
                        isActive ? "bg-white/90" : PROGRAM_META[event.supportProgram].dotClass
                      }`}
                    />
                  ))}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 space-y-3">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 dark:text-teal-300">
            <svg aria-hidden="true" viewBox="0 0 20 20" className="size-3.5" fill="currentColor">
              <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm11 6H3v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
            </svg>
            We go live on the last Friday of every month.
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {PROGRAM_ORDINALS.map((ordinal) => (
              <li key={ordinal} className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className={`size-2 rounded-full ${PROGRAM_META[ordinal].dotClass}`} />
                {PROGRAM_META[ordinal].shortName}
              </li>
            ))}
            {!programFilter ? (
              <li className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                <span className="size-2 rounded-full border border-teal-500 dark:border-teal-400" />
                Webinar day · topic TBA
              </li>
            ) : null}
          </ul>
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-6">
        {showSaveTheDate && tentativeEvent ? (
          <div className="relative overflow-hidden">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-100 px-2.5 py-1 text-[11px] font-semibold text-teal-800 dark:bg-teal-500/15 dark:text-teal-300">
              <span className="size-1.5 rounded-full border border-teal-600 dark:border-teal-400" />
              Save the date
            </span>
            <p className="mt-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              {tentativeEvent.locationDate} · {tentativeEvent.time}
            </p>
            <h4 className="mt-1 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
              Next month&apos;s webinar — topic to be announced
            </h4>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {tentativeEvent.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <AddToCalendarButton event={tentativeEvent} variant="solid" />
              <a
                href={`mailto:${africaEmails.programsCoord}?subject=${encodeURIComponent(
                  "Webinar topic suggestion",
                )}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Suggest a topic
              </a>
            </div>
          </div>
        ) : activeEvents.length === 0 ? (
          <div className="flex h-full min-h-40 flex-col items-center justify-center text-center">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">No sessions this month</p>
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
              Use the arrows to browse other months, or clear the program filter.
            </p>
          </div>
        ) : (
          <ul className="space-y-5">
            {activeEvents.map((event) => {
              const startMs = new Date(event.isoDate).getTime();
              const live = nowMs >= startMs && nowMs < getEventEndMs(event);
              const past = nowMs >= getEventEndMs(event);
              const meta = PROGRAM_META[event.supportProgram];
              return (
                <li key={event.id}>
                  <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold ${meta.chipClass}`}>
                    <span className={`size-1.5 rounded-full ${meta.dotClass}`} />
                    {meta.shortName}
                  </span>
                  <p className="mt-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {event.locationDate} · {event.time}
                  </p>
                  <h4 className="mt-1 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                    {event.title}
                  </h4>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {event.summary}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {past ? null : live && (event.joinHref || event.registerHref) ? (
                      <a
                        href={event.joinHref ?? event.registerHref ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-600"
                      >
                        Join webinar
                      </a>
                    ) : event.registerHref ? (
                      <a
                        href={event.registerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white transition hover:bg-teal-600"
                      >
                        Register
                      </a>
                    ) : null}
                    <Link
                      href={event.href}
                      className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                    >
                      {past ? "View recap" : "Details"}
                    </Link>
                    {past ? null : (
                      <AddToCalendarButton event={event} variant="outline" />
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
