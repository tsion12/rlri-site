/**
 * Single source of truth for the Africa Program FAQ. Shared by the interactive
 * FAQ page (components/africa/AfricaFaqPage.tsx) and the FAQPage JSON-LD so the
 * structured data can never drift from what visitors actually read.
 */
export type FaqCategory = "all" | "organization" | "our-work" | "support" | "get-involved";

export const FAQ_CATEGORIES: { id: FaqCategory; label: string; count: number }[] = [
  { id: "all", label: "All questions", count: 8 },
  { id: "organization", label: "About Us", count: 2 },
  { id: "our-work", label: "Our Work", count: 1 },
  { id: "support", label: "Support & Giving", count: 3 },
  { id: "get-involved", label: "Get Involved", count: 2 },
];

export const AFRICA_FAQS = [
  {
    id: "q1",
    category: "organization" as FaqCategory,
    categoryLabel: "About Us",
    question: "What is Real Life Research Institute Africa Program?",
    answer:
      "The Real Life Research Institute Africa Program is a Pan-African non-profit powered by a dynamic regional network and field teams across Kenya, Zimbabwe, Ethiopia, Cameroon, Nigeria, and Ghana. The Institute is dedicated to addressing Africa's most pressing challenges through locally led research and community-driven action. Our work advances climate resilience, energy access, urban sustainability, food security, gender equality, and peacebuilding. Powered by dedicated staff and a trusted network of partners and field experts across Africa, we deliver impactful programs that connect communities, engage young people in Africa and the diaspora, and collaborate with global development partners committed to Africa's future.",
  },
  {
    id: "q2",
    category: "organization" as FaqCategory,
    categoryLabel: "About Us",
    question: "What are Real Life Research Institute Africa Program's safeguarding principles?",
    answer:
      'Real Life Research Institute Africa Program is committed to upholding the highest standards of safeguarding to ensure the safety, dignity, and well-being of all individuals involved in our programs, especially children, youth, women, and vulnerable community members. Our safeguarding principles include zero tolerance for abuse and exploitation. All staff, volunteers, and partners are expected to adhere to our safeguarding policy and code of conduct. For more information, please see the “Policies” section on our website to access our full safeguarding policy and related documents.',
  },
  {
    id: "q3",
    category: "our-work" as FaqCategory,
    categoryLabel: "Our Work",
    question: "How does Real Life Research Institute Africa Program decide where to work?",
    answer:
      "Real Life Research Institute Africa Program determines where to work based on a combination of community-identified needs, research evidence, and strategic partnerships. We prioritize regions and populations where we have established partnerships, as well as those with the most pressing needs. We respond to urgent challenges, such as climate vulnerability and humanitarian crises, across Africa through research and collaboration with stakeholders, organizations, and experts who understand the unique context of each community.",
  },
  {
    id: "q4",
    category: "support" as FaqCategory,
    categoryLabel: "Support & Giving",
    question: "How are my contributions used in Real Life Research Institute Africa Program's development and charitable projects?",
    answer:
      "We are committed to transparency and accountability in how we use contributions. Donations directly support the delivery of our programs, including humanitarian relief, community-based research, and initiatives addressing climate change, insecurity, energy poverty, urban waste, gender inequality, and food insecurity. The majority of funds go directly toward implementing projects on the ground. A modest portion supports essential administrative and operational functions that ensure strong oversight, coordination, compliance, and measurable impact. We regularly share updates, reports, and impact stories so you can see how your support is making a difference. We also actively engage our partners and donors through monthly webinars, policy briefs, and program updates.",
  },
  {
    id: "q5",
    category: "support" as FaqCategory,
    categoryLabel: "Support & Giving",
    question: "Can I donate specifically to the scholarship or emergency relief fund?",
    answer:
      "Yes, you can choose to direct your donation specifically to our scholarship fund or emergency fund. When donating through our website, please specify your preferred fund to ensure your contribution supports the cause that matters most to you.",
  },
  {
    id: "q6",
    category: "support" as FaqCategory,
    categoryLabel: "Support & Giving",
    question: "Who benefits from Real Life Research Institute Africa Program's scholarships and emergency relief fund?",
    answer:
      "Real Life Research Institute Africa Program's scholarships and emergency relief fund primarily benefit individuals from underserved communities. We also support individuals and families in crisis, such as those affected by displacement, housing insecurity, and other emergencies, by providing timely assistance to help them regain stability and continue their personal or academic journey.",
  },
  {
    id: "q7",
    category: "get-involved" as FaqCategory,
    categoryLabel: "Get Involved",
    question: "How can I support Real Life Research Institute Africa Program projects?",
    answer:
      "You can support the Real Life Research Institute Africa Program in many ways. Contributions may include financial donations, volunteering your time and expertise, partnering with us, or participating in our community events and campaigns. If you are invited to speak at one of our webinars or events, you may also choose to donate your speaker honorarium to support our work. To explore partnership opportunities or offer support, please fill out the partnership form on our website or contact us directly at contact-africa@reallifeinstitute.org.",
  },
  {
    id: "q8",
    category: "get-involved" as FaqCategory,
    categoryLabel: "Get Involved",
    question: "What internship, volunteer, or career opportunities are available at Real Life Africa Program?",
    answer:
      "Real Life Research Institute Africa Program offers a range of internships, volunteer, and career opportunities for individuals passionate about community development, research, and social impact. We also frequently host webinars and online events that discuss key development issues within the African context. We invite researchers and experts to share peer-reviewed research and to contribute to our policy briefs. Applicants from diverse backgrounds, including students, recent graduates, and early-career professionals seeking meaningful experience, are all welcome to participate. Current opportunities are posted on our website.",
  },
] as const;

/** schema.org FAQPage markup generated from the FAQ content above. */
export function africaFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: AFRICA_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
