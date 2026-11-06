"use client";

import { useEffect, useRef, useState } from "react";
import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { buildIcs, googleCalendarUrl, icsFileName } from "@/lib/calendar-links";

type Props = {
  event: AfricaWebinarEvent;
  /** "solid" for the featured card, "outline" for lighter contexts. */
  variant?: "solid" | "outline";
  className?: string;
};

const BUTTON_BASE =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition";

const VARIANT_CLASS = {
  solid: "bg-teal-700 text-white hover:bg-teal-600",
  outline:
    "border border-zinc-200 bg-white text-zinc-800 hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600",
} as const;

export function AddToCalendarButton({ event, variant = "outline", className = "" }: Props) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function downloadIcs() {
    const blob = new Blob([buildIcs(event)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = icsFileName(event);
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setOpen(false);
  }

  return (
    <div ref={containerRef} className={`relative ${className}`.trim()}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`${BUTTON_BASE} ${VARIANT_CLASS[variant]}`}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4" fill="currentColor">
          <path d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm11 6H3v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
        </svg>
        Add to calendar
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute left-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
        >
          <a
            role="menuitem"
            href={googleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Google Calendar
          </a>
          <button
            type="button"
            role="menuitem"
            onClick={downloadIcs}
            className="block w-full px-4 py-3 text-left text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Apple / Outlook (.ics)
          </button>
        </div>
      ) : null}
    </div>
  );
}
