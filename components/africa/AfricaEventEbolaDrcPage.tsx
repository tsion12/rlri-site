import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const REGISTRATION_HREF = "https://forms.gle/1bn8g7Tu2ZQGcMm36";

const SPEAKERS = [
  {
    name: "Dr. Ekua Agyemang",
    role: "Speaker",
    photo: "/assets/june/Ekua Agyemang.png",
    bio: "Dr. Ekua Agyemang is a Public Health and Preventive Medicine specialist currently serving as Chief Public Health Officer for the Government of Nunavut, Canada, and Vice President of the Canadian Society for Circumpolar Health. In her role, she provides strategic leadership across surveillance, infectious disease prevention, outbreak response, and emergency preparedness, while advising the Government of Nunavut on the complex social, environmental, and climate-related factors shaping health outcomes in northern communities. Her expertise spans environmental health, infectious and chronic disease prevention, and climate-sensitive health challenges, including tuberculosis, zoonotic diseases, and food and water security. Dr. Agyemang began her medical career in Ghana, where she focused on tuberculosis, HIV, and high-impact infectious diseases, before pursuing advanced training in Canada, where she earned a Master of Public Health and completed her residency at the University of Alberta. Her international background and deep respect for Inuit knowledge systems and community-driven solutions shape her equity-focused approach to public health leadership.",
  },
  {
    name: "Augustin Mudekereza Kasenge",
    role: "Speaker",
    photo: "/assets/june/Augustin Mudekereza Kasenge.png",
    bio: "Augustin Mudekereza Kasenge is a university lecturer, researcher, and expert in local governance, decentralisation, and public-private partnerships based in the Democratic Republic of Congo. With over fifteen years of experience in applied research, community project coordination, and humanitarian action, his work focuses on natural resource governance, climate change, gender, and urban dynamics in South Kivu. He holds a Master's degree in Development Studies from ISDR/Bukavu and is a researcher at the Centre for Conflict Analysis and Governance at the Angaza Institute. As former Provincial Executive Secretary of the Red Cross DRC/South Kivu, he coordinated emergency responses to crises including Cholera and Ebola outbreaks, floods, and armed conflict, making him a key voice on the intersection of humanitarian action, governance, and public health in the DRC.",
  },
  {
    name: "Nfor Hanson Nchanji",
    role: "Speaker",
    photo: "/assets/june/Nfor Hanson Nchanji.png",
    bio: "Nfor Hanson Nchanji is an award-winning media entrepreneur and digital strategist with a BSc. in Journalism and Mass Communication, an MBA in International Relations and Diplomacy. His expertise in geopolitical analysis and strategic communication has driven impactful consultant work for global NGOs, including the UNDP, International Crisis Group, Civitas Maxima, and PPLAAF. He worked with HD Centre in Geneva as a Mediation Advisor. Hanson is passionate about integrating digital engagement and AI to maximize organizational reach and social impact.",
  },
] as const;

const MODERATOR = {
  name: "Che Emmanuel Mforlem",
  role: "Moderator",
  photo: "/assets/june/Che Emmanuel Mforlem.png",
  bio: "Che Emmanuel Mforlem is a Corporate Investigator, Community Awareness Advocate, and Public Educator with a strong commitment to promoting informed decision-making, responsible citizenship, and community engagement. As the Founder of AIOCAM (Awareness and Information Orientation Cameroon), he has built a platform dedicated to making complex information accessible to ordinary citizens, from civic education and social responsibility to sustainable community development. His work is rooted in the belief that informed communities are better equipped to hold institutions accountable, navigate crises, and drive meaningful change from the ground up.",
} as const;

export function AfricaEventEbolaDrcPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            How Conflict, Aid Cuts, and Misinformation are Redefining Ebola Responses in DRC
          </h1>
          <p className="mt-3 max-w-5xl text-base font-medium italic leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            What Past Outbreaks Should Have Already Taught Us
          </p>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Online webinar | Friday, June 12, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa: 9:00 – 10:30 AM (EDT) | West Africa: 2:00 – 3:30 PM | Central &amp; Southern Africa: 3:00
            – 4:30 PM | East Africa: 4:00 – 5:30 PM
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={REGISTRATION_HREF}
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
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar overview</h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Nearly five decades after Ebola was first identified in Yambuku, DRC, the country is currently
            grappling with its 17th Ebola outbreak. The current outbreak is caused by the Bundibugyo strain,
            which currently has no vaccine and has a high fatality rate. The virus continues to spread due to a
            combination of factors, including misinformation, conflict, and aid cuts.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Health responses are too often entangled with military presence, reinforcing perceptions of
            repression rather than care. Communities have seen relatives taken to treatment centres and never
            returned; burial practices are disrupted without dialogue; and deeply held beliefs are dismissed
            rather than engaged. The result is predictable: resistance, misinformation, and at times, violent
            backlash against response efforts themselves.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Although the DRC has solid experience in Ebola response, externally driven approaches might be
            sidelining what already works. At the same time, neighboring states and countries further afield
            remain primarily focused on preventing exported cases, rather than strengthening the response at the
            source. This not only complicates local containment efforts but risks accelerating regional and
            global spillover, leaving even distant systems more exposed.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Purpose of the webinar</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar attempts to answer the question: Why does Ebola persist in the DRC despite decades of
            response experience? Key speakers and participants will examine what must change to stop outbreaks at
            their source before they spread beyond it. The session will also discuss how community perspectives
            and lived realities reveal the social and cultural dynamics that continue to shape transmission.
          </p>

          <WebinarProgramSupportLine program="05" className="mt-8" />
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Key speakers</h2>
          <ul className="mt-8 space-y-8">
            {SPEAKERS.map((person) => (
              <li key={person.name}>
                <article className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 md:flex md:gap-8">
                  <div className="relative aspect-4/3 w-full shrink-0 md:aspect-auto md:h-full md:min-h-64 md:w-72 md:self-stretch">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover"
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
                className="object-cover"
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
