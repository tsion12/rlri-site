import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const REGISTRATION_HREF = "https://forms.gle/7cyFuhn7CPAdqEAv5";
const ZOOM_JOIN_HREF =
  "https://us06web.zoom.us/j/82865065750?pwd=XfUcu73YMIOrIbA2XhWUooHn8O63An.1";
const ZOOM_MEETING_ID = "828 6506 5750";
const ZOOM_PASSCODE = "771750";

const SPEAKERS = [
  {
    name: "Dr. Eric J. Irungu",
    role: "Speaker",
    photo: "/assets/aug_26/Dr Eric J Irungu.jpeg",
    bio: "Dr. Eric J. Irungu is a lecturer of International Relations and Diplomacy at Zetech University, Kenya. He holds a Doctor of Philosophy (PhD) in Political Science, specialising in International Relations from Moi University, Kenya; a Master of Arts in International Studies from the University of Nairobi, Kenya; and a Bachelor of Arts in Economics from Moi University, Kenya. He has a keen interest in Economic Diplomacy; International Economic Relations; International Development; International Politics; International Political Economy; Regional Integration; Strategic and Security Studies; Peace and Conflict; Violence and Armed Groups; Environmental Politics; and Climate Diplomacy. He has published and presented in conferences and webinars in the areas of maritime threats and security in the Red Sea and the Horn of Africa; ethics of lecturer-student relations in universities; artificial intelligence and political activism; climate change and environmental security; regional integration in Africa; economic diplomacy; digital diplomacy; conflict prevention and conflict early warning systems; application of artificial intelligence in international relations, diplomacy and conflict prevention; and social media and political activism among Gen Zs. He has fifteen years of teaching and research experience at the university level, having taught in programmes in International Relations, Diplomacy, Political Science and Development Studies.",
  },
  {
    name: "Abdikarim Saed Salah",
    role: "Speaker",
    photo: "/assets/aug_26/Abdikarim Saed Salah.png",
    bio: "Abdikarim Saed Salah is a journalist, editor, and geopolitical analyst specializing in the Horn of Africa, Red Sea geopolitics, and maritime security, and he is the Founder and Editor-in-Chief of HornPost.com. Raised in Berbera, he began his media career in 2006 and spent years as a television presenter, producer, and reporter for Horn Cable TV, covering foreign policy, regional security, and international relations. Holding a Bachelor of Arts in Journalism and Mass Communication alongside a Master of Arts in International Relations and Diplomacy, Abdikarim utilizes his academic background and decades of reporting experience to examine strategic competition, trade corridors, and how global developments impact the region's security and economic resilience.",
  },
  {
    name: "Dr. Dawn Hersey",
    role: "Speaker",
    photo: "/assets/aug_26/Dr Dawn Hersey.jpeg",
    bio: "Dr. Dawn Hersey is the Founder and Principal of Ferndon Consulting, where she specializes in geopolitical risk, security, strategic intelligence, and the resilience of critical infrastructure and supply chains. Her professional and academic work has focused extensively on Central Asia, the Middle East, the Horn of Africa, and Eastern Europe, examining how political instability, conflict, economic pressures, and regional competition affect security and international trade. Her experience in the Horn of Africa includes field research in Djibouti and Kenya, with particular attention to the strategic importance of the Red Sea, Gulf of Aden, Western Indian Ocean, and emerging trade corridors such as Kenya's Lamu Port. Her work examines the consequences of disruption at strategic maritime chokepoints, including the Strait of Hormuz and Bab el-Mandeb, and how these disruptions propagate through energy markets, transportation networks, food security, supply chains, and regional economies. Most recently, Dr. Hersey has been focusing on the interconnectivity of these key supply routes with the Arctic and West Pacific. Dr. Hersey's experience spans government, military, homeland security, academia, and private-sector consulting, informing her analysis of complex security environments. Her research and consulting emphasize identifying the often-overlooked connections between geopolitics, state stability, infrastructure dependencies, and commercial risk, translating those relationships into practical intelligence for decision-makers operating in uncertain environments.",
  },
] as const;

const MODERATOR = {
  name: "Solomon Kimaita",
  role: "Moderator",
  photo: "/assets/aug_26/Solomon Kimaita.jpeg",
  bio: "Solomon Kimaita is an accomplished Lecturer of International Relations and Diplomacy at Zetech University in Nairobi, Kenya, specializing in Peace and Conflict Studies. He holds an M.A. in International Relations from the United States International University-Africa, and a B.A. in Social Studies – Government and Public Administration from Moi University in Eldoret, Kenya. Solomon's teaching portfolio covers topics such as Development Dynamics in Africa, Regional Integration, and International Conflict Management. He is a Certified Professional Mediator and has certifications in pedagogy and academic quality assurance. His experience spans significant roles in humanitarian work with UNHCR and project management with USIU's Development Partnerships in Higher Education Project. He has contributed to multiple academic conferences and published in peer-reviewed journals on emerging themes like AI in conflict prevention, youth participation in climate resilience and digital diplomacy. A committed academic, Solomon actively contributes to curriculum development and mentorship as the patron of the UNESCO Club at Zetech. His professional affiliations include membership in the Christian Professional Mediators Association of Kenya (CPMAK) and the International Relations Society of Kenya (IRSK).",
} as const;

