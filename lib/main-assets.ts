import { mainGallerySrc } from "@/lib/main-gallery";

/** Main institute lockup (`public/assets/main-site/logo_RLRI.png`). */
export const MAIN_LOGO_SRC = "/assets/main-site/logo_RLRI.png";

/** Home “Who we are” section — community gathering photo from the main gallery. */
export const MAIN_WHO_WE_ARE_IMAGE = {
  src: mainGallerySrc("REAL LIFE INSTITUTE 1-6 (2).jpg"),
  alt: "Diverse group of professionals collaborating around a table",
} as const;
