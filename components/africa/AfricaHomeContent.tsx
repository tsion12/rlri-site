import { AfricaHero } from "@/components/africa/AfricaHero";
import { AfricaHomeGallery } from "@/components/africa/AfricaHomeGallery";
import { AfricaImpactShowcase } from "@/components/africa/AfricaImpactShowcase";
import { AfricaHomePrograms } from "@/components/africa/AfricaHomePrograms";
import { AfricaLatestNews } from "@/components/africa/AfricaLatestNews";
import { getAfricaPosts, getUpcomingEventsPage } from "@/lib/wp";

export async function AfricaHomeContent() {
  const [africaPosts, upcomingEvent] = await Promise.all([getAfricaPosts(), getUpcomingEventsPage()]);
  const latestPosts = africaPosts.slice(0, 3);
  const featuredPost = latestPosts.find((post) => post.featuredImage) ?? latestPosts[0] ?? null;

  return (
    <>
      <AfricaHero featuredPost={featuredPost} upcomingEvent={upcomingEvent} />
      <AfricaLatestNews posts={latestPosts} />
      <AfricaHomeGallery />
      <AfricaImpactShowcase />
      <AfricaHomePrograms />
    </>
  );
}
