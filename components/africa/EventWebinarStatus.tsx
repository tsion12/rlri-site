"use client";

import { useEffect, useState } from "react";
import { getEventPhase, type AfricaEventPhase } from "@/lib/africa-event-schedule";

function getTimeLeft(targetMs: number) {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const;
const LABELS = { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" };

const PHASE_LABEL: Record<Exclude<AfricaEventPhase, "ended">, string> = {
  countdown: "Countdown to webinar",
  "starting-soon": "Starting soon",
  live: "Live now",
};

const PHASE_LABEL_COMPACT: Record<Exclude<AfricaEventPhase, "ended">, string> = {
  countdown: "Countdown",
  "starting-soon": "Starting soon",
  live: "Live now",
};

type Variant = "banner" | "card";

type Props = {
  startISO: string;
  endISO: string;
  title: string;
  registerHref?: string | null;
  variant?: Variant;
  showTitle?: boolean;
};

function CountdownGrid({
  time,
  variant,
}: {
  time: ReturnType<typeof getTimeLeft>;
  variant: Variant;
}) {
  if (variant === "card") {
    return (
      <div className="grid grid-cols-4 gap-1">
        {UNITS.map((unit) => (
          <div
            key={unit}
            className="rounded-md border border-zinc-200/90 bg-white px-1 py-1 text-center dark:border-zinc-600 dark:bg-zinc-900/80"
          >
            <span className="block text-sm font-bold tabular-nums leading-none text-zinc-900 dark:text-zinc-50">
              {String(time[unit]).padStart(2, "0")}
            </span>
            <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              {LABELS[unit]}
            </span>
          </div>
        ))}
      </div>
    );
  }

  const cellClass =
    "flex min-w-18 flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center backdrop-blur-sm";
  const valueClass = "text-2xl font-black tabular-nums leading-none text-white sm:text-3xl";
  const unitClass = "mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50";

  return (
    <div className="flex flex-wrap gap-2">
      {UNITS.map((unit) => (
        <div key={unit} className={cellClass}>
          <span className={valueClass}>{String(time[unit]).padStart(2, "0")}</span>
          <span className={unitClass}>{LABELS[unit]}</span>
        </div>
      ))}
    </div>
  );
}

export function EventWebinarStatus({
  startISO,
  endISO,
  title,
  registerHref,
  variant = "banner",
  showTitle = true,
}: Props) {
  const startMs = new Date(startISO).getTime();
  const endMs = new Date(endISO).getTime();
  const durationMinutes = Math.round((endMs - startMs) / 60000);
  const [phase, setPhase] = useState<AfricaEventPhase>(() =>
    getEventPhase({ isoDate: startISO, durationMinutes }),
  );
  const [time, setTime] = useState(() => getTimeLeft(startMs));

  useEffect(() => {
    const tick = () => {
      setPhase(getEventPhase({ isoDate: startISO, durationMinutes }));
      setTime(getTimeLeft(startMs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startISO, durationMinutes, startMs]);

  if (phase === "ended") return null;

  const labelClass =
    variant === "banner"
      ? "text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200"
      : "text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400";
  const titleClass =
    variant === "banner" ? "mt-1 text-sm text-teal-100" : "mt-1 text-sm text-zinc-600 dark:text-zinc-400";
  const phaseLabels = variant === "card" ? PHASE_LABEL_COMPACT : PHASE_LABEL;
  const phaseLabel = phase === "countdown" ? phaseLabels.countdown : phaseLabels[phase];
  const compact = variant === "card";

  const liveBadge =
    variant === "banner" ? (
      <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100">
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
          <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300" />
        </span>
        Live now
      </span>
    ) : (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-600/30 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
        <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
        Live now
      </span>
    );

  const joinButtonClass =
    variant === "banner"
      ? "inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
      : "inline-flex min-h-9 items-center justify-center rounded-lg bg-teal-700 px-4 text-xs font-semibold text-white transition hover:bg-teal-600";

  if (phase === "live") {
    if (compact && !showTitle) {
      return <div className="flex items-center justify-between gap-2">{liveBadge}</div>;
    }

    return (
      <div>
        <p className={labelClass}>{PHASE_LABEL.live}</p>
        {showTitle ? <p className={titleClass}>{title}</p> : null}
        <div className={`${compact ? "mt-1.5" : "mt-3"} flex flex-wrap items-center gap-3`}>
          {liveBadge}
          {registerHref && !compact ? (
            <a href={registerHref} target="_blank" rel="noopener noreferrer" className={joinButtonClass}>
              Join webinar
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className={`flex items-center justify-between gap-2 ${compact ? "" : "mb-0"}`}>
        <p className={labelClass}>{phaseLabel}</p>
      </div>
      {showTitle ? <p className={titleClass}>{title}</p> : null}
      <div className={compact ? "mt-1.5" : "mt-3"}>
        <CountdownGrid time={time} variant={variant} />
      </div>
    </div>
  );
}

export function useEventWebinarPhase(startISO: string, endISO: string) {
  const startMs = new Date(startISO).getTime();
  const endMs = new Date(endISO).getTime();
  const durationMinutes = Math.round((endMs - startMs) / 60000);
  const [phase, setPhase] = useState<AfricaEventPhase>(() =>
    getEventPhase({ isoDate: startISO, durationMinutes }),
  );

  useEffect(() => {
    const tick = () => setPhase(getEventPhase({ isoDate: startISO, durationMinutes }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startISO, durationMinutes]);

  return phase;
}
