"use client";

import { useState } from "react";

export function BlogSharePanel({ title, fallbackPath }: { title: string; fallbackPath: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined"
    ? window.location.href || `${window.location.origin}${fallbackPath}`
    : fallbackPath;
  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // no-op
    }
  }

  return (
    <section className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-7">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">Share</p>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Share this article with your network.
      </p>
      <div className="mt-4 flex flex-col gap-2">
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
        >
          {copied ? "Copied link" : "Copy link"}
        </button>
        <a
          href={xUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
        >
          Share on X
        </a>
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300"
        >
          Share on LinkedIn
        </a>
      </div>
    </section>
  );
}
