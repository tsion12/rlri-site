"use client";

import { useState } from "react";
import { courses } from "@/lib/master-class/content";
import type { LearnerProgress } from "@/lib/master-class/types";

export function EngagementSection({
  progress,
  canTrack,
  onPost,
}: {
  progress: LearnerProgress;
  canTrack: boolean;
  onPost: (text: string) => void;
}) {
  const [draft, setDraft] = useState(progress.showAndTell ?? "");
  const [justSaved, setJustSaved] = useState(false);

  const steps = courses.flatMap((course) => [
    {
      id: `${course.id}-course`,
      done: progress.completedCourseIds.includes(course.id),
      label: `Open “${course.title}” and mark it complete`,
      href: "#courses",
    },
    {
      id: `${course.id}-quiz`,
      done: progress.passedQuizIds.includes(course.id),
      label: `Pass the quiz for “${course.title}”`,
      href: "#checkpoints",
    },
  ]);
  const doneCount = steps.filter((step) => step.done).length;
  const earned = courses.filter(
    (course) =>
      progress.completedCourseIds.includes(course.id) || progress.passedQuizIds.includes(course.id),
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canTrack) return;
    onPost(draft.trim());
    setJustSaved(true);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="engagement-heading">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
        Stay on track
      </p>
      <h2 id="engagement-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Your list
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Eight steps: four courses, then a quiz after each one. Tick them off as you go — this page only remembers
        progress on this device.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div>
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">To-do</h3>
            <p className="text-sm tabular-nums text-zinc-500">
              {doneCount} of {steps.length} done
            </p>
          </div>
          <ol className="mt-4 space-y-2">
            {steps.map((step) => (
              <li key={step.id}>
                <a
                  href={step.href}
                  className="flex items-start gap-3 rounded-xl border border-zinc-200/80 bg-white px-4 py-3 text-sm text-zinc-700 hover:border-teal-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 dark:border-zinc-800/80 dark:bg-zinc-900/45 dark:text-zinc-300 dark:hover:border-teal-800"
                >
                  <span
                    className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                      step.done
                        ? "bg-teal-700 text-white"
                        : "border border-zinc-300 text-zinc-400 dark:border-zinc-600"
                    }`}
                    aria-hidden
                  >
                    {step.done ? "✓" : ""}
                  </span>
                  <span className={step.done ? "text-zinc-500 line-through" : ""}>{step.label}</span>
                </a>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Badges you have earned</h3>
          {earned.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              None yet. Finish a course or pass its quiz and it will show up here.
            </p>
          ) : (
            <ul className="mt-4 flex flex-wrap gap-2">
              {earned.map((course) => (
                <li
                  key={course.id}
                  className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5 text-sm font-semibold text-teal-900 dark:border-teal-800 dark:bg-teal-950/50 dark:text-teal-100"
                >
                  {progress.passedQuizIds.includes(course.id) ? "★ " : ""}
                  {course.badge}
                </li>
              ))}
            </ul>
          )}

          <form className="mt-8" onSubmit={submit}>
            <label htmlFor="personal-note" className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
              Optional note
            </label>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              One line on what you actually used Claude for. Saved on this device only — nothing is shared with the
              team.
            </p>
            <textarea
              id="personal-note"
              rows={3}
              maxLength={280}
              value={draft}
              onChange={(e) => {
                setDraft(e.target.value);
                setJustSaved(false);
              }}
              disabled={!canTrack}
              placeholder={
                canTrack
                  ? "e.g. Used Claude to outline a partner brief, then checked every name and number myself"
                  : "Pick your name at the top first"
              }
              className="mt-3 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-teal-500/30 focus:border-teal-500 focus:ring-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            />
            <div className="mt-2 flex items-center justify-between gap-3">
              <p className="text-xs text-zinc-500">{draft.length}/280</p>
              <button
                type="submit"
                disabled={!canTrack}
                className="inline-flex min-h-10 items-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 disabled:opacity-50"
              >
                {progress.showAndTell ? "Update note" : "Save note"}
              </button>
            </div>
            {justSaved ? (
              <p className="mt-2 text-sm text-teal-800 dark:text-teal-300" role="status">
                Saved on this device.
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
