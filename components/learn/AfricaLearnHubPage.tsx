import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import {
  learnCourses,
  learnLayers,
  learnMeta,
  learnWaves,
  masterClass,
  pricingRows,
  pricingTierLabels,
  scholarshipNote,
} from "@/lib/learn/content";

export function AfricaLearnHubPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-zinc-200/60 bg-[#f7faf9] dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.1),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:py-24">
          <p className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-800 shadow-sm backdrop-blur-sm dark:border-teal-800/60 dark:bg-zinc-900/70 dark:text-teal-300">
            {learnMeta.kicker}
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            {learnMeta.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {learnMeta.mission}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={africaRoutes.learnMasterClass}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-teal-600 to-teal-700 px-6 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:from-teal-500 hover:to-teal-600"
            >
              Join the flagship Master Class
            </Link>
            <a
              href="#catalogue"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              See the catalogue
            </a>
          </div>
          <p className="mx-auto mt-6 max-w-xl text-sm text-zinc-500 dark:text-zinc-500">
            {learnMeta.bandwidthNote}
          </p>
        </div>
      </section>

      {/* Three layers */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
            The hub
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Three layers, from free to paid
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Sold first to institutions and sponsors; individuals pay tiered prices. What free
            platforms can’t offer: live experts, feedback on your own work, and publication through
            TËBÅTËBÅ InFocus.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {learnLayers.map((layer) => (
            <div
              key={layer.id}
              className="flex h-full flex-col rounded-2xl border border-zinc-200/80 bg-white/90 p-6 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/45"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                {layer.label}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {layer.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {layer.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section
        id="catalogue"
        className="scroll-mt-20 border-y border-zinc-200/70 bg-zinc-50/90 py-16 dark:border-zinc-800/80 dark:bg-zinc-900/35 lg:py-20"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Catalogue
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
              Nine courses, launched in three waves
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Each wave opens only when the one before meets its targets. The flagship Master Class is
              open for pre-sale now.
            </p>
          </div>

          <div className="mt-10 space-y-10">
            {learnWaves.map((wave) => {
              const courses = learnCourses.filter((c) => c.wave === wave.id);
              return (
                <div key={wave.id}>
                  <div className="flex items-baseline gap-3">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      {wave.label}
                    </h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-500">{wave.window}</span>
                  </div>
                  <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.map((course) => {
                      const card = (
                        <>
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="text-base font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                              {course.title}
                            </h4>
                            {course.status === "open" ? (
                              <span className="shrink-0 rounded-full bg-teal-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-teal-900 dark:bg-teal-950/80 dark:text-teal-200">
                                Open
                              </span>
                            ) : (
                              <span className="shrink-0 rounded-full bg-zinc-200/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                                Soon
                              </span>
                            )}
                          </div>
                          <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                            {course.buyer}
                          </p>
                          {course.href && (
                            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-teal-700 dark:text-teal-400">
                              {course.flagship ? "Enrol now" : "Learn more"}
                              <span aria-hidden>→</span>
                            </span>
                          )}
                        </>
                      );

                      const base =
                        "flex h-full flex-col rounded-2xl border p-5 shadow-sm transition";
                      return (
                        <li key={course.id} className="h-full">
                          {course.href ? (
                            <Link
                              href={course.href}
                              className={`${base} border-teal-200/80 bg-white hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-md dark:border-teal-900/50 dark:bg-zinc-900/60 dark:hover:border-teal-700`}
                            >
                              {card}
                            </Link>
                          ) : (
                            <div
                              className={`${base} border-zinc-200/80 bg-white/70 dark:border-zinc-800/80 dark:bg-zinc-900/40`}
                            >
                              {card}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            Tiered prices, from $40 to $400 a seat
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Prices are set in USD and shown in local currency at checkout. {scholarshipNote}
          </p>
        </div>

        {/* Table on sm+, stacked cards on mobile */}
        <div className="mt-10 hidden overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 sm:block">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-50 text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 font-semibold">Course</th>
                <th className="px-4 py-3 font-semibold">{pricingTierLabels.student}</th>
                <th className="px-4 py-3 font-semibold">{pricingTierLabels.african}</th>
                <th className="px-4 py-3 font-semibold">{pricingTierLabels.international}</th>
                <th className="px-4 py-3 font-semibold">{pricingTierLabels.institution}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80">
              {pricingRows.map((row) => (
                <tr key={row.course} className="bg-white dark:bg-zinc-900/30">
                  <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">
                    {row.course}
                  </td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.student}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.african}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.international}</td>
                  <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.institution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-8 space-y-3 sm:hidden">
          {pricingRows.map((row) => (
            <div
              key={row.course}
              className="rounded-2xl border border-zinc-200/80 bg-white p-4 dark:border-zinc-800/80 dark:bg-zinc-900/40"
            >
              <p className="font-semibold text-zinc-900 dark:text-zinc-50">{row.course}</p>
              <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
                {[
                  [pricingTierLabels.student, row.student],
                  [pricingTierLabels.african, row.african],
                  [pricingTierLabels.international, row.international],
                  [pricingTierLabels.institution, row.institution],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-xs text-zinc-500 dark:text-zinc-500">{label}</dt>
                    <dd className="font-medium text-zinc-800 dark:text-zinc-200">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* Flagship CTA band */}
      <section className="relative overflow-hidden border-y border-teal-900/20 bg-teal-700 py-16 text-white">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-100/80">
            {masterClass.kicker}
          </p>
          <h2 className="mt-3 max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
            {masterClass.title}
          </h2>
          <p className="mt-3 max-w-xl text-teal-100/90">{masterClass.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={africaRoutes.learnMasterClass}
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-white px-6 text-sm font-semibold text-teal-900 shadow-sm transition hover:bg-teal-50"
            >
              View the Master Class
            </Link>
            <Link
              href={africaRoutes.events}
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/10"
            >
              See free webinars
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
