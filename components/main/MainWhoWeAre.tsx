"use client";

import Image from "next/image";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MainLink } from "@/components/main/MainLink";
import { MAIN_WHO_WE_ARE_IMAGE } from "@/lib/main-assets";
import { mainRoutes } from "@/lib/main-routes";

const pillars = [
  {
    icon: "skills" as const,
    titleKey: "home.whoWeAre.skillTitle" as const,
    bodyKey: "home.whoWeAre.skillBody" as const,
    delay: "120ms",
  },
  {
    icon: "research" as const,
    titleKey: "home.whoWeAre.researchTitle" as const,
    bodyKey: "home.whoWeAre.researchBody" as const,
    delay: "200ms",
  },
] as const;

function PillarIcon({ kind }: { kind: "skills" | "research" }) {
  const shared = "h-6 w-6 text-white";

  if (kind === "skills") {
    return (
      <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
        <path
          d="M12 6.5V18M8.5 8.5h7M6 20h12a2 2 0 0 0 2-2V8.2L12 4 4 8.2V18a2 2 0 0 0 2 2Z"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg className={shared} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M12 3c-3 4-6 5.5-6 9a6 6 0 1 0 12 0c0-3.5-3-5-6-9Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M12 14v4M10 20h4" strokeLinecap="round" />
    </svg>
  );
}

export function MainWhoWeAre() {
  const t = useTranslations();

  return (
    <section
      id="main-who-we-are"
      className="relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-zinc-50 via-white to-white dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-950"
      aria-labelledby="main-who-we-are-heading"
    >
      <div
        className="h-1 w-full bg-linear-to-r from-violet-800 via-teal-600 to-teal-500"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-500/5 blur-3xl dark:bg-violet-400/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Copy */}
          <div className="order-2 lg:order-1">
            <p
              className="home-fade-up text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400"
              style={{ animationDelay: "40ms" }}
            >
              {t("home.whoWeAre.eyebrow")}
            </p>

            <h2
              id="main-who-we-are-heading"
              className="home-fade-up mt-4 text-balance text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.65rem] lg:leading-[1.12] dark:text-zinc-50"
              style={{ animationDelay: "80ms" }}
            >
              {t("home.whoWeAre.title")}
            </h2>

            <p
              className="home-fade-up mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400"
              style={{ animationDelay: "120ms" }}
            >
              {t("home.whoWeAre.intro")}
            </p>

            <div
              className="home-fade-up my-10 h-px max-w-xl bg-linear-to-r from-zinc-200 via-zinc-300 to-transparent dark:from-zinc-800 dark:via-zinc-700"
              aria-hidden
              style={{ animationDelay: "160ms" }}
            />

            <ul className="space-y-8">
              {pillars.map((pillar) => (
                <li
                  key={pillar.icon}
                  className="home-fade-up flex gap-5"
                  style={{ animationDelay: pillar.delay }}
                >
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-500 to-teal-700 shadow-lg shadow-teal-900/15 ring-1 ring-teal-600/20 transition duration-300 hover:scale-105 hover:shadow-teal-900/25 dark:from-teal-600 dark:to-teal-800 dark:shadow-teal-950/40">
                    <PillarIcon kind={pillar.icon} />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                      {t(pillar.titleKey)}
                    </h3>
                    <p className="mt-1.5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {t(pillar.bodyKey)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="home-fade-up mt-10" style={{ animationDelay: "280ms" }}>
              <MainLink
                href={mainRoutes.donate}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-teal-600 px-10 text-sm font-bold uppercase tracking-[0.12em] text-white shadow-[0_8px_30px_-8px_rgba(13,148,136,0.55)] ring-1 ring-teal-500/30 transition hover:-translate-y-0.5 hover:bg-teal-500 hover:shadow-[0_12px_36px_-8px_rgba(13,148,136,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 dark:bg-teal-600 dark:hover:bg-teal-500"
              >
                {t("home.whoWeAre.ctaDonate")}
              </MainLink>
            </div>
          </div>

          {/* Image */}
          <div
            className="home-fade-up relative order-1 lg:order-2"
            style={{ animationDelay: "100ms" }}
          >
            <div
              className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-linear-to-br from-teal-200/40 via-transparent to-violet-200/30 blur-2xl dark:from-teal-900/30 dark:to-violet-900/20"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_24px_64px_-24px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10">
              <div className="aspect-4/3 sm:aspect-5/4 lg:aspect-[4/5]">
                <Image
                  src={MAIN_WHO_WE_ARE_IMAGE.src}
                  alt={t("home.whoWeAre.imageAlt")}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
            <div
              className="absolute -bottom-4 -left-4 hidden max-w-[11rem] rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/95 sm:block"
              aria-hidden
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-600 dark:text-teal-400">
                {t("home.whoWeAre.locationLabel")}
              </p>
              <p className="mt-1 text-sm font-medium leading-snug text-zinc-800 dark:text-zinc-200">
                {t("home.whoWeAre.locationTagline")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
