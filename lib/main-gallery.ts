/**
 * Main-site photos in `public/assets/main-gallery/`.
 * Every photographic asset on the main site is sourced from this folder.
 * Add or remove filenames here when the folder is reorganized.
 */
export const MAIN_GALLERY_BASE = "/assets/main-gallery";

export const MAIN_GALLERY_FILES = [
  // Love & Unity Run — curated set. First 20 feed the marquee strips, first 12 the spotlight picker.
  "Live from the run 1.jpg",
  "From uphill challenges to lasting connections _- a race that inspired a whole community.jpg",
  "Iqaluit Unity Race.jpeg",
  "man running while smiling.jpg",
  "Live from the run 13.jpg",
  "Unity Race pictures 1.jpg",
  "Live from the run 24.jpg",
  "Award being given to couple.jpg",
  "Live from the run 2.jpg",
  "Live from the run fireman and safety.jpeg",
  "Live from the run 20.jpg",
  "Unity Race pictures 2.jpg",
  "Live from the run 3.jpg",
  "Live from the run 4.jpg",
  "Live from the run 5.jpg",
  "Live from the run 7.jpg",
  "Live from the run 8.jpg",
  "Live from the run 9.jpg",
  "Live from the run 10.jpg",
  "Live from the run 14.jpg",
  "Live from the run 15.jpeg",
  "Live from the run 16.jpeg",
  "Live from the run 18.jpeg",
  "Live from the run 19.jpeg",
  "Live from the run 21.jpg",
  "Unity Race pictures 3.jpeg",
  // Run-day photos from the 2025-08-23 event (pre-existing)
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
