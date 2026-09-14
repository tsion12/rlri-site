import { courses } from "@/lib/master-class/content";
import type { CourseId, LearnerProgress } from "@/lib/master-class/types";

export function CoursesSection({
  progress,
  canTrack,
  onToggle,
}: {
  progress: LearnerProgress;
  canTrack: boolean;
  onToggle: (id: CourseId) => void;
}) {
  return (
    <section id="courses" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="courses-heading">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
        Do the work
      </p>
      <h2 id="courses-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        Courses
      </h2>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        Work through these in order. Open the link, finish the material, then mark it complete so your list and ring
        stay honest.
      </p>
      <ul className="mt-10 grid gap-5 sm:grid-cols-2">
        {courses.map((course, index) => {
          const done = progress.completedCourseIds.includes(course.id);
          const switchId = `course-complete-${course.id}`;
          return (
            <li
              key={course.id}
              className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/45"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-xs font-medium text-zinc-500">
                  {index + 1} of {courses.length} · {course.duration}
                </p>
                {done ? (
                  <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                    Done
                  </span>
                ) : null}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{course.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{course.blurb}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={course.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 dark:text-teal-400 dark:hover:text-teal-300"
                >
                  Open this link
                  <span aria-hidden>↗</span>
                </a>
                <div className="flex items-center gap-2">
                  <label htmlFor={switchId} className="text-sm text-zinc-600 dark:text-zinc-400">
                    Mark complete
                  </label>
                  <button
                    id={switchId}
                    type="button"
                    role="switch"
                    aria-checked={done}
                    disabled={!canTrack}
                    title={canTrack ? undefined : "Pick your name above to track progress"}
                    onClick={() => onToggle(course.id)}
                    className={`relative h-6 w-11 rounded-full transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 disabled:cursor-not-allowed disabled:opacity-50 ${
                      done ? "bg-teal-700" : "bg-zinc-300 dark:bg-zinc-700"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-sm transition ${
                        done ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
