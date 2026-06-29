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

/**
 * Hero carousel slides — update images in this file when assets change.
 * Copy lives in `lib/i18n/messages/{en,fr,iu}.ts` under `home.heroSlides`.
 */
export const MAIN_HERO_SLIDES: MainHeroSlide[] = [
  {
    id: "primary",
    image: mainGallerySrc("REAL LIFE INSTITUTE DAY 1-1.jpg"),
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
  },
];

export const MAIN_HERO_INTERVAL_MS = 5000;
