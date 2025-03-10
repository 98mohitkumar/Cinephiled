import { cssClamp } from "../../utils/mixins";

import { pixelsPerRem } from "./misc";

// https://utopia.fyi/type/calculator/?c=480,16,1.1625,1280,16,1.25,6,2,&s=0.75%7C0.5%7C0.25,1.5%7C2%7C3%7C4%7C6,s-l&g=s,l,xl,12
const fontSizes = {
  static: [
    { key: "h1Static", size: 60, lineHeight: 70, letterSpacing: -0.5 },
    { key: "h2Static", size: 48, lineHeight: 58, letterSpacing: -0.35 },
    { key: "h3Static", size: 40, lineHeight: 52, letterSpacing: -0.2 },
    { key: "h4Static", size: 32, lineHeight: 42, letterSpacing: -0.15 },
    { key: "h5Static", size: 24, lineHeight: 34, letterSpacing: -0.05 },
    { key: "h6Static", size: 18.6, lineHeight: 28, letterSpacing: 0 },

    // base size and variations of p
    { key: "p", size: 16, lineHeight: 24, letterSpacing: 0.05 },
    { key: "small", size: 14, lineHeight: 21, letterSpacing: 0.1 },
    { key: "tiny", size: 12, lineHeight: 18, letterSpacing: 0.15 },
    { key: "micro", size: 10, lineHeight: 15, letterSpacing: 0.2 }
  ],
  responsive: [
    {
      key: "h1",
      size: { minSize: 40, maxSize: 60 },
      lineHeight: { minHeight: 48, maxHeight: 72 },
      letterSpacing: { minSpacing: -0.2, maxSpacing: -0.5 }
    },
    {
      key: "h2",
      size: { minSize: 32, maxSize: 48 },
      lineHeight: { minHeight: 42, maxHeight: 60 },
      letterSpacing: { minSpacing: -0.15, maxSpacing: -0.35 }
    },
    {
      key: "h3",
      size: { minSize: 28, maxSize: 40 },
      lineHeight: { minHeight: 38, maxHeight: 56 },
      letterSpacing: { minSpacing: -0.1, maxSpacing: -0.2 }
    },
    {
      key: "h4",
      size: { minSize: 24, maxSize: 32 },
      lineHeight: { minHeight: 34, maxHeight: 48 },
      letterSpacing: { minSpacing: -0.05, maxSpacing: -0.15 }
    },
    {
      key: "h5",
      size: { minSize: 20, maxSize: 24 },
      lineHeight: { minHeight: 28, maxHeight: 34 },
      letterSpacing: { minSpacing: 0, maxSpacing: -0.05 }
    },
    {
      key: "h6",
      size: { minSize: 17, maxSize: 18.6 },
      lineHeight: { minHeight: 24, maxHeight: 28 },
      letterSpacing: { minSpacing: 0, maxSpacing: 0 }
    },
    {
      key: "small-to-p",
      size: { minSize: 14, maxSize: 16 },
      lineHeight: { minHeight: 21, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.1, maxSpacing: 0.05 }
    },
    {
      key: "tiny-to-p",
      size: { minSize: 12, maxSize: 16 },
      lineHeight: { minHeight: 18, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.15, maxSpacing: 0.05 }
    },
    {
      key: "micro-to-p",
      size: { minSize: 10, maxSize: 16 },
      lineHeight: { minHeight: 15, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.2, maxSpacing: 0.05 }
    },
    {
      key: "tiny-to-small",
      size: { minSize: 12, maxSize: 14 },
      lineHeight: { minHeight: 18, maxHeight: 21 },
      letterSpacing: { minSpacing: 0.15, maxSpacing: 0.1 }
    },
    {
      key: "micro-to-small",
      size: { minSize: 10, maxSize: 14 },
      lineHeight: { minHeight: 15, maxHeight: 21 },
      letterSpacing: { minSpacing: 0.2, maxSpacing: 0.1 }
    },
    {
      key: "micro-to-tiny",
      size: { minSize: 10, maxSize: 12 },
      lineHeight: { minHeight: 15, maxHeight: 18 },
      letterSpacing: { minSpacing: 0.2, maxSpacing: 0.15 }
    }
  ]
} as const;

const staticFontSizeBuilder = ({ size, lineHeight, letterSpacing }: Record<string, number>) => {
  return [`${size / pixelsPerRem}rem`, { lineHeight: `${lineHeight / pixelsPerRem}rem`, letterSpacing: `${letterSpacing / pixelsPerRem}rem` }];
};

const responsiveFontSizeBuilder = ({ minSize, maxSize, minHeight, maxHeight, minSpacing, maxSpacing }: Record<string, number>) => {
  // clamp(min, value, max)
  const fontSizeClamp = cssClamp({ minSize, maxSize, convertToRem: true });
  const lineHeightClamp = cssClamp({ minSize: minHeight, maxSize: maxHeight, convertToRem: true });
  const letterSpacingClamp = cssClamp({ minSize: minSpacing, maxSize: maxSpacing, convertToRem: true });

  return [fontSizeClamp, { lineHeight: lineHeightClamp, letterSpacing: letterSpacingClamp }];
};

type FontConfig = { [key: string]: [string, { lineHeight: string; letterSpacing: string }] };

const tailwindFontSizeTokens: FontConfig = {
  ...Object.fromEntries(
    fontSizes.static.map(({ key, size, lineHeight, letterSpacing }) => [[key], staticFontSizeBuilder({ size, lineHeight, letterSpacing })])
  ),

  ...Object.fromEntries(
    fontSizes.responsive.map(
      ({ key, size: { minSize, maxSize }, lineHeight: { minHeight, maxHeight }, letterSpacing: { minSpacing, maxSpacing } }) => [
        [key],
        responsiveFontSizeBuilder({ minSize, maxSize, minHeight, maxHeight, minSpacing, maxSpacing })
      ]
    )
  )
};

const fontSizeTokens = Object.fromEntries(Object.entries(tailwindFontSizeTokens).map(([key, [size]]) => [key, size])) as Record<
  (typeof fontSizes.static)[number]["key"] | (typeof fontSizes.responsive)[number]["key"],
  string
>;

export { tailwindFontSizeTokens, fontSizeTokens };
