"use client";

import { useState } from "react";
import { checkpoints } from "@/lib/master-class/checkpoints";
import { courses, masterClassMeta } from "@/lib/master-class/content";
import type { CourseId, LearnerProgress } from "@/lib/master-class/types";

type QuizView = {
  index: number;
  selected: Array<number | null>;
  revealed: boolean[];
};

function emptyView(n: number): QuizView {
  return {
    index: 0,
    selected: Array.from({ length: n }, () => null),
    revealed: Array.from({ length: n }, () => false),
  };
}

export function CheckpointsSection({
  progress,
  canTrack,
  onQuizResult,
}: {
  progress: LearnerProgress;
  canTrack: boolean;
  onQuizResult: (courseId: CourseId, score: number, passed: boolean) => void;
}) {
  const [active, setActive] = useState<CourseId>(courses[0].id);
  const [views, setViews] = useState<Record<string, QuizView>>({});
  const checkpoint = checkpoints.find((c) => c.courseId === active) ?? checkpoints[0];
  const view = views[active] ?? emptyView(checkpoint.questions.length);
  const total = checkpoint.questions.length;
  const safeIndex = total === 0 ? 0 : Math.min(view.index, total - 1);
  const question = checkpoint.questions[safeIndex];
  const viewAtIndex = { ...view, index: safeIndex };

  const correctSoFar = checkpoint.questions.reduce((n, q, i) => {
    if (!view.revealed[i]) return n;
    return n + (view.selected[i] === q.answer ? 1 : 0);
  }, 0);

  const revealedCount = view.revealed.filter(Boolean).length;
  const finished = total > 0 && revealedCount === total;
  const score = finished && total > 0 ? correctSoFar / total : 0;
  const passed = finished && score >= masterClassMeta.passMark;
  const alreadyPassed = progress.passedQuizIds.includes(active);

  function updateView(next: QuizView) {
    setViews((prev) => ({ ...prev, [active]: next }));
  }

  function choose(optionIndex: number) {
    if (total === 0 || view.revealed[viewAtIndex.index]) return;
    const selected = [...view.selected];
    selected[viewAtIndex.index] = optionIndex;
    const revealed = [...view.revealed];
    revealed[viewAtIndex.index] = true;
    const next = { ...view, index: viewAtIndex.index, selected, revealed };
    updateView(next);

    const allDone = revealed.length === total && revealed.every(Boolean);
    if (allDone && canTrack && total > 0) {
      const correct = checkpoint.questions.reduce(
        (n, q, i) => n + (selected[i] === q.answer ? 1 : 0),
        0,
      );
      const nextScore = correct / total;
      onQuizResult(active, nextScore, nextScore >= masterClassMeta.passMark);
    }
  }

  function retake() {
    updateView(emptyView(checkpoint.questions.length));
  }

  const nameAttr = `checkpoint-${checkpoint.courseId}-q${viewAtIndex.index}`;

  return (
    <section
      className="border-y border-zinc-200/70 bg-zinc-50/90 py-16 dark:border-zinc-800/80 dark:bg-zinc-900/35 sm:py-20"
      aria-labelledby="checkpoints-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
          Check your understanding
        </p>
        <h2 id="checkpoints-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Checkpoints
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          One short quiz per course. Instant feedback, a running score, and {Math.round(masterClassMeta.passMark * 100)}% to pass.
          You can retake anytime.
        </p>

        <div
          role="tablist"
          aria-label="Course checkpoints"
          className="mt-8 flex gap-2 overflow-x-auto pb-1"
        >
          {courses.map((course) => {
            const selected = course.id === active;
            const won = progress.passedQuizIds.includes(course.id);
            return (
              <button
                key={course.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`checkpoint-tab-${course.id}`}
                onClick={() => setActive(course.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 ${
                  selected
                    ? "bg-teal-700 text-white"
                    : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
                }`}
              >
                {course.title}
                {won ? <span className="sr-only"> (passed)</span> : null}
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          aria-labelledby={`checkpoint-tab-${active}`}
          className="mt-6 rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/55 sm:p-8"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">{checkpoint.title}</h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{checkpoint.intro}</p>
            </div>
            <p className="rounded-full bg-zinc-100 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200" aria-live="polite">
              Score {correctSoFar}/{total}
              {finished ? ` · ${Math.round(score * 100)}%` : ""}
            </p>
          </div>

          {alreadyPassed && !finished ? (
            <p className="mt-4 rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-sm text-teal-900 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-100">
              You already passed this checkpoint
              {progress.bestQuizScores[active] != null
                ? ` (best ${Math.round((progress.bestQuizScores[active] ?? 0) * 100)}%)`
                : ""}
              . Have another go whenever you like.
            </p>
          ) : null}

          {finished && passed ? (
            <div className="mc-celebrate mt-6 rounded-2xl border border-teal-200 bg-linear-to-br from-teal-50 via-white to-emerald-50 p-6 text-center dark:border-teal-800 dark:from-teal-950/50 dark:via-zinc-900 dark:to-zinc-900">
              <p className="text-2xl font-semibold text-teal-900 dark:text-teal-100">You passed — well done.</p>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {correctSoFar} of {total} correct. That badge is yours. Apply it on the next real brief.
              </p>
              <button
                type="button"
                onClick={retake}
                className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-teal-700 px-5 text-sm font-semibold text-teal-800 hover:bg-teal-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 dark:text-teal-200 dark:hover:bg-teal-950/40"
              >
                Retake
              </button>
            </div>
          ) : null}

          {finished && !passed ? (
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-900 dark:bg-amber-950/30">
              <p className="font-semibold text-amber-950 dark:text-amber-100">
                {Math.round(score * 100)}% — so close. Pass mark is {Math.round(masterClassMeta.passMark * 100)}%.
              </p>
              <p className="mt-1 text-sm text-amber-900/80 dark:text-amber-200/80">
                Read the explanations, then try again. No penalty for curiosity.
              </p>
              <button
                type="button"
                onClick={retake}
                className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-amber-800 px-5 text-sm font-semibold text-white hover:bg-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/40"
              >
                Retake
              </button>
            </div>
          ) : null}

          {question ? (
            <fieldset className="mt-6" disabled={!canTrack}>
              <legend className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Question {viewAtIndex.index + 1} of {total}
              </legend>
              <p className="mt-2 text-zinc-700 dark:text-zinc-300">{question.prompt}</p>
              <div className="mt-4 space-y-2" role="radiogroup" aria-label={question.prompt}>
                {question.options.map((option, optionIndex) => {
                  const chosen = view.selected[viewAtIndex.index] === optionIndex;
                  const revealed = view.revealed[viewAtIndex.index];
                  const isCorrect = optionIndex === question.answer;
                  let stateClass =
                    "border-zinc-200 hover:border-teal-300 dark:border-zinc-700 dark:hover:border-teal-700";
                  if (revealed && isCorrect) {
                    stateClass = "border-teal-500 bg-teal-50 dark:border-teal-600 dark:bg-teal-950/40";
                  } else if (revealed && chosen && !isCorrect) {
                    stateClass = "border-rose-400 bg-rose-50 dark:border-rose-700 dark:bg-rose-950/30";
                  }
                  return (
                    <label
                      key={optionIndex}
                      className={`flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 text-sm text-zinc-800 dark:text-zinc-200 ${stateClass} ${
                        canTrack ? "" : "cursor-not-allowed opacity-60"
                      }`}
                    >
                      <input
                        type="radio"
                        name={nameAttr}
                        value={optionIndex}
                        checked={chosen}
                        disabled={!canTrack || revealed}
                        onChange={() => choose(optionIndex)}
                        className="mt-0.5 accent-teal-700"
                      />
                      <span>{option}</span>
                    </label>
                  );
                })}
              </div>
              {view.revealed[viewAtIndex.index] ? (
                <div
                  className="mt-4 rounded-xl bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-300"
                  aria-live="polite"
                >
                  <p className="font-semibold">
                    {view.selected[viewAtIndex.index] === question.answer ? "That’s it." : "Not quite."}
                  </p>
                  <p className="mt-1">{question.explanation}</p>
                  {viewAtIndex.index < total - 1 ? (
                    <button
                      type="button"
                      onClick={() => updateView({ ...view, index: viewAtIndex.index + 1 })}
                      className="mt-3 inline-flex min-h-10 items-center rounded-lg bg-teal-700 px-4 text-sm font-semibold text-white hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40"
                    >
                      Next question
                    </button>
                  ) : null}
                </div>
              ) : null}
            </fieldset>
          ) : null}

          {!canTrack ? (
            <p className="mt-4 text-sm text-zinc-500">Pick your name at the top so we can save your score on this device.</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
