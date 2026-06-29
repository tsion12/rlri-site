/**
 * Main-site photos in `public/assets/main-gallery/`.
 * Every photographic asset on the main site is sourced from this folder.
 * Add or remove filenames here when the folder is reorganized.
 */
export const MAIN_GALLERY_BASE = "/assets/main-gallery";

export const MAIN_GALLERY_FILES = [
  "REAL LIFE INSTITUTE 1-10 (1).jpg",
  "REAL LIFE INSTITUTE 1-11 (1).jpg",
  "REAL LIFE INSTITUTE 1-13.jpg",
  "REAL LIFE INSTITUTE 1-14.jpg",
  "REAL LIFE INSTITUTE 1-15.jpg",
  "REAL LIFE INSTITUTE 1-16 (1).jpg",
  "REAL LIFE INSTITUTE 1-17 (1).jpg",
  "REAL LIFE INSTITUTE 1-18 (3).jpg",
  "REAL LIFE INSTITUTE 1-22 (1).jpg",
  "REAL LIFE INSTITUTE 1-22 (2).jpg",
  "REAL LIFE INSTITUTE 1-4.jpg",
  "REAL LIFE INSTITUTE 1-6 (2).jpg",
  "REAL LIFE INSTITUTE 1-7 (2).jpg",
  "REAL LIFE INSTITUTE 1-8.jpg",
  "REAL LIFE INSTITUTE 1-9 (1).jpg",
  "REAL LIFE INSTITUTE DAY 1-1.jpg",
  "REAL LIFE INSTITUTE DAY 1-11(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-11.jpg",
  "REAL LIFE INSTITUTE DAY 1-12(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-13.jpg",
  "REAL LIFE INSTITUTE DAY 1-14(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-14.jpg",
  "REAL LIFE INSTITUTE DAY 1-15(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-15.jpg",
  "REAL LIFE INSTITUTE DAY 1-16(1) (1).jpg",
  "REAL LIFE INSTITUTE DAY 1-16(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-16.jpg",
  "REAL LIFE INSTITUTE DAY 1-17 (1) (1).jpg",
  "REAL LIFE INSTITUTE DAY 1-2 (1).jpg",
  "REAL LIFE INSTITUTE DAY 1-20.jpg",
  "REAL LIFE INSTITUTE DAY 1-22(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-30(1).jpg",
  "REAL LIFE INSTITUTE DAY 1-31.jpg",
  "REAL LIFE INSTITUTE DAY 1-32.jpg",
  "REAL LIFE INSTITUTE-1.jpg",
  "REAL LIFE INSTITUTE-10 (1).jpg",
  "REAL LIFE INSTITUTE-12.jpg",
  "REAL LIFE INSTITUTE-13.jpg",
  "WhatsApp Image 2025-08-23 at 15.19.35 (12).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.49 (2).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.50 (1).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.51 (1).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.52.jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.54 (1).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.55 (1) (1).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.56 (2).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.57 (1) (1).jpeg",
  "WhatsApp Image 2025-08-23 at 19.07.57 (2).jpeg",
  "WhatsApp Image 2025-08-23 at 19.08.01 (1).jpeg",
] as const;

export type MainGalleryFile = (typeof MAIN_GALLERY_FILES)[number];

export function mainGallerySrc(fileName: string): string {
  return `${MAIN_GALLERY_BASE}/${encodeURIComponent(fileName)}`;
}

export const MAIN_GALLERY_ITEMS = MAIN_GALLERY_FILES.map((file, index) => ({
  id: `gallery-${index}`,
  file,
  src: mainGallerySrc(file),
}));

/** Images per auto-scrolling film strip. */
export const MAIN_GALLERY_MARQUEE_COUNT = 10;

/** Slight tilts for polaroid wall (degrees). */
export const MAIN_GALLERY_POLAROID_ROTATIONS = [
  -5, 3, -2, 4, -4, 2, -3, 5, -1, 3, -4, 2, -2, 4, -3, 1, -5, 3,
] as const;

export function mainGalleryPolaroidRotate(index: number): number {
  return MAIN_GALLERY_POLAROID_ROTATIONS[index % MAIN_GALLERY_POLAROID_ROTATIONS.length];
}

export function mainGalleryPolaroidOffset(index: number): number {
  const offsets = [0, 6, -4, 10, -8, 4, -6, 8, -2, 12, -10, 5];
  return offsets[index % offsets.length];
}
