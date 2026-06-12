import Image from "next/image";
import Link from "next/link";
import { africaEmails, africaRoutes } from "@/lib/africa-routes";
import { getAfricaPostsPreview, stripHtml } from "@/lib/wp";
import { AboutValuePillars } from "./AboutValuePillars";

const POLICIES = [
  {
    date: "Aug 2025",
    name: "Finance Management Policy",
    excerpt: "High standards of financial accountability across all programs.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI-_-Financial-Policy_2025.pdf",
  },
  {
    date: "Aug 2025",
    name: "Anti-racism Policy",
    excerpt: "Safe, inclusive, respectful environment free from racism in all its forms.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI-_-Anti-racism-policy_2025.pdf",
  },
  {
    date: "Aug 2025",
    name: "Screening and Background Check Policy",
    excerpt: "Reliable hiring through thorough candidate screening and verification.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI_Screening-Background-Check-Policy-1.pdf",
  },
  {
    date: "Aug 2025",
    name: "Equity, Diversity, and Inclusion (EDI) Policy",
    excerpt: "Promoting equity, diversity, and inclusion across all programs.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI_EDI_POLICY-2.pdf",
  },
  {
    date: "Dec 2025",
    name: "Anti-corruption and Whistleblowing Policy",
    excerpt: "Zero tolerance for fraud, bribery, and corruption at every level.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/12/RLRI_anticorruptionwhistleblowing.pdf",
  },
  {
    date: "Aug 2025",
    name: "Anti-harassment and Discrimination Policy",
    excerpt: "A safe, flexible, respectful environment for everyone.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI_Anti-harrasement-discrimination-policy-1.pdf",
  },
  {
    date: "Aug 2025",
    name: "Sexual Exploitation, Abuse, and Harassment (SEAH) Policy",
    excerpt: "Zero tolerance toward sexual exploitation, abuse, and harassment.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/08/RLRI-SEAH-POLICY-.pdf",
  },
  {
    date: "Dec 2025",
    name: "Safeguarding and Protection Policy",
    excerpt: "Everyone treated with dignity and protected from all forms of harm.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2025/12/RLRI_Safeguarding-and-Protection-Policy-1.pdf",
  },
] as const;

