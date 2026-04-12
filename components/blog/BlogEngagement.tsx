"use client";

import Link from "next/link";
import { useState } from "react";

/* ── types ────────────────────────────────────────────────────────── */
type ReactionKey = "insightful" | "inspiring" | "important" | "bookmark";

const REACTIONS: {
  key: ReactionKey;
  emoji: string;
  label: string;
  color: string;
  ring: string;
}[] = [
  {
    key: "insightful",
    emoji: "💡",
    label: "Insightful",
    color:
      "hover:bg-amber-50 hover:border-amber-300 dark:hover:bg-amber-950/40 dark:hover:border-amber-600",
    ring: "ring-amber-300 dark:ring-amber-600",
  },
  {
    key: "inspiring",
    emoji: "🔥",
    label: "Inspiring",
    color:
      "hover:bg-rose-50 hover:border-rose-300 dark:hover:bg-rose-950/40 dark:hover:border-rose-600",
    ring: "ring-rose-300 dark:ring-rose-600",
  },
  {
    key: "important",
    emoji: "📌",
    label: "Important",
    color:
      "hover:bg-violet-50 hover:border-violet-300 dark:hover:bg-violet-950/40 dark:hover:border-violet-600",
    ring: "ring-violet-300 dark:ring-violet-600",
  },
  {
    key: "bookmark",
    emoji: "🔖",
    label: "Save",
    color:
      "hover:bg-teal-50 hover:border-teal-300 dark:hover:bg-teal-950/40 dark:hover:border-teal-600",
    ring: "ring-teal-300 dark:ring-teal-600",
  },
];

