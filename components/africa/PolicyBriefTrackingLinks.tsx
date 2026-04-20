"use client";

import { sendGAEvent } from "@next/third-parties/google";

type Props = {
  href: string;
  briefTitle: string;
};

/**
 * Policy brief PDF actions with GA4 events (read vs download).
 */
export function PolicyBriefTrackingLinks({ href, briefTitle }: Props) {
  const params = {
    brief_title: briefTitle.slice(0, 120),
    link_url: href,
  };

  return (
    <div className="mt-5 flex flex-wrap gap-3">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sendGAEvent("event", "policy_brief_read", params)}
        className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
      >
        Read policy brief
      </a>
      <a
        href={href}
        download
        rel="noopener noreferrer"
        onClick={() => sendGAEvent("event", "policy_brief_download", params)}
        className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
      >
        Download PDF
      </a>
    </div>
  );
}
