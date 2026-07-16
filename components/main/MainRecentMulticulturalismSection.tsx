import { MainMulticulturalismGallery } from "@/components/main/MainMulticulturalismGallery";
import Image from "next/image";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import {
  MULTICULTURALISM_DAY_AGENDA,
  MULTICULTURALISM_DAY_FLYER,
  MULTICULTURALISM_DAY_NOTES,
  MULTICULTURALISM_DAY_PROGRAM,
  MULTICULTURALISM_DAY_PROTOCOL,
} from "@/lib/main-events";

type Props = {
  t: (key: TranslationKey) => string;
};

export function MainRecentMulticulturalismSection({ t }: Props) {
  const base = "pages.events.recent.multiculturalismDay";

  return (
    <article className="overflow-hidden rounded-4xl border border-zinc-200/80 bg-white shadow-[0_28px_70px_-32px_rgba(15,23,42,0.25)] dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="relative min-h-72 bg-linear-to-br from-cyan-50 via-sky-50 to-teal-50 dark:from-cyan-950/30 dark:via-sky-950/20 dark:to-teal-950/30 lg:min-h-full">
          <Image
            src={MULTICULTURALISM_DAY_FLYER}
            alt={t(`${base}.title`)}
            fill
            className="object-contain p-4 sm:p-6"
            sizes="(max-width: 1024px) 100vw, 42rem"
          />
        </div>

        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
            {t(`${base}.subtitle`)}
          </p>
          <h2 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {t(`${base}.title`)}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{t(`${base}.lead`)}</p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
                Where
              </dt>
              <dd className="mt-1 font-medium text-zinc-800 dark:text-zinc-200">{t(`${base}.where`)}</dd>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-300">
                {t(`${base}.freeEntry`)}
              </span>
              <span className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                {t(`${base}.fundedBy`)}
              </span>
            </div>
          </dl>
        </div>
      </div>

      <div className="border-t border-zinc-200/80 p-6 sm:p-8 lg:p-10 dark:border-zinc-800">
        <h3 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          {t(`${base}.agendaHeading`)}
        </h3>
        <p className="mt-1 text-sm font-medium text-zinc-500 dark:text-zinc-400">{t("pages.events.agendaDate")}</p>

        <div className="mt-6 overflow-x-auto rounded-2xl border border-zinc-200/80 dark:border-zinc-800">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="bg-zinc-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 dark:bg-zinc-900/80 dark:text-zinc-400">
              <tr>
                <th className="px-4 py-3 sm:px-5">{t("pages.events.agendaActivity")}</th>
                <th className="px-4 py-3 sm:px-5">{t("pages.events.agendaStart")}</th>
                <th className="px-4 py-3 sm:px-5">{t("pages.events.agendaEnd")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200/80 dark:divide-zinc-800">
              {MULTICULTURALISM_DAY_AGENDA.map(({ activityKey, start, end }) => (
                <tr key={activityKey} className="bg-white dark:bg-zinc-950/40">
                  <td className="px-4 py-3.5 font-medium text-zinc-900 dark:text-zinc-100 sm:px-5">
                    {t(activityKey)}
                  </td>
                  <td className="px-4 py-3.5 tabular-nums text-zinc-600 dark:text-zinc-400 sm:px-5">{start}</td>
                  <td className="px-4 py-3.5 tabular-nums text-zinc-600 dark:text-zinc-400 sm:px-5">{end}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t(`${base}.protocolHeading`)}</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t(`${base}.protocolIntro`)}</p>
            <ul className="mt-4 space-y-3">
              {MULTICULTURALISM_DAY_PROTOCOL.map((key) => (
                <li key={key} className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t(`${base}.programHeading`)}</h4>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{t(`${base}.programIntro`)}</p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {MULTICULTURALISM_DAY_PROGRAM.map((key) => (
                <li key={key}>{t(key)}</li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200/80 bg-amber-50/80 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
          <h4 className="text-sm font-semibold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300">
            {t(`${base}.notesHeading`)}
          </h4>
          <ul className="mt-3 space-y-2">
            {MULTICULTURALISM_DAY_NOTES.map((key) => (
              <li key={key} className="flex gap-3 text-sm leading-relaxed text-amber-950/80 dark:text-amber-100/80">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-500" aria-hidden />
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-zinc-200/80 px-6 pb-8 sm:px-8 lg:px-10 lg:pb-10 dark:border-zinc-800">
        <MainMulticulturalismGallery
          heading={t(`${base}.galleryHeading`)}
          photoLabel={t(`${base}.photoLabel`)}
          closeLabel={t(`${base}.closeGallery`)}
          previousLabel={t(`${base}.galleryPrevious`)}
          nextLabel={t(`${base}.galleryNext`)}
          viewFullSizeLabel={t(`${base}.viewFullSize`)}
        />
      </div>
    </article>
  );
}
