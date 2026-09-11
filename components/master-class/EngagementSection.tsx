"use client";

import { useState } from "react";
import { courses } from "@/lib/master-class/content";
import { seededShowAndTell, masterClassLearners } from "@/lib/master-class/team";
import { MASTER_CLASS_OFFICES, type LearnerProgress, type MasterClassStore } from "@/lib/master-class/types";
import { overallCompletion } from "@/lib/master-class/storage";

function learnerCompletion(store: MasterClassStore, learnerId: string, seed: number) {
  const local = store.byLearner[learnerId];
  if (!local) return seed;
  const hasWork =
    local.completedCourseIds.length > 0 ||
    local.passedQuizIds.length > 0 ||
    Boolean(local.showAndTell);
  return hasWork ? overallCompletion(local) : seed;
}

export function EngagementSection({
  store,
  progress,
  canTrack,
  onPost,
}: {
  store: MasterClassStore;
  progress: LearnerProgress;
  canTrack: boolean;
  onPost: (text: string) => void;
}) {
  const [draft, setDraft] = useState(progress.showAndTell ?? "");
  const [justPosted, setJustPosted] = useState(false);

  const offices = MASTER_CLASS_OFFICES.map((office) => {
    const members = masterClassLearners.filter((l) => l.office === office);
    const avg =
      members.length === 0
        ? 0
        : members.reduce((sum, m) => sum + learnerCompletion(store, m.id, m.seedCompletion), 0) /
          members.length;
    return { office, members, avg };
  }).sort((a, b) => b.avg - a.avg);

  const wall = masterClassLearners
    .map((learner) => {
      const local = store.byLearner[learner.id]?.showAndTell;
      const seed = seededShowAndTell.find((s) => s.learnerId === learner.id)?.text;
      const text = local ?? seed;
      if (!text) return null;
      return { learner, text, local: Boolean(local) };
    })
    .filter((row): row is NonNullable<typeof row> => row !== null);

  const earned = courses.filter(
    (c) => progress.completedCourseIds.includes(c.id) || progress.passedQuizIds.includes(c.id),
  );

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || !canTrack) return;
    onPost(text);
    setJustPosted(true);
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="engagement-heading">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
        Celebrate the work
      </p>
      <h2 id="engagement-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Badges, offices, and show &amp; tell
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Earn a badge per course, cheer your office, and pin one thing you actually built with Claude.
      </p>

      <div
        className="mt-6 rounded-xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900/60 dark:bg-amber-950/30 dark:text-amber-100"
        role="note"
      >
        Progress on this page is saved in <strong>your browser</strong> (same pattern as blog reactions). The
        leaderboard and show &amp; tell will not sync across teammates until we add a small shared store — Upstash
        Redis plus one API route is the lightest next step on this stack. Nothing sensitive belongs here.
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Your badges</h3>
          {earned.length === 0 ? (
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
              Complete a course or pass its checkpoint and a badge will land here. You have got this.
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
          {progress.passedQuizIds.length > 0 ? (
            <div className="mt-6 rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                Certificate
              </p>
              <p className="mt-2 font-semibold text-zinc-900 dark:text-zinc-50">
                Ethical AI · Claude Master Class
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {progress.passedQuizIds.length} of {courses.length} checkpoints cleared on this device. Print or
                screenshot if you want a keepsake — we will keep it light until a shared store exists.
              </p>
            </div>
          ) : null}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Office leaderboard</h3>
          <ol className="mt-4 space-y-3">
            {offices.map((row, i) => (
              <li key={row.office}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                    {i + 1}. {row.office}
                    <span className="ml-2 font-normal text-zinc-500">
                      {row.members.map((m) => m.initials).join(" · ")}
                    </span>
                  </span>
                  <span className="tabular-nums text-zinc-600 dark:text-zinc-400">
                    {Math.round(row.avg * 100)}%
                  </span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-teal-600 transition-[width] duration-700 dark:bg-teal-400"
                    style={{ width: `${Math.round(row.avg * 100)}%` }}
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">Show &amp; tell</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          One thing you built with Claude — a prompt, a draft, a checklist. Keep it free of personal or field data.
        </p>
        <form className="mt-4" onSubmit={submit}>
          <label htmlFor="show-tell" className="sr-only">
            What did you build with Claude?
          </label>
          <textarea
            id="show-tell"
            rows={3}
            maxLength={280}
            value={draft}
            onChange={(e) => {
              setDraft(e.target.value);
              setJustPosted(false);
            }}
            disabled={!canTrack}
            placeholder={canTrack ? "We turned X into Y, then a human checked every claim…" : "Pick your name above first"}
            className="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-teal-500/30 focus:border-teal-500 focus:ring-2 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          />
          <div className="mt-2 flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-500">{draft.length}/280</p>
            <button
              type="submit"
              disabled={!canTrack || !draft.trim()}
              className="inline-flex min-h-10 items-center rounded-xl bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 disabled:opacity-50"
            >
              {progress.showAndTell ? "Update my post" : "Pin to the wall"}
            </button>
          </div>
          {justPosted ? (
            <p className="mt-2 text-sm text-teal-800 dark:text-teal-300" role="status">
              Saved on this device. Nice work.
            </p>
          ) : null}
        </form>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {wall.map((item) => (
            <li
              key={item.learner.id}
              className="rounded-2xl border border-zinc-200/80 bg-white p-5 dark:border-zinc-800/80 dark:bg-zinc-900/45"
            >
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">{item.learner.name}</p>
              <p className="text-xs text-zinc-500">
                {item.learner.office}
                {item.local ? " · your browser" : " · seeded example"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
