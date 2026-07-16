import { mainGallerySrc } from "@/lib/main-gallery";

/** Hero and pillar imagery for the Arctic Security flagship page. */
export const ARCTIC_SECURITY_IMAGES = {
  hero: mainGallerySrc(
    "From uphill challenges to lasting connections _- a race that inspired a whole community.jpg",
  ),
  pillar1Soccer: mainGallerySrc("Community Soccer initiative.jpeg"),
  pillar1Race: mainGallerySrc("REAL LIFE INSTITUTE 1-13.jpg"),
  pillar2Festival: mainGallerySrc("Multiculturalism & Food Festival.jpeg"),
  pillar3Dialogue: mainGallerySrc("Research & Northern – Southern Dialogue.webp"),
} as const;

export const ARCTIC_PILLAR_IDS = ["sports-community", "multiculturalism", "research-dialogue"] as const;
