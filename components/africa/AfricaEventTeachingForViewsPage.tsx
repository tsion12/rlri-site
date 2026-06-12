import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const SPEAKERS = [
  {
    name: "Alvin Lontum Ndzewiyi",
    role: "Speaker",
    photo: "/assets/june_26/Alvin Lontum Ndzewiyi.png",
    bio: "Alvin Lontum Ndzewiyi is a dedicated researcher with a growing focus on evidence-based monitoring and evaluation. He demonstrates strong analytical skills in literature synthesis, data evaluation, and critical appraisal of scientific evidence. Alvin is proficient in organizing complex information into coherent insights, making him effective in both independent research and collaborative academic environments. He continues to build expertise in epidemiological research and scholarly writing, positioning himself as a promising contributor to policy development.",
  },
  {
    name: "Nyakno Benson",
    role: "Speaker",
    photo: "/assets/june_26/Nyakno Benson.png",
    bio: "Nyakno Benson is an educator, creative entrepreneur, educational content creator, and advocate for innovative learning. With over 12 years of experience in education, she is passionate about making learning engaging, inclusive, and practical for children. She currently serves as a classroom teacher and Social Media Manager at Clover Hall International School, where she creates educational content and supports child-centered learning initiatives. She is also the Educational Content Creator for Lean On Me Foundation, developing learning resources, lesson schemes, educational videos, and digital content that promote access to quality education. As the Founder of Yarkys Emporium, a creative brand that blends art, craft and innovation to transform how children learn, she designs creative educational resources, delivers teacher training, transforms learning spaces, and leads arts-based programs that empower children through creativity, entrepreneurship, sustainability, and hands-on learning experiences.",
  },
  {
    name: "Jabulani Simplisio Chibaya",
    role: "Speaker",
    photo: "/assets/june_26/Jabulani Simplisio Chibaya.png",
    bio: "Jabulani Simplisio Chibaya is an AI strategist, data governance practitioner, researcher, and technology educator with over a decade of experience at the intersection of artificial intelligence, cybersecurity, digital transformation, and public policy. He is the Founder and CEO of GourdAI and a Business Intelligence and AI Consultant, advising organizations across Africa on responsible AI adoption, data governance, digital resilience, and emerging technology strategy. His work spans AI literacy, data protection, cyber risk management, open-source intelligence (OSINT), and digital skills development, with a strong focus on helping institutions navigate the opportunities and challenges of the digital economy. As a researcher, trainer, and public speaker, Jabulani has delivered workshops, lectures, and capacity-building programs for universities, businesses, youth organizations, and policymakers on topics including AI ethics, digital rights, cybersecurity, online safety, and the future of work. He is particularly interested in how emerging technologies are reshaping education, governance, and society across Africa. Through his research and advocacy, he promotes the responsible use of technology while advancing conversations on data privacy, child online protection, institutional accountability, and the safeguarding of digital rights in increasingly connected learning environments.",
  },
] as const;

const MODERATOR = {
  name: "Dr Tebo Marcline Timben",
  role: "Moderator",
  photo: "/assets/june_26/Dr Tebo Marcline Timben.png",
  bio: "Dr Tebo Marcline Timben is an education researcher at eBASE Africa, Cameroon, and a teacher trainer with extensive experience in teacher professional development and evidence-informed education practice. Her work focuses on strengthening education systems, improving teaching quality, and promoting innovative approaches to learning in African contexts. As both a researcher and practitioner, Dr. Timben works closely with pre-service and in-service teachers, supporting the integration of effective pedagogical practices and responsible use of educational technologies. Her research interests include teacher development, digital learning environments, educational innovation, and the intersection of technology, ethics, and child wellbeing in education. Drawing on her experience from the Cameroonian context, she is committed to advancing learner-centred approaches that balance educational innovation with the protection of children's rights, dignity, and psychological safety in an increasingly digital world.",
} as const;

export function AfricaEventTeachingForViewsPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Teaching for Views: Social Media and the Emerging Digital Risks in African Classrooms
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location: Online | Friday, June 26, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa (EDT): 9:00 am – 10:00 am | South Africa (SAST): 3:00 pm – 4:00 pm | Kenya / Ethiopia
            (EAT): 4:00 pm – 5:00 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:00 pm
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
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
            The influx of young educators into overstretched school systems in most parts of Africa has
            attracted new forms of digital risks. Across the region, a nascent trend is fundamentally
            reshaping the traditional classroom environment, as so-called Gen Z educators, equipped with
            smartphones, transform learning spaces into content-creation studios. While short-form videos of
            &ldquo;engaging lessons&rdquo; are often viewed as innovative signs of digital adaptation in the
            continent, they raise critical questions regarding the cost to learners. Beyond educational
            concerns, the capture and dissemination of student identities, often without informed parental
            consent, presents a profound infringement on the digital rights and dignity of minors. Parents
            who deliberately keep their children offline to avoid cyberbullying or unauthorized image
            manipulation find these safeguards bypassed by classroom content creation.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            The transformation of classrooms into content studios has exposed a dangerous policy vacuum
            regarding digital privacy. The non-consensual capture of student identities is a profound
            infringement on the digital rights of minors, bypassing parental safeguards against cyberbullying
            and image manipulation. This trend signals a breakdown in institutional liability, proving that
            leaving digital responsibility to individual educator discretion is a risk school systems can no
            longer afford to take. While progress remains limited, there are early signs that some
            governments are attempting to address this trend through direct legal intervention. In regions
            like East Africa, the shift toward enforcing data protection laws is creating a new precedent for
            institutional accountability.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            For example, in 2023, Roma School, an educational institution based in Uthiru, Kenya, was fined
            KES 4,550,000 for posting minors&apos; pictures without parental consent. Similarly, in South
            Africa, the Department of Basic Education has been forced to intervene and suspend educators for
            circulating videos that led to the cyber-ridicule of pupils, further underscoring the risks of
            leaving digital responsibility to individual discretion. The transition from a learning-centred
            environment to a performance-centred one compromises educational integrity, as the focus shifts
            from concentration and curiosity to presentation for an external audience.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Purpose of the webinar</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar brings together digital futures experts, researchers, educators, and parents to
            examine the rapidly expanding trend across Africa of using students for social media content,
            highlighting its risks and drawing lessons from both good practice and harmful misuse.
          </p>

          <WebinarProgramSupportLine program="02" className="mt-8" />
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