export function AfricaEventChokepointsPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Chokepoints and Consequences: How Hormuz and Bab el-Mandeb Are Reshaping the Horn of
            Africa&apos;s Economy and Security
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location: Online | Friday, August 28, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa (EDT): 9:00 am – 10:30 am | South Africa (SAST): 3:00 pm – 4:30 pm | Kenya / Ethiopia
            (EAT): 4:00 pm – 5:30 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:30 pm
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
            <a
              href={ZOOM_JOIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-teal-700/30 bg-teal-50 px-6 text-sm font-semibold text-teal-800 transition hover:border-teal-700/50 hover:bg-teal-100 dark:border-teal-700/40 dark:bg-teal-950/30 dark:text-teal-300 dark:hover:bg-teal-950/50"
            >
              Join on Zoom
            </a>
            <Link
              href={africaRoutes.events}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to events
            </Link>
          </div>

          <div className="mt-8 max-w-2xl rounded-2xl border border-zinc-200/90 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/70">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              Zoom meeting
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Friday, August 28, 2026 · 9:00 AM Eastern Time (US and Canada)
            </p>
            <dl className="mt-4 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Meeting ID:</dt>
                <dd>{ZOOM_MEETING_ID}</dd>
              </div>
              <div className="flex flex-wrap gap-x-2">
                <dt className="font-semibold text-zinc-900 dark:text-zinc-50">Passcode:</dt>
                <dd>{ZOOM_PASSCODE}</dd>
              </div>
            </dl>
            <a
              href={ZOOM_JOIN_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex text-sm font-semibold text-teal-800 underline-offset-2 hover:underline dark:text-teal-300"
            >
              Open Zoom join link
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar overview</h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Two of the world&apos;s most contested waterways, the Strait of Hormuz and the Bab el-Mandeb, sit
            at the edge of a widening war economy, where their disruption is not a distant Middle Eastern
            problem but a direct hit on fuel prices, food security, and fragile regional peace in the Horn of
            Africa (HoA). Following strikes on Iran that set off a chain reaction in global shipping, Iran
            declared the Strait of Hormuz closed to &ldquo;unfriendly&rdquo; vessels, and despite a brokered
            ceasefire and subsequent Memorandum of Understanding, tanker strikes and renewed bombardments
            returned the waterway to crisis by July. Roughly a fifth of the world&apos;s oil and liquefied
            natural gas normally passes through Hormuz, causing shipping volumes through the strait to
            collapse by more than nine-tenths since February.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The crisis has now spread directly to the Bab el-Mandeb Strait, the 29-kilometre gateway between
            the Red Sea and the Gulf of Aden situated between Yemen and the HoA, where Yemen&apos;s Houthi
            movement declared a full naval blockade of Saudi Arabia and moved missiles and drones into
            position. Because shipping vessels divert south around the Cape of Good Hope or attempt the Suez
            route when Hormuz is unstable, traffic and risk are heavily concentrated along the HoA&apos;s
            coastline in countries like Djibouti, Somalia, Eritrea, and Sudan. When Houthi missiles or Iranian
            mines make this corridor unsafe, the HoA does not merely watch a crisis unfold offshore; it
            becomes the crisis&apos;s shoreline.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The disruption carries heavy economic costs, most immediately on energy security as Brent crude
            pushes past $100 a barrel and exposes HoA states that import the bulk of their refined fuel to
            severe price shocks that ripple into transport, electricity, and food prices. Furthermore, trade
            route disruptions raise insurance premiums and add significant fuel costs and transit delays,
            acutely exposing Djibouti&apos;s port economy, which handles the overwhelming majority of
            landlocked Ethiopia&apos;s trade, to reduced port revenues and higher import bills. Beyond the
            economic toll, the security implications compound through a heavier foreign naval presence along
            the HoA coastline, a potential resurgence of Somali piracy due to higher-profile distractions, and
            the risk of ideological and weapons trafficking spillover from Yemen into fragile HoA states.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            With the Strait of Hormuz remaining a contested maritime corridor and Houthi attacks continuing to
            disrupt shipping through the Red Sea, this webinar brings out the critical relevance of how the
            disruption of these global trade routes is affecting security dynamics in the Horn of Africa and
            the region&apos;s economies.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Key webinar focus &amp; objectives
          </h2>

          <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">Core focus</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar investigates how ongoing disruptions and naval blockades in the Strait of Hormuz and
            the Bab el-Mandeb Strait ripple into the Horn of Africa, driving fuel price spikes, food
            insecurity, trade delays, and regional security vulnerabilities.
          </p>

          <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">Expected outcomes</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Attendees will gain a comprehensive political economy analysis of how maritime volatility impacts
            import-dependent economies, port revenues, regional trade routes, and cross-border security
            dynamics.
          </p>

          <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">Target audience</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Geopolitical analysts, international relations and security experts, Horn of Africa economic
            specialists, policymakers, regional trade practitioners, and researchers.
          </p>

          <WebinarProgramSupportLine program="04" className="mt-8" />
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
