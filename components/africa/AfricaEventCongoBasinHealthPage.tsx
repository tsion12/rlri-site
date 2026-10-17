import Link from "next/link";
import { africaRoutes, programsAnchor } from "@/lib/africa-routes";

const PROGRAM_LINK =
  "font-medium text-teal-800 underline underline-offset-2 transition hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200";

const OUTCOMES = [
  "Increased regional understanding of the climate-health nexus in Congo Basin forest communities.",
  "Shared insights on implementing participatory mapping, forest product support groups, and community health worker integration.",
  "Enhanced cross-sectoral collaboration between conservation actors, health practitioners, and civil society organizations.",
] as const;

export function AfricaEventCongoBasinHealthPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Linking Climate Adaptation and Health Access for Baka and Bantu Indigenous Communities in the
            Congo Basin
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location: Online | Friday, 27 November 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa (EST): 9:00 am – 10:30 am | South Africa (SAST): 4:00 pm – 5:30 pm | Kenya / Ethiopia
            (EAT): 5:00 pm – 6:30 pm | Cameroon/Nigeria (WAT): 3:00 pm – 4:30 pm
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <span className="inline-flex min-h-11 cursor-default items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 px-6 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
              Registration link coming soon
            </span>
            <Link
              href={africaRoutes.events}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to events
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Background and context
          </h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Forest-dependent communities in Eastern Cameroon, particularly around the Lobéké, Dja, and Ngoyla
            corridors, face a compounding socio-ecological crisis where environmental degradation and health
            vulnerabilities inextricably feed one another. Supported by insights from the Forest Peoples
            Programme, Debates Indígenas, CIFOR, and Congo Landscapes, these indigenous Baka and Bantu
            populations rely heavily on the forest for sustenance, income, and traditional medicine, a
            dependence currently strained by shifting climates and industrial pressures such as the Mbalam iron
            ore project logging.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This dual crisis manifests simultaneously as a climate adaptation challenge, where unpredictable
            seasons disrupt farming and forest incomes while forcing Baka communities to travel farther for
            essential resources without adequate mechanisms to document environmental damage, and a severe
            health systems bottleneck. Households routinely depend on forest cash to cover basic medical and
            educational expenses, often resorting to selling forest products cheaply to middlemen during health
            emergencies, which locks them in chronic poverty.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Geographic isolation further exacerbates these divides, leaving remote Baka forest camps with
            near-zero prenatal care or childhood vaccination coverage as documented by UNICEF, while the
            simultaneous loss of traditional forest medicine deepens their healthcare deficit. Addressing these
            interwoven vulnerabilities requires an integrated framework uniting climate adaptation strategies
            for resilient, protected livelihoods with accessible primary health prevention.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Webinar focus &amp; objectives
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar aims to explore how integrating climate adaptation and health systems can address the
            compounded vulnerabilities of indigenous forest-dependent communities in the Congo Basin,
            highlighting community-led monitoring, livelihood support, and grassroots health access.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This session centers on examining the complex, interlinked climate and health pressures confronting
            Baka and Bantu communities in Eastern Cameroon. It showcases practical, rights-based methodologies,
            including participatory risk mapping, community-based forest monitoring, and adherence to Free,
            Prior, and Informed Consent (FPIC) frameworks. Furthermore, the webinar discusses actionable
            strategies for supporting sustainable forest-based income generation to help communities break out
            of the middleman trap during critical health emergencies.
          </p>

          <h3 className="mt-8 text-base font-semibold text-zinc-900 dark:text-zinc-50">Expected outcomes</h3>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {OUTCOMES.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-8 text-base font-semibold text-zinc-900 dark:text-zinc-50">Target audience</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Researchers, practitioners, civil society organizations, and policy-makers working across climate
            adaptation, public health, indigenous rights, and environmental conservation in Africa.
          </p>

          <p className="mt-8 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar is supported by the{" "}
            <Link href={programsAnchor("03")} className={PROGRAM_LINK}>
              Climate Adaptation &amp; Resilience Team
            </Link>{" "}
            and the{" "}
            <Link href={programsAnchor("05")} className={PROGRAM_LINK}>
              Health Systems, Equity, and Social Transformation Team
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Speakers</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The full webinar panel will be published here once speakers and the moderator are confirmed.
          </p>
        </div>
      </section>
    </>
  );
}
