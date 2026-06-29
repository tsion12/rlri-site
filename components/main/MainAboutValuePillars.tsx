"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import { mainGallerySrc } from "@/lib/main-gallery";

function IconVision({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M16 28c0-6 3.5-10 8-10s8 4 8 10M14 20c2-3 4.5-4 10-4s8 1 10 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="24" cy="18" r="3" fill="currentColor" />
    </svg>
  );
}

function IconMission({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="11" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
      <path d="M24 8v5M24 35v5M8 24h5M35 24h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconImpact({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 30l6-12h8l6 12M18 30h12M20 26h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PILLAR_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  vision: IconVision,
  mission: IconMission,
  impact: IconImpact,
};

type Pillar = {
  key: string;
  title: string;
  body: string;
  variant: "light" | "teal";
};

type Props = {
  valueEyebrow: string;
  valueTitle: string;
  valueLead: string;
  pillars: Pillar[];
  coreLabel: string;
};

function PillarCard({
  pillar,
  index,
  coreLabel,
  delay,
}: {
  pillar: Pillar;
  index: number;
  coreLabel: string;
  delay: string;
}) {
  const isCenter = pillar.variant === "teal";
  const Icon = PILLAR_ICONS[pillar.key] ?? IconVision;

  return (
    <li className={`home-fade-up ${isCenter ? "md:-mt-10 lg:-mt-12" : "md:mt-4"}`} style={{ animationDelay: delay }}>
      <article
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border text-center transition duration-500 hover:-translate-y-1.5 ${
          isCenter
            ? "min-h-[300px] border-teal-400/40 bg-linear-to-b from-teal-600 via-teal-600 to-teal-800 p-8 text-white shadow-[0_28px_60px_-20px_rgba(13,148,136,0.55)] ring-1 ring-white/15 md:min-h-[340px] md:p-9 lg:min-h-[360px]"
            : "border-zinc-200/90 bg-white/95 p-8 shadow-[0_16px_40px_-20px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5 hover:border-teal-200/80 hover:shadow-[0_24px_50px_-20px_rgba(13,148,136,0.2)] dark:border-zinc-700/90 dark:bg-zinc-900/90 dark:ring-white/5 dark:hover:border-teal-800/60"
        }`}
      >
        {isCenter && (
          <>
            <div
              className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10 blur-2xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(255,255,255,0.14),transparent_55%)]"
              aria-hidden
            />
          </>
        )}

        {!isCenter && (
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_0%,rgba(20,184,166,0.07),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            aria-hidden
          />
        )}

        <div className="relative flex flex-1 flex-col">
          <div className="flex items-center justify-between gap-2">
            <span
              className={`text-[11px] font-bold tabular-nums tracking-widest ${
                isCenter ? "text-teal-100/80" : "text-teal-600/70 dark:text-teal-500/80"
              }`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            {isCenter && (
              <span className="rounded-full border border-white/25 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/95">
                {coreLabel}
              </span>
            )}
          </div>

          <div
            className={`mx-auto mt-6 flex size-[4.25rem] items-center justify-center rounded-2xl transition duration-500 ${
              isCenter
                ? "bg-white/15 text-white ring-1 ring-white/20 group-hover:bg-white/20"
                : "bg-teal-600/10 text-teal-700 ring-1 ring-teal-600/10 group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-500/30 dark:bg-teal-500/15 dark:text-teal-300"
            }`}
          >
            <Icon className="h-10 w-10" />
          </div>

          <h3
            className={`mt-6 text-xl font-bold tracking-tight ${
              isCenter ? "text-white" : "text-zinc-900 dark:text-zinc-50"
            }`}
          >
            {pillar.title}
          </h3>
          <p
            className={`mt-4 flex-1 text-sm leading-relaxed sm:text-[0.95rem] ${
              isCenter ? "text-teal-50/95" : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {pillar.body}
          </p>

          <div
            className={`mx-auto mt-6 h-0.5 rounded-full transition-all duration-500 ${
              isCenter
                ? "w-12 bg-white/40 group-hover:w-16"
                : "w-8 bg-teal-500/30 group-hover:w-14 group-hover:bg-teal-500"
            }`}
            aria-hidden
          />
        </div>
      </article>
    </li>
  );
}

export function MainAboutValuePillars({
  valueEyebrow,
  valueTitle,
  valueLead,
  pillars,
  coreLabel,
}: Props) {
  const heroImage = mainGallerySrc("REAL LIFE INSTITUTE 1-9 (1).jpg");

  return (
    <section
      id="mission-vision"
      className="relative scroll-mt-24 isolate overflow-hidden border-b border-zinc-200/80 bg-[#f7faf9] dark:border-zinc-800 dark:bg-zinc-950"
      aria-labelledby="main-value-heading"
    >
      {/* Hero band */}
      <div className="relative min-h-[min(440px,58vh)] overflow-hidden">
        <Image
          src={heroImage}
          alt=""
          fill
          className="object-cover scale-105"
          sizes="100vw"
          priority={false}
        />
        <div className="absolute inset-0 bg-zinc-950/75" aria-hidden />
        <div
          className="absolute inset-0 bg-linear-to-b from-violet-950/30 via-zinc-950/55 to-zinc-950/92"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_50%_30%,rgba(20,184,166,0.28),transparent_62%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:linear-gradient(to_bottom,black_15%,transparent_85%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[min(440px,58vh)] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
          <span
            className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none font-serif text-[8rem] font-bold leading-none text-white/6 sm:text-[10rem]"
            aria-hidden
          >
            02
          </span>

          <p
            className="home-fade-up relative inline-flex items-center rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-teal-200 backdrop-blur-md"
            style={{ animationDelay: "40ms" }}
          >
            {valueEyebrow}
          </p>
          <h2
            id="main-value-heading"
            className="home-fade-up relative mt-6 max-w-3xl text-balance font-serif font-semibold tracking-tight text-white"
            style={{ fontSize: "clamp(2.1rem, 5.5vw, 3.5rem)", lineHeight: 1.08, animationDelay: "80ms" }}
          >
            {valueTitle}
          </h2>
          <p
            className="home-fade-up relative mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg"
            style={{ animationDelay: "120ms" }}
          >
            {valueLead}
          </p>
          <div
            className="home-fade-up relative mt-10 h-1 w-20 rounded-full bg-linear-to-r from-violet-400 via-teal-400 to-teal-300"
            style={{ animationDelay: "160ms" }}
            aria-hidden
          />
        </div>

        {/* Fade into page background */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-[#f7faf9] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </div>

      {/* Overlapping pillars */}
      <div className="relative z-20 -mt-[5.5rem] mx-auto max-w-6xl px-4 pb-20 sm:-mt-28 sm:px-6 sm:pb-24 lg:px-8 lg:pb-28">
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-24 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-600/10"
          aria-hidden
        />

        <ul className="relative grid gap-5 md:grid-cols-3 md:gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.key}
              pillar={pillar}
              index={index}
              coreLabel={coreLabel}
              delay={`${200 + index * 80}ms`}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
