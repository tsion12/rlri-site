import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainRoutes } from "@/lib/main-routes";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

const HERO_IMAGE = "REAL LIFE INSTITUTE DAY 1-11.jpg";
const APPROACH_IMAGE = "REAL LIFE INSTITUTE 1-4.jpg";
const BANNER_IMAGE = "REAL LIFE INSTITUTE 1-7 (2).jpg";

export async function MainMentalHealthPage({ locale }: Props) {
  const t = await getTranslator(locale);

  return (
    <div className="bg-[#f7faf9] dark:bg-zinc-950">
      {/* Section 1 — Hero */}
      <section
        className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden"
        aria-labelledby="mental-health-hero-heading"
      >
        <Image
          src={mainGallerySrc(HERO_IMAGE)}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-zinc-950/75 via-zinc-950/65 to-zinc-950/80"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_40%,rgba(20,184,166,0.12),transparent_55%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-300/90">
            {t("pages.mentalHealth.heroEyebrow")}
          </p>
          <h1
            id="mental-health-hero-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]"
          >
            {t("pages.mentalHealth.heroTitle")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl">
            {t("pages.mentalHealth.heroSubtext")}
          </p>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#f7faf9] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </section>

      {/* Section 2 — Our Approach */}
      <section
        className="relative border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="mental-health-approach-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8 lg:py-24">
          <div className="order-2 lg:order-1">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
              {t("pages.mentalHealth.approachLabel")}
            </p>
            <h2
              id="mental-health-approach-heading"
              className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
            >
              {t("pages.mentalHealth.approachTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {t("pages.mentalHealth.approachP1")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {t("pages.mentalHealth.approachP2")}
            </p>
            <div
              className="mt-8 h-1 w-16 rounded-full bg-linear-to-r from-teal-600 to-teal-400"
              aria-hidden
            />
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl shadow-[0_32px_80px_-32px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:ring-white/10 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src={mainGallerySrc(APPROACH_IMAGE)}
                alt={t("pages.mentalHealth.approachImageAlt")}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-tr from-teal-950/25 via-transparent to-transparent"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Banner CTA */}
      <section className="relative" aria-labelledby="mental-health-banner-heading">
        <div className="relative min-h-[min(520px,70vh)] overflow-hidden lg:min-h-[min(560px,65vh)]">
          <Image
            src={mainGallerySrc(BANNER_IMAGE)}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-linear-to-r from-zinc-950/50 via-zinc-950/35 to-zinc-950/75 lg:from-zinc-950/40 lg:via-zinc-950/25 lg:to-zinc-950/85"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_85%_50%,rgba(20,184,166,0.15),transparent_50%)]"
            aria-hidden
          />

          <div className="relative flex min-h-[min(520px,70vh)] items-center lg:min-h-[min(560px,65vh)]">
            <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
              <div className="ml-auto max-w-xl text-left lg:max-w-lg lg:text-right">
                <h2
                  id="mental-health-banner-heading"
                  className="font-serif text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.35rem]"
                >
                  {t("pages.mentalHealth.bannerTitle")}
                </h2>
                <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                  {t("pages.mentalHealth.bannerSubtext")}
                </p>
                <MainLink
                  href={mainRoutes.volunteer}
                  className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-teal-600 px-10 text-sm font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-teal-950/30 ring-1 ring-teal-400/40 transition hover:-translate-y-0.5 hover:bg-teal-500 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
                >
                  {t("pages.mentalHealth.bannerCta")}
                </MainLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
