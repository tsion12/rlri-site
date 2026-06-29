import { mainGallerySrc } from "@/lib/main-gallery";

/** Hero and pillar imagery for the Arctic Security flagship page. */
export const ARCTIC_SECURITY_IMAGES = {
  hero: mainGallerySrc("REAL LIFE INSTITUTE DAY 1-1.jpg"),
  pillar1Soccer: mainGallerySrc("REAL LIFE INSTITUTE 1-8.jpg"),
  pillar1Race: mainGallerySrc("REAL LIFE INSTITUTE 1-13.jpg"),
  pillar2Festival: mainGallerySrc("REAL LIFE INSTITUTE 1-15.jpg"),
  pillar3Dialogue: mainGallerySrc("REAL LIFE INSTITUTE-1.jpg"),
} as const;

export const ARCTIC_PILLAR_IDS = ["sports-community", "multiculturalism", "research-dialogue"] as const;
