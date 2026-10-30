import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AfricaLearnHubPage } from "@/components/learn/AfricaLearnHubPage";
import { LearnPasscodeGate } from "@/components/learn/LearnPasscodeGate";
import { MASTER_CLASS_COOKIE, isMasterClassUnlocked } from "@/lib/master-class/gate";

export const metadata: Metadata = {
  title: "Learning Hub | RLRI Africa Programs",
  description:
    "Paid, live, assessed courses and certificates on responsible AI and the work African institutions do. Flagship Ethical AI – Claude Master Class now open for pre-sale.",
};

export default async function LearnPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const jar = await cookies();
  if (!isMasterClassUnlocked(jar.get(MASTER_CLASS_COOKIE)?.value)) {
    const { error } = await searchParams;
    return <LearnPasscodeGate error={error === "1"} />;
  }

  return <AfricaLearnHubPage />;
}
