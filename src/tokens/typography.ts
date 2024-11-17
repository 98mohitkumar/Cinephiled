import { cssClamp } from "../utils/mixins";
import { pixelsPerRem } from "./misc";

// https://utopia.fyi/type/calculator/?c=480,18,1.125,1280,20,1.2,5,3,&s=0.75|0.5|0.25,1.5|2|3|4|6,s-l&g=s,l,xl,12
const fontSizes = {
  static: [
    { key: "h1Static", size: 49.77, lineHeight: 64, letterSpacing: -0.4 },
    { key: "h2Static", size: 41.47, lineHeight: 52, letterSpacing: -0.3 },
    { key: "h3Static", size: 34.56, lineHeight: 44, letterSpacing: -0.25 },
    { key: "h4Static", size: 28.8, lineHeight: 36, letterSpacing: -0.2 },
    { key: "h5Static", size: 24, lineHeight: 32, letterSpacing: -0.1 },
    { key: "h6Static", size: 20, lineHeight: 28, letterSpacing: -0.05 },

    // base size and variations of p
    { key: "p", size: 16, lineHeight: 24, letterSpacing: 0 },
    { key: "small", size: 14, lineHeight: 21, letterSpacing: 0.1 },
    { key: "tiny", size: 12, lineHeight: 18, letterSpacing: 0.15 },
    { key: "micro", size: 10, lineHeight: 16, letterSpacing: 0.25 }
  ],
  responsive: [
    {
      key: "h1",
      size: { minSize: 32.44, maxSize: 49.77 },
      lineHeight: { minHeight: 43.28, maxHeight: 64 },
      letterSpacing: { minSpacing: -0.28, maxSpacing: -0.4 }
    },
    {
      key: "h2",
      size: { minSize: 28.83, maxSize: 41.47 },
      lineHeight: { minHeight: 36.95, maxHeight: 52 },
      letterSpacing: { minSpacing: -0.22, maxSpacing: -0.3 }
    },
    {
      key: "h3",
      size: { minSize: 25.63, maxSize: 34.56 },
      lineHeight: { minHeight: 32.88, maxHeight: 44 },
      letterSpacing: { minSpacing: -0.2, maxSpacing: -0.25 }
    },
    {
      key: "h4",
      size: { minSize: 22.78, maxSize: 28.8 },
      lineHeight: { minHeight: 27.96, maxHeight: 36 },
      letterSpacing: { minSpacing: -0.08, maxSpacing: -0.2 }
    },
    {
      key: "h5",
      size: { minSize: 20.25, maxSize: 24 },
      lineHeight: { minHeight: 25.2, maxHeight: 32 },
      letterSpacing: { minSpacing: -0.05, maxSpacing: -0.1 }
    },
    {
      key: "h6",
      size: { minSize: 18, maxSize: 20 },
      lineHeight: { minHeight: 24, maxHeight: 28 },
      letterSpacing: { minSpacing: -0.05, maxSpacing: -0.05 }
    },
    {
      key: "small-to-p",
      size: { minSize: 14, maxSize: 16 },
      lineHeight: { minHeight: 21, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.1, maxSpacing: 0 }
    },
    {
      key: "tiny-to-p",
      size: { minSize: 12, maxSize: 16 },
      lineHeight: { minHeight: 18, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.15, maxSpacing: 0 }
    },
    {
      key: "micro-to-p",
      size: { minSize: 10, maxSize: 16 },
      lineHeight: { minHeight: 16, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.25, maxSpacing: 0 }
    },
    {
      key: "tiny-to-small",
      size: { minSize: 12, maxSize: 14 },
      lineHeight: { minHeight: 18, maxHeight: 21 },
      letterSpacing: { minSpacing: 0.15, maxSpacing: 0.1 }
    },
    {
      key: "micro-to-small",
      size: { minSize: 10, maxSize: 16 },
      lineHeight: { minHeight: 16, maxHeight: 24 },
      letterSpacing: { minSpacing: 0.25, maxSpacing: 0 }
    },
    {
      key: "micro-to-tiny",
      size: { minSize: 10, maxSize: 12 },
      lineHeight: { minHeight: 16, maxHeight: 18 },
      letterSpacing: { minSpacing: 0.25, maxSpacing: 0 }
    }
  ]
} as const;

const staticFontSizeBuilder = ({ size, lineHeight, letterSpacing }: Record<string, number>) => {
  return [
    `${size / pixelsPerRem}rem`,
    {
      lineHeight: `${lineHeight / pixelsPerRem}rem`,
      letterSpacing: `${letterSpacing / pixelsPerRem}rem`
    }
  ];
};

const responsiveFontSizeBuilder = ({ minSize, maxSize, minHeight, maxHeight, minSpacing, maxSpacing }: Record<string, number>) => {
  // clamp(min, value, max)
  const fontSizeClamp = cssClamp({ minSize, maxSize });
  const lineHeightClamp = cssClamp({ minSize: minHeight, maxSize: maxHeight });
  const letterSpacingClamp = cssClamp({ minSize: minSpacing, maxSize: maxSpacing });

  return [
    fontSizeClamp,
    {
      lineHeight: lineHeightClamp,
      letterSpacing: letterSpacingClamp
    }
  ];
};

type FontConfig = {
  [key: string]: [
    string,
    {
      lineHeight: string;
      letterSpacing: string;
    }
  ];
};

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
