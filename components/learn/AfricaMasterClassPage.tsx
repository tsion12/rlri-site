import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import {
  learnMeta,
  masterClass,
  pricingExtras,
  pricingRows,
  pricingTierLabels,
  scholarshipNote,
} from "@/lib/learn/content";
import { EnrollForm } from "./EnrollForm";

const mcPricing = pricingRows[0];

export function AfricaMasterClassPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-zinc-200/60 bg-[#f7faf9] dark:border-zinc-800/80 dark:bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.12),transparent_55%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(20,184,166,0.1),transparent_50%)]"
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20">
          <nav className="text-sm text-zinc-500 dark:text-zinc-500" aria-label="Breadcrumb">
            <Link href={africaRoutes.learn} className="hover:text-teal-700 dark:hover:text-teal-400">
              Learning Hub
            </Link>
            <span className="mx-2" aria-hidden>
              /
            </span>
            <span className="text-zinc-700 dark:text-zinc-300">Master Class</span>
          </nav>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-800 shadow-sm backdrop-blur-sm dark:border-teal-800/60 dark:bg-zinc-900/70 dark:text-teal-300">
            {masterClass.kicker}
          </p>
          <h1 className="mt-5 max-w-3xl text-balance text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
            {masterClass.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            {masterClass.tagline}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              4 × 2 hours · live on Zoom
            </span>
            <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              Graded capstone + certificate
            </span>
            <span className="inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
              From {mcPricing.student} · pre-sale open
            </span>
          </div>
          <div className="mt-8">
            <a
              href="#enrol"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-linear-to-r from-teal-600 to-teal-700 px-6 text-sm font-bold text-white shadow-lg shadow-teal-900/20 transition hover:from-teal-500 hover:to-teal-600"
            >
              Reserve a seat
            </a>
          </div>
        </div>
      </section>

      {/* Format + modules */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Format
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              How it runs
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              {masterClass.format}
            </p>
            <p className="mt-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 p-4 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800/80 dark:bg-zinc-900/40 dark:text-zinc-400">
              {masterClass.whyLive}
            </p>

            <h3 className="mt-8 text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Every session comes with
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {masterClass.deliverables.map((d) => (
                <li
                  key={d}
                  className="inline-flex items-center rounded-full border border-teal-200/70 bg-teal-50/70 px-3 py-1 text-sm text-teal-900 dark:border-teal-900/50 dark:bg-teal-950/40 dark:text-teal-200"
                >
                  {d}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-500">{learnMeta.bandwidthNote}</p>
          </div>

          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Six modules
            </p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              What you’ll cover
            </h2>
            <ol className="mt-5 space-y-3">
              {masterClass.modules.map((module, i) => (
                <li
                  key={module}
                  className="flex gap-4 rounded-2xl border border-zinc-200/80 bg-white/90 p-4 shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/45"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-sm font-bold text-teal-800 dark:bg-teal-950/80 dark:text-teal-300">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {module}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Pricing + certificate */}
      <section className="border-y border-zinc-200/70 bg-zinc-50/90 py-16 dark:border-zinc-800/80 dark:bg-zinc-900/35 lg:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
            Pricing
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            One seat, four tiers
          </h2>
          <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
            Set in USD, shown in local currency at checkout. {scholarshipNote}
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              [pricingTierLabels.student, mcPricing.student],
              [pricingTierLabels.african, mcPricing.african],
              [pricingTierLabels.international, mcPricing.international],
              [pricingTierLabels.institution, mcPricing.institution],
            ].map(([label, value]) => (
              <div
                key={label}
                className="rounded-2xl border border-zinc-200/80 bg-white p-5 text-center shadow-sm dark:border-zinc-800/80 dark:bg-zinc-900/45"
              >
                <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {value}
                </p>
                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">{label}</p>
              </div>
            ))}
          </div>
          <ul className="mt-6 space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
            {pricingExtras.map((extra) => (
              <li key={extra} className="flex gap-2">
                <span aria-hidden className="text-teal-600 dark:text-teal-400">
                  •
                </span>
                {extra}
              </li>
            ))}
          </ul>

          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-white/90 p-6 dark:border-zinc-800/80 dark:bg-zinc-900/45">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Your certificate
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {masterClass.certificate}
            </p>
          </div>
        </div>
      </section>

      {/* Enrol */}
      <section id="enrol" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Pre-sale
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              Reserve your seat
            </h2>
            <p className="mt-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
              We’re assembling the first cohort now. Tell us how you’d like to join and we’ll follow
              up with dates and how to pay for your tier. Institutions and sponsors are invoiced
              directly.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={africaRoutes.learn}
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                ← All courses
              </Link>
            </div>
          </div>
          <div>
            <EnrollForm course={masterClass.title} />
          </div>
        </div>
      </section>
    </>
  );
}
