import { MainHero } from "@/components/main/MainHero";
import { MainEventsGallery } from "@/components/main/MainEventsGallery";
import { MainJoinUs } from "@/components/main/MainJoinUs";
import { MainPartners } from "@/components/main/MainPartners";
import { MainRegionsMap } from "@/components/main/MainRegionsMap";
import { MainWhoWeAre } from "@/components/main/MainWhoWeAre";

export default function MainHomePage() {
  return (
    <>
      <MainHero />
      <MainWhoWeAre />
      <MainEventsGallery />
      <MainJoinUs />
      <MainRegionsMap />
      <MainPartners />
    </>
  );
}
