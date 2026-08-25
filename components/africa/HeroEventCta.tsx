"use client";

import Link from "next/link";
import { useEventWebinarPhase } from "@/components/africa/EventWebinarStatus";

type Props = {
  startISO: string;
  endISO: string;
  eventHref: string;
  registerHref?: string | null;
  joinHref?: string | null;
};

export function HeroEventCta({ startISO, endISO, eventHref, registerHref, joinHref }: Props) {
  const phase = useEventWebinarPhase(startISO, endISO);
  const liveJoinHref = joinHref ?? registerHref;

  if (phase === "live" && liveJoinHref) {
    return (
      <a
        href={liveJoinHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300"
      >
        Join webinar
      </a>
    );
  }

  return (
    <Link
      href={eventHref}
      className="mt-5 inline-flex text-sm font-semibold text-emerald-800 hover:underline dark:text-emerald-300"
    >
      Register for event
    </Link>
  );
}
