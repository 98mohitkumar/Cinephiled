import { type Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

import { colors } from "./src/theme/tokens/colors";
import { borderRadiusTokens, breakpoints, tailwindMaxBreakpoints, transitionTimings, zIndexTokens } from "./src/theme/tokens/misc";
import { tailwindSpacingTokens } from "./src/theme/tokens/spacings";
import { tailwindFontSizeTokens } from "./src/theme/tokens/typography";

const variants = Object.keys(breakpoints);

const config: Config = {
  content: [
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  safelist: [
    { pattern: /grid-cols-/, variants },
    { pattern: /col-span-/, variants }
  ],
  theme: {
    margin: {
      auto: "auto",
      ...tailwindSpacingTokens
    },
    padding: tailwindSpacingTokens,
    gap: tailwindSpacingTokens,
    fontSize: tailwindFontSizeTokens,
    colors,
    fontFamily: {
      manrope: ["var(--manrope)"],
      montserrat: ["var(--montserrat)"]
    },
    borderRadius: borderRadiusTokens,
    screens: breakpoints,
    zIndex: zIndexTokens,
    transitionTimingFunction: transitionTimings,
    extend: {
      gridTemplateColumns: {
        desktopAutoFillMedia: "repeat(auto-fill, minmax(200px, 1fr))",
        desktopAutoFillMediaBackdrop: "repeat(auto-fill, minmax(300px, 1fr))",
        peopleGrid: "repeat(auto-fill, minmax(160px, 1fr))",
        watchProviders: "repeat(auto-fill, minmax(min(55px, 20vw), 1fr))",
        customHeroDetailsGrid: "16rem 1fr",
        "16": "repeat(16, minmax(0, 1fr))"
      },
      gridColumn: {
        "span-13": "span 13 / span 13",
        "span-14": "span 14 / span 14",
        "span-15": "span 15 / span 15",
        "span-16": "span 16 / span 16"
      },
      aspectRatio: {
        poster: "2/3",
        backdrop: "16/9",
        profile: "2/2.5"
      },
      height: {
        halfScreen: "50vh"
      },
      maxHeight: {
        halfScreen: "50vh"
      },
      minHeight: {
        halfScreen: "50vh"
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out"
      },
      screens: tailwindMaxBreakpoints
    }
  },
  plugins: [
    // ref: https://github.com/tailwindlabs/tailwindcss/discussions/1739#discussioncomment-9914554
    plugin(({ addVariant }) => {
      // detect hover
      addVariant("has-hover", "@media (hover: hover) and (pointer: fine)");
      addVariant("no-hover", "@media (hover: none) and (pointer: coarse)");

      // apply hover styles if the device has hover capabilities
      addVariant("can-hover", "@media (hover: hover) and (pointer: fine) { &:hover }");
      addVariant("group-can-hover", "@media (hover: hover) and (pointer: fine) { :merge(.group):hover & }");
    }),
    require("tailwindcss-animate")
  ]
};

export default config;
