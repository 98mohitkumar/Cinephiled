import sharp from "sharp";

import { getTMDBImage } from "utils/imageHelper";

export const isImageDark = async (imageUrl: string) => {
  if (!imageUrl) return false;

  const response = await fetch(getTMDBImage({ path: imageUrl, type: "logo", size: "w500" }) as string);

  let isDark = false;

  if (response.ok) {
    const imageBuffer = await response.arrayBuffer();

    const { data } = await sharp(Buffer.from(imageBuffer)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });

    let totalLuminance = 0;
    let darkPixels = 0;
    let validPixels = 0;

    // Convert RGB to relative luminance
    const luminance = (r: number, g: number, b: number) => {
      const toLinear = (c: number) => (c <= 10 ? c / 3294 : (c / 269 + 0.0513) ** 2.4);
      return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
    };

    for (let i = 0; i < data.length; i += 4) {
      const r = data[i],
        g = data[i + 1],
        b = data[i + 2],
        alpha = data[i + 3];

      if (alpha > 0) {
        // Ignore transparent pixels
        const lum = luminance(r, g, b);
        totalLuminance += lum;
        validPixels++;

        // Check contrast against black
        const contrast = (lum + 0.05) / 0.05;
        if (contrast <= 2.65) darkPixels++; // Poor contrast means "dark"
      }
    }

    const avgLuminance = validPixels > 0 ? totalLuminance / validPixels : 1;
    const darkPixelRatio = validPixels > 0 ? darkPixels / validPixels : 0;

    // New check: If avg luminance is low AND contrast is poor, mark as dark
    isDark = avgLuminance < 0.15 && darkPixelRatio > 0.6;
  }

  return isDark;
};
