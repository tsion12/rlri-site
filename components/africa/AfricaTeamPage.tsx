"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { africaRoutes } from "@/lib/africa-routes";

type Member = {
  id: string;
  initials: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
  linkedin?: string;
};

const TEAM: Member[] = [
  {
    id: "ernest",
    initials: "EL",
    name: "Ernest Lequimboh",
    role: "Senior Policy Advisor",
    bio: "Ernest Lequimboh is an Award-Winning Author of 10 Investments You Must Make Before 40 and a Senior Policy Advisor at the Real Life Research Institute (RLRI), where he contributes to research and policy work at the intersection of artificial intelligence, governance, and inclusive public leadership. He brings experience in policy analysis and legislative modernization, with a focus on how emerging technologies shape public institutions and decision-making. At RLRI, he also writes blogs and opinion pieces on artificial intelligence and governance, contributing to public discourse and policy-relevant knowledge production. Ernest has academic foundation in Women and Gender Studies, Law, and Public Policy, alongside advanced studies in artificial intelligence and DevOps. His forthcoming paper critically examines AI Governance Capacity.",
    photo: "/assets/Team/Ernest-Lequimboh.webp",
    linkedin: "https://www.linkedin.com/in/ernest-lequimboh-3ba6b786/",
  },
  {
    id: "tsion",
    initials: "TM",
    name: "Tsion Mengistu Ademe",
    role: "Research and Data Analyst Fellow (Ethiopia)",
    bio: "Tsion Mengistu Ademe brings a strong combination of technology, communications, and research expertise to her work at the Real Life Research Institute (RLRI) where she serves as a Research and Data Analyst Fellow. In this role, she contributes to website management, digital communications, and design, and supports research initiatives exploring digital futures, including related activities in Ethiopia. Her work strengthens RLRI’s research dissemination, digital platforms, data analysis, and engagement strategies. Tsion holds a Master’s degree in Project Management and dual Bachelor’s degrees in Software Engineering and Management.",
    photo: "/assets/Team/Tsion.webp",
    linkedin: "https://www.linkedin.com/in/tsion-mengistu-46a840208/",
  },
  {
    id: "chris",
    initials: "CB",
    name: "Chris Begealawuh, Ph.D.",
    role: "Research Affiliate",
    bio: "Chris Begealawuh is a Research Affiliate at the Real Life Research Institute (RLRI), where he contributes to research and policy work at the intersection of climate change, peace, security, and digital futures. He brings over 10 years of experience in social sciences, policy, and international development, with a focus on climate-related drivers of conflict, emerging digital transformations, and their implications for governance and sustainable development. At RLRI, he also writes blogs and opinion pieces that translate complex climate, security, and digital futures issues into accessible insights for policy and public audiences. Chris holds a Ph.D. in International Development from the University of Ottawa, Canada, and a Master’s degree in Global Affairs from the University of Leipzig, Germany.",
    photo: "/assets/Team/Dr-Chris-Begealawuh-1.webp",
    linkedin: "https://www.linkedin.com/in/nchongayi-christantus-020827a1/",
  },
  {
    id: "achai",
    initials: "AK",
    name: "Achai Kuol Deng",
    role: "Administrative and Finance Assistant",
    bio: "Achai Kuol Deng is the Administrative and Finance Assistant at the Real Life Research Institute (RLRI), where she manages day-to-day administrative operations, responds to institutional emails, and coordinates financial processes. She serves as a key point of contact for research fellows and affiliates, supports financial coordination and documentation, and contributes to the effective delivery of RLRI’s programs by ensuring smooth communication and operational support across research activities. Achai holds a Bachelor of Arts in International Relations.",
    photo: "/assets/Team/Achai.webp",
    linkedin: "https://www.linkedin.com/in/achai-deng-0b581a37b/",
  },
  {
    id: "richard",
    initials: "RN",
    name: "Dr. Richard Nyiawung",
    role: "Research Affiliate",
    bio: "Dr. Nyiawung is a Research Affiliate at the Real Life Research Institute (RLRI), where he contributes to research and policy work supporting the institute’s mission and programming. He brings over 10 years of experience in social sciences, policy, and international development, with expertise spanning evidence-based research synthesis and policy-relevant analysis. At RLRI, he also frequently writes blogs and opinion pieces on maritime and ocean-related issues, contributing to public discourse and knowledge dissemination. Dr. Nyiawung holds a PhD in Geography and International Development from the University of Guelph, Canada, and a Master of Arts in Environmental Policy from Memorial University of Newfoundland, Canada.",
    photo: "/assets/Team/Rechard.webp",
  },
  {
    id: "roselyn",
    initials: "RK",
    name: "Roselyn Ruvimbo Kwaramba",
    role: "Research Fellow (Zimbabwe)",
    bio: "Roselyn Ruvimbo Kwaramba is a Research Fellow at the Real Life Research Institute (RLRI) with a country focus on Zimbabwe. She supports senior research teams, coordinates community development initiatives, and contributes to project implementation, with particular attention to locally grounded and community-responsive research. Her work strengthens RLRI’s engagement with community development and resilience-focused programming in Zimbabwe. Roselyn holds a Bachelor of Science in Community Development Studies and is currently pursuing a Master of Arts in Disaster Risk Reduction Management Systems.",
    photo: "/assets/Team/Roselyn.webp",
    linkedin: "https://www.linkedin.com/in/ruvimbo-kwaramba-8208a2198/",
  },
  {
    id: "nfor",
    initials: "NM",
    name: "Nfor Christelle Mugha",
    role: "Project Assistant (Cameroon)",
    bio: "Nfor Christelle Mugha is a Project Assistant at the Real Life Research Institute (RLRI) with a country focus on Cameroon. She supports research activities, community engagement, and communications initiatives, contributing to the documentation and dissemination of research and community-based work. Her role bridges research and storytelling, strengthening RLRI’s engagement with communities and enhancing the visibility of locally grounded, social justice–oriented initiatives in Cameroon. Christelle holds a Bachelor of Arts in Journalism from the Advanced School of Mass Communication (ESSTIC), Yaoundé.",
    photo: "",
    linkedin: "https://www.linkedin.com/in/nfor-christelle-mugha-8941421a7/",
  },
];

