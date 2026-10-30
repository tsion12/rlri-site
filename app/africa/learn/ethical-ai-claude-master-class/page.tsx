import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AfricaMasterClassPage } from "@/components/learn/AfricaMasterClassPage";
import { LearnPasscodeGate } from "@/components/learn/LearnPasscodeGate";
import { MASTER_CLASS_COOKIE, isMasterClassUnlocked } from "@/lib/master-class/gate";

export const metadata: Metadata = {
  title: "Ethical AI – Claude Master Class | RLRI Learning Hub",
  description:
    "Four live sessions on Zoom plus a graded capstone. Responsible AI for African institutions — UNESCO and OECD principles, data protection, and a verifiable RLRI certificate. Pre-sale open.",
};

export default async function MasterClassCoursePage() {
  const jar = await cookies();
  if (!isMasterClassUnlocked(jar.get(MASTER_CLASS_COOKIE)?.value)) {
    return <LearnPasscodeGate />;
  }

  return <AfricaMasterClassPage />;
}
