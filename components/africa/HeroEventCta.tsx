"use client";

import Link from "next/link";
import { useEventWebinarPhase } from "@/components/africa/EventWebinarStatus";

type Props = {
  startISO: string;
  endISO: string;
  eventHref: string;
  registerHref?: string | null;
};

export function HeroEventCta({ startISO, endISO, eventHref, registerHref }: Props) {
  const phase = useEventWebinarPhase(startISO, endISO);

  if (phase === "live" && registerHref) {
    return (
      <a
        href={registerHref}
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
