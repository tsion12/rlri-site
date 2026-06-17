import type { Metadata } from "next";
import { AfricaBlogsPage } from "@/components/africa/AfricaBlogsPage";
import { getAfricaProgramLabel, getAfricaPosts, isAfricaWpAvailable, parseAfricaProgram, postMatchesAfricaProgram } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Blogs & Op-eds | Africa Program – Real Life Research Institute",
  description:
    "Research insights, field perspectives, and expert commentary from the Real Life Research Institute Africa Programs team.",
};

type BlogsPageProps = {
  searchParams: Promise<{
    program?: string | string[];
  }>;
};

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
  const [posts, params, isAfricaCmsAvailable] = await Promise.all([getAfricaPosts(), searchParams, isAfricaWpAvailable()]);
  const rawProgram = Array.isArray(params.program) ? params.program[0] : params.program;
  const activeProgram = parseAfricaProgram(rawProgram);
  const filteredPosts = activeProgram
    ? posts.filter((post) => postMatchesAfricaProgram(post, activeProgram))
    : posts;

  return (
    <AfricaBlogsPage
      posts={filteredPosts}
      activeProgramLabel={activeProgram ? getAfricaProgramLabel(activeProgram) : null}
      isServiceUnavailable={!isAfricaCmsAvailable && posts.length === 0}
    />
  );
}
