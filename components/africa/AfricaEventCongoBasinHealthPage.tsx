import Image from "next/image";
import Link from "next/link";
import { africaRoutes, programsAnchor } from "@/lib/africa-routes";

const REGISTER_URL = "https://forms.gle/j6ykGeRLHTaXkZ8p8";

const PROGRAM_LINK =
  "font-medium text-teal-800 underline underline-offset-2 transition hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200";

const SPEAKERS = [
  {
    name: "Nicodeme Tchamou",
    role: "Speaker",
    photo: "/assets/nov_27/nicodeme-tchamou.png",
    bio: "Nicodeme Tchamou is an Environmental Program Management Specialist with over 28 years of experience in natural resource management, biodiversity conservation, and sustainable development across Central and West Africa. He holds a Master of Science in Environmental Sciences, a postgraduate degree in Tropical Forestry, and a Bachelor’s degree in Botany. He has extensive experience designing, implementing, monitoring, and evaluating large-scale, multi-country environmental programs. His work includes managing regional grant portfolios, coordinating transboundary initiatives such as the One Health program in West Africa, and supporting civil society and community-based organizations to advance conservation outcomes. He has collaborated with major international partners, including WWF, WCS, COMIFAC, OSFAC, and regional NGO networks. Mr. Tchamou has held key positions with the International Institute of Tropical Agriculture, WWF (Cameroon and Gabon), and USAID/CARPE in Kinshasa, as well as USAID West Africa, where he contributed to programs such as the Upper Guinea Forest Ecosystems and biodiversity and climate initiatives. He is currently Chief Technical Advisor for the implementation of the GEF8 Dja Landscape Project. He is fully bilingual in English and French, with strong experience in cross-cultural collaboration and stakeholder engagement across diverse regional contexts.",
  },
  {
    name: "Nyong Harrison Ndukong",
    role: "Speaker",
    photo: "/assets/nov_27/nyong-harrison-ndukong.png",
    bio: "Nyong Harrison Ndukong is a public health specialist with seven years of experience in laboratory networks and diagnostic access in Cameroon. He trained in medical laboratory science (BSc, University of Bamenda) and international public health (MSc, Liverpool John Moores University). He joined the Center for Research and Integrated Health Systems Strengthening (CRIHSS Foundation) in 2020 and spent four and a half years as Zonal Coordinator for the East Region, where the Lobéké, Dja and Ngoyla forests lie. He now runs the INTRASSAT project as Senior Coordinator for the Adamawa Region. The network he coordinates links over 90 health facilities in 12 health districts to testing laboratories, moving viral load, EID and TB samples and bringing results back to patients. He is part of the team writing integrated sample transport training modules for Cameroon’s Ministry of Public Health, and he is certified in diagnostic network optimization and event-based surveillance. CRIHSS Foundation named him Best Staff of the Year in 2020 and 2025.",
  },
  {
    name: "Dr. Ghislain Tikeng Agoum",
    role: "Speaker",
    photo: "/assets/nov_27/ghislain-tikeng-agoum.png",
    bio: "Dr. Ghislain Tikeng Agoum holds a PhD in Environmental Geography and has over 13 years of professional experience in sustainable development across Central and West Africa. His expertise spans biodiversity conservation, climate change mitigation and adaptation, natural resource governance, and integrated landscape management within the AFOLU sector (Agriculture, Forestry and Other Land Uses). He has extensive experience supporting governments, development partners, and civil society organizations in ecosystem restoration, climate resilience, and sustainable land-use planning. Dr. Agoum is particularly committed to promoting the rights, participation, and socio-economic empowerment of Indigenous Peoples and Local Communities (IPLCs), while advancing gender equality and social inclusion in environmental governance. As an independent consultant, he has worked with several international organizations, including WBG, FAO, UNDP, WRI, GIZ, JICA, and COMIFAC, contributing to project evaluations, stakeholder engagement, policy analysis, and climate and biodiversity initiatives.",
  },
] as const;

const MODERATOR = {
  name: "Abigail Peace Nathaniel",
  role: "Moderator",
  photo: "/assets/nov_27/abigail-peace-nathaniel.png",
  bio: "Abigail Peace Nathaniel is a graduate of Niger State School of Health Technology, Minna, and a Registered Community Health Worker with a strong commitment to community health education, women’s wellbeing, and purpose-driven living. She is a passionate women’s health advocate who believes that health challenges and difficult circumstances should not define a person’s identity or prevent them from pursuing their God-given purpose. Through health education and advocacy, she works to make reliable health information accessible, challenge harmful misconceptions, and encourage informed decisions about wellbeing. Abigail is the founder of Her Health and Wellness (HHW), a women-focused platform established to educate, empower, and inspire women to embrace holistic wellbeing. Through HHW, she promotes attention to spiritual, physical, emotional, and mental health, while encouraging women to understand their worth, grow in confidence, and live intentionally from a faith-informed perspective. She is also developing her work in the digital space as a health content writer, using clear and engaging communication to educate and reach women beyond her immediate community. With a heart for service and a passion for faith-based empowerment, Abigail’s mission is to equip women with knowledge, encouragement, and confidence to prioritize their wellbeing and pursue purposeful, balanced lives.",
} as const;

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
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Register now
            </a>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Speakers</h2>
          <ul className="mt-8 space-y-8">
            {SPEAKERS.map((person) => (
              <li key={person.name}>
                <article className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 md:flex md:gap-8">
                  <div className="relative aspect-4/3 w-full shrink-0 md:aspect-auto md:h-full md:min-h-64 md:w-72 md:self-stretch">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                      {person.role}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {person.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{person.bio}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <h2 className="mt-12 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Moderator</h2>
          <article className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 md:flex md:gap-8">
            <div className="relative aspect-4/3 w-full shrink-0 md:aspect-auto md:h-full md:min-h-64 md:w-72 md:self-stretch">
              <Image
                src={MODERATOR.photo}
                alt={MODERATOR.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 288px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                {MODERATOR.role}
              </p>
              <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {MODERATOR.name}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{MODERATOR.bio}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
