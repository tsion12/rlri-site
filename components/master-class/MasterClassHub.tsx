"use client";

import { masterClassMeta } from "@/lib/master-class/content";
import {
  nextStepLabel,
  overallCompletion,
  progressFor,
  recordQuizScore,
  toggleCourse,
  useMasterClassStore,
  withProgress,
} from "@/lib/master-class/storage";
import { masterClassLearners } from "@/lib/master-class/team";
import type { CourseId } from "@/lib/master-class/types";
import { CheckpointsSection } from "./CheckpointsSection";
import { CoursesSection } from "./CoursesSection";
import { EngagementSection } from "./EngagementSection";
import { FrameworkSection } from "./FrameworkSection";
import { JourneySection } from "./JourneySection";
import { ProgressRing } from "./ProgressRing";

export function MasterClassHub() {
  const { store, setStore, hydrated } = useMasterClassStore();

  const learner = masterClassLearners.find((l) => l.id === store.learnerId) ?? null;
  const learnerId = learner?.id ?? null;
  const progress = progressFor(store, learnerId);
  const completion = overallCompletion(progress);
  const canTrack = Boolean(learnerId);

  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-zinc-200/60 dark:border-zinc-800/80">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.1),transparent_50%)]"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-800 dark:border-teal-800/60 dark:bg-zinc-900/70 dark:text-teal-300">
              {masterClassMeta.kicker}
            </p>
            <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {masterClassMeta.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {masterClassMeta.mission}
            </p>
            <p className="mt-3 max-w-xl text-sm font-medium text-teal-800 dark:text-teal-300">
              {hydrated ? nextStepLabel(progress, canTrack) : "Choose your name so this page can remember what you finish."}
            </p>
            <div className="mt-6 flex flex-wrap items-end gap-4">
              <div>
                <label htmlFor="learner-select" className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  Learning as
                </label>
                <select
                  id="learner-select"
                  value={learnerId ?? ""}
                  onChange={(e) =>
                    setStore({ ...store, learnerId: e.target.value || null })
                  }
                  className="mt-1 block min-h-11 min-w-[16rem] rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-900 outline-none ring-teal-500/30 focus:border-teal-500 focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
                >
                  <option value="">Choose your name…</option>
                  {masterClassLearners.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name} · {person.office}
                    </option>
                  ))}
                </select>
              </div>
              <form action="/api/internal/master-class/unlock" method="post">
                <input type="hidden" name="intent" value="lock" />
                <button
                  type="submit"
                  className="min-h-11 rounded-xl border border-zinc-300 px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                >
                  Lock hub
                </button>
              </form>
            </div>
          </div>
          <div className="justify-self-start rounded-3xl border border-zinc-200/80 bg-white/80 p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/50 lg:justify-self-end">
            <ProgressRing
              value={hydrated ? completion : 0}
              label={`${learner ? learner.name : "Your"} overall completion: ${Math.round(completion * 100)} percent`}
            />
            <p className="mt-3 max-w-[12rem] text-center text-xs leading-relaxed text-zinc-500">
              {learner
                ? `${progress.completedCourseIds.length + progress.passedQuizIds.length} of 8 steps`
                : "Pick your name to track progress"}
            </p>
          </div>
        </div>
      </section>

      <FrameworkSection />
      <JourneySection />
      <EngagementSection
        key={learnerId ?? "anon"}
        progress={progress}
        canTrack={canTrack}
        onPost={(text) => {
          if (!learnerId) return;
          setStore(
            withProgress(store, learnerId, (p) => ({ ...p, showAndTell: text || null })),
          );
        }}
      />
      <CoursesSection
        progress={progress}
        canTrack={canTrack}
        onToggle={(id) => {
          if (!learnerId) return;
          setStore(withProgress(store, learnerId, (p) => toggleCourse(p, id)));
        }}
      />
      <CheckpointsSection
        progress={progress}
        canTrack={canTrack}
        onQuizResult={(courseId: CourseId, score, passed) => {
          if (!learnerId) return;
          setStore(
            withProgress(store, learnerId, (p) => recordQuizScore(p, courseId, score, passed)),
          );
        }}
      />
    </>
  );
}
