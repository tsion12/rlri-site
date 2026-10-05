import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSe7DrKLf75_w2PFDWRVGh4E360RH6NgL0YmbeiUOw2OrlPLfg/viewform?usp=publish-editor";

const SPEAKERS = [
  {
    name: "Robiatul Adawiyah",
    role: "Speaker",
    photo: "/assets/oct_30/Robiatul Adawiyah.jpg",
    bio: "Robiatul Adawiyah is a PhD researcher in Materials Engineering at the University of Southern Queensland, Australia, with academic backgrounds in Chemistry and Materials Science. Her research focuses on sustainable materials, waste valorisation, and circular approaches to addressing environmental challenges. Beyond research, she is passionate about environmental education, youth engagement, and science communication. She is the Founder and Director of Green Circle, a youth-driven initiative promoting sustainability and community empowerment. Ada has also been involved in teaching, mentoring, community initiatives, and international youth programmes. Through her research, education, and community work, she aims to connect scientific knowledge with practical solutions and empower young people to participate meaningfully in building a more sustainable future.",
  },
  {
    name: "Buhlebemvelo Dlamini",
    role: "Speaker",
    photo: "/assets/oct_30/Buhlebemvelo Dlamini.jpg",
    bio: "Buhlebemvelo Dlamini is an interdisciplinary practitioner, systems thinker and Environmental Education Specialist working at the intersection of climate change, human wellbeing, food security and community resilience. With a background in Psychology, her work explores the human dimensions of environmental and social challenges, including how people understand risk, respond to environmental disruption, and engage in behavioral change. She is the Founder and Executive Director of 4Earth, a youth-focused initiative that uses environmental education, sustainable agriculture and climate awareness to make climate action practical and locally meaningful. Her broader work spans planetary health, youth development, disaster resilience, sustainable development, and social justice. She has been a part of various youth-led and international platforms including the beVisioneers: Mercedes-Benz Fellowship, WWF YCC, Women Leaders in Planetary Health, Y20, UN Volunteers and LCOY South Africa. Buhlebemvelo is particularly interested in connecting environmental education with the realities of how people live, cope, and build resilient communities.",
  },
  {
    name: "Letlhogonolo Peter Moloela",
    role: "Speaker",
    photo: "/assets/oct_30/Letlhogonolo Peter Moloela.jpg",
    bio: "Letlhogonolo Peter Moloela is a South African educator, environmental entrepreneur and nonprofit leader working at the intersection of education, waste management, youth skills development and sustainability. He holds a Bachelor of Education in Senior Phase and Further Education and Training, specialising in Mathematics and Mechanical Technology, and has experience in teaching, technical skills facilitation, tutoring, mentoring and youth development. He is the Founder of a South African start-up, EcoWise Solutions, an environmental initiative focused on sustainable alternatives to single-use plastic bags, waste reduction and environmental innovation, and the Founder of TechScience Tutors, an education initiative focused on academic support and skills development. He currently serves as Co-Executive Director of 4Earth and as the Deputy Secretary General of the Waste Management Council of South Africa (WMCSA). His interests include circular economy approaches, environmental education, green entrepreneurship, youth empowerment and practical school-based solutions to sustainability challenges.",
  },
] as const;

const MODERATOR = {
  name: "Gideon Mhlanga",
  role: "Moderator",
  photo: "/assets/oct_30/Gideon Mhlanga.jpg",
  bio: "Gideon Mhlanga is an Electronic Engineering specialist with experience spanning digital health, industrial systems, renewable energy, and technology entrepreneurship. His professional work has involved deploying and supporting technology solutions, system integration, technical problem-solving, and engaging with clients and stakeholders across different environments. Beyond engineering, he is the founder of EcoMart, a circular-electronics venture focused on electronics refurbishment and responsible e-waste management. Gideon has also participated in academic, professional, and leadership platforms that have strengthened his interest in research, innovation, and knowledge sharing. He is passionate about creating meaningful conversations that connect technical knowledge with real-world challenges and practical solutions.",
} as const;

export function AfricaEventWasteToWealthPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Turning Waste into Wealth: How Creative Recycling Can Drive Environmental Sustainability in
            African Schools
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location: Online | Friday, October 30, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa (EDT): 9:00 am – 10:30 am | South Africa (SAST): 3:00 pm – 4:30 pm | Kenya / Ethiopia
            (EAT): 4:00 pm – 5:30 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:30 pm
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
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar overview</h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Across the African continent, rapid urbanization and inadequate waste management systems have
            turned schools and surrounding communities into focal points for accumulating plastic waste, paper
            debris, and discarded organic materials. Traditional disposal methods, such as open dumping and
            burning, release toxic pollutants into the air and soil while exposing students and local residents
            to severe public health hazards. In many regions, educational institutions lack structured
            environmental programs, leaving schools to unintentionally contribute to the local waste burden
            rather than serving as centers for ecological solutions. This linear &ldquo;take-make-dispose&rdquo;
            model fails to equip the next generation with the practical tools and consciousness needed to tackle
            the mounting climate pressures facing their local environments.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            In response to these systemic challenges, educational institutions are increasingly uniquely
            positioned to spearhead grassroots environmental stewardship through circular economy initiatives.
            Schools generate substantial daily volumes of recyclable materials, making them ideal incubators for
            localized waste collection, sorting, and upcycling hubs. By integrating creative recycling into daily
            campus life, schools can transform discarded plastics, tires, and packaging into functional assets
            such as classroom furniture, paving blocks, and campus art installations. Furthermore, these
            initiatives bridge the gap between abstract environmental theories taught in classrooms and
            tangible, hands-on community action, shifting the paradigm from passive waste generation to active
            resource creation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Implementing school-based upcycling and recycling programs yields profound multi-sectoral benefits,
            beginning with hands-on vocational and entrepreneurial training that teaches students how to monetize
            waste streams. When students participate in converting trash into marketable products such as
            eco-bricks, bags, or decorative items, they develop essential financial literacy and green-economy
            skills that can uplift their wider households and communities. At the same time, these projects
            significantly reduce institutional overhead costs by producing low-cost school supplies and
            infrastructure from otherwise discarded materials. Beyond economics, fostering these habits early on
            builds long-term institutional resilience, turning schools into clean, healthy, and inspiring
            learning environments that actively mitigate local pollution.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            With creative recycling offering a practical pathway to address chronic waste management issues while
            empowering the next generation of eco-entrepreneurs, this webinar brings out the critical relevance
            of how innovative school-based initiatives can drive environmental sustainability and economic
            resilience across African communities.
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
            This webinar explores how schools and surrounding communities can move beyond the linear
            &ldquo;take-make-dispose&rdquo; waste model to combat urban waste accumulation, toxic open burning,
            and the lack of structured environmental programs in African educational institutions.
          </p>

          <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">Expected outcomes</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Participants will gain practical frameworks on how to transform campus waste into functional
            infrastructure, acquire strategies for teaching green-economy entrepreneurial skills to students, and
            learn how to lower institutional overhead costs.
          </p>

          <h3 className="mt-6 text-base font-semibold text-zinc-900 dark:text-zinc-50">Target audience</h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Environmental education specialists, green economy entrepreneurs, school administrators, educators,
            youth leaders, and African school sustainability advocates.
          </p>

          <WebinarProgramSupportLine program="03" className="mt-8" />
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