/* ── Main component ───────────────────────────────────────────────────── */
export async function AfricaAboutPage() {
  const [latestPost] = await getAfricaPostsPreview(1);
  const aboutBandImage = latestPost?.featuredImage ?? null;
  const aboutBandAlt = latestPost ? stripHtml(latestPost.title.rendered) : "RLRI Africa impact infographic";

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO — minimal, clean, about-specific
      ══════════════════════════════════════════════════════ */}
      <section
        className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24"
        aria-labelledby="about-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
              About
            </p>
            <h1 id="about-heading" className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
              RLRI Africa Program
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              We are a pan-African research and implementation initiative focused on practical, evidence-based solutions
              shaped by local context and community priorities.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="#who-we-are"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                Who we are
              </Link>
              <Link
                href={`${africaRoutes.about}#teams`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Meet the team
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════════════════ */}
      <section
        id="who-we-are"
        className="border-b border-zinc-200/80 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-950 lg:py-32"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] xl:gap-24">

            {/* ── Copy ── */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                Who we are
              </p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Innovating Truth,{" "}
                <span className="text-teal-700 dark:text-teal-400">Impacting Lives.</span>
              </h2>

              <div className="mt-10 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                  The Real Life Research Institute – Africa Programs shares the same vision as its parent organization,{" "}
                  <Link
                    href={africaRoutes.institute}
                    className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    Real Life Research Institute
                  </Link>
                  , to create a more equitable and resilient world where no one is left behind. Rooted in a Pan-African approach, our
                  work connects youth, researchers, and practitioners across the continent and with global partners to generate
                  locally grounded knowledge and drive practical impact. The Africa Program operates as a regionally responsive
                  and impact-oriented initiative within the Real Life Research Institute. We work across diverse African contexts
                  to identify pressing challenges, support globally led research, and co-create solutions that respond to community
                  priorities and lived realities in Africa. Our approach centers African voices, values local knowledge, and
                  ensures that research is not only produced but used to inform policies, strengthen institutions, and improve
                  everyday lives.
                </p>
              </div>

              {/* Pull-quote card */}
              <div className="mt-10 flex gap-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/80 px-6 py-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="mt-0.5 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-700 text-white">
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.5 6.5A3.5 3.5 0 0 1 7 3v1.5A2 2 0 0 0 5 6.5v.25a.75.75 0 0 0 .75.75H7v3H3.5V6.5Zm5.5 0A3.5 3.5 0 0 1 12.5 3V4.5A2 2 0 0 0 10.5 6.5v.25a.75.75 0 0 0 .75.75H13v3H9V6.5Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-base font-semibold leading-snug text-zinc-800 dark:text-zinc-100">
                    When African-led research is connected to global knowledge systems and translated into policy and practice, it
                    leads to more effective, context-sensitive and inclusive outcomes.
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
                    Theory of change · RLRI Africa Programs
                  </p>
                </div>
              </div>
            </div>

            {/* ── Infographic panel ── */}
            <aside className="lg:justify-self-end">
              <div className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/80">
                <div className="border-b border-zinc-200/80 bg-linear-to-br from-teal-100 via-emerald-50 to-cyan-100 p-6 dark:border-zinc-800 dark:from-teal-950/50 dark:via-zinc-900 dark:to-emerald-950/40">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-300">
                    Program focus
                  </p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    Our thematic focus areas
                  </h3>
                  <div className="mt-5 space-y-2.5">
                    <div>
                      <p className="mb-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">Oceans</p>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/80 dark:bg-zinc-800">
                        <div className="h-full w-[82%] rounded-full bg-teal-600 dark:bg-teal-400" />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">Digital Futures</p>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/80 dark:bg-zinc-800">
                        <div className="h-full w-[74%] rounded-full bg-emerald-600 dark:bg-emerald-400" />
                      </div>
                    </div>
                    <div>
                      <p className="mb-1.5 text-[11px] font-semibold text-zinc-700 dark:text-zinc-200">
                        Climate Adaptation &amp; Resilience
                      </p>
                      <div className="h-2.5 overflow-hidden rounded-full bg-white/80 dark:bg-zinc-800">
                        <div className="h-full w-[68%] rounded-full bg-cyan-600 dark:bg-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-x-6 gap-y-5 p-6">
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      Focus area 04
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Peacebuilding &amp; Inclusive Dialogues
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                      Focus area 05
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      Health Systems, Equity &amp; Social Transformation
                    </dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES — vision / mission / theory (overlap + cards)
      ══════════════════════════════════════════════════════ */}
      <AboutValuePillars />

      {/* ══════════════════════════════════════════════════════
          TEAMS
      ══════════════════════════════════════════════════════ */}
      <section
        id="teams"
        className="scroll-mt-24 border-b border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 lg:py-28"
        aria-labelledby="about-teams-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Teams</p>
          <h2
            id="about-teams-heading"
            className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          >
            People behind the work
          </h2>
          <p className="mt-6 max-w-3xl text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
            Our teams bring together researchers, program staff, and field partners across Africa. We collaborate across thematic
            programs and country contexts to deliver accountable, community-centered research and implementation—with leadership
            that reflects the diversity of the communities we serve.
          </p>
          <div className="mt-8">
            <Link
              href={africaRoutes.team}
              className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
            >
              Meet the full team
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VOLUNTEERS
      ══════════════════════════════════════════════════════ */}
      <section
        id="volunteers"
        className="scroll-mt-24 border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 lg:py-28"
        aria-labelledby="about-volunteers-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Volunteers</p>
            <h2
              id="about-volunteers-heading"
              className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              Volunteer with us
            </h2>
            <p className="mt-6 max-w-3xl text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Volunteers strengthen our outreach, events, and research support. We are open to receiving volunteers from around the
              world who share our values. If you want to contribute your time and skills, we would love to hear from you—see our{" "}
              <Link href={africaRoutes.volunteers} className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">
                Volunteers page
              </Link>{" "}
              for details, or explore ways to get involved below.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href={africaRoutes.volunteers}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                Volunteer information
              </Link>
              <Link
                href={africaRoutes.getInvolved}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Get involved
              </Link>
              <a
                href={`mailto:${africaEmails.programsCoord}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Email program coordination
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          IMAGE BAND
      ══════════════════════════════════════════════════════ */}
      <div className="relative h-[45vh] min-h-[300px] max-h-[460px] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {aboutBandImage ? (
          <Image
            src={aboutBandImage}
            alt={aboutBandAlt}
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-linear-to-br from-teal-100 via-emerald-50 to-cyan-100 dark:from-teal-950/60 dark:via-zinc-950 dark:to-emerald-950/50">
            <svg viewBox="0 0 1000 420" className="h-full w-full" role="img" aria-label="Africa infographic pattern">
              <g opacity="0.25">
                <circle cx="180" cy="120" r="78" fill="#14b8a6" />
                <circle cx="360" cy="220" r="52" fill="#0ea5a4" />
                <circle cx="600" cy="140" r="68" fill="#10b981" />
                <circle cx="790" cy="260" r="84" fill="#0f766e" />
              </g>
              <g stroke="#0f766e" strokeOpacity="0.35" strokeWidth="2" fill="none">
                <path d="M120 300L240 185L360 240L520 140L670 190L820 120" />
                <path d="M110 340L250 280L380 320L530 245L690 290L860 215" />
              </g>
            </svg>
          </div>
        )}
        {/* Gradient overlay left-to-right */}
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/90 via-zinc-950/55 to-zinc-950/10" aria-hidden />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-950/40 to-transparent" aria-hidden />

        <div className="relative flex h-full w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-400">
              Our commitment
            </p>
            <p className="mt-3 max-w-xl font-bold leading-tight text-white"
               style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}>
              Empowering young minds,{" "}
              <span className="text-teal-400">building brighter futures.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          POLICIES
      ══════════════════════════════════════════════════════ */}
      <section
        id="policies"
        className="scroll-mt-24 border-t border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="mb-12 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                  Policies
                </p>
                <span className="rounded-full border border-teal-200 bg-teal-100 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 dark:border-teal-800/60 dark:bg-teal-900/40 dark:text-teal-400">
                  {String(POLICIES.length).padStart(2, "0")}
                </span>
              </div>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
                Policies that put community first
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Our policies reflect the values we live by. Summaries and policy themes are listed below; contact us for full policy documents.
            </p>
          </div>

          {/* ── Card grid ── */}
          <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {POLICIES.map(({ date, name, excerpt, href }) => (
              <li key={name} className="flex">
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full flex-col rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-300/60 hover:bg-teal-50/60 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-teal-800/50 dark:hover:bg-teal-950/20"
                >
                  {/* Top: date badge */}
                  <span className="inline-flex w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    {date}
                  </span>

                  {/* Shield icon */}
                  <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600 ring-1 ring-teal-200/60 dark:bg-teal-900/40 dark:text-teal-400 dark:ring-teal-800/50">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Name */}
                  <h3 className="mt-4 text-sm font-bold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300">
                    {name}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {excerpt}
                  </p>

                  {/* Bottom CTA */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-teal-700 dark:text-teal-400">
                    Read policy
                    <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="bg-teal-700 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-200/70">
                Get involved
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Work with us
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-teal-100/80">
                Explore programs, upcoming events, or reach out to collaborate on research and community-driven solutions across Africa.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              <Link
                href={africaRoutes.home}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Back to home
              </Link>
              <Link
                href={africaRoutes.donate}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Get involved
              </Link>
              <a
                href="mailto:contact-africa@reallifeinstitute.org"
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Contact us
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
