import { mainGallerySrc } from "@/lib/main-gallery";

/** Main institute lockup (`public/assets/main-site/logo_RLRI.png`). */
export const MAIN_LOGO_SRC = "/assets/main-site/logo_RLRI.png";

/** Home “Who we are” section — team photo at the RLRI banner from the main gallery. */
export const MAIN_WHO_WE_ARE_IMAGE = {
  src: mainGallerySrc("Welcome to Real Life Research Institute.jpg"),
  alt: "RLRI team members cheering together in front of a Real Life Research Institute banner",
} as const;
