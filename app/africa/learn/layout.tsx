import type { Metadata } from "next";

// Team-only until launch: keep the hub out of search while it's in review.
// Access control is enforced per page (see page.tsx) so gated content never
// renders into the response.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
};

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