/* ── share helpers ────────────────────────────────────────────────── */
function ShareIcon({ path }: { path: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ── Reaction button ──────────────────────────────────────────────── */
function ReactionButton({
  reaction,
  active,
  count,
  onToggle,
}: {
  reaction: (typeof REACTIONS)[number];
  active: boolean;
  count: number;
  onToggle: () => void;
}) {
  const [burst, setBurst] = useState(false);

  function handleClick() {
    if (!active) {
      setBurst(true);
      setTimeout(() => setBurst(false), 400);
    }
    onToggle();
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      aria-label={`${active ? "Remove" : "Add"} ${reaction.label} reaction`}
      className={`group relative flex select-none flex-col items-center gap-1 rounded-2xl border px-5 py-4 text-center transition-all duration-200
        ${
          active
            ? `border-transparent bg-stone-900 shadow-lg shadow-stone-950/20 ring-2 ${reaction.ring} dark:bg-zinc-100`
            : `border-stone-200/80 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-900/60 ${reaction.color}`
        }`}
    >
      {/* Pop burst */}
      {burst && (
        <span
          className="pointer-events-none absolute inset-0 animate-ping rounded-2xl bg-current opacity-10"
          aria-hidden
        />
      )}
      <span
        className={`text-2xl transition-transform duration-200 ${burst ? "scale-125" : ""} ${active ? "" : "group-hover:scale-110"}`}
      >
        {reaction.emoji}
      </span>
      <span
        className={`text-xs font-semibold leading-none ${
          active ? "text-white dark:text-zinc-900" : "text-stone-600 dark:text-zinc-400"
        }`}
      >
        {reaction.label}
      </span>
      {count > 0 && (
        <span
          className={`mt-0.5 rounded-full px-2 py-0.5 text-[10px] font-bold leading-none tabular-nums ${
            active
              ? "bg-white/20 text-white dark:bg-zinc-900/20 dark:text-zinc-900"
              : "bg-stone-100 text-stone-500 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}

/* ── Props ────────────────────────────────────────────────────────── */
type Props = {
  slug: string;
  source: string;
  title: string;
};

const DEFAULT_REACTIONS: Record<ReactionKey, number> = {
  insightful: 0,
  inspiring: 0,
  important: 0,
  bookmark: 0,
};

function readStoredReactions(storageKey: string) {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    return JSON.parse(raw) as {
      r: Record<ReactionKey, number>;
      a: ReactionKey[];
    };
  } catch {
    return null;
  }
}

/* ── Main component ───────────────────────────────────────────────── */
export function BlogEngagement({ slug, source, title }: Props) {
  const storageKey = `rlri-reactions-${source}-${slug}`;
  const [reactions, setReactions] = useState<Record<ReactionKey, number>>(
    () => readStoredReactions(storageKey)?.r ?? DEFAULT_REACTIONS,
  );
  const [active, setActive] = useState<Set<ReactionKey>>(
    () => new Set(readStoredReactions(storageKey)?.a ?? []),
  );
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [thoughts, setThoughts] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const pageUrl = typeof window !== "undefined" ? window.location.href : "";

  function toggleReaction(key: ReactionKey) {
    setActive((prev) => {
      const next = new Set(prev);
      const wasActive = next.has(key);
      if (wasActive) {
        next.delete(key);
      } else {
        next.add(key);
      }
      setReactions((r) => {
        const updated = { ...r, [key]: r[key] + (wasActive ? -1 : 1) };
        try {
          localStorage.setItem(
            storageKey,
            JSON.stringify({ r: updated, a: [...next] }),
          );
        } catch {
          // ignore
        }
        return updated;
      });
      return next;
    });
  }

  function handleCopyLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopyState("copied");
      setTimeout(() => setCopyState("idle"), 2000);
    });
  }

  const twitterUrl = pageUrl
    ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`
    : "#";
  const linkedInUrl = pageUrl
    ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
    : "#";

  return (
    <div className="relative mt-20 space-y-8">
      {/* Glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-full -translate-x-1/2 rounded-full bg-amber-400/6 blur-3xl dark:bg-amber-500/4"
      />

      {/* ── Reactions ──────────────────────────────────────────── */}
      <section
        aria-label="React to this article"
        className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-stone-50/60 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-amber-400/8 blur-3xl dark:bg-amber-500/6"
        />
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-zinc-500">
          Your take
        </p>
        <p className="mt-2 text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
          How did this land?
        </p>
        <p className="mt-1 text-sm text-stone-500 dark:text-zinc-500">
          React to help surface what resonates most with readers.
        </p>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {REACTIONS.map((r) => (
            <ReactionButton
              key={r.key}
              reaction={r}
              active={active.has(r.key)}
              count={reactions[r.key]}
              onToggle={() => toggleReaction(r.key)}
            />
          ))}
        </div>
      </section>

      {/* ── Thoughts + share split ─────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
        {/* Thoughts */}
        <section
          aria-label="Share your thoughts"
          className="relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white/70 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-zinc-500">
            Thoughts
          </p>
          <p className="mt-2 text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
            What do you think?
          </p>

          {!submitted ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!thoughts.trim()) return;
                setSubmitted(true);
              }}
              className="mt-6 space-y-4"
            >
              <textarea
                value={thoughts}
                onChange={(e) => setThoughts(e.target.value)}
                placeholder="Share a reflection, question, or pushback…"
                rows={4}
                maxLength={600}
                required
                className="w-full resize-none rounded-2xl border border-stone-200/90 bg-white px-4 py-3 text-sm leading-relaxed text-stone-800 shadow-inner shadow-stone-950/4 outline-none transition placeholder:text-stone-400 focus:border-amber-400 focus:ring-2 focus:ring-amber-400/25 dark:border-zinc-700/80 dark:bg-zinc-900/60 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-amber-500/70 dark:focus:ring-amber-500/20"
              />
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] text-stone-400 dark:text-zinc-600 tabular-nums">
                  {thoughts.length}/600
                </span>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-xl bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white shadow transition hover:bg-stone-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
                >
                  Share thought
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="mt-8 flex flex-col items-start gap-3">
              <span className="text-3xl">🙌</span>
              <p className="text-base font-semibold text-stone-900 dark:text-zinc-50">
                Thanks for your perspective.
              </p>
              <p className="max-w-sm text-sm leading-relaxed text-stone-500 dark:text-zinc-500">
                We read every submission. Your thoughts help shape our research agenda and future coverage.
              </p>
              <button
                type="button"
                onClick={() => {
                  setThoughts("");
                  setSubmitted(false);
                }}
                className="text-xs font-semibold text-amber-700 transition hover:text-amber-900 dark:text-amber-400 dark:hover:text-amber-200"
              >
                Send another
              </button>
            </div>
          )}
        </section>

        {/* Share */}
        <section
          aria-label="Share this article"
          className="flex min-w-0 flex-col items-stretch gap-3 rounded-3xl border border-stone-200/80 bg-white/70 p-8 backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40 sm:w-56"
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-500 dark:text-zinc-500">
            Share
          </p>
          <p className="text-xl font-semibold tracking-tight text-stone-900 dark:text-zinc-50">
            Spread the word
          </p>

          <div className="mt-4 flex flex-col gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-3 rounded-xl border border-stone-200/90 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-700/60"
            >
              {copyState === "copied" ? (
                <>
                  <ShareIcon path="M5 13l4 4L19 7" />
                  Copied!
                </>
              ) : (
                <>
                  <ShareIcon path="M13.828 10.172a4 4 0 0 0-5.656 0l-4 4a4 4 0 1 0 5.656 5.656l1.102-1.101m-.758-4.899a4 4 0 0 0 5.656 0l4-4a4 4 0 0 0-5.656-5.656l-1.1 1.1" />
                  Copy link
                </>
              )}
            </button>

            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-stone-200/90 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-700/60"
            >
              <ShareIcon path="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              Share on X
            </a>

            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 rounded-xl border border-stone-200/90 bg-stone-50 px-4 py-3 text-sm font-medium text-stone-700 transition hover:border-stone-300 hover:bg-stone-100 dark:border-zinc-700/80 dark:bg-zinc-800/50 dark:text-zinc-300 dark:hover:bg-zinc-700/60"
            >
              <ShareIcon path="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
              LinkedIn
            </a>
          </div>
        </section>
      </div>

      {/* ── No mailing list — events & contact ───────────────── */}
      <section
        aria-label="Stay updated"
        className="relative overflow-hidden rounded-3xl bg-stone-900 p-8 text-white dark:bg-zinc-100 dark:text-zinc-900"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-amber-400/15 blur-3xl dark:bg-amber-400/20"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl dark:bg-zinc-900/10"
        />

        <p className="relative text-[11px] font-semibold uppercase tracking-[0.28em] text-stone-400 dark:text-zinc-500">
          Stay in the loop
        </p>
        <p className="relative mt-2 text-2xl font-semibold tracking-tight">
          We don&apos;t run a newsletter yet
        </p>
        <p className="relative mt-1.5 max-w-md text-sm leading-relaxed text-stone-400 dark:text-zinc-500">
          For new posts and webinars, visit the journal often or check upcoming Africa Program events.
        </p>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <Link
            href="/africa/events"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-7 text-sm font-bold text-amber-950 shadow transition hover:bg-amber-300"
          >
            Upcoming events
          </Link>
          <a
            href="mailto:contact-africa@reallifeinstitute.org"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15 dark:border-zinc-900/30 dark:bg-zinc-900/60 dark:text-zinc-900 dark:hover:bg-zinc-900/80"
          >
            Email the team
          </a>
        </div>
      </section>
    </div>
  );
}
