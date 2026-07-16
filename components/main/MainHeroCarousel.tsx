"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MainLink } from "@/components/main/MainLink";
import { useAutoplayIndex } from "@/components/main/useAutoplayIndex";
import {
  MAIN_HERO_INTERVAL_MS,
  MAIN_HERO_SLIDES,
  type MainHeroSlideCta,
} from "@/lib/main-hero-slides";
import { mainBaseFromPathname, mainHref, mainLocaleFromPathname } from "@/lib/i18n/path";

const ctaPrimary =
  "group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-semibold text-teal-800 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.35)] ring-1 ring-white/80 transition hover:-translate-y-0.5 hover:bg-teal-50 hover:shadow-[0_8px_32px_-6px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-950 sm:w-auto sm:min-w-[15rem]";

const ctaSecondary =
  "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent sm:w-auto sm:min-w-[15rem]";

function HeroCta({ cta, variant }: { cta: MainHeroSlideCta; variant: "primary" | "secondary" }) {
  const pathname = usePathname();
  const base = mainBaseFromPathname(pathname);
  const locale = mainLocaleFromPathname(pathname);
  const t = useTranslations();
  const label = t(cta.labelKey);
  const href = cta.external ? cta.href : mainHref(cta.href, { base, locale });
  const className = variant === "primary" ? ctaPrimary : ctaSecondary;
  const arrow = (
    <span
      className="inline-block transition-transform group-hover:translate-x-0.5"
      aria-hidden
    >
      →
    </span>
  );

  if (cta.external) {
    return (
      <a href={href} className={`group ${className}`} target="_blank" rel="noopener noreferrer">
        {label}
        {arrow}
      </a>
    );
  }

  return (
    <MainLink href={cta.href} className={`group ${className}`}>
      {label}
      {arrow}
    </MainLink>
  );
}

export function MainHeroCarousel() {
  const t = useTranslations();
  const carouselId = useId();
  const [reduceMotion, setReduceMotion] = useState(false);
  const slideCount = MAIN_HERO_SLIDES.length;
  const { index: activeIndex, generation, goTo } = useAutoplayIndex(slideCount, MAIN_HERO_INTERVAL_MS);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const activeSlide = MAIN_HERO_SLIDES[activeIndex];

  return (
    <section
      className="relative min-h-[100dvh] w-full overflow-hidden"
      aria-roledescription={slideCount > 1 ? "carousel" : undefined}
      aria-label={slideCount > 1 ? t("home.heroCarouselLabel") : undefined}
    >
      <div className="absolute inset-0" aria-hidden>
        {MAIN_HERO_SLIDES.map((slide, index) => {
          const isActive = index === activeIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
                isActive ? "opacity-100" : "opacity-0"
              }`}
            >
              <div
                key={isActive ? `active-${generation}` : slide.id}
                className={`absolute inset-[-8%] ${isActive && !reduceMotion ? "hero-ken-burns" : ""}`}
              >
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  preload={index === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-linear-to-br from-teal-950/90 via-zinc-950/75 to-zinc-950/50" />
              <div className="absolute inset-0 bg-linear-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_50%,rgba(20,184,166,0.22),transparent_55%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_100%_0%,rgba(255,255,255,0.06),transparent_50%)]" />
            </div>
          );
        })}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.07] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-size-[64px_64px] [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]"
        aria-hidden
      />

      <div className="relative z-10 flex min-h-[100dvh] items-center pb-24 pt-28 sm:pb-28 sm:pt-32">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="max-w-3xl"
            aria-live="polite"
            aria-atomic="true"
            id={`${carouselId}-slide-panel`}
          >
            <p
              className="hero-content-in inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-200/95"
              style={{ animationDelay: "80ms" }}
            >
              <span className="h-px w-10 bg-teal-400/80" aria-hidden />
              {t(activeSlide.eyebrowKey)}
            </p>

            <h1
              id="main-hero-heading"
              className="hero-content-in mt-6 text-balance font-serif text-4xl font-semibold leading-[1.06] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-[3.75rem]"
              style={{ animationDelay: "160ms" }}
            >
              {t(activeSlide.titleKey)}
            </h1>

            <p
              className="hero-content-in mt-6 max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl sm:leading-relaxed"
              style={{ animationDelay: "240ms" }}
            >
              {t(activeSlide.subtitleKey)}
            </p>

            <div
              className="hero-content-in mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              style={{ animationDelay: "320ms" }}
            >
              <HeroCta cta={activeSlide.primaryCta} variant="primary" />
              <HeroCta cta={activeSlide.secondaryCta} variant="secondary" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center gap-5 px-4 pb-8 sm:pb-10">
        {slideCount > 1 && (
          <div className="flex w-full max-w-lg items-center gap-4">
            <p className="shrink-0 text-[11px] font-semibold tabular-nums text-white/70">
              {activeIndex + 1} / {slideCount}
            </p>
            <div className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/20">
              <span
                key={`progress-${generation}`}
                className="hero-progress-bar block h-full w-full rounded-full bg-white/90"
                style={{
                  animation: reduceMotion
                    ? undefined
                    : `hero-progress ${MAIN_HERO_INTERVAL_MS}ms linear forwards`,
                }}
              />
            </div>
            <div className="flex flex-1 items-center justify-end gap-1.5 overflow-x-auto">
              {MAIN_HERO_SLIDES.map((slide, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={slide.id}
                    type="button"
                    className="group relative flex h-8 shrink-0 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                    aria-label={`${t("home.heroGoToSlide")} ${index + 1}`}
                    aria-controls={`${carouselId}-slide-panel`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index)}
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        isActive ? "h-2 w-6 bg-white" : "size-1.5 bg-white/40 group-hover:bg-white/70"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <a
          href="#main-who-we-are"
          className="hero-scroll-hint flex flex-col items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 transition hover:text-white/80"
        >
          <span className="sr-only">Scroll to content</span>
          <span aria-hidden>Explore</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden
          >
            <path d="M12 5v14M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <ul className="sr-only">
        {MAIN_HERO_SLIDES.map((slide, index) => (
          <li key={slide.id} aria-hidden={index !== activeIndex}>
            {t(slide.titleKey)}
          </li>
        ))}
      </ul>
    </section>
  );
}
