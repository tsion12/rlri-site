import type { Metadata } from "next";
import { MasterClassShell } from "@/components/master-class/MasterClassShell";

export const metadata: Metadata = {
  title: "Ethical AI · Claude Master Class (internal)",
  description: "Internal RLRI learning hub for the Ethical AI – Claude Master Class.",
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function MasterClassLayout({ children }: { children: React.ReactNode }) {
  return <MasterClassShell>{children}</MasterClassShell>;
}
