"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { africaRoutes } from "@/lib/africa-routes";
import { categorizeAfricaEvents, getEventEndIso } from "@/lib/africa-event-schedule";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";
import { EventWebinarStatus } from "@/components/africa/EventWebinarStatus";

function formatCalendarParts(isoDate: string) {
  const date = new Date(isoDate);
  return {
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date),
  };
}

function UpcomingEventActions({
  registerHref,
  joinHref,
  detailsHref,
  live,
}: {
  registerHref: string | null;
  joinHref?: string | null;
  detailsHref: string;
  live?: boolean;
}) {
  const actionHref = live ? joinHref ?? registerHref : registerHref;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {actionHref ? (
        <a
          href={actionHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
        >
          {live ? "Join webinar" : "Register now"}
        </a>
      ) : (
        <span className="inline-flex min-h-11 cursor-default items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 px-6 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
          Registration link coming soon
        </span>
      )}
      <Link
        href={detailsHref}
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
      >
        View details
      </Link>
    </div>
  );
}

function FeaturedEventCard({ event, live }: { event: AfricaWebinarEvent; live: boolean }) {
  const dateParts = formatCalendarParts(event.isoDate);

  return (
    <>
      <div className="mb-8 rounded-2xl bg-linear-to-r from-teal-700 via-teal-800 to-teal-900 p-4 text-white shadow-sm sm:p-5">
        <EventWebinarStatus
          startISO={event.isoDate}
          endISO={getEventEndIso(event)}
          title={event.title}
          registerHref={event.registerHref}
          joinHref={event.joinHref}
        />
      </div>

      <div className="overflow-hidden rounded-4xl shadow-[0_24px_55px_-24px_rgba(15,23,42,0.35)]">
        <div className="grid lg:grid-cols-[280px_1fr]">
          <div className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-teal-600 via-teal-700 to-teal-900 px-8 py-10 text-center text-white">
            {live ? (
              <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
                <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
                Live
              </span>
            ) : null}
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200/90">
              {dateParts.month} · {dateParts.year}
            </p>
            <p className="mt-2 text-7xl font-bold leading-none">{dateParts.day}</p>
            <p className="mt-3 text-xs font-semibold text-teal-100">{event.time}</p>
            <span className="mt-3 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium">
              {event.format}
            </span>
          </div>

          <div className="bg-white p-6 sm:p-8 dark:bg-zinc-900/80">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Webinar Series | Real Life Research Institute
            </p>
            <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
              {event.title}
            </h2>
            {event.subtitle ? (
              <p className="mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400">{event.subtitle}</p>
            ) : null}
            <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{event.locationDate}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.timezoneLine}</p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.summary}</p>
            <WebinarProgramSupportLine program={event.supportProgram} className="mt-4" />
            <UpcomingEventActions
              registerHref={event.registerHref}
              joinHref={event.joinHref}
              detailsHref={event.href}
              live={live}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export function AfricaEventsSchedule({ events }: { events: AfricaWebinarEvent[] }) {
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { upcoming, past } = useMemo(() => categorizeAfricaEvents(events, nowMs), [events, nowMs]);
  const featured = upcoming[0] ?? null;
  const moreUpcoming = upcoming.slice(1);

  const featuredLive =
    featured != null &&
    nowMs >= new Date(featured.isoDate).getTime() &&
    nowMs < new Date(getEventEndIso(featured)).getTime();

  return (
    <>
      <section id="upcoming" className="border-b border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Upcoming</p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          {featured ? (
            <>
              <FeaturedEventCard event={featured} live={featuredLive} />

              {moreUpcoming.length > 0 ? (
                <div className="mt-12">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Also coming up
                  </p>
                  <ul className="mt-6 grid gap-6 sm:grid-cols-2">
                    {moreUpcoming.map((event) => {
                      const dateParts = formatCalendarParts(event.isoDate);
                      return (
                        <li key={event.id}>
                          <article className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                            <p className="text-sm font-semibold text-teal-700 dark:text-teal-400">
                              {dateParts.day} {dateParts.month} {dateParts.year}
                            </p>
                            <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                              {event.title}
                            </h3>
                            {event.subtitle ? (
                              <p className="mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400">
                                {event.subtitle}
                              </p>
                            ) : null}
                            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.summary}</p>
                            <WebinarProgramSupportLine program={event.supportProgram} className="mt-3" />
                            <div className="mt-auto pt-5">
                              <UpcomingEventActions
                                registerHref={event.registerHref}
                                joinHref={event.joinHref}
                                detailsHref={event.href}
                              />
                            </div>
                          </article>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </>
          ) : (
            <div className="rounded-2xl border border-zinc-200 bg-white p-6 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300">
              No upcoming webinar is currently scheduled. Please check back soon for the next event.
            </div>
          )}
        </div>
      </section>

      <section id="past" className="bg-white py-20 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Past events</p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {past.length === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Past webinars will appear here after they conclude.</p>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {past.map(({ id, title, summary, isoDate, format, tags, href, policyBriefHref, recordingHref, supportProgram }) => {
                const dateParts = formatCalendarParts(isoDate);
                return (
                  <li key={id} className="flex">
                    <article className="flex w-full flex-col rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                        {format}
                      </p>
                      <p className="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-400">
                        {dateParts.day} {dateParts.month} {dateParts.year}
                      </p>
                      <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{summary}</p>
                      <WebinarProgramSupportLine program={supportProgram} className="mt-3" />
                      <div className="mt-4 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {recordingHref ? (
                          <a
                            href={recordingHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-600"
                          >
                            Watch recording
                          </a>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                            Recording coming soon
                          </span>
                        )}
                        <Link
                          href={href}
                          className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
                        >
                          Read more
                        </Link>
                        {policyBriefHref ? (
                          <Link
                            href={policyBriefHref}
                            className="inline-flex items-center rounded-lg border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold text-teal-800 transition hover:bg-teal-100 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-300"
                          >
                            Policy brief
                          </Link>
                        ) : (
                          <span className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                            Policy brief coming soon
                          </span>
                        )}
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="mt-10 text-center">
            <Link
              href={africaRoutes.events}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              Browse all events
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
