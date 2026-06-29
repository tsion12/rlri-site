/**
 * Partner logos for the main homepage carousel.
 * Logos live in `public/assets/main-gallery/partners/`.
 */
export type MainPartner = {
  id: string;
  name: string;
  logoSrc?: string;
};

const PARTNERS_BASE = "/assets/main-gallery/partners";

export const MAIN_PARTNER_PLACEHOLDERS: MainPartner[] = [
  { id: "iqaluit", name: "City of Iqaluit", logoSrc: `${PARTNERS_BASE}/iqaluit-logo.webp` },
  { id: "nunavut", name: "Government of Nunavut", logoSrc: `${PARTNERS_BASE}/nunavut.webp` },
];

export const MAIN_PARTNERS_AUTOPLAY_MS = 4500;