export function AfricaTeamPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const activeMember = useMemo(
    () => TEAM.find((m) => m.id === activeId) ?? null,
    [activeId],
  );

  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="team-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Our team</p>
          <h1
            id="team-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            People and affiliates
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Researchers, staff, and affiliates working across Africa and the diaspora to connect evidence with policy and practice.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 rounded-2xl border border-zinc-200/80 bg-white px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Interested in volunteering? Learn how to get involved on our dedicated volunteers page.
            </p>
            <Link
              href={africaRoutes.volunteers}
              className="inline-flex shrink-0 items-center justify-center rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </section>

      {/* Team profiles */}
      <section className="bg-white py-16 dark:bg-zinc-950 lg:py-24" aria-labelledby="team-profiles-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="team-profiles-heading" className="text-center font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
              style={{ fontSize: "clamp(1.75rem, 4vw, 2.35rem)" }}>
            Team profiles
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-zinc-600 dark:text-zinc-400">
            Hover for a quick preview, then click to open full profile details.
          </p>

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {TEAM.map((member) => (
              <li key={member.name}>
                <button
                  type="button"
                  onClick={() => setActiveId(member.id)}
                  className="group relative block w-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-white text-left shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-300/60 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/70 dark:border-zinc-800 dark:bg-zinc-900/80 dark:hover:border-teal-800/50"
                >
                  <div className="relative aspect-4/5">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-zinc-950/85 via-zinc-950/20 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-4">
                      <p className="text-base font-semibold leading-tight text-white">{member.name}</p>
                      <p className="mt-1 text-xs font-medium text-teal-200">{member.role}</p>
                    </div>
                    <div className="absolute left-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200">
                      {member.initials}
                    </div>
                  </div>
                  <div className="absolute inset-x-3 bottom-3 rounded-xl bg-white/92 px-3 py-2 text-xs text-zinc-700 opacity-0 shadow-sm transition duration-200 group-hover:opacity-100 dark:bg-zinc-900/90 dark:text-zinc-200">
                    Click for profile
                  </div>
                </button>
              </li>
            ))}
          </ul>

          <p className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-500">
            Looking for career openings?{" "}
            <Link href={africaRoutes.career} className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">
              Career
            </Link>
          </p>
        </div>
      </section>

      {activeMember ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/60 p-4 backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="team-member-title"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-auto rounded-3xl border border-zinc-200/80 bg-white p-5 shadow-xl dark:border-zinc-800 dark:bg-zinc-950 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
              aria-label="Close profile"
            >
              ×
            </button>
            <div className="grid gap-5 sm:grid-cols-[220px_1fr] sm:gap-6">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                <Image src={activeMember.photo} alt={activeMember.name} fill className="object-cover" sizes="220px" />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">Team profile</p>
                <h3 id="team-member-title" className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {activeMember.name}
                </h3>
                <p className="mt-1 text-sm font-semibold text-teal-700 dark:text-teal-400">{activeMember.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{activeMember.bio}</p>
                {activeMember.linkedin ? (
                  <a
                    href={activeMember.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:border-teal-400 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-teal-700 dark:hover:text-teal-300"
                  >
                    <LinkedinIcon />
                    LinkedIn
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden fill="currentColor">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5ZM.5 8h4V24h-4V8Zm7 0h3.84v2.19h.06c.53-1 1.84-2.19 3.79-2.19 4.05 0 4.81 2.67 4.81 6.14V24h-4v-7.12c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V24h-4V8Z" />
    </svg>
  );
}
