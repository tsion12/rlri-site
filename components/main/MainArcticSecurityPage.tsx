import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { ARCTIC_PILLAR_IDS, ARCTIC_SECURITY_IMAGES } from "@/lib/main-arctic-security";
import { mainEventsGalleryHash, mainRoutes } from "@/lib/main-routes";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

const PILLAR_META = [
  {
    id: ARCTIC_PILLAR_IDS[0],
    number: "01",
    titleKey: "pages.arcticSecurity.pillarSportsTitle",
    summaryKey: "pages.arcticSecurity.pillarSportsSummary",
    accent: "from-sky-500 to-cyan-400",
    ring: "ring-sky-500/25",
  },
  {
    id: ARCTIC_PILLAR_IDS[1],
    number: "02",
    titleKey: "pages.arcticSecurity.pillarMulticulturalTitle",
    summaryKey: "pages.arcticSecurity.pillarMulticulturalSummary",
    accent: "from-indigo-500 to-violet-400",
    ring: "ring-indigo-500/25",
  },
  {
    id: ARCTIC_PILLAR_IDS[2],
    number: "03",
    titleKey: "pages.arcticSecurity.pillarResearchTitle",
    summaryKey: "pages.arcticSecurity.pillarResearchSummary",
    accent: "from-teal-600 to-emerald-400",
    ring: "ring-teal-500/25",
  },
] as const;

function PillarNumber({ n, accent }: { n: string; accent: string }) {
  return (
    <span
      className={`inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br ${accent} font-serif text-lg font-semibold text-white shadow-lg shadow-sky-900/20`}
    >
      {n}
    </span>
  );
}

