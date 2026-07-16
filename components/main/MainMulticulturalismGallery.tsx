"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { EVENTS_HERO_INTERVAL_MS, MULTICULTURALISM_GALLERY_IMAGES } from "@/lib/main-events";

type Props = {
  heading: string;
  photoLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
  viewFullSizeLabel: string;
};

export function MainMulticulturalismGallery({
  heading,
  photoLabel,
  closeLabel,
  previousLabel,
  nextLabel,
  viewFullSizeLabel,
}: Props) {
  const images = MULTICULTURALISM_GALLERY_IMAGES;
  const slideCount = images.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % slideCount) + slideCount) % slideCount);
    },
    [slideCount],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const close = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (slideCount <= 1 || reduceMotion || paused || lightboxIndex != null) return;
    const interval = window.setInterval(() => {
      setActiveIndex((idx) => (idx + 1) % slideCount);
    }, EVENTS_HERO_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [paused, reduceMotion, slideCount, lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex == null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") {
        setLightboxIndex((idx) => (idx == null ? null : (idx + 1) % slideCount));
      }
      if (event.key === "ArrowLeft") {
        setLightboxIndex((idx) => (idx == null ? null : (idx - 1 + slideCount) % slideCount));
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, close, slideCount]);

  return (
    <>
      <div
        className="pt-10"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h3 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            {heading}
          </h3>
          <p className="text-sm font-medium tabular-nums text-zinc-500 dark:text-zinc-400">
            {activeIndex + 1} / {slideCount}
          </p>
        </div>

        <div
          className="relative mt-6 overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)] ring-1 ring-zinc-200/80 dark:bg-zinc-900 dark:ring-zinc-800"
          aria-roledescription="carousel"
          aria-label={heading}
        >
          <div className="relative aspect-4/3 w-full sm:aspect-16/10">
            <div
              className="flex h-full transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {images.map((image, index) => (
                <div key={image.id} className="relative h-full w-full shrink-0">
                  <button
                    type="button"
                    onClick={() => setLightboxIndex(index)}
                    className="group relative block size-full"
                    aria-label={`${photoLabel} ${index + 1}`}
                  >
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      className="object-cover transition duration-500 group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 70vw"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-950/35 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                    <span className="pointer-events-none absolute bottom-4 right-4 rounded-full border border-white/25 bg-black/35 px-3 py-1 text-[11px] font-semibold text-white/90 opacity-0 backdrop-blur-sm transition group-hover:opacity-100">
                      {viewFullSizeLabel}
                    </span>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {slideCount > 1 ? (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-zinc-950/45 text-xl text-white backdrop-blur-sm transition hover:bg-zinc-950/65"
                aria-label={previousLabel}
              >
                ‹
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-zinc-950/45 text-xl text-white backdrop-blur-sm transition hover:bg-zinc-950/65"
                aria-label={nextLabel}
              >
                ›
              </button>
            </>
          ) : null}
        </div>

        {slideCount > 1 ? (
          <div className="mt-4 overflow-x-auto pb-1">
            <div className="flex w-max gap-2 px-0.5">
              {images.map((image, index) => {
                const active = index === activeIndex;
                return (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => goTo(index)}
                    className={`relative size-16 shrink-0 overflow-hidden rounded-xl ring-2 transition sm:size-[4.5rem] ${
                      active
                        ? "scale-105 ring-teal-600 dark:ring-teal-400"
                        : "opacity-65 ring-transparent hover:opacity-100 hover:ring-teal-300/60"
                    }`}
                    aria-label={`${photoLabel} ${index + 1}`}
                    aria-current={active ? "true" : undefined}
                  >
                    <Image src={image.src} alt="" fill className="object-cover" sizes="4.5rem" />
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>

      {lightboxIndex != null ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/92 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={photoLabel}
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
          >
            {closeLabel}
          </button>
          <button
            type="button"
            className="absolute left-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label={previousLabel}
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((idx) => (idx! - 1 + slideCount) % slideCount);
            }}
          >
            ‹
          </button>
          <div className="relative max-h-[85vh] max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <Image
              src={images[lightboxIndex].src}
              alt=""
              width={1600}
              height={1200}
              className="max-h-[85vh] w-auto rounded-lg object-contain"
              sizes="90vw"
              priority
            />
          </div>
          <button
            type="button"
            className="absolute right-3 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20"
            aria-label={nextLabel}
            onClick={(event) => {
              event.stopPropagation();
              setLightboxIndex((idx) => (idx! + 1) % slideCount);
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </>
  );
}
