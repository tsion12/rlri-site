import { cookies } from "next/headers";
import { MasterClassHub } from "@/components/master-class/MasterClassHub";
import { PasscodeGate } from "@/components/master-class/PasscodeGate";
import { MASTER_CLASS_COOKIE, isMasterClassUnlocked } from "@/lib/master-class/gate";

export default async function MasterClassPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const jar = await cookies();
  const unlocked = isMasterClassUnlocked(jar.get(MASTER_CLASS_COOKIE)?.value);
  const params = await searchParams;

  if (!unlocked) {
    return <PasscodeGate error={params.error === "1"} />;
  }

  return <MasterClassHub />;
}
