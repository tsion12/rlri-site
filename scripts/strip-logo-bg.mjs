/**
 * Removes the solid black background from the RLRI Africa Program logo.
 * Input:  public/assets/africa-program-logo.png  (black canvas, 1024×1024)
 * Output: public/assets/africa-program-logo-transparent.png
 */
import sharp from "sharp";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const src  = path.resolve(__dirname, "../public/assets/RLRL-AP-Logo.png");
const dest = path.resolve(__dirname, "../public/assets/RLRL-AP-Logo.png");

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
const out = Buffer.from(data);

const THRESHOLD = 40; // pixels with R+G+B < 3×threshold are considered "black"

for (let i = 0; i < out.length; i += channels) {
  const r = out[i], g = out[i + 1], b = out[i + 2];
  // Perceptual luminance
  const luma = 0.299 * r + 0.587 * g + 0.114 * b;
  if (luma < THRESHOLD) {
    // Black/near-black → transparent
    out[i + 3] = 0;
  } else {
    // Keep pixel; restore full opacity where the artwork is
    out[i + 3] = 255;
  }
}

await sharp(out, { raw: { width, height, channels } })
  .png({ compressionLevel: 9, quality: 100 })
  .toFile(dest);

console.log(`✓  Wrote ${dest}`);
