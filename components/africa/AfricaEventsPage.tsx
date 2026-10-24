import Link from "next/link";
import { AfricaEventsSchedule } from "@/components/africa/AfricaEventsSchedule";
import { AfricaWebinarIntroSection } from "@/components/africa/AfricaWebinarIntroSection";
import { getAfricaWebinarEvents, getCategorizedAfricaEvents } from "@/lib/africa-events";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const MONTHS_SHORT = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

/** Build a deterministic date badge from the ISO date (no timezone math, so SSR and client agree). */
function heroDateBadge(isoDate: string) {
  const [year, month, day] = isoDate.slice(0, 10).split("-");
  return { day, month: MONTHS_SHORT[Number(month) - 1] ?? "", year };
}

export function AfricaEventsPage() {
  const events = getAfricaWebinarEvents();
  const nextEvent = getCategorizedAfricaEvents().upcoming[0] ?? null;

  const totalWebinars = events.length;
  const recordingsAvailable = events.filter((event) => event.recordingHref).length;
  const programTeams = new Set(events.map((event) => event.supportProgram)).size;

  const seriesStats = [
    { value: String(totalWebinars), label: "Webinars convened since 2025" },
    { value: String(recordingsAvailable), label: "Recordings free to revisit" },
    { value: String(programTeams), label: "Research program teams" },
    { value: "5+", label: "Time zones joined live" },
  ];

  const finalCtaHref = nextEvent?.registerHref ?? "#upcoming";
  const finalCtaExternal = Boolean(nextEvent?.registerHref);
  const finalCtaLabel = nextEvent?.registerHref ? "Register for the next webinar" : "See upcoming webinars";

  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-start lg:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                The RLRI Africa Webinar Series
              </p>
              <h1
                id="events-heading"
                className="mt-4 text-4xl font-semibold tracking-tight text-balance text-zinc-900 dark:text-zinc-50 sm:text-5xl"
              >
                Where African research meets policy, live.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                A running series of free, online public sessions that put researchers, policy
                practitioners, and community voices in the same room — one development challenge at a time.
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Topics span climate adaptation, public health, digital rights, and regional security.
                Each session is led by one of our research program teams, hosted across African and North
                American time zones, and preserved afterwards as a recording and, where available, a policy brief.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#upcoming"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
                >
                  Upcoming event
                </Link>
                <Link
                  href="#how-webinars-work"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                >
                  How webinars work
                </Link>
                <Link
                  href="#past"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                >
                  Past events
                </Link>
              </div>
            </div>

            {nextEvent ? (
              <aside
                aria-labelledby="next-session-heading"
                className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 shadow-[0_28px_60px_-34px_rgba(15,23,42,0.4)] dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7 lg:sticky lg:top-24"
              >
                <div className="flex items-center gap-2">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-teal-500/60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-teal-600 dark:bg-teal-400" />
                  </span>
                  <p
                    id="next-session-heading"
                    className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400"
                  >
                    Next live session
                  </p>
                </div>

                <div className="mt-5 flex items-start gap-4">
                  {(() => {
                    const badge = heroDateBadge(nextEvent.isoDate);
                    return (
                      <div className="flex shrink-0 flex-col items-center rounded-2xl bg-linear-to-br from-teal-700 to-teal-900 px-4 py-3 text-center text-white">
                        <span className="text-2xl font-bold leading-none">{badge.day}</span>
                        <span className="mt-1 text-[10px] font-semibold tracking-[0.14em] text-teal-100">
                          {badge.month} {badge.year}
                        </span>
                      </div>
                    );
                  })()}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {nextEvent.format} · {nextEvent.time}
                    </p>
                    <h2 className="mt-1.5 text-base font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                      {nextEvent.title}
                    </h2>
                  </div>
                </div>

                <WebinarProgramSupportLine program={nextEvent.supportProgram} className="mt-4 !text-xs" />

                <div className="mt-6 flex flex-wrap gap-3">
                  {nextEvent.registerHref ? (
                    <a
                      href={nextEvent.registerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-teal-700 px-5 text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                      Register now
                    </a>
                  ) : null}
                  <Link
                    href={nextEvent.href}
                    className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                  >
                    View details
                  </Link>
                </div>
              </aside>
            ) : null}
          </div>

          <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-200/70 sm:grid-cols-4 dark:border-zinc-800 dark:bg-zinc-800">
            {seriesStats.map((stat) => (
              <div key={stat.label} className="bg-white px-6 py-5 dark:bg-zinc-950">
                <dt className="text-3xl font-semibold tracking-tight text-teal-700 dark:text-teal-400">
                  {stat.value}
                </dt>
                <dd className="mt-1 text-sm leading-snug text-zinc-600 dark:text-zinc-400">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <AfricaWebinarIntroSection />

      <AfricaEventsSchedule events={events} />

      <section className="bg-teal-700 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-200/70">Stay in the loop</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Never miss a webinar
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-teal-100/80">
                Register for the next live session, or revisit any past conversation — every recording stays
                free to watch, whenever you need it.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              {finalCtaExternal ? (
                <a
                  href={finalCtaHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
                >
                  {finalCtaLabel}
                </a>
              ) : (
                <Link
                  href={finalCtaHref}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
                >
                  {finalCtaLabel}
                </Link>
              )}
              <Link
                href="#past"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Browse recordings
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