export async function MainArcticSecurityPage({ locale }: Props) {
  const t = await getTranslator(locale);
  const eventsPhotosHref = `${mainRoutes.home}#${mainEventsGalleryHash}`;

  return (
    <div className="bg-[#f4f8fb] dark:bg-zinc-950">
      {/* Hero */}
      <section
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
        aria-labelledby="arctic-hero-heading"
      >
        <Image
          src={ARCTIC_SECURITY_IMAGES.hero}
          alt={t("pages.arcticSecurity.heroImageAlt")}
          fill
          preload
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-slate-950/85 via-slate-900/70 to-slate-950/90"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_20%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(ellipse_60%_50%_at_80%_80%,rgba(99,102,241,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-sky-300/95">
            {t("pages.arcticSecurity.heroEyebrow")}
          </p>
          <h1
            id="arctic-hero-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("pages.arcticSecurity.heroTitle")}
          </h1>
          <p className="mx-auto mt-8 max-w-3xl font-serif text-2xl font-medium leading-snug text-sky-100/95 sm:text-3xl lg:text-[2rem] lg:leading-snug">
            {t("pages.arcticSecurity.introQuestion")}
          </p>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#f4f8fb] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </section>

      {/* Intro */}
      <section className="border-b border-sky-100/80 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="text-lg leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-xl">
            {t("pages.arcticSecurity.introLead")}
          </p>
        </div>
      </section>

      {/* Pillar grid */}
      <section
        className="relative overflow-hidden border-b border-sky-100/80 bg-linear-to-b from-slate-50 to-white dark:border-zinc-800 dark:from-zinc-900/50 dark:to-zinc-950"
        aria-labelledby="arctic-pillars-heading"
      >
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl dark:bg-sky-500/10"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.arcticSecurity.pillarsEyebrow")}
          </p>
          <h2
            id="arctic-pillars-heading"
            className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.arcticSecurity.pillarsTitle")}
          </h2>

          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {PILLAR_META.map((pillar) => (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className={`group relative flex flex-col rounded-3xl border border-white/80 bg-white/90 p-8 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.2)] ring-1 ${pillar.ring} backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_70px_-24px_rgba(14,116,144,0.25)] dark:border-zinc-800 dark:bg-zinc-900/90`}
              >
                <PillarNumber n={pillar.number} accent={pillar.accent} />
                <h3 className="mt-6 font-serif text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {t(pillar.titleKey)}
                </h3>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(pillar.summaryKey)}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-sky-700 transition group-hover:gap-2 dark:text-sky-400">
                  {t("pages.arcticSecurity.pillarsReadMore")}
                  <span aria-hidden>→</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar 1 — Sports */}
      <section
        id={ARCTIC_PILLAR_IDS[0]}
        className="scroll-mt-24 border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="arctic-pillar-sports-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="flex flex-wrap items-center gap-4">
            <PillarNumber n="01" accent="from-sky-500 to-cyan-400" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
              {t("pages.arcticSecurity.pillarSportsTitle")}
            </p>
          </div>
          <h2
            id="arctic-pillar-sports-heading"
            className="mt-6 max-w-3xl font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.arcticSecurity.pillarSportsTitle")}
          </h2>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
            {t("pages.arcticSecurity.pillarSportsIntro")}
          </p>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/10">
              <Image
                src={ARCTIC_SECURITY_IMAGES.pillar1Soccer}
                alt={t("pages.arcticSecurity.pillar1SoccerAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="relative aspect-4/3 overflow-hidden rounded-3xl shadow-xl ring-1 ring-zinc-900/5 dark:ring-white/10">
              <Image
                src={ARCTIC_SECURITY_IMAGES.pillar1Race}
                alt={t("pages.arcticSecurity.pillar1RaceAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <article className="rounded-3xl border border-sky-100 bg-sky-50/50 p-8 dark:border-sky-900/40 dark:bg-sky-950/20">
              <h3 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {t("pages.arcticSecurity.pillarSportsSoccerTitle")}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("pages.arcticSecurity.pillarSportsSoccerBody")}
              </p>
            </article>
            <article className="rounded-3xl border border-sky-100 bg-sky-50/50 p-8 dark:border-sky-900/40 dark:bg-sky-950/20">
              <h3 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
                {t("pages.arcticSecurity.pillarSportsRaceTitle")}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("pages.arcticSecurity.pillarSportsRaceBody")}
              </p>
              <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("pages.arcticSecurity.pillarSportsRaceSupport")}
              </p>
              <MainLink
                href={eventsPhotosHref}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-800 dark:bg-sky-600 dark:hover:bg-sky-500"
              >
                {t("pages.arcticSecurity.pillarSportsPhotosCta")}
                <span aria-hidden>→</span>
              </MainLink>
            </article>
          </div>
        </div>
      </section>

      {/* Pillar 2 — Multiculturalism */}
      <section
        id={ARCTIC_PILLAR_IDS[1]}
        className="scroll-mt-24 border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="arctic-pillar-multicultural-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <PillarNumber n="02" accent="from-indigo-500 to-violet-400" />
            </div>
            <h2
              id="arctic-pillar-multicultural-heading"
              className="mt-6 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
            >
              {t("pages.arcticSecurity.pillarMulticulturalTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {t("pages.arcticSecurity.pillarMulticulturalIntro")}
            </p>
          </div>
          <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-[0_32px_80px_-32px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:ring-white/10 sm:aspect-[5/4]">
            <Image
              src={ARCTIC_SECURITY_IMAGES.pillar2Festival}
              alt={t("pages.arcticSecurity.pillar2ImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-tr from-indigo-950/30 via-transparent to-transparent"
              aria-hidden
            />
          </div>
        </div>
      </section>

      {/* Pillar 3 — Research */}
      <section
        id={ARCTIC_PILLAR_IDS[2]}
        className="scroll-mt-24 border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="arctic-pillar-research-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="relative order-2 aspect-4/5 overflow-hidden rounded-3xl shadow-[0_32px_80px_-32px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:ring-white/10 lg:order-1 sm:aspect-[5/4]">
            <Image
              src={ARCTIC_SECURITY_IMAGES.pillar3Dialogue}
              alt={t("pages.arcticSecurity.pillar3ImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-bl from-teal-950/30 via-transparent to-transparent"
              aria-hidden
            />
          </div>
          <div className="order-1 lg:order-2">
            <div className="flex flex-wrap items-center gap-4">
              <PillarNumber n="03" accent="from-teal-600 to-emerald-400" />
            </div>
            <h2
              id="arctic-pillar-research-heading"
              className="mt-6 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
            >
              {t("pages.arcticSecurity.pillarResearchTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {t("pages.arcticSecurity.pillarResearchIntro")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {t("pages.arcticSecurity.pillarResearchBody")}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-sky-950"
        aria-labelledby="arctic-cta-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(14,165,233,0.2),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/90">
            {t("pages.arcticSecurity.ctaEyebrow")}
          </p>
          <h2
            id="arctic-cta-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {t("pages.arcticSecurity.ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sky-100/85">
            {t("pages.arcticSecurity.ctaBody")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MainLink
              href={mainRoutes.events}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-sky-50"
            >
              {t("pages.arcticSecurity.ctaEvents")}
            </MainLink>
            <MainLink
              href={mainRoutes.volunteer}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("pages.arcticSecurity.ctaVolunteer")}
            </MainLink>
          </div>
        </div>
      </section>
    </div>
  );
}
