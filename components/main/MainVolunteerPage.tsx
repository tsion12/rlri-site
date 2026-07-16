import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainEmails } from "@/lib/main-routes";

type Props = { locale: Locale };

const HERO_IMAGE = "Calling all Student Volunteers.jpeg";
const HERO_BADGE_IMAGE = "volunteer.jpeg";
const APPLY_IMAGE = "Ready to join us.jpg";

function CardIcon({ variant }: { variant: "impact" | "experience" | "belonging" }) {
  if (variant === "experience") {
    return (
      <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 18h16M6 18V9l6-4 6 4v9M9 18v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "belonging") {
    return (
      <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 21v-2a4 4 0 0 0-3-3.87M14.5 4.13a3.5 3.5 0 0 1 0 6.74" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 4h10a2 2 0 0 1 2 2v12l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2h2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export async function MainVolunteerPage({ locale }: Props) {
  const t = await getTranslator(locale);

  const cards = [
    {
      key: "impact" as const,
      title: t("pages.volunteer.impactTitle"),
      body: t("pages.volunteer.impactBody"),
    },
    {
      key: "experience" as const,
      title: t("pages.volunteer.experienceTitle"),
      body: t("pages.volunteer.experienceBody"),
    },
    {
      key: "belonging" as const,
      title: t("pages.volunteer.belongingTitle"),
      body: t("pages.volunteer.belongingBody"),
    },
  ];

  return (
    <div className="bg-[#f7faf9] dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950" aria-labelledby="volunteer-hero-heading">
        <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_12%_20%,rgba(20,184,166,0.10),transparent_24%),radial-gradient(circle_at_70%_76%,rgba(168,85,247,0.09),transparent_22%)]" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
              {t("pages.volunteer.heroEyebrow")}
            </p>
            <h1 id="volunteer-hero-heading" className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("pages.volunteer.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.volunteer.heroBody")}
            </p>
            <a
              href={`mailto:${mainEmails.jobsHr}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-teal-700 px-9 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {t("pages.volunteer.applyNow")}
            </a>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
            <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10">
              <Image
                src={mainGallerySrc(HERO_IMAGE)}
                alt={t("pages.volunteer.heroImageAlt")}
                fill
                preload
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 28rem"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 w-44 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:-left-6 sm:w-52 dark:border-zinc-900">
              <div className="relative aspect-4/3 bg-zinc-100 dark:bg-zinc-900">
                <Image
                  src={mainGallerySrc(HERO_BADGE_IMAGE)}
                  alt={t("pages.volunteer.heroBadgeImageAlt")}
                  fill
                  className="object-cover"
                  sizes="13rem"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-b border-zinc-200/80 bg-[#f7faf9] py-14 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16 lg:py-20" aria-labelledby="volunteer-benefits-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="volunteer-benefits-heading" className="sr-only">{t("pages.volunteer.benefitsHeading")}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <article key={card.key} className="rounded-2xl border border-zinc-200/80 bg-white p-7 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-600/20 dark:bg-teal-950/50 dark:ring-teal-500/30">
                  <CardIcon variant={card.key} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-14 dark:bg-zinc-950 sm:py-16 lg:py-20" aria-labelledby="volunteer-apply-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
              {t("pages.volunteer.applyLabel")}
            </p>
            <h2 id="volunteer-apply-heading" className="mt-4 font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("pages.volunteer.applyTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.volunteer.applyBody")}
            </p>
            <a
              href={`mailto:${mainEmails.jobsHr}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-9 text-sm font-bold uppercase tracking-[0.14em] text-zinc-900 shadow-md transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              {t("pages.volunteer.applyNow")}
            </a>
          </div>

          <div className="relative aspect-5/4 overflow-hidden rounded-3xl bg-zinc-100 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10">
            <Image
              src={mainGallerySrc(APPLY_IMAGE)}
              alt={t("pages.volunteer.applyImageAlt")}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
