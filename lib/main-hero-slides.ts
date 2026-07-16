import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainRoutes } from "@/lib/main-routes";

export type MainHeroSlideCta = {
  labelKey: TranslationKey;
  href: string;
  external?: boolean;
};

export type MainHeroSlide = {
  id: string;
  image: string;
  imageAltKey: TranslationKey;
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  primaryCta: MainHeroSlideCta;
  secondaryCta: MainHeroSlideCta;
};

const MAIN_HERO_IMAGE_FILES = [
  "Live from the run 1.jpg",
  "man running while smiling.jpg",
  "Iqaluit Unity Race.jpeg",
  "Live from the run 13.jpg",
  "Celebrate Canada pictures 3.jpeg",
  "Live from the run 24.jpg",
  "Welcome to Real Life Research Institute.jpg",
  "Live from the run 2.jpg",
] as const;

const MAIN_HERO_COPY = {
  imageAltKey: "home.heroSlides.primary.imageAlt",
  eyebrowKey: "home.heroSlides.primary.eyebrow",
  titleKey: "home.heroSlides.primary.title",
  subtitleKey: "home.heroSlides.primary.subtitle",
  primaryCta: { labelKey: "home.heroSlides.primary.ctaEvents", href: mainRoutes.events },
  secondaryCta: {
    labelKey: "home.heroSlides.primary.ctaAfrica",
    href: mainRoutes.africaProgram,
    external: true,
  },
} as const satisfies Omit<MainHeroSlide, "id" | "image">;

/**
 * Hero carousel slides — update images in this file when assets change.
 * Copy lives in `lib/i18n/messages/{en,fr,iu}.ts` under `home.heroSlides`.
 */
export const MAIN_HERO_SLIDES: MainHeroSlide[] = MAIN_HERO_IMAGE_FILES.map((file, index) => ({
  id: `hero-${index}`,
  image: mainGallerySrc(file),
  ...MAIN_HERO_COPY,
}));

export const MAIN_HERO_INTERVAL_MS = 2800;
