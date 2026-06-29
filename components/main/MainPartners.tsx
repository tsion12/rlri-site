"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useState } from "react";
import { au } from "@/components/main/main-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import {
  MAIN_PARTNER_PLACEHOLDERS,
  MAIN_PARTNERS_AUTOPLAY_MS,
  type MainPartner,
} from "@/lib/main-partners";

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

function PartnerCard({
  partner,
  distance,
  isCenter,
}: {
  partner: MainPartner;
  distance: number;
  isCenter: boolean;
}) {
  const scale =
    distance === 0 ? "scale-100" : distance === 1 ? "scale-[0.94]" : "scale-[0.88]";
  const opacity = distance === 0 ? "opacity-100" : distance === 1 ? "opacity-90" : "opacity-70";

  return (
    <div
      className={`flex shrink-0 transition-all duration-500 ease-out ${scale} ${opacity} ${
        isCenter ? "z-10" : "z-0"
      }`}
      style={{ width: isCenter ? "11.5rem" : "10rem" }}
    >
      <div
        className={`flex h-24 w-full items-center justify-center rounded-xl border bg-white px-4 transition-shadow duration-500 sm:h-28 ${
          isCenter
            ? "border-zinc-200/90 shadow-md shadow-zinc-900/8 ring-1 ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/10"
            : "border-zinc-200/80 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80"
        }`}
      >
        {partner.logoSrc ? (
          <Image
            src={partner.logoSrc}
            alt={partner.name}
            width={140}
            height={56}
            className="max-h-14 w-auto object-contain"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-center">
            <span
              className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
              aria-hidden
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path
                  d="M4 20h16M6 16V8l6-4 6 4v8M10 16v-4h4v4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500">
              Partner logo
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export function MainPartners() {
  const t = useTranslations();
  const carouselId = useId();
  const count = MAIN_PARTNER_PLACEHOLDERS.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Carousel windowing duplicates items to fill the row, so only run it when
  // there are enough partners to fill the visible window. Otherwise show a
  // simple centered static row.
  const isCarousel = count > 5;

  const goTo = useCallback((index: number) => setActiveIndex(mod(index, count)), [count]);

  useEffect(() => {
    if (paused || !isCarousel) return;
    const timer = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % count);
    }, MAIN_PARTNERS_AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused, isCarousel, count]);

  const windowRadius = 2;
  const slots: { partner: MainPartner; distance: number; index: number }[] = [];
  for (let offset = -windowRadius; offset <= windowRadius; offset += 1) {
    const index = mod(activeIndex + offset, count);
    slots.push({
      partner: MAIN_PARTNER_PLACEHOLDERS[index],
      distance: Math.abs(offset),
      index,
    });
  }

  return (
    <section
      id="main-partners"
      className={`border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950 ${au.home.sectionPad}`}
      aria-labelledby="main-partners-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className={`${au.home.section}`}>
        <header className="mx-auto max-w-3xl text-center">
          <h2
            id="main-partners-heading"
            className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          >
            {t("home.partners.title")}
          </h2>
          <p className="mt-3 text-lg text-zinc-500 dark:text-zinc-400">{t("home.partners.lead")}</p>
        </header>

        {isCarousel ? (
          <div
            className="relative mx-auto mt-12 max-w-6xl sm:mt-14"
            role="region"
            aria-roledescription="carousel"
            aria-label={t("home.partners.carouselLabel")}
            id={carouselId}
          >
            <div className="flex items-center justify-center gap-3 overflow-hidden px-4 sm:gap-5 sm:px-8">
              {slots.map(({ partner, distance, index }) => (
                <PartnerCard
                  key={`${partner.id}-${index}`}
                  partner={partner}
                  distance={distance}
                  isCenter={distance === 0}
                />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              {MAIN_PARTNER_PLACEHOLDERS.map((partner, index) => {
                const isActive = index === activeIndex;
                return (
                  <button
                    key={partner.id}
                    type="button"
                    className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 ${
                      isActive
                        ? "h-2 w-8 bg-teal-600 dark:bg-teal-500"
                        : "size-2 bg-zinc-300 hover:bg-zinc-400 dark:bg-zinc-600 dark:hover:bg-zinc-500"
                    }`}
                    aria-label={`${t("home.partners.goToSlide")} ${index + 1}`}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => goTo(index)}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <div className="mx-auto mt-12 flex max-w-4xl flex-wrap items-center justify-center gap-5 sm:mt-14 sm:gap-8">
            {MAIN_PARTNER_PLACEHOLDERS.map((partner) => (
              <PartnerCard key={partner.id} partner={partner} distance={0} isCenter />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
