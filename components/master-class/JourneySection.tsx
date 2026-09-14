import { currentJourneyStage, journeyStages } from "@/lib/master-class/content";

export function JourneySection() {
  const currentIndex = journeyStages.findIndex((item) => item.id === currentJourneyStage);
  const currentTitle =
    journeyStages.find((stage) => stage.id === currentJourneyStage)?.title ?? "Foundations";

  return (
    <section
      className="border-y border-zinc-200/70 bg-zinc-50/90 py-16 dark:border-zinc-800/80 dark:bg-zinc-900/35 sm:py-20"
      aria-labelledby="journey-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
          Where we are
        </p>
        <h2 id="journey-heading" className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          The journey
        </h2>
        <p className="mt-3 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Right now the cohort is in {currentTitle}: accounts, Claude 101, and the 4Ds. Use the list below, then open
          the matching courses.
        </p>
        <ol className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0">
          {journeyStages.map((stage, index) => {
            const current = stage.id === currentJourneyStage;
            const past = currentIndex > index;
            return (
              <li
                key={stage.id}
                className="min-w-[16rem] snap-start md:min-w-0"
                aria-current={current ? "step" : undefined}
              >
                <div
                  className={`relative h-full rounded-2xl border p-5 ${
                    current
                      ? "border-teal-300 bg-white shadow-md ring-2 ring-teal-500/30 dark:border-teal-700 dark:bg-zinc-900"
                      : "border-zinc-200/80 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-900/40"
                  }`}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span
                      className={`flex size-8 items-center justify-center rounded-full text-xs font-semibold ${
                        current
                          ? "bg-teal-700 text-white"
                          : past
                            ? "bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-200"
                            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {index + 1}
                    </span>
                    {current ? (
                      <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-teal-900 dark:bg-teal-950 dark:text-teal-200">
                        You are here
                      </span>
                    ) : null}
                  </div>
                  <h3 className="font-semibold text-zinc-900 dark:text-zinc-50">{stage.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{stage.detail}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
