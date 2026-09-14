"use client";

import { useCallback, useSyncExternalStore } from "react";
import { courses } from "./content";
import type { CourseId, LearnerProgress, MasterClassStore } from "./types";

const STORAGE_KEY = "rlri-master-class-v1";
const STORE_EVENT = "rlri-mc-store";
const COURSE_IDS = new Set<string>(courses.map((course) => course.id));

function emptyProgress(): LearnerProgress {
  return {
    completedCourseIds: [],
    passedQuizIds: [],
    bestQuizScores: {},
    showAndTell: null,
  };
}

function emptyStore(): MasterClassStore {
  return { learnerId: null, byLearner: {} };
}

function asCourseIds(value: unknown): CourseId[] {
  if (!Array.isArray(value)) return [];
  return value.filter((id): id is CourseId => typeof id === "string" && COURSE_IDS.has(id));
}

function asProgress(value: unknown): LearnerProgress {
  if (!value || typeof value !== "object") return emptyProgress();
  const raw = value as Record<string, unknown>;
  const scores: Partial<Record<CourseId, number>> = {};
  if (raw.bestQuizScores && typeof raw.bestQuizScores === "object") {
    for (const [key, score] of Object.entries(raw.bestQuizScores as Record<string, unknown>)) {
      if (COURSE_IDS.has(key) && typeof score === "number" && Number.isFinite(score)) {
        scores[key as CourseId] = score;
      }
    }
  }
  return {
    completedCourseIds: asCourseIds(raw.completedCourseIds),
    passedQuizIds: asCourseIds(raw.passedQuizIds),
    bestQuizScores: scores,
    showAndTell: typeof raw.showAndTell === "string" ? raw.showAndTell : null,
  };
}

function loadStore(): MasterClassStore {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw) as MasterClassStore;
    if (!parsed || typeof parsed !== "object") return emptyStore();
    const byLearner: Record<string, LearnerProgress> = {};
    if (parsed.byLearner && typeof parsed.byLearner === "object") {
      for (const [id, progress] of Object.entries(parsed.byLearner)) {
        byLearner[id] = asProgress(progress);
      }
    }
    return {
      learnerId: typeof parsed.learnerId === "string" ? parsed.learnerId : null,
      byLearner,
    };
  } catch {
    return emptyStore();
  }
}

function saveStore(store: MasterClassStore) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // Quota or private-mode — keep going with in-memory state.
  }
}

let cachedStore: MasterClassStore | undefined;

function getSnapshot() {
  if (cachedStore === undefined) cachedStore = loadStore();
  return cachedStore;
}

const EMPTY_STORE = emptyStore();

function getServerSnapshot() {
  return EMPTY_STORE;
}

function subscribe(onChange: () => void) {
  const onLocal = () => onChange();
  const onOtherTab = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    cachedStore = undefined;
    onChange();
  };
  window.addEventListener(STORE_EVENT, onLocal);
  window.addEventListener("storage", onOtherTab);
  return () => {
    window.removeEventListener(STORE_EVENT, onLocal);
    window.removeEventListener("storage", onOtherTab);
  };
}

export function useMasterClassStore() {
  const store = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  const setStore = useCallback((next: MasterClassStore) => {
    cachedStore = next;
    saveStore(next);
    window.dispatchEvent(new Event(STORE_EVENT));
  }, []);

  return { store, setStore, hydrated };
}

export function progressFor(
  store: MasterClassStore,
  learnerId: string | null,
): LearnerProgress {
  if (!learnerId) return emptyProgress();
  return store.byLearner[learnerId] ?? emptyProgress();
}

export function overallCompletion(progress: LearnerProgress) {
  const total = courses.length * 2;
  const done = progress.completedCourseIds.length + progress.passedQuizIds.length;
  return total === 0 ? 0 : Math.min(1, done / total);
}

export function withProgress(
  store: MasterClassStore,
  learnerId: string,
  updater: (current: LearnerProgress) => LearnerProgress,
): MasterClassStore {
  const current = store.byLearner[learnerId] ?? emptyProgress();
  return {
    ...store,
    learnerId,
    byLearner: {
      ...store.byLearner,
      [learnerId]: updater(current),
    },
  };
}

export function toggleCourse(progress: LearnerProgress, courseId: CourseId): LearnerProgress {
  const has = progress.completedCourseIds.includes(courseId);
  return {
    ...progress,
    completedCourseIds: has
      ? progress.completedCourseIds.filter((id) => id !== courseId)
      : [...progress.completedCourseIds, courseId],
  };
}

export function nextStepLabel(progress: LearnerProgress, named: boolean) {
  if (!named) return "Choose your name so this page can remember what you finish.";
  for (const course of courses) {
    if (!progress.completedCourseIds.includes(course.id)) {
      return `Next: open “${course.title}”, then mark it complete.`;
    }
    if (!progress.passedQuizIds.includes(course.id)) {
      return `Next: take the quiz for “${course.title}”.`;
    }
  }
  return "You’re through the list. Try Claude on a real RLRI draft this week.";
}

export function recordQuizScore(
  progress: LearnerProgress,
  courseId: CourseId,
  score: number,
  passed: boolean,
): LearnerProgress {
  const previous = progress.bestQuizScores[courseId] ?? 0;
  const bestQuizScores = {
    ...progress.bestQuizScores,
    [courseId]: Math.max(previous, score),
  };
  if (!passed) return { ...progress, bestQuizScores };
  const passedQuizIds = progress.passedQuizIds.includes(courseId)
    ? progress.passedQuizIds
    : [...progress.passedQuizIds, courseId];
  return { ...progress, passedQuizIds, bestQuizScores };
}
