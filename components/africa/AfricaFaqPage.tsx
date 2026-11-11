"use client";

import Link from "next/link";
import { useState } from "react";
import { africaRoutes } from "@/lib/africa-routes";
import {
  AFRICA_FAQS as FAQS,
  FAQ_CATEGORIES as CATEGORIES,
  type FaqCategory as Category,
} from "@/lib/africa-faq";

const CONTACT_EMAIL = "contact-africa@reallifeinstitute.org";

const categoryPillClass =
  "rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400";

/* ── Single FAQ accordion item ───────────────────────────────── */
function FaqItem({
  question,
  answer,
  categoryLabel,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  categoryLabel: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`rounded-2xl border transition-colors ${
        open
          ? "border-teal-200/80 bg-white shadow-sm dark:border-teal-800/50 dark:bg-zinc-900"
          : "border-zinc-200/80 bg-white hover:border-zinc-300 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-3 px-5 py-4 text-left sm:gap-4 sm:px-6 sm:py-5"
        aria-expanded={open}
      >
        <span
          className={`mt-0.5 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400 dark:text-zinc-500`}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="min-w-0 flex-1">
          <span className={`mb-2 inline-block ${categoryPillClass}`}>{categoryLabel}</span>
          <p
            className={`text-sm font-semibold leading-snug sm:text-[0.95rem] ${
              open ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {question}
          </p>
        </div>

        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors ${
            open
              ? "border-teal-600 bg-teal-700 text-white"
              : "border-zinc-200 bg-zinc-50 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
          }`}
          aria-hidden
        >
          <svg
            className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-zinc-100 px-5 pb-5 pt-0 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400 sm:px-6 sm:pb-6">
            <p className="pt-4">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────── */
export function AfricaFaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [openId, setOpenId] = useState<string | null>("q1");

  const filtered =
    activeCategory === "all" ? FAQS : FAQS.filter((f) => f.category === activeCategory);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24"
        aria-labelledby="faq-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Africa Programs
          </p>
          <h1
            id="faq-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Frequently asked questions
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Answers to common questions about our work, programs, how to get involved, and how your support creates
            impact across Africa.
          </p>
          <p className="mt-6 text-sm text-zinc-600 dark:text-zinc-400">
            Need something else?{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="font-medium text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50/80 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16 xl:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500">
                Browse by topic
              </p>
              <nav className="mt-4 flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1.5" aria-label="FAQ categories">
                {CATEGORIES.map(({ id, label, count }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(id);
                      setOpenId(null);
                    }}
                    className={`flex w-full min-w-0 items-center justify-between rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors sm:max-w-none lg:w-full ${
                      activeCategory === id
                        ? "border-teal-600 bg-teal-700 text-white shadow-sm dark:border-teal-600 dark:bg-teal-800"
                        : "border-zinc-200/90 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <span className="truncate">{label}</span>
                    <span
                      className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tabular-nums ${
                        activeCategory === id
                          ? "bg-white/20 text-white"
                          : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-8 rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">Can&apos;t find an answer?</p>
                <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  Our team is happy to help with questions not covered here.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 inline-flex w-full min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 px-4 text-sm font-semibold text-zinc-800 transition hover:border-teal-600/40 hover:bg-white dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-100 dark:hover:border-zinc-600"
                >
                  Email us
                </a>
              </div>
            </aside>

            <div>
              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-50">{filtered.length}</span> question
                  {filtered.length !== 1 ? "s" : ""}{" "}
                  <span className="text-zinc-500">in</span>{" "}
                  <span className="font-medium text-teal-800 dark:text-teal-300">
                    {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                  </span>
                </p>
                {activeCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className="text-sm font-medium text-zinc-500 underline-offset-4 transition hover:text-teal-800 hover:underline dark:hover:text-teal-300"
                  >
                    Show all
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {filtered.map((faq) => (
                  <FaqItem
                    key={faq.id}
                    question={faq.question}
                    answer={faq.answer}
                    categoryLabel={faq.categoryLabel}
                    index={FAQS.indexOf(faq)}
                    open={openId === faq.id}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                Contact
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Still have questions?
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Reach out directly and we&apos;ll respond as soon as we can.
              </p>
              <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">{CONTACT_EMAIL}</p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                Contact us
              </a>
              <Link
                href={africaRoutes.programs}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Explore programs
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
